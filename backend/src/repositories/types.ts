import { Comment, Review, Wishlist } from "@/entities"

export type UUID = string
export type URL = string

export type OrderType = 'ASC' | 'DESC'

export type Resolvable<T> = T | UUID

export interface CommentReadSingleData {
  id: UUID
  recurse?: boolean
}

export interface CommentReadSingleResult {
  id: UUID
  gameId: UUID
  commenter?: UserPublic
  content?: string
  replyToId?: UUID
  replies: CommentReadSingleResult[]
  createdAt: Date
  updatedAt?: Date
}

export interface CommentReadMultipleData {
  ids?: UUID[]
  gameId?: UUID
  userId?: UUID
  replyToId?: UUID | null
  recurse?: boolean
  order?: {
    createdAt?: OrderType
    updatedAt?: OrderType
  }
  groupBy?: 'game' | 'user'
}

export interface CommentCreationData {
  userId: UUID
  gameId: UUID
  content: string
  replyTo?: string
}

export interface CommentUpdateData {
  id: UUID
  content: string
}

export interface CommentDeleteData {
  id: UUID
}

export interface DeveloperReadSingleData {
  id: UUID
}

export interface DeveloperReadMultipleData {
  ids?: UUID[]
  nameContains?: string
  order?: {
    name?: OrderType
  },
  groupBy?: 'game'
}

export interface DeveloperCreationData {
  name: string
  description: string
  avatar?: URL
  isStudio: boolean
}

export interface DeveloperUpdateData {
  id: UUID
  name?: string
  description?: string
  avatar?: URL
  isStudio?: boolean
}

export interface DeveloperDeleteData {
  id: UUID
}

export interface GameReadSingleData {
  id: UUID
}

export interface GameReadMultipleData {
  ids?: UUID[]
  nameContains?: string
  developerId?: UUID
  genreId?: UUID
  releaseDate?: {
    from?: Date
    to?: Date
  }
  order?: {
    name?: OrderType
    releaseDate?: OrderType
  }
  groupBy?: 'developer' | 'genre'
}

export interface GameCreationData {
  name: string
  description: string
  releaseDate?: Date
  cover: URL
  developerIds?: UUID[]
  genreIds?: UUID[]
  photos?: URL[]
  videos?: URL[]
}

export interface GameUpdateData {
  id: UUID
  name?: string
  description?: string
  releaseDate?: Date
  cover?: URL
  developerIds?: UUID[]
  genreIds?: UUID[]
  photos?: URL[]
  videos?: URL[]
}

export interface GameDeleteData {
  id: UUID
}

export interface GenreReadSingleData {
  id: UUID
}

export interface GenreReadMultipleData {
  ids?: UUID[]
  nameContains?: string
  order?: {
    name?: OrderType
  }
}

export interface GenreCreationData {
  name: string
  description: string
}

export interface GenreUpdateData {
  id: UUID
  name?: string
  description?: string
}

export interface GenreDeleteData {
  id: UUID
}

export interface ReviewReadSingleData {
  id: UUID
}

export interface ReviewReadMultipleData {
  ids?: UUID[]
  gameId?: UUID
  userId?: UUID
  order?: {
    rating?: OrderType
    createdAt?: OrderType
    updatedAt?: OrderType
  }
  groupBy?: 'game' | 'user'
}

export interface ReviewCreationData {
  userId: UUID
  gameId: UUID
  rating: number
  text: string
  title: string
}

export interface ReviewUpdateData {
  id: UUID
  rating?: number
  content?: string
  title?: string
}

export interface ReviewDeleteData {
  id: UUID
}

export interface UserReadSingleData {
  id: UUID
}

export interface UserReadMultipleData {
  ids?: UUID[]
  usernameContains?: string
  order?: {
    username?: OrderType
    createdAt?: OrderType
    updatedAt?: OrderType
  }
}

export interface UserCreationData {
  username: string
  email: string
  password: string
}

export interface UserLoginData {
  email?: string
  username?: string
  password: string
}

export interface UserUpdateAuthData {
  id: UUID
  username?: string
  email?: string
  password?: string
}

export interface UserUpdateData {
  id: UUID
  avatar?: URL
  bio?: string
}

export interface UserPublic {
  id: UUID
  username: string
  avatar: URL | null
  bio: string | null
  reviews: Resolvable<Review>[]
  comments: Resolvable<Comment>[]
  wishlist: Resolvable<Wishlist>[]
}

export interface UserDeleteData {
  id: UUID
}

export interface WishlistReadSingleData {
  userId: UUID
  gameId: UUID
}

export interface WishlistReadMultipleData {
  ids?: UUID[]
  userId?: UUID
  gameId?: UUID
  order?: {
    createdAt?: OrderType
  }
  groupBy?: 'game' | 'user'
}

export interface WishlistCreationData {
  userId: UUID
  gameId: UUID
}

export interface WishlistDeleteData {
  userId: UUID
  gameId: UUID
}
