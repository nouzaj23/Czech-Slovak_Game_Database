import { Context } from '@/context'
import { makeAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'
import { NotLoggedIn } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const comments = await context.controllers.comment.readMultiple({...req.params, ...req.body, ...req.query}, req.session.auth?.userId)
        res.status(200).json(comments)
      } catch (error) {
        next(error)
      }
    })
    .post(makeUserAuthMiddleware((req) => req.body.userId))
    .post(async (req, res, next) => {
      try {
        const comment = await context.controllers.comment.create({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      try {
        const comment = await context.controllers.comment.readSingle({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })
    .patch(makeAuthMiddleware())
    .patch(async (req, res, next) => {
      try {
        const userId = req.session.auth?.userId
        if (!userId)
          throw new NotLoggedIn()

        const comment = await context.controllers.comment.update({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(comment)
      } catch (error) {
        next(error)
      }
    })
    .delete(makeAuthMiddleware())
    .delete(async (req, res, next) => {
      try {
        const comment = await context.controllers.comment.delete({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(comment)
      }
      catch (error) {
        next(error)
      }
    })

  return router
}