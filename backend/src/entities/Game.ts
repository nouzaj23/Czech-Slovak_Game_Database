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
import { Wishlist } from './Wishlist.js'

@Entity()
export class Game extends Base {
  @Column()
  name!: string

  @Column()
  description!: string

  @Column('date')
  releaseDate!: Date

  @Column()
  cover!: string

  @ManyToMany(() => Developer, (developer: Developer) => developer.developed)
  developers!: Relation<Developer>[]

  @ManyToMany(() => Genre, (genre: Genre) => genre.games)
  genres!: Relation<Genre>[]

  @OneToMany(() => Comment, (comment: Comment) => comment.commenter, {cascade: true})
  comments!: Relation<Comment>[]

  @OneToMany(() => Review, (review: Review) => review.user, {cascade: true})
  reviews!: Relation<Review>[]

  @OneToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.user, {cascade: true})
  wishlists!: Relation<Wishlist>[]

  // For now, we'll calculate the average score of a game by querying the database every time we need it.
  // TODO: Cache this value in the database and update it whenever a new review is added.
  @VirtualColumn({
    query: (alias: string) =>
      `SELECT AVG(rating) FROM "review" WHERE "gameId" = ${alias}.id AND "deletedAt" IS NULL`
  })
  rating!: number

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
