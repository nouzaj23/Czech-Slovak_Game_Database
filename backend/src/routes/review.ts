import { Context } from '@/context'

import Express from 'express'
import { makeUserAuthMiddleware } from '@/middleware'
import { NotLoggedIn, SystemError } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.all('*', (req, res, next) => {
    throw new SystemError('Not implemented')
  })
  // router.route('/')
  //   .get(async (req, res, next) => {
  //     try {
  //       const reviews = await context.controllers.review.findByGameId((req.params as any).gameId)
  //       res.json(reviews)
  //     } catch (error) {
  //       next(error)
  //     }
  //   })
  //   .post(makeUserAuthMiddleware((req) => req.body.userId))
  //   .post(async (req, res, next) => {
  //     try {
  //       const review = await context.controllers.review.create((req.params as any).gameId, req.body)
  //       res.json(review)
  //     } catch (error) {
  //       next(error)
  //     }
  //   })

  // router.route('/:reviewId')
  //   .get(async (req, res, next) => {
  //     try {
  //       const review = await context.controllers.review.read(req.params.reviewId)
  //       res.json(review)
  //     } catch (error) {
  //       next(error)
  //     }
  //   })
  //   .patch(async (req, res, next) => {
  //     try {
  //       const userId = req.session.auth?.userId
  //       if (!userId)
  //         throw new NotLoggedIn()

  //       const review = await context.controllers.review.update(req.params.reviewId, userId, req.body)
  //       res.json(review)
  //     } catch (error) {
  //       next(error)
  //     }
  //   })

  return router
}