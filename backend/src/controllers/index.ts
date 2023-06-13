import { Comment as CommentController } from './Comment.js'
import { Developer as DeveloperController } from './Developer.js'
import { Game as GameController } from './Game.js'
import { Genre as GenreController } from './Genre.js'
import { Review as ReviewController } from './Review.js'
import { User as UserController } from './User.js'
import { Wishlist as WishlistController } from './Wishlist.js'

import { Repositories } from '@/repositories'

export function getControllers(repositories: Repositories) {
  return {
    comment: new CommentController(repositories),
    developer: new DeveloperController(repositories),
    game: new GameController(repositories),
    genre: new GenreController(repositories),
    review: new ReviewController(repositories),
    user: new UserController(repositories),
    wishlist: new WishlistController(repositories),
  }
}

export type Controllers = ReturnType<typeof getControllers>
