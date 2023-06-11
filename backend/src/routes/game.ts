import { makeRouter as makeReviewRouter } from './review.js'
import { makeRouter as makeCommentRouter } from './comment.js'

import { Context } from '@/context'

import Express from 'express'
import { makeAdminAuthMiddleware } from '@/middleware'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .post(makeAdminAuthMiddleware())
    .post(async (req, res, next) => {
      try {
        const game = await context.controllers.game.create(req.body)
        res.json(game)
      } catch (error) {
        next(error)
      }
    })
    .get(async (req, res, next) => {
      try {
        const games = await context.controllers.game.read()
        res.json(games)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:gameId')
    .get(async (req, res, next) => {
      try {
        const game = await context.controllers.game.read(req.params.gameId)
        res.json(game)
      } catch (error) {
        next(error)
      }
    })
    .put(makeAdminAuthMiddleware())
    .put(async (req, res, next) => {
      try {
        const game = await context.controllers.game.update(req.params.gameId, req.body)
        res.json(game)
      } catch (error) {
        next(error)
      }
    })
    .delete(makeAdminAuthMiddleware())
    .delete(async (req, res, next) => {
      try {
        const game = await context.controllers.game.delete(req.params.gameId)
        res.json(game)
      } catch (error) {
        next(error)
      }
    })
  
  router.use('/:gameId/review', makeReviewRouter(context))
  router.use('/:gameId/comment', makeCommentRouter(context))

  return router
}