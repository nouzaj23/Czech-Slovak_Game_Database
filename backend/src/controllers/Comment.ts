import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'

import * as z from 'zod'
import { InvalidData } from '@/errors'
import { CommentReadMultipleData, UUID } from '@/repositories/types.js'

export class Comment extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async readSingle(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      recurse: z.boolean().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)
  
    return this.repositories.comment.readSingleComment(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      gameId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      replyToId: z.string().uuid().nullable().optional(),
      recurse: z.boolean().optional(),
      groupBy: z.enum(['game', 'user']).optional(),
      order: z.object({
        createdAt: z.enum(['ASC', 'DESC']).optional(),
        updatedAt: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)
    
    assertSameType<typeof parsed.data, CommentReadMultipleData>(parsed.data)
    
    return await this.repositories.comment.readMultipleComments(parsed.data, authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      userId: z.string().uuid(),
      gameId: z.string().uuid(),
      content: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.comment.createComment(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      content: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.comment.updateComment(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.comment.deleteComment(parsed.data, authorId)
  }
}