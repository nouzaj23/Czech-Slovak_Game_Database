import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'
import { ReviewReadMultipleData, UUID } from '@/repositories/types.js'

export class Review extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async readSingle(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.review.readSingle(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      gameId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      order: z.object({
        rating: z.enum(['ASC', 'DESC']).optional(),
        createdAt: z.enum(['ASC', 'DESC']).optional(),
        updatedAt: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
      groupBy: z.enum(['game', 'user']).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, ReviewReadMultipleData>(parsed.data)
    
    return await this.repositories.review.readMultiple(
      parsed.data,
      authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      gameId: z.string().uuid(),
      userId: z.string().uuid(),
      rating: z.number().min(0).max(10),
      title: z.string(),
      text: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.review.createReview(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      rating: z.number().min(1).max(5),
      title: z.string().optional(),
      content: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.review.updateReview(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.review.deleteReview(parsed.data, authorId)
  }
}