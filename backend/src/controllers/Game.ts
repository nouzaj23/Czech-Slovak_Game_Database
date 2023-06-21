import { Base, assertSameType } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'
import { GameReadMultipleData, UUID } from '@/repositories/types.js'

export class Game extends Base {
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

    return await this.repositories.game.readSingle(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      nameContains: z.string().optional(),
      developerId: z.string().uuid().optional(),
      genreId: z.string().optional(),
      releaseDate: z.object({
        from: z.coerce.date().optional(),
        to: z.coerce.date().optional(),
      }).optional(),
      order: z.object({
        name: z.enum(['ASC', 'DESC']).optional(),
        releaseDate: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
      groupBy: z.enum(['developer', 'genre']).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, GameReadMultipleData>(parsed.data)

    return await this.repositories.game.readMultiple(parsed.data, authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
      releaseDate: z.coerce.date().optional(),
      cover: z.string(),
      developerIds: z.array(z.string().uuid()).optional(),
      genreIds: z.array(z.string().uuid()).optional(),
      photos: z.array(z.string()).optional(),
      videos: z.array(z.string()).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.game.createGame(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      name: z.string().optional(),
      description: z.string().optional(),
      genreIds: z.array(z.string()).optional(),
      releaseDate: z.coerce.date().optional(),
      developerIds: z.array(z.string()).optional(),
      cover: z.string().optional(),
      photos: z.array(z.string()).optional(),
      videos: z.array(z.string()).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.game.updateGame(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.game.deleteGame(parsed.data, authorId)
  }
}