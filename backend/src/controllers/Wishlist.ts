import { Base } from './Base.js'

import { Repositories } from '@/repositories'

import * as z from 'zod'
import { InvalidData } from '@/errors'

const wishlistSchema = z.object({
  gameId: z.string(),
})

export class Wishlist extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async addToWishlist(userId: string, data: any) {
    const gameId = wishlistSchema.safeParse(data)
    if (!gameId.success) {
      throw new InvalidData(gameId.error)
    }
    await this.repositories.wishlist.addToWishlist(userId, gameId.data.gameId)
  }

  async removeFromWishlist(userId: string, gameId: string) {
    await this.repositories.wishlist.removeFromWishlist(userId, gameId)
  }

  async readWishlist(userId: string) {
    return await this.repositories.wishlist.findByUserId(userId)
  }
}
