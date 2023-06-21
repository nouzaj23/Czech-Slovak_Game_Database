import { Context } from '@/context'

import Express from 'express'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'
import { NotLoggedIn, SystemError } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const genres = await context.controllers.genre.readMultiple({...req.params, ...req.body, ...req.query}, req.session.auth?.userId)
        res.json(genres)
      } catch (error) {
        next(error)
      }
    })
    .post(makeUserAuthMiddleware((req) => req.body.userId))
    .post(async (req, res, next) => {
      try {
        const genre = await context.controllers.genre.create({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(genre)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      try {
        const genre = await context.controllers.genre.readSingle({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(genre)
      } catch (error) {
        next(error)
      }
    })
    .patch(makeAdminAuthMiddleware())
    .patch(async (req, res, next) => {
      try {
        const userId = req.session.auth?.userId
        if (!userId)
          throw new NotLoggedIn()

        const genre = await context.controllers.genre.update({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(genre)
      } catch (error) {
        next(error)
      }
    })
    .delete(makeAdminAuthMiddleware())
    .delete(async (req, res, next) => {
      try {
        const genre = await context.controllers.genre.delete({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(genre)
      }
      catch (error) {
        next(error)
      }
    })

  return router
}