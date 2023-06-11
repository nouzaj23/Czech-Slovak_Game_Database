import { Base, saltRounds } from './Base.js'

import type { Repositories } from '@/repositories'
import { InvalidData, NotFound } from '@/errors'

import * as z from 'zod'
import * as Bcrypt from 'bcrypt'

export class User extends Base {
  constructor(repositories: Repositories) {
    super(repositories)
  }

  async create(data: any) {
    const schema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    const { username, email, password } = parsed.data
    const hash = await Bcrypt.hash(password, saltRounds)
    await this.repositories.user.createUser(username, email, hash)
  }

  async login(data: any) {
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

    const { email, username, password } = parsed.data
    let user;
    if (email) 
      user = await this.repositories.user.findByEmail(email)
    else if (username) 
      user = await this.repositories.user.findByUsername(username)
    else
      throw new InvalidData()

    if (!user)
      throw new NotFound()

    const match = await Bcrypt.compare(password, user.auth.hash)
    if (!match)
      throw new InvalidData()

    return user
  }

  async read(userId: string) {
    const user = await this.repositories.user.findById(userId)
    if (!user)
      throw new NotFound()
    
    return user.public
  }

  async update(userId: string, data: any) {
    const schema = z.object({
      avatar: z.string().optional(),
      bio: z.string().optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    await this.repositories.user.update(userId, parsed.data)
  }

  async delete(userId: string) {
    await this.repositories.user.deleteById(userId)
  }

  async readAuth(userId: string) {
    const user = await this.repositories.user.findById(userId)
    if (!user)
      throw new NotFound()
    
    return user.auth
  }

  async updateAuth(userId: string, data: any) {
    const schema = z.object({
      email: z.string().email().optional(),
      password: z.string().min(8).optional(),
    })

    const parsed = schema.safeParse(data)
    if (!parsed.success)
      throw new InvalidData(parsed.error)

    const { password } = parsed.data
    if (password) {
      const hash = await Bcrypt.hash(password, saltRounds)
      await this.repositories.user.update(userId, { hash })
    }
    else {
      await this.repositories.user.update(userId, parsed.data)
    }
  }
}
