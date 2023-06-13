import { makeRepository } from './Base.js'

import { User, Game } from '@/entities'
import { AlreadyExists, NotFound } from '@/errors'

import { DataSource } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, User, {
    findByUsername(username: string) {
      return this.createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getOne()
    },

    findByEmail(email: string) {
      return this.createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne()
    },

    createUser(username: string, email: string, hash: string) {
      return this.manager.transaction(async manager => {
        const usernameConflict = await manager.findOneBy(User, { username });
        if (usernameConflict) {
          throw new AlreadyExists('username')
        }

        const emailConflict = await manager.findOneBy(User, { email });
        if (emailConflict) {
          throw new AlreadyExists('email')
        }

        return manager.createQueryBuilder()
          .insert()
          .values({ username, email, hash })
          .execute()
      })
    },

    deleteById(id: string) {
      return this.createQueryBuilder('user')
        .softDelete()
        .where('user.id = :id', { id })
        .execute()
    },

    readWishlist(userId: string) {
      return this.createQueryBuilder('user')
        .relation(User, 'wishlist')
        .of(userId)
        .loadMany()
    },

    readComments(userId: string) {
      return this.createQueryBuilder('user')
        .relation(User, 'comments')
        .of(userId)
        .loadMany()
    },

    readReviews(userId: string) {
      return this.createQueryBuilder('user')
        .relation(User, 'reviews')
        .of(userId)
        .loadMany()
    },
  })
}
