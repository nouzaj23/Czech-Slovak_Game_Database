import { Context } from '@/context'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .post(makeUserAuthMiddleware((req) => req.params.userId))
    .post(async (req, res, next) => {
      try {
        const wishlist = await context.controllers.wishlist.addToWishlist({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(wishlist)
      } catch (error) {
        next(error)
      }
    })
    .get(async (req, res, next) => {
      try {
        const wishlists = await context.controllers.wishlist.readMultiple({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(wishlists)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:gameId')
    .all(makeUserAuthMiddleware((req) => req.params.userId))
    .delete(async (req, res, next) => {
      try {
        const wishlist = await context.controllers.wishlist.removeFromWishlist({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(wishlist)
      } catch (error) {
        next(error)
      }
    })

  return router
}