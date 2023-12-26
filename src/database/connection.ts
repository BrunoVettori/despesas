import { Pool } from 'pg'

require('dotenv').config()

// Use this as default connection
export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionTimeoutMillis: 600000,
  idleTimeoutMillis: 600000,
  max: 20,
})
