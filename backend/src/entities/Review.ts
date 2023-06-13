import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Game } from './Game.js'
import { User } from './User.js'

@Entity()
export class Review extends Base {
  @ManyToOne(() => Game, (game: Game) => game.comments)
  game!: Relation<Game>

  @ManyToOne(() => User, (user: User) => user.comments)
  user!: Relation<User>

  @Column()
  title!: string

  @Column()
  text!: string

  @Column()
  rating!: number
}
