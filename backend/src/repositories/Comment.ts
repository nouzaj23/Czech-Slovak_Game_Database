import { checkPermissions, makeRepository } from './Base.js'
import { CommentCreationData, CommentDeleteData, CommentReadMultipleData, CommentReadSingleData, CommentReadSingleResult, CommentUpdateData, UUID } from './types.js'
import { Comment, Game, User } from '@/entities'
import { InsufficientPermissions, NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'

function filter(comment: Comment): CommentReadSingleResult {
  return {
    id: comment.id,
    content: comment.deletedAt ? undefined : comment.content,
    commenter: comment.commenter.public,
    gameId: comment.gameId,
    replyToId: comment.replyTo?.id,
    replies: comment.replies?.map(filter),
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }
}

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Comment, {
    async readSingleComment(data: CommentReadSingleData, authorId: UUID | undefined): Promise<CommentReadSingleResult> {
      return this.manager.transaction(async manager => {
        const repository = manager.getTreeRepository(Comment)

        let comment = await repository.findOne({ where: { id: data.id }, withDeleted: true, relations: ['commenter'] })
        if (!comment)
          throw new NotFound("Comment")

        if (data.recurse) {
          comment = await repository.findDescendantsTree(comment, { relations: ['commenter'] })

          if (!comment)
            throw new NotFound("Comment")

        }

        return filter(comment)
      })
    },

    async readMultipleComments(data: CommentReadMultipleData, authorId: UUID | undefined): Promise<CommentReadSingleResult[]> {
      return this.manager.transaction(async manager => {
        const commentRepository = manager.getTreeRepository(Comment)

        const query = commentRepository.createQueryBuilder('comment')
          .withDeleted()
          .where(data.ids ? { id: data.ids } : {})

        if (data.gameId)
          query.andWhere('comment.gameId = :gameId', { gameId: data.gameId })

        if (data.userId)
          query.andWhere('comment.commenterId = :commenterId', { commenterId: data.userId })

        if (data.replyToId)
          query.andWhere('comment.replyToId = :replyToId', { replyToId: data.replyToId })

        if (data.order)
          query.orderBy(data.order)

        if (data.groupBy)
          query.groupBy(`comment.${data.groupBy}`)

        query.innerJoinAndSelect('comment.commenter', 'commenter')

        let comments = await query.getMany()
        if (!comments.length)
          return []

        if (data.recurse)
          comments = await Promise.all(comments.flatMap((comment) => commentRepository.findDescendantsTree(comment)))


        return comments.map(filter)
      })
    },

    async createComment(data: CommentCreationData, authorId: UUID | undefined): Promise<Comment> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const userRepository = manager.getRepository(User)
        const gameRepository = manager.getRepository(Game)
        const commentRepository = manager.withRepository(this)

        const commenter = await userRepository.findOneBy({ id: authorId })
        const game = await gameRepository.findOneBy({ id: data.gameId })
        const replyTo = data.replyTo ? {
          replyTo: (await commentRepository.findOneBy({ id: data.replyTo }))
        } : null

        if (!commenter)
          throw new NotFound("User")

        if (!game)
          throw new NotFound("Game")

        if (data.replyTo && !replyTo?.replyTo)
          throw new NotFound("Comment")

        const comment = commentRepository.create({
          commenter: commenter,
          game: game,
          content: data.content,
          ...replyTo
        })

        return await commentRepository.save(comment)
      })
    },

    async updateComment(data: CommentUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const commentRepository = manager.withRepository(this)
        const comment = await commentRepository.findOneBy({ id: data.id })
        if (!comment)
          throw new NotFound()

        await checkPermissions(manager.getRepository(User), authorId, comment.commenterId);

        const { id, ...change } = data
        await commentRepository.update({ id }, change)
      })
    },

    async deleteComment(data: CommentDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const commentRepository = manager.withRepository(this)
        const comment = await commentRepository.findOneBy({ id: data.id })
        if (!comment)
          throw new NotFound()

        await checkPermissions(manager.getRepository(User), authorId, comment.commenterId);
        await commentRepository.softDelete({ id: data.id })
      })
    },
  })
}