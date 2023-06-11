import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  RelationId,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Game } from './Game.js'
import { User } from './User.js'

@Unique(['game', 'user'])
@Entity()
export class Wishlist extends Base {
  @ManyToOne(() => Game)
  game!: Relation<Game>

  @ManyToOne(() => User, (user: User) => user.wishlist)
  user!: Relation<User>
 
  @RelationId((wishlist: Wishlist) => wishlist.game)
  gameId!: string

  @RelationId((wishlist: Wishlist) => wishlist.user)
  userId!: string
}
