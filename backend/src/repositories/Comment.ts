import { makeRepository } from './Base.js'
import { Comment, Game, User } from '@/entities'
import { InsufficientPermissions } from '@/errors'

import { DataSource } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Comment, {
    createComment(data: {
        userId: string,
        gameId: string,
        content: string,
        replyToId?: string}) {
      return this.manager.transaction(async manager => {
        const commenter: User = await manager.findOneByOrFail(User, { id: data.userId })
        const game: Game = await manager.findOneByOrFail(Game, { id: data.gameId })
        const replyTo = data.replyToId ? {
          replyTo: (await manager.findOneByOrFail(Comment, { id: data.replyToId }))
        } : null

        return manager.create(Comment, {
          commenter: commenter,
          game: game,
          content: data.content,
          ...replyTo
        })
      })
    },

    updateComment(id: string, userId: string, data: { content: string }) {
      return this.manager.transaction(async manager => {
        const commentRepository = manager.withRepository(this)
        const comment = await commentRepository.findOneBy({ id })
        if (!comment || comment.commenter.id !== userId)
          throw new InsufficientPermissions()

        commentRepository.update({ id }, data)
      })
    },
  
    getReplies(id: string): Promise<Comment[]> {
      return this.createQueryBuilder('comment')
        .relation(Comment, 'replies')
        .of(id)
        .loadMany()
    },
  
    getParent(id: string) {
      return this.createQueryBuilder('comment')
        .relation(Comment, 'replyTo')
        .of(id)
        .loadOne()
    },
  
    findByGameId(gameId: string) {
      return this.createQueryBuilder('comment')
        .where('comment.gameId = :gameId', { gameId })
        .getMany()
    },
  
    findByCommenterId(commenterId: string) {
      return this.createQueryBuilder('comment')
        .where('comment.commenterId = :commenterId', { commenterId })
        .getMany()
    }
  })
}