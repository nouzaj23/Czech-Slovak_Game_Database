import { checkPermissions, makeRepository } from './Base.js'
import { Review, User } from '@/entities'
import { NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { ReviewCreationData, ReviewReadMultipleData, ReviewReadSingleData, ReviewUpdateData, UUID } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Review, {
    async readSingle(data: ReviewReadSingleData, authorId: UUID | undefined): Promise<Review> {
      const review = await this.findOneBy(data)
      if (!review)
        throw new NotFound()
      return review
    },

    async readMultiple(data: ReviewReadMultipleData, authorId: UUID | undefined): Promise<Review[]> {
      const query = this.createQueryBuilder('review')
        .where(data.ids ? { id: data.ids } : {})
        .andWhere(data.gameId ? { game: data.gameId } : {})
        .andWhere(data.userId ? { user: data.userId } : {})
        .orderBy(data.order || {})
    
      if (data.groupBy)
        query.groupBy(`review.${data.groupBy}`)

      return query.getMany()
    },

    async createReview(data: ReviewCreationData, authorId: UUID | undefined): Promise<Review> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        await checkPermissions(manager.getRepository(User), authorId, data.userId)
      
        return repository.create(data)
      })
    },

    async updateReview(data: ReviewUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const review = await repository.findOneBy({id: data.id})
        if (!review)
          throw new NotFound("Review")

        await checkPermissions(manager.getRepository(User), authorId, review.user.id)
      
        const { id, ...change } = data

        repository.update(id, change)
      })
    },

    async deleteReview(data: ReviewUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const review = await repository.findOneBy({id: data.id})
        if (!review)
          throw new NotFound("Review")

        await checkPermissions(manager.getRepository(User), authorId, review.user.id)

        repository.softRemove(review)
      })
    }
  })
}
