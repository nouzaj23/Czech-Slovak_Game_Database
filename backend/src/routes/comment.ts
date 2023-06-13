import { Context } from '@/context'
import { makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'
import { NotLoggedIn } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const comments = await context.controllers.comment.findByGameId((req.params as any).gameId)
        res.json(comments)
      } catch (error) {
        next(error)
      }
    })
    .post(makeUserAuthMiddleware((req) => req.body.userId))
    .post(async (req, res, next) => {
      try {
        const comment = await context.controllers.comment.create((req.params as any).gameId, req.body)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:commentId')
    .get(async (req, res, next) => {
      try {
        const comment = await context.controllers.comment.read(req.params.commentId)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })
    .put(async (req, res, next) => {
      try {
        const userId = req.session.auth?.userId
        if (!userId)
          throw new NotLoggedIn()

        const comment = await context.controllers.comment.update(req.params.commentId, userId, req.body)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })

  return router
}