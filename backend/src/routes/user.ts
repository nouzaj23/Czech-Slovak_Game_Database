import { makeRouter as makeWishlistRouter } from './wishlist.js'

import { Context } from '@/context'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })
  router.route('/')
    .get(makeAdminAuthMiddleware())
    .get(async (req, res, next) => {
      try {
        const users = await context.controllers.user.readMultiple({ ...req.params, ...req.body, ...req.query }, req.session.auth?.userId)
        res.json(users)
      } catch (error) {
        next(error)
      }
    })
    .post(async (req, res, next) => {
      try {
        const user = await context.controllers.user.create({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      try {
        const user = await context.controllers.user.readSingle({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })
    .patch(makeUserAuthMiddleware((req) => req.params.id))
    .patch(async (req, res, next) => {
      try {
        const user = await context.controllers.user.update({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }

    })
    .delete(makeUserAuthMiddleware((req) => req.params.id))
    .delete(async (req, res, next) => {
      try {
        const user = await context.controllers.user.delete({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id/auth')
    .all(makeUserAuthMiddleware((req) => req.params.id))
    .get(async (req, res, next) => {
      try {
        const user = await context.controllers.user.readSingleFull({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })
    .patch(async (req, res, next) => {
      try {
        const user = await context.controllers.user.updateAuth({ ...req.params, ...req.body }, req.session.auth?.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })

  router.use('/:userId/wishlist', makeWishlistRouter(context))

  return router
}
