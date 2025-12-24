import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '../generated/prisma/client.js'
import { config } from './config.js'

const prismaDbUrl = config.database_url
const pool = new Pool({
    connectionString: prismaDbUrl,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
})
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })