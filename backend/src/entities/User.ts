import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Relation
} from 'typeorm'

import { Base } from './Base.js'
import { Comment } from './Comment.js'
import { Review } from './Review.js'
import { Wishlist } from './Wishlist.js'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  username!: string

  @Column({ unique: true })
  email!: string

  @Column()
  hash!: string

  @Column({type: 'text',  nullable: true })
  avatar!: string | null

  @Column({type: 'text',  nullable: true })
  bio!: string | null

  @Column()
  isAdmin!: boolean

  @ManyToOne(() => Wishlist, (wishlist: Wishlist) => wishlist.user)
  wishlist!: Relation<Wishlist>[]

  @OneToMany(() => Comment, (comment: Comment) => comment.commenter)
  comments!: Relation<Comment>[]

  @OneToMany(() => Review, (review: Review) => review.user)
  reviews!: Relation<Review>[]

  get public() {
    return {
      username: this.username,
      avatar: this.avatar,
      bio: this.bio
    }
  }

  get auth() {
    return {
      username: this.username,
      email: this.email,
      hash: this.hash
    }
  }
}
