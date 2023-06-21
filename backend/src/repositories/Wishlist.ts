import { checkPermissions, makeRepository } from './Base.js'

import { User, Wishlist } from '@/entities'
import { AlreadyExists, NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'
import { UUID, WishlistCreationData, WishlistDeleteData, WishlistReadMultipleData } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Wishlist, {
    async readSingle(data: WishlistDeleteData, authorId: UUID | undefined): Promise<Wishlist> {
      const wishlist = await this.findOneBy(data)
      if (!wishlist)
        throw new NotFound()
      return wishlist
    },

    async readMultiple(data: WishlistReadMultipleData, authorId: UUID | undefined): Promise<Wishlist[]> {
      const query = this.createQueryBuilder('wishlist')
        .where(data.ids ? { id: data.ids } : {})
        .andWhere(data.gameId ? { game: data.gameId } : {})
        .andWhere(data.userId ? { user: data.userId } : {})
        .orderBy(data.order || {})
    
      if (data.groupBy)
        query.groupBy(`wishlist.${data.groupBy}`)

      return await query.getMany()
    },

    async createWishlist(data: WishlistCreationData, authorId: UUID | undefined): Promise<Wishlist> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const conflict = await repository.findOneBy(data)
        if (conflict)
          throw new AlreadyExists("Wishlist")

        const wishlist = repository.create(data)
        return await repository.save(wishlist)
      })
    },

    async deleteWishlist(data: WishlistDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId)

        await repository.softDelete(data)
      })
    },
  })
}
