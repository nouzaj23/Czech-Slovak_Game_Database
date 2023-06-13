import { makeRepository } from './Base.js'

import { Wishlist } from '@/entities'
import { AlreadyExists, NotFound } from '@/errors'

import { DataSource, Repository } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Wishlist, {
    addToWishlist(userId: string, gameId: string) {
      return this.manager.transaction(async manager => {
        const wishlistRepo = manager.getRepository(Wishlist)

        const wishlist = await wishlistRepo.findOneBy({ userId, gameId })
        if (wishlist) {
          throw new AlreadyExists('wishlist')
        }

        return manager.createQueryBuilder()
          .insert()
          .values({ userId, gameId })
          .execute()
      })
    },

    removeFromWishlist(userId: string, gameId: string) {
      return this.createQueryBuilder('wishlist')
        .softDelete()
        .where('wishlist.userId = :userId', { userId })
        .andWhere('wishlist.gameId = :gameId', { gameId })
        .execute()
    },

    findByUserId(userId: string) {
      return this.createQueryBuilder('wishlist')
        .leftJoinAndSelect('wishlist.game', 'game')
        .where('wishlist.userId = :userId', { userId })
        .getMany()
    }
  })
}
