import { checkPermissions, makeRepository } from './Base.js'
import { CommentCreationData, CommentDeleteData, CommentReadMultipleData, CommentReadSingleData, CommentReadSingleResult, CommentUpdateData, UUID } from './types.js'
import { Comment, Game, User } from '@/entities'
import { InsufficientPermissions, NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'

function filter(comment: Comment): CommentReadSingleResult {
  return {
    id: comment.id,
    content: comment.deletedAt ? undefined : comment.content,
    commenterId: comment.deletedAt ? undefined : comment.commenterId,
    gameId: comment.gameId,
    replyToId: comment.replyTo?.id,
    replies: comment.replies.map(filter),
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }
}

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Comment, {
    async readSingleComment(data: CommentReadSingleData, authorId: UUID | undefined): Promise<CommentReadSingleResult> {
      return this.manager.transaction(async manager => {
        const repository = manager.getTreeRepository(Comment)

        let comment = await repository.findOne({ where: { id: data.id }, withDeleted: true })
        if (!comment)
          throw new NotFound("Comment")

        if (data.recurse) {
          comment = await repository.findDescendantsTree(comment)

          if (!comment)
            throw new NotFound("Comment")

        }

        return filter(comment)
      })
    },

    async readMultipleComments(data: CommentReadMultipleData, authorId: UUID | undefined): Promise<CommentReadSingleResult[]> {
      return this.manager.transaction(async manager => {
        const repository = manager.getTreeRepository(Comment)

        const query = repository.createQueryBuilder('comment')
          .where(data.ids ? { id: data.ids } : {})
          .andWhere(data.gameId ? { gameId: data.gameId } : {})
          .andWhere(data.userId ? { commenterId: data.userId } : {})
          .andWhere(data.replyToId ? { replyTo: data.replyToId } : {})
          .orderBy(data.order || {})

        if (data.groupBy)
          query.groupBy(`comment.${data.groupBy}`)

        let comments = await query.getMany()

        if (data.recurse)
          comments = await Promise.all(comments.flatMap((comment) => repository.findDescendantsTree(comment)))


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

        await checkPermissions(manager.getRepository(User), comment.commenterId, authorId);

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

        await checkPermissions(manager.getRepository(User), comment.commenterId, authorId);
        await commentRepository.softDelete({ id: data.id })
      })
    },
  })
}