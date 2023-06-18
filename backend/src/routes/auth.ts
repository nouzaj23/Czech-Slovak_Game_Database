import { Context } from '@/context'

import Express from 'express'

export function makeRouter(context: Context) {
  const router = Express.Router({ mergeParams: true });

  router.get('/', async (req, res) => {
    if (req.session.auth)
      res.status(200).json({
        userId: req.session.auth.userId,
        isAdmin: req.session.auth.isAdmin,
      })
    else
      res.status(401).json({
        message: 'Not logged in'
      })
  })

  router.post('/', async (req, res) => {
    const user = await context.controllers.user.login({...req.params, ...req.body}, req.session.auth?.userId)
    if (user) {
      req.session.auth = {
        userId: user.id,
        isAdmin: user.isAdmin,
      }
      res.status(200).send()
    } else
      res.status(401).json({
        message: 'Invalid username or password'
      })
  })

  router.delete('/', async (req, res) => {
    req.session.destroy(err => {
      if (err)
        res.status(500).json({
          message: 'Internal server error'
        })
      else
        res.status(200).send()
    })
  })

  return router
}
