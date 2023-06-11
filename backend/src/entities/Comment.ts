import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Game } from './Game.js'
import { User } from './User.js'

@Entity()
export class Comment extends Base {
  @ManyToOne(() => Game, (game: Game) => game.comments)
  game!: Relation<Game>

  @ManyToOne(()=> User, (user: User) => user.comments)
  commenter!: Relation<User>

  @Column()
  content!: string

  @ManyToOne(() => Comment, (comment: Comment) => comment.replies, { nullable: true })
  replyTo!: Comment | null

  @OneToMany(() => Comment, (comment: Comment) => comment.replyTo)
  replies!: Comment[]
}
