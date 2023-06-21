import { isAdmin, makeRepository } from './Base.js'
import { Developer, User } from '@/entities'
import { InsufficientPermissions, NotFound, NotLoggedIn } from '@/errors'
import { DataSource, FindOptionsWhere } from 'typeorm'
import { DeveloperCreationData, DeveloperDeleteData, DeveloperReadMultipleData, DeveloperReadSingleData, DeveloperUpdateData, UUID } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Developer, {
    async readSingle(data: DeveloperReadSingleData, authorId: UUID | undefined): Promise<Developer> {
      const developer = await this.findOneBy({ id: data.id })
      if (!developer)
        throw new NotFound()
      return developer
    },

    async readMultiple(data: DeveloperReadMultipleData, authorId: UUID | undefined): Promise<Developer[]> {
      const query = this.createQueryBuilder('developer')
        .where(data.ids ? { id: data.ids } : {})
        .orderBy(data.order || {})

      // TODO: Make this use fulltext search
      if (data.nameContains)
        query.andWhere(`developer.name ILIKE :name`, { name: `%${data.nameContains}%` })

      if (data.groupBy)
        query.groupBy(`developer.${data.groupBy}`)

      return await query.getMany()
    },

    async createDeveloper(data: DeveloperCreationData, authorId: UUID | undefined): Promise<Developer> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        if (!isAdmin(manager.getRepository(User), authorId))
          throw new InsufficientPermissions()

        const repository = manager.withRepository(this)
        const developer = repository.create(data)
        
        return await repository.save(developer)
      })
    },

    async updateDeveloper(data: DeveloperUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()

      return this.manager.transaction(async manager => {
        if (!isAdmin(manager.getRepository(User), authorId))
          throw new InsufficientPermissions()
        const { id, ...change } = data
        await manager.withRepository(this).update(id, change)
      })
    },

    async deleteDeveloper(data: DeveloperDeleteData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        if (!isAdmin(manager.getRepository(User), authorId))
          throw new InsufficientPermissions()
        await this.softDelete({ id: data.id })
      })
    },
  })
}
