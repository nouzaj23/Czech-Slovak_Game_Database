import { boolean } from 'zod';
import { type Context } from '@/context'
import { SessionExpired, NotLoggedIn, InsufficientPermissions, AlreadyLoggedIn } from '@/errors'

import { Request, Response } from 'express'
import { Session } from 'express-session'

declare module 'express-session' {
  interface SessionData {
    auth?: {
      userId: string
      isAdmin: boolean
    };
  }
}

function isAuthenticated(req: Request): boolean {
  return !!req.session.auth
}

function isAdmin(req: Request): boolean {
  return !!req.session.auth?.isAdmin
}

function isUser(req: Request, getter: (_: Request) => string): boolean {
  return req.session.auth?.userId === getter(req)
}

export function makeAuthMiddleware() {
  return (req: Request, res: Response, next: any) => {
    if (!isAuthenticated(req))
      next(new NotLoggedIn())

    else
      next()
  }
}

export function makeAdminAuthMiddleware() {
  return (req: Request, res: Response, next: any) => {
    if (!isAuthenticated(req))
      next(new NotLoggedIn())

    else if (!isAdmin(req))
      next(new InsufficientPermissions())

    else
      next()

  }
}

export function makeUserAuthMiddleware(getter: (_: Request) => string) {
  return (req: Request, res: Response, next: any) => {
    if (!isAuthenticated(req))
      next(new NotLoggedIn())

    else if (isAdmin(req) || isUser(req, getter))
      next()

    else
      next(new InsufficientPermissions())

  }
}

export function makeNoneAuthMiddleware() {
  return (req: Request, res: Response, next: any) => {
    if (!isAuthenticated(req))
      next()
    else
      next(new AlreadyLoggedIn())
  }
}