import { checkPermissions, makeRepository } from './Base.js'
import { UUID, UserCreationData, UserDeleteData, UserLoginData, UserPublic, UserReadMultipleData, UserReadSingleData, UserUpdateAuthData, UserUpdateData } from './types.js'

import { User, Game } from '@/entities'
import { AlreadyExists, InsufficientPermissions, InvalidData, NotFound, NotLoggedIn, RequestError } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'
import * as Bcrypt from 'bcrypt'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, User, {
    async readSingle(data: UserReadSingleData, authorId: UUID | undefined): Promise<UserPublic> {
      const user = await this.findOne({ where: data, select: ['id', 'username', 'avatar', 'bio', 'wishlist', 'comments', 'reviews'], relations: ['wishlist', 'comments', 'reviews'] })
      if (!user)
        throw new NotFound()

      return user
    },

    async readMultiple(data: UserReadMultipleData, authorId: UUID | undefined): Promise<UserPublic[]> {
      const query = this.createQueryBuilder('user')
        .select(['user.id', 'user.username', 'user.avatar', 'user.bio'])
        .where(data.ids ? { id: data.ids } : {})
        .orderBy(data.order || {})

      if (data.usernameContains)
        query.andWhere(`user.username ILIKE :usernameContains`, { usernameContains: `%${data.usernameContains}%` })

      return await query.getMany()
    },

    async readSingleFull(data: UserReadSingleData, authorId: UUID | undefined): Promise<User> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId, data.id)

        const user = await repository.findOneBy(data)
        if (!user)
          throw new NotFound()

        return user
      })
    },

    async createUser(data: UserCreationData, authorId: UUID | undefined) : Promise<User> {
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const { username, email, password } = data

        const conflicts = await repository.findBy([{ username }, { email }]);
        if (conflicts.length !== 0) {
          const conflict = conflicts[0]
          if (conflict.username === username)
            throw new AlreadyExists("Username")
          else
            throw new AlreadyExists("Email")
        }

        const hash = await Bcrypt.hash(password, 10)
        const user = repository.create({
          username,
          email,
          hash,
          isAdmin: false,
        })

        return await repository.save(user)
      })
    },

    async updateUser(data: UserUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId, data.id)

        const { id, ...change } = data

        await repository.update({ id }, change)
      })
    },

    async updateUserAuth(data: UserUpdateAuthData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId, data.id)

        const { id, ...change } = data

        await repository.update(id, change)
      })
    },

    async deleteUser(data: UserDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId, data.id)

        const user = await repository.findOne({ where: { id: data.id }, relations: ['wishlist', 'comments', 'reviews'] })
        if (!user)
          throw new NotFound("User")

        await repository.softRemove(user)
      })
    },

    async login(data: UserLoginData, authorId: UUID | undefined): Promise<User> {
      if (authorId)
        throw new AlreadyExists("Already logged in")
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const { username, email, password } = data
        if ((!username && !email) || (username && email))
          throw new RequestError("Username xor email required")

        const params = username ? { username } : { email }

        const user = await repository.findOneBy(params)
        if (!user)
          throw new RequestError("Password or username/email mismatch")

        const match = await Bcrypt.compare(password, user.hash)
        if (!match)
          throw new RequestError("Password or username/email mismatch")

        return user
      })
    }
  })
}

