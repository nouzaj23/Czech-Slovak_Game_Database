import { Base, assertSameType, saltRounds } from './Base.js'

import type { Repositories } from '@/repositories'
import { InvalidData, NotFound } from '@/errors'

import * as z from 'zod'
import { UUID, UserPublic, UserReadMultipleData } from '@/repositories/types.js'

export class User extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async readSingle(data: any, authorId: UUID | undefined): Promise<UserPublic> {
    const schema = z.object({
      id: z.string().uuid()
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.readSingle(parsed.data, authorId)
  }

  async readSingleFull(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid()
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.readSingleFull(parsed.data, authorId)
  }

  async readMultiple(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      ids: z.array(z.string().uuid()).optional(),
      usernameContains: z.string().optional(),
      order: z.object({
        username: z.enum(['ASC', 'DESC']).optional(),
        createdAt: z.enum(['ASC', 'DESC']).optional(),
        updatedAt: z.enum(['ASC', 'DESC']).optional(),
      }).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    assertSameType<typeof parsed.data, UserReadMultipleData>(parsed.data)

    return await this.repositories.user.readMultiple(parsed.data, authorId)
  }

  async create(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.createUser(parsed.data, authorId)
  }

  async login(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      email: z.string().email().optional(),
      username: z.string().optional(),
      password: z.string(),
    }).refine(data => data.email || data.username, {
      message: 'Either email or username must be provided',
      path: ['email', 'username'],
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.login(parsed.data, authorId)
  }

  async update(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      avatar: z.string().optional(),
      bio: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.updateUser(parsed.data, authorId)
  }

  async delete(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.deleteUser(parsed.data, authorId)
  }

  async updateAuth(data: any, authorId: UUID | undefined) {
    const schema = z.object({
      id: z.string().uuid(),
      username: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    return await this.repositories.user.updateUserAuth(parsed.data, authorId)
  }
}
