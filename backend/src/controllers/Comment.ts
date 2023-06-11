import { Base } from './Base.js'

import { Repositories } from '@/repositories'

import * as z from 'zod'
import { InvalidData } from '@/errors'

export class Comment extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async read(id: string) {
    return this.repositories.comment.findById(id)
  }

  async findByGameId(gameId: string) {
    return this.repositories.comment.findByGameId(gameId)
  }

  async getReplies(id: string) {
    return this.repositories.comment.getReplies(id)
  }

  async create(gameId: string, data: any) {
    const schema = z.object({
      userId: z.string(),
      content: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.comment.createComment({gameId, ...parsed.data})
  }

  async update(id: string, userId: string, data: any) {
    const schema = z.object({
      content: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.comment.updateComment(id, userId, parsed.data)
  }

  async delete(id: string) {
    return this.repositories.comment.deleteById(id)
  }
}