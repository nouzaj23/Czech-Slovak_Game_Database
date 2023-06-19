import * as comment from './comment.js'
import * as developer from './developer.js'
import * as game from './game.js'
import * as genre from './genre.js'
import * as review from './review.js'
// import * as session from './session.js'
import * as user from './user.js'
import * as auth from './auth.js'

import { Context } from '@/context'

import { Router } from 'express'

export function makeRouter(context: Context) {
  const router = Router({ mergeParams: true })

  router.use('/comment', comment.makeRouter(context))
  router.use('/developer', developer.makeRouter(context))
  router.use('/game', game.makeRouter(context))
  router.use('/genre', genre.makeRouter(context))
  router.use('/review', review.makeRouter(context))
  // router.use('/session', session.makeRouter(context))
  router.use('/user', user.makeRouter(context))
  router.use('/auth', auth.makeRouter(context))

  return router
}
