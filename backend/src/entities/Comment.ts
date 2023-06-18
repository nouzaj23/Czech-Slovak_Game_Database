import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm'

import { Base } from './Base.js'
import { Game } from './Game.js'
import { User } from './User.js'

@Entity()
@Tree('closure-table')
export class Comment extends Base {
  @ManyToOne(() => Game, (game: Game) => game.comments)
  game!: Relation<Game>

  @ManyToOne(()=> User, (user: User) => user.comments)
  commenter!: Relation<User>

  @RelationId((comment: Comment) => comment.commenter)
  commenterId!: string

  @RelationId((comment: Comment) => comment.game)
  gameId!: string

  @Column()
  content!: string

  @TreeParent()
  replyTo!: Comment | null

  @TreeChildren()
  replies!: Comment[]
}
