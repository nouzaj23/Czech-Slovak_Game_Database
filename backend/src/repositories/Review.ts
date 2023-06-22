import { checkPermissions, makeRepository } from './Base.js'
import { Game, Review, User } from '@/entities'
import { AlreadyExists, NotFound, NotLoggedIn } from '@/errors'

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
        .innerJoinAndSelect('review.user', 'user')
        .innerJoinAndSelect('review.game', 'game')
        .orderBy(data.order || {})
    
      if (data.groupBy)
        query.groupBy(`review.${data.groupBy}`)

      return await query.getMany()
    },

    async createReview(data: ReviewCreationData, authorId: UUID | undefined): Promise<Review> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const reviewRepository = manager.withRepository(this)
        const userRepository = manager.getRepository(User)
        const gameRepository = manager.getRepository(Game)

        await checkPermissions(manager.getRepository(User), authorId, data.userId)

        const { userId, gameId, ...rest } = data

        const conflict = await reviewRepository.createQueryBuilder('review')
          .innerJoinAndSelect('review.user', 'user')
          .innerJoinAndSelect('review.game', 'game')
          .where({ user: data.userId, game: data.gameId })
          .getOne()
        
        if (conflict)
          throw new AlreadyExists('Review')

        const user = await userRepository.findOneBy({id: data.userId})
        if (!user)
          throw new NotFound('User')
        
        const game = await gameRepository.findOneBy({id: data.gameId})
        if (!game)
          throw new NotFound('Game')
      
        const review = reviewRepository.create({ user, game, ...rest })
        return await reviewRepository.save(review)
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

        await repository.update(id, change)
      })
    },

    async deleteReview(data: ReviewUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        const repository = manager.withRepository(this)

        const review = await repository.findOne({where: data, relations: ['user']})
        if (!review)
          throw new NotFound("Review")

        await checkPermissions(manager.getRepository(User), authorId, review.user.id)

        await repository.softRemove(review)
      })
    }
  })
}
