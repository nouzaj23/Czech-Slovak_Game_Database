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
  [P in keyof T]-?: Required<T[P]> extends object ? DeepRequired<Required<T[P]>> : Required<T[P]>
};

export type OptionalKeys<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]

export type OptionalProperties<T> = Pick<T, OptionalKeys<T>>

export type HasSameOptionalProperties<Data, Ethalon> = OptionalProperties<Data> extends OptionalProperties<Ethalon> ? (OptionalProperties<Ethalon> extends OptionalProperties<Data> ? Data : never) : never

export type HasSameProperties<Data, Ethalon> = DeepRequired<Data> extends DeepRequired<Ethalon> ? (DeepRequired<Ethalon> extends DeepRequired<Data> ? Data : never) : never

export type IsSame<Data, Ethalon> = HasSameOptionalProperties<Data, Ethalon> extends never ? never : (HasSameProperties<Data, Ethalon> extends never ? never : Data)

export function assertSameType<Data, Ethalon>(data: IsSame<Data, Ethalon>): Ethalon {
  return data as Ethalon
}

