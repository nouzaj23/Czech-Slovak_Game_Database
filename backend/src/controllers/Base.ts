import type { Repositories } from '@/repositories'
import { undefined } from 'zod';

export const saltRounds: number = 10

export class Base {
  protected readonly repositories: Repositories

  constructor(repositories: Repositories) {
    this.repositories = repositories
  }
}

type DeepRequired<T> = {
  [P in keyof T]-?: Required<T[P]> extends object ? DeepRequired<Required<T[P]>> : Required<T[P]>;
};

export type IsSame<Data, Ethalon> = DeepRequired<Data> extends DeepRequired<Ethalon> ? (DeepRequired<Ethalon> extends DeepRequired<Data> ? Data : never) : never

export function assertSameType<Data, Ethalon>(data: IsSame<Data, Ethalon>): Ethalon {
  return data as Ethalon
}

