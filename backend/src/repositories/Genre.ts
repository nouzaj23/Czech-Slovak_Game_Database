import { checkPermissions, makeRepository } from './Base.js'
import { Genre, User } from '@/entities'
import { NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere } from 'typeorm'
import { GenreCreationData, GenreDeleteData, GenreReadMultipleData, GenreReadSingleData, GenreUpdateData, UUID } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Genre, {
    async readSingle(data: GenreReadSingleData, authorId: UUID | undefined): Promise<Genre> {
      const genre = await this.findOneBy({ id: data.id })
      if (!genre)
        throw new NotFound()
      return genre
    },

    async readMultiple(data: GenreReadMultipleData, authorId: UUID | undefined): Promise<Genre[]> {
      const query = this.createQueryBuilder('genre')
        .where(data.ids ? { id: data.ids } : {})
        .orderBy(data.order || {})
      
      // TODO: use full-text search
      if (data.nameContains)
        query.andWhere(`genre.name LIKE :name`, { name: `%${data.nameContains}%` })

      return query.getMany()
    },
    
    async createGenre(data: GenreCreationData, authorId: UUID | undefined): Promise<Genre> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId)

        const genre = repository.create(data)
        return repository.save(genre)
      })
    },

    async updateGenre(data: GenreUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId)

        const { id, ...change } = data
        repository.update(id, change)
      })
    },

    async deleteGenre(data: GenreDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId)

        repository.softDelete(data)
      })
    }
    
  })
}
