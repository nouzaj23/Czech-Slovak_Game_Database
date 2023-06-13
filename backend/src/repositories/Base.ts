import { Base as BaseEntity } from '@/entities'

import { DataSource, EntityTarget, FindOptionsWhere, Repository } from 'typeorm'
import { NotFound } from '@/errors'

export function makeRepository<Entity extends BaseEntity, CustomRepository>(
  dataSource: DataSource,
  target: EntityTarget<Entity>,
  custom: CustomRepository & ThisType<Repository<Entity> & CustomRepository> = {} as CustomRepository & ThisType<Repository<Entity> & CustomRepository>) {
  return dataSource
    .getRepository(target)
    .extend({
      async findById(id: string) {
        return this.findOneBy({ id } as FindOptionsWhere<Entity>)
      },

      async findOneByOrFail(where: FindOptionsWhere<Entity>) {
        const entity = await this.findOneBy(where)
        if (!entity)
          throw new NotFound()
        return entity
      },

      async findOneByIdOrFail(id: string) {
        return this.findOneByOrFail({ id } as FindOptionsWhere<Entity>)
      },

      async deleteById(id: string) {
        return this.softDelete(id)
      },
    }).extend(custom)
}
