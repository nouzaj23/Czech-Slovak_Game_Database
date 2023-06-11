import { makeRepository } from './Base.js'
import { Review } from '@/entities'

import { DataSource } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Review, {
    findByGameId(gameId: string) {
      return this.createQueryBuilder('review')
        .leftJoinAndSelect('review.game', 'game')
        .where('game.id = :gameId', { gameId })
        .getMany()
    },
    
    findByUserId(userId: string) {
      return this.createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .where('user.id = :userId', { userId })
        .getMany()
    },
  })
}
