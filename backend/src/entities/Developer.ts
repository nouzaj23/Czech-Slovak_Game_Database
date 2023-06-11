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
export class Developer extends Base {
  @Column()
  name!: string

  @Column({type: 'text',  nullable: true })
  avatar!: string | null

  @Column()
  description!: string

  @Column()
  isStudio!: boolean

  @ManyToMany(() => Game, (game: Game) => game.developers)
  @JoinTable()
  developed!: Relation<Game>[]
}
