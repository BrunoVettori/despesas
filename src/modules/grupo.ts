import { Request, Response } from 'express'
import { ParseRequestBody, Select, Insert, Update, Remove } from '@src/database/query_builder'
import { pool } from '@database/connection'

export async function create(req: Request, res: Response) {
  const body = ParseRequestBody(req)

  const query = Insert('usuario', body, true)

  const query_result = await pool.query(query)

  return res.status(201).json(query_result.rows)
}

export async function read(req: Request, res: Response) {
  const query = Select({ table: 'usuario' })

  const query_result = await pool.query(query)

  return res.status(200).json(query_result.rows)
}

export async function update(req: Request, res: Response) {
  const id = req.body.id
  delete req.body.id

  const body = ParseRequestBody(req)

  const query = Update('usuario', body, { field: 'id', value: id })

  console.log('query', query)

  const query_result = await pool.query(query)

  return res.status(200).json(query_result.rows)
}

export async function remove(req: Request, res: Response) {
  const id = req.body.id

  const query = Remove('usuario', { field: 'id', value: id })

  console.log('query', query)

  const query_result = await pool.query(query)

  return res.status(200).json(query_result.rows)
}
