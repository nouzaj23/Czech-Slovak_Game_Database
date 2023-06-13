import { DataSource } from 'typeorm'
import { Session } from '@/entities'

export function getRepository(dataSource: DataSource) {
  return dataSource.getRepository(Session)
}
