import { Context } from '@/context'

import Express from 'express'
import { makeAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'
import { NotLoggedIn, SystemError } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const reviews = await context.controllers.review.readMultiple({...req.params, ...req.body, ...req.query}, req.session.auth?.userId)
        res.json(reviews)
      } catch (error) {
        next(error)
      }
    })
    .post(makeUserAuthMiddleware((req) => req.body.userId))
    .post(async (req, res, next) => {
      try {
        const review = await context.controllers.review.create({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(review)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      try {
        const review = await context.controllers.review.readSingle({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(review)
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

        const review = await context.controllers.review.update({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(review)
      } catch (error) {
        next(error)
      }
    })
    .delete(makeAuthMiddleware())
    .delete(async (req, res, next) => {
      try {
        const review = await context.controllers.review.delete({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(review)
      }
      catch (error) {
        next(error)
      }
    })

  return router
}