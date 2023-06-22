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

  @OneToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.user, { cascade: true })
  wishlist!: Relation<Wishlist>[]

  @OneToMany(() => Comment, (comment: Comment) => comment.commenter, { cascade: true })
  comments!: Relation<Comment>[]

  @OneToMany(() => Review, (review: Review) => review.user, { cascade: true })
  reviews!: Relation<Review>[]

  get public() {
    return {
      id: this.id,
      username: this.username,
      avatar: this.avatar,
      bio: this.bio,
      reviews: this.reviews,
      comments: this.comments,
      wishlist: this.wishlist
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
