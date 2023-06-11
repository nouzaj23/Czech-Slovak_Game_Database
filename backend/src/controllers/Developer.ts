import { Base } from './Base.js'

import { Repositories } from '@/repositories'
import { InvalidData } from '@/errors'

import * as z from 'zod'

export class Developer extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async read(id?: string) {
    return id
      ? this.repositories.developer.findById(id)
      : this.repositories.developer.find()
  }

  async create(data: any) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
      isStudio: z.boolean(),
      avatar: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.developer.create(parsed.data)
  }

  async update(id: string, data: any) {
    const schema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      isStudio: z.boolean().optional(),
      avatar: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return this.repositories.developer.update(id, parsed.data)
  }

  async delete(id: string) {
    return this.repositories.developer.deleteById(id)
  }
}