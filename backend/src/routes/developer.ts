import { Context } from '@/context'

import Express from 'express'
import { makeAdminAuthMiddleware, makeUserAuthMiddleware } from '@/middleware'
import { NotLoggedIn, SystemError } from '@/errors'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true })

  router.route('/')
    .get(async (req, res, next) => {
      try {
        const developers = await context.controllers.developer.readMultiple({...req.params, ...req.body, ...req.query}, req.session.auth?.userId)
        res.json(developers)
      } catch (error) {
        next(error)
      }
    })
    .post(makeUserAuthMiddleware((req) => req.body.userId))
    .post(async (req, res, next) => {
      try {
        const developer = await context.controllers.developer.create({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(developer)
      } catch (error) {
        next(error)
      }
    })

  router.route('/:id')
    .get(async (req, res, next) => {
      try {
        const developer = await context.controllers.developer.readSingle({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(developer)
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

        const developer = await context.controllers.developer.update({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(developer)
      } catch (error) {
        next(error)
      }
    })
    .delete(makeAdminAuthMiddleware())
    .delete(async (req, res, next) => {
      try {
        const developer = await context.controllers.developer.delete({...req.params, ...req.body}, req.session.auth?.userId)
        res.json(developer)
      }
      catch (error) {
        next(error)
      }
    })

  return router
}