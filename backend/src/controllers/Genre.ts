import { Base } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'

export class Genre extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async read(id?: string) {
    return id
      ? this.repositories.genre.findById(id)
      : this.repositories.genre.find()
  }

  async create(data: any) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.genre.create(parsed.data)
  }

  async update(id: string, data: any) {
    const schema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.genre.update(id, parsed.data)
  }

  async delete(id: string) {
    return this.repositories.genre.deleteById(id)
  }
}