import { makeRouter as makeWishlistRouter } from './wishlist.js'

import { Context } from '@/context'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.post('/', async (req, res, next) => {
    try {
      const user = await context.controllers.user.create(req.body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })

  router.route('/:userId')
    .get(async (req, res, next) => {
      try {
        const user = await context.controllers.user.read(req.params.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })
    .put(makeUserAuthMiddleware((req) => req.params.userId))
    .put(async (req, res, next) => {
      try {
        const user = await context.controllers.user.update(req.params.userId, req.body)
        res.json(user)
      } catch (error) {
        next(error)
      }

    })
    .delete(makeUserAuthMiddleware((req) => req.params.userId))
    .delete(async (req, res, next) => {
      try {
        const user = await context.controllers.user.delete(req.params.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:userId/auth')
    .all(makeUserAuthMiddleware((req) => req.params.userId))
    .get(async (req, res, next) => {
      try {
        const user = await context.controllers.user.readAuth(req.params.userId)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })
    .put(async (req, res, next) => {
      try {
        const user = await context.controllers.user.updateAuth(req.params.userId, req.body)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })
  
  router.use('/:userId/wishlist', makeWishlistRouter(context))

  return router
}
