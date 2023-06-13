import type { Repositories } from '@/repositories'

export const saltRounds: number = 10

export class Base {
  protected readonly repositories: Repositories

  constructor (repositories: Repositories) {
    this.repositories = repositories
  }
}
