import { DataSource } from 'typeorm'
import { config as configEnv } from 'dotenv'
import { env, cwd } from 'process'

if (!env.NODE_ENV)
  configEnv()

const entitiesPath = cwd() + '/dist/entities/*.{js,ts}'
const migrationsPath = cwd() + '/dist/migrations/*.{js,ts}'

export const dataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  migrationsRun: true,
})
