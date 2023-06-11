import { makeRepository } from './Base.js'
import { Developer, Game, Genre } from '@/entities'
import { NotFound } from '@/errors'

import { DataSource } from 'typeorm'

interface Data {
  name: string,
  description?: string,
  releaseDate?: Date,
  genres?: string[],
  developers?: string[],
  cover?: string,
  photos?: string[],
  videos?: string[],
}

export function getRepository(dataSource: DataSource) {
  return makeRepository(dataSource, Game, {
    findByTitle(title: string) {
      return this.createQueryBuilder('game')
        .where('game.title = :title', { title })
        .getOne()
    },

    findByGenreId(genreId: string) {
      return this.createQueryBuilder('game')
        .leftJoinAndSelect('game.genres', 'genre')
        .where('genre.id = :genreId', { genreId })
        .getMany()
    },

    findByDeveloperId(developerId: string) {
      return this.createQueryBuilder('game')
        .leftJoinAndSelect('game.developers', 'developer')
        .where('developer.id = :developerId', { developerId })
        .getMany()
    },

    createGame(data: Data) {
      return this.manager.transaction(async manager => {
        const gameRepository = manager.withRepository(this)

        try {
          const genres = await manager.createQueryBuilder(Genre, 'genre')
            .where('genre.id IN (:...genreIds)', { genreIds: data.genres })
            .getMany()

          const developers = await manager.createQueryBuilder(Genre, 'developer')
            .where('developer.id IN (:...developerIds)', { developerIds: data.developers })
            .getMany()

          return gameRepository.create({
            name: data.name,
            description: data.description,
            releaseDate: data.releaseDate,
            genres,
            developers
          })
        } catch (error) {
          throw error
        }

      })
    },

    updateGame(id: string, data: Partial<Data>) {
      return this.manager.transaction(async manager => {
        const gameRepository = manager.withRepository(this)

        const game = await gameRepository.findOneBy({ id })

        if (!game)
          throw new NotFound("Game");

        let genres: Genre[] = []
        try {
          genres = await manager.createQueryBuilder(Genre, 'genre')
            .where('genre.id IN (:...genreIds)', { genreIds: data.genres })
            .getMany()
        } catch (error) {
          throw new NotFound("Genre")
        }

        let developers: Developer[] = []
        try {
          developers = await manager.createQueryBuilder(Developer, 'developer')
            .where('developer.id IN (:...developerIds)', { developerIds: data.developers })
            .getMany()
        } catch (error) {
          throw new NotFound("Developer")
        }

        return gameRepository.save({
          ...game,
          name: data.name,
          description: data.description,
          releaseDate: data.releaseDate,
          genres,
          developers
        })
      })
    }
  })
}
