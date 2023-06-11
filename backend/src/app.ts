import 'reflect-metadata'

import { Context, Enviroment } from '@/context'
import { getRepositories } from '@/repositories'
import { makeRouter } from '@/routes'
import { getControllers } from '@/controllers'

import { config as configEnv } from 'dotenv'
import { DataSource } from 'typeorm'
import { TypeormStore } from 'connect-typeorm'
import { env } from 'process'
import Express from 'express'
import Session from 'express-session'
import * as process from 'process'

configEnv()

const enviroment: Enviroment = env.NODE_ENV as Enviroment || Enviroment.Development
const dataSource
  = enviroment === Enviroment.Production
    ? new DataSource({
      type: 'postgres',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [__dirname + '/dist/entities/*.{js,ts}'],
    })
    : new DataSource({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      entities: [process.cwd() + '/dist/entities/*.{js,ts}'],
    })

console.log(process.cwd() + '/dist/entities/*.{js,ts}')

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
context.app.use(makeRouter(context))
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
}))

context.app.listen(3000, () => {
  console.log('Server running on port 3000')
})
