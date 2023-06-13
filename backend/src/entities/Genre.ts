import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Game } from './Game.js'

@Entity()
export class Genre extends Base {
  @Column()
  name!: string

  @Column()
  description!: string

  @ManyToMany(() => Game, (game: Game) => game.genres)
  @JoinTable()
  games!: Relation<Game>[]
}
