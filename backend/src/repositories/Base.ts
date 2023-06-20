import { Base as BaseEntity, User } from '@/entities'

import { DataSource, EntityManager, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'
import { InsufficientPermissions, NotFound } from '@/errors'
import { UUID } from './types.js';

type ModifiedRepository<Entity extends ObjectLiteral, CustomRepository> = Repository<Entity> & CustomRepository;

export function makeRepository<Entity extends BaseEntity, CustomRepository>(
  dataSource: DataSource,
  target: EntityTarget<Entity>,
  custom: CustomRepository & ThisType<Repository<Entity> & CustomRepository> = {} as CustomRepository & ThisType<Repository<Entity> & CustomRepository>)
  : ModifiedRepository<Entity, CustomRepository> {
  return dataSource
    .getRepository(target)
    .extend(custom)
}

export async function isAdmin(repository: Repository<User>, userId: UUID) : Promise<boolean> {
  return !!repository.findOneBy({ id: userId, isAdmin: true })
}

export async function isOwner(userId: UUID, authorId: UUID) : Promise<boolean> {
  return userId === authorId
}

export async function isOwnerOrAdmin(repository: Repository<User>, authorId: UUID, userId?: UUID) : Promise<boolean> {
  return (!!(userId) && await isOwner(userId, authorId)) || await isAdmin(repository, authorId)
}

/**
 * Checks if the user is the owner of the resource or an admin
 * @param repository The repository to check the permissions against
 * @param authorId The id of the author of the request (i.e. current user)
 * @param userId The id of the user to check the permissions for (i.e. the owner of the resource) if not present, this will only check if the author is an admin
 * 
 * @throws {InsufficientPermissions} If the user is not the owner of the resource or an admin
 */
export async function checkPermissions(repository: Repository<User>, authorId: UUID, userId?: UUID) : Promise<void> {
  if (!await isOwnerOrAdmin(repository, authorId, userId))
    throw new InsufficientPermissions()
}
