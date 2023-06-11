import { Context } from '@/context'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'

import Express from 'express'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .post(makeUserAuthMiddleware((req) => req.params.userId))
    .post(async (req, res, next) => {
      try {
        const wishlist = await context.controllers.wishlist.addToWishlist((req.params as any).userId as string, req.body)
        res.json(wishlist)
      } catch (error) {
        next(error)
      }
    })
    .get(async (req, res, next) => {
      try {
        const wishlists = await context.controllers.wishlist.readWishlist((req.params as any).userId)
        res.json(wishlists)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:gameId')
    .all(makeUserAuthMiddleware((req) => req.params.userId))
    .delete(async (req, res, next) => {
      try {
        const wishlist = await context.controllers.wishlist.removeFromWishlist((req.params as any).userId, req.params.gameId)
        res.json(wishlist)
      } catch (error) {
        next(error)
      }
    })

  return router
}