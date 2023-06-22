import { checkPermissions, makeRepository } from './Base.js'
import { Developer, Game, Genre, User } from '@/entities'
import { NotFound, NotLoggedIn } from '@/errors'

import { DataSource, FindOptionsWhere, In } from 'typeorm'
import { GameCreationData, GameDeleteData, GameReadMultipleData, GameReadSingleData, GameUpdateData, UUID } from './types.js'

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Game, {
    async readSingle(data: GameReadSingleData, authorId: UUID | undefined): Promise<Game> {
      const game = await this.findOne({ where: data, relations: ['developers', 'genres'] })
      if (!game)
        throw new NotFound()
      return game
    },

    async readMultiple(data: GameReadMultipleData, authorId: UUID | undefined): Promise<Game[]> {
      const query = this.createQueryBuilder('game')
        .leftJoinAndSelect('game.developers', 'developers')
        .leftJoinAndSelect('game.genres', 'genres')
        .where(data.ids ? { id: data.ids } : {})
        
      if (data.developerId)
        query.andWhere(`developers.id = :developerId`, { developerId: data.developerId })

      if (data.genreId)
        query.andWhere(`genres.id = :genreId`, { genreId: data.genreId })

      if (data.nameContains)
        query.andWhere(`game.name ILIKE :name`, { name: `%${data.nameContains}%` })

      if (data.releaseDate?.from)
        query.andWhere(`game.releaseDate >= :from`, { from: data.releaseDate.from })

      if (data.releaseDate?.to)
        query.andWhere(`game.releaseDate <= :to`, { to: data.releaseDate.to })

      if (data.groupBy)
        query.groupBy(`game.${data.groupBy}`)

      query
        
        .orderBy(data.order || {})

      return await query.getMany()
    },

    async createGame(data: GameCreationData, authorId: UUID | undefined): Promise<Game> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        await checkPermissions(manager.getRepository(User), authorId)

        const gameRepository = manager.withRepository(this)
        const developerRepository = manager.getRepository(Developer)
        const genreRepository = manager.getRepository(Genre)

        const { genreIds, developerIds, ...rest } = data

        const genres = genreIds ? await genreRepository.findBy({ id: In(genreIds) }) : undefined
        if (genres?.length !== genreIds?.length)
          throw new NotFound("Genre")

        const developers = developerIds ? await developerRepository.findBy({ id: In(developerIds) }) : undefined
        if (developers?.length !== developerIds?.length)
          throw new NotFound("Developer")

        const game = gameRepository.create({
          genres,
          developers,
          ...rest
        })

        return await gameRepository.save(game)
      })
    },

    async updateGame(data: GameUpdateData, authorId: UUID | undefined): Promise<void> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        await checkPermissions(manager.getRepository(User), authorId)

        const gameRepository = manager.withRepository(this)
        const developerRepository = manager.getRepository(Developer)
        const genreRepository = manager.getRepository(Genre)

        const { id, genreIds: genres, developerIds: developers, ...change } = data

        const game = await gameRepository.findOne({ where: { id }, relations: ['genres', 'developers'] })
        if (!game)
          throw new NotFound("Game")

        if (genres) {
          const genresResolved = genres ? await genreRepository.findBy({ id: In(genres) }) : undefined
          if (!genresResolved || genres.length !== genresResolved.length)
            throw new NotFound("Genre")
          game.genres = genresResolved
        }

        if (developers) {
          const developersResolved = developers ? await developerRepository.findBy({ id: In(developers) }) : undefined
          if (!developersResolved || developers.length !== developersResolved.length)
            throw new NotFound("Developer")
          game.developers = developersResolved
        }

        await gameRepository.save(gameRepository.merge(game, change))
      })
    },

    async deleteGame(data: GameDeleteData, authorId: UUID | undefined): Promise<Game> {
      if (!authorId)
        throw new NotLoggedIn()
      return this.manager.transaction(async manager => {
        await checkPermissions(manager.getRepository(User), authorId)

        const repository = manager.withRepository(this)
        const game = await repository.findOne({
          where: { id: data.id },
          relations: ['comments', 'reviews', 'wishlists']
        })
        if (!game)
          throw new NotFound("Game")

        return await repository.softRemove(game)
      })
    }
  })
}
