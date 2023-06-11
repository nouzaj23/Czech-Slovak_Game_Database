import { Base } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'

export class Review extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async get(gameId: string) {
    return this.repositories.review.findByGameId(gameId)
  }

  async create(data: any) {
    const schema = z.object({
      gameId: z.string(),
      userId: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.review.create(parsed.data)
  }

  async update(id: string, data: any) {
    const schema = z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.review.update(id, parsed.data)
  }

  async delete(id: string) {
    return this.repositories.review.deleteById(id)
  }
}