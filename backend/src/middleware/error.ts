import { Context, Enviroment } from '@/context'
import * as Errs from '@/errors'

import { Request, Response, NextFunction } from 'express'

export function makeErrorMiddleware(context: Context) {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    const stack = context.enviroment === Enviroment.development ? { stack: error.stack } : null;
    if (error instanceof Errs.RequestError) {
      res.status(error.status).json({ error: error.message, ...stack })
    } else if (error instanceof Errs.SystemError) {
      res.status(error.status).json({ error: error.message, ...stack })
    } else {
      res.status(500).json({ error: 'Unknown Server Error', ...stack })
    }
  }
}