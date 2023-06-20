import { Context, Enviroment } from '@/context'
import * as Errs from '@/errors'

import { Request, Response, NextFunction } from 'express'

export function makeErrorMiddleware(context: Context) {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    const stack = true ? { stack: error.stack } : null;
    console.error(error)
    if (error instanceof Errs.RequestError) {
      if (error instanceof Errs.InvalidData)
        res.status(error.status).json({ error: error.message, ...stack, original: error.original })
      else if (error instanceof Errs.InsufficientPermissions)
        res.status(error.status).json({ error: error.message, ...stack, aditionalMsg: error.aditionalMsg })
      else
        res.status(error.status).json({ error: error.message, ...stack })
    } else if (error instanceof Errs.SystemError) {
      res.status(error.status).json({ error: error.message, ...stack })
    } else {
      res.status(500).json({ error: 'Unknown Server Error', ...stack })
    }
  }
}