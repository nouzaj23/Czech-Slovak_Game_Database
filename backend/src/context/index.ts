import { type Repositories } from '@/repositories'
import { type Controllers } from '@/controllers'
import { Application } from 'express'
import { DataSource } from 'typeorm'

export enum Enviroment {
  Development = 'development',
  Production = 'production',
}

export interface Context {
  enviroment: Enviroment
  dataSource: DataSource
  repositories: Repositories
  controllers: Controllers
  app: Application
}
