import { makeRepository } from './Base.js'
import { Developer } from '@/entities'
import { DataSource } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Developer, {
    createPerson(name: string, avatar: string, description: string) {
      return this.createQueryBuilder('developer')
        .insert()
        .values({ name, avatar, description, isStudio: false })
        .execute()
    },

    createStudio(name: string, avatar: string, description: string) {
      return this.createQueryBuilder('developer')
        .insert()
        .values({ name, avatar, description, isStudio: true })
        .execute()
    },

    addGame(id: string, gameId: string) {
      return this.createQueryBuilder('developer')
        .relation(Developer, 'developed')
        .of(id)
        .add(gameId)
    },
  })
}
