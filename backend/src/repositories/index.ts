import * as Comment from './Comment.js'
import * as Developer from './Developer.js'
import * as Game from './Game.js'
import * as Genre from './Genre.js'
import * as Review from './Review.js'
import * as Session from './Session.js'
import * as User from './User.js'
import * as Wishlist from './Wishlist.js'

import { type DataSource } from 'typeorm'

export type Repositories = {
  comment: ReturnType<typeof Comment.getRepository>,
  developer: ReturnType<typeof Developer.getRepository>,
  game: ReturnType<typeof Game.getRepository>,
  genre: ReturnType<typeof Genre.getRepository>,
  review: ReturnType<typeof Review.getRepository>,
  session: ReturnType<typeof Session.getRepository>,
  user: ReturnType<typeof User.getRepository>,
  wishlist: ReturnType<typeof Wishlist.getRepository>,
}

export function getRepositories(dataSource: DataSource): Repositories {
  return {
    comment: Comment.getRepository(dataSource),
    developer: Developer.getRepository(dataSource),
    game: Game.getRepository(dataSource),
    genre: Genre.getRepository(dataSource),
    review: Review.getRepository(dataSource),
    session: Session.getRepository(dataSource),
    user: User.getRepository(dataSource),
    wishlist: Wishlist.getRepository(dataSource),
  }
}
