import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'

import * as z from 'zod'
import { InvalidData } from '@/errors'
import { UUID, WishlistReadMultipleData } from '@/repositories/types.js'

export class Wishlist extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async addToWishlist(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      gameId: z.string().uuid(),
      userId: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.wishlist.createWishlist(parsed.data, authorId)
  }

  async removeFromWishlist(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      gameId: z.string().uuid(),
      userId: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.wishlist.deleteWishlist(parsed.data, authorId)
  }

  async readSingle(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      gameId: z.string().uuid(),
      userId: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.wishlist.readSingle(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      userId: z.string().uuid().optional(),
      gameId: z.string().uuid().optional(),
      order: z.object({
        createdAt: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
      groupBy: z.enum(['user', 'game']).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, WishlistReadMultipleData>(parsed.data)

    return await this.repositories.wishlist.readMultiple(parsed.data, authorId)
  }
}
