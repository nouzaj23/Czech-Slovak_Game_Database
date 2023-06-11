import { makeRepository } from './Base.js'
import { Genre } from '@/entities'

import { DataSource } from 'typeorm'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Genre, {
    findByTitle(title: string) {
      return this.createQueryBuilder('genre')
        .where('genre.title = :title', { title })
        .getOne()
    }
  })
}
