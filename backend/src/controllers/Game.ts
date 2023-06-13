import { Base } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'

export class Game extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async create(data: any) {
    const schema = z.object({
      name: z.string(),
      description: z.string().optional(),
      genres: z.array(z.string()).optional(),
      releaseDate: z.date().optional(),
      developer: z.string().optional(),
      cover: z.string().optional(),
      photos: z.array(z.string()).optional(),
      videos: z.array(z.string()).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.game.createGame(parsed.data)
  }

  async read(gameId?: string) {
    return gameId
      ? this.repositories.game.findOneByIdOrFail(gameId)
      : this.repositories.game.find()
  }

  async update(gameId: string, data: any) {
    const schema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      genres: z.array(z.string()).optional(),
      releaseDate: z.date().optional(),
      developer: z.string().optional(),
      cover: z.string().optional(),
      photos: z.array(z.string()).optional(),
      videos: z.array(z.string()).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    await this.repositories.game.updateGame(gameId, parsed.data)
  }

  async delete(gameId: string) {
    await this.repositories.game.deleteById(gameId)
  }
}