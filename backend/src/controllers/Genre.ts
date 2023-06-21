import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'
import { GenreReadMultipleData, UUID } from '@/repositories/types.js'

export class Genre extends Base {
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

    return await this.repositories.genre.readSingle(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      nameContains: z.string().optional(),
      order: z.object({
        name: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, GenreReadMultipleData>(parsed.data)

    return await this.repositories.genre.readMultiple(parsed.data, authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.genre.createGenre(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().optional(),
      description: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.genre.updateGenre(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.genre.deleteGenre(parsed.data, authorId)
  }
}