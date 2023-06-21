import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'
import { DeveloperReadMultipleData, UUID } from '@/repositories/types.js'

export class Developer extends Base {
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

    return await this.repositories.developer.readSingle(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      nameContains: z.string().optional(),
      order: z.object({
        name: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
      groupBy: z.enum(['game']).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, DeveloperReadMultipleData>(parsed.data)

    return await this.repositories.developer.readMultiple(parsed.data, authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
      isStudio: z.boolean(),
      avatar: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.developer.createDeveloper(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().optional(),
      description: z.string().optional(),
      isStudio: z.boolean().optional(),
      avatar: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.developer.updateDeveloper(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    return await this.repositories.developer.deleteDeveloper(data, authorId)
  }
}