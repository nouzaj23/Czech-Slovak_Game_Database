import 'reflect-metadata'
import { dataSource } from './ormconfig.js'

import { Context, Enviroment as Environment } from '@/context'
import { getRepositories } from '@/repositories'
import { makeRouter } from '@/routes'
import { getControllers } from '@/controllers'
import { makeErrorMiddleware } from './middleware/error.js'


import { config as configEnv } from 'dotenv'
import { TypeormStore } from 'connect-typeorm'
import { env } from 'process'
import Express from 'express'
import Session from 'express-session'
import cors from 'cors'
import * as process from 'process'

if (!process.env.NODE_ENV)
  configEnv()

const enviroment: Environment = Environment[env.NODE_ENV as keyof typeof Environment] || Environment.development

console.log(`starting in ${enviroment} mode`)

if (!env.SESSION_SECRET)
  throw new Error('SESSION_SECRET not set')
const sessionSecret: string = env.SESSION_SECRET

const repositories = getRepositories(dataSource)
const controllers = getControllers(repositories)

const context: Context = {
  enviroment,
  dataSource,
  repositories,
  controllers,
  app: Express(),
}

await context.dataSource.initialize()

context.app.use(Express.json())
context.app.set('trust proxy', true)

context.app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}))

context.app.use(Session({
  store: new TypeormStore({
    cleanupLimit: 2,
    onError: (store: TypeormStore, error: Error) => {
      throw error // For now this is the best solution I can think of
    }
  }).connect(context.dataSource.getRepository('Session')),
  resave: true,
  saveUninitialized: false,
  secret: sessionSecret,
  proxy: true,
  cookie: {
    secure: true,
    signed: true,
  }
}))

context.app.use(makeRouter(context))

context.app.use(makeErrorMiddleware(context))

context.app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
  console.log(`Expecting FE to be running on ${env.CORS_ORIGIN}`)
})
