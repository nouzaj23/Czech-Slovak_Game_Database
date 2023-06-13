import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  VirtualColumn,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Developer } from './Developer.js'
import { Genre } from './Genre.js'
import { Comment } from './Comment.js'
import { Review } from './Review.js'

@Entity()
export class Game extends Base {
  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  releaseDate!: Date

  @Column()
  cover!: string

  @ManyToMany(() => Developer, (developer: Developer) => developer.developed)
  developers!: Relation<Developer>[]

  @ManyToOne(() => Genre, (genre: Genre) => genre.games)
  genres!: Relation<Genre>[]

  @OneToMany(() => Comment, (comment: Comment) => comment.commenter)
  comments!: Relation<Comment>[]

  @OneToMany(() => Review, (review: Review) => review.user)
  reviews!: Relation<Review>[]

  // For now, we'll calculate the average score of a game by querying the database every time we need it.
  // TODO: Cache this value in the database and update it whenever a new review is added.
  @VirtualColumn({
    query: (alias: string) =>
      `SELECT AVG(rating) FROM "review" WHERE "game" = ${alias}.id`
  })
  readonly score!: number

  @Column({ type: 'simple-array' })
  photos!: string[]

  @Column({ type: 'simple-array' })
  videos!: string[]

  @VirtualColumn({
    query: (alias: string) =>
      `SELECT COUNT(*) FROM "wishlist" WHERE "gameId" = ${alias}.id`
  })
  wishlistedCount!: number
}
