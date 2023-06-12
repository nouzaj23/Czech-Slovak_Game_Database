import { type Repositories } from '@/repositories'
import { type Controllers } from '@/controllers'
import { Application } from 'express'
import { DataSource } from 'typeorm'

export enum Enviroment {
  development = 'development',
  production = 'production',
}

export interface Context {
  enviroment: Enviroment
  dataSource: DataSource
  repositories: Repositories
  controllers: Controllers
  app: Application
}
