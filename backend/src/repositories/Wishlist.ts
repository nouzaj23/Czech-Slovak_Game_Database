import { checkPermissions, makeRepository } from './Base.js'

import { Game, User, Wishlist } from '@/entities'
import { AlreadyExists, NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'
import { UUID, WishlistCreationData, WishlistDeleteData, WishlistReadMultipleData, WishlistReadSingleData } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Wishlist, {
    async readSingle(data: WishlistReadSingleData, authorId: UUID | undefined): Promise<Wishlist> {
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
        const wishlistRepository = manager.withRepository(this)
        const userRepository = manager.getRepository(User)
        const gameRepository = manager.getRepository(Game)

        const user = await userRepository.findOneBy({ id: data.userId })
        if (!user)
          throw new NotFound("User")

        const game = await gameRepository.findOneBy({ id: data.gameId })
        if (!game)
          throw new NotFound("Game")

        const conflict = await wishlistRepository.createQueryBuilder('wishlist')
          .innerJoinAndSelect('wishlist.user', 'user')
          .innerJoinAndSelect('wishlist.game', 'game')
          .where('user.id = :userId', { userId: data.userId })
          .andWhere('game.id = :gameId', { gameId: data.gameId })
          .withDeleted()
          .getOne()

        // TODO: update database to allow non-unique wishlist entries
        if (conflict) {
          if (!conflict.deletedAt)
            throw new AlreadyExists("Wishlist")
          return await wishlistRepository.recover(conflict)
        }

        const wishlist = wishlistRepository.create({
          user,
          game,
        })
        return await wishlistRepository.save(wishlist)


      })
    },

    async deleteWishlist(data: WishlistDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      this.manager.transaction(async manager => {
        const wishlistRepository = manager.withRepository(this)
        const userRepository = manager.getRepository(User)
        const gameRepository = manager.getRepository(Game)

        await checkPermissions(manager.getRepository(User), authorId)

        const user = await userRepository.findOneBy({ id: data.userId })
        if (!user)
          throw new NotFound("User")

        const game = await gameRepository.findOneBy({ id: data.gameId })
        if (!game)
          throw new NotFound("Game")

        const wishlist = await wishlistRepository.createQueryBuilder('wishlist')
          .innerJoinAndSelect('wishlist.user', 'user')
          .innerJoinAndSelect('wishlist.game', 'game')
          .where({ user, game })
          .getOne()

        if (!wishlist)
          throw new NotFound("Wishlist")

        await wishlistRepository.softRemove(wishlist)
      })
    },
  })
}
