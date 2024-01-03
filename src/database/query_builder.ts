import { Request } from 'express'

import { v4 as uuidv4 } from 'uuid'

interface ISelect {
  fields?: Array<string>
  table: string
  where?: Array<string>
  order_field?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export function Select({ fields, table, where, order_field, order, limit }: ISelect) {
  let query = 'select'

  if (fields) {
    fields.forEach((field, index) => {
      query += ' '
      if (index != 0) query += ','
      query += field
    })
  } else {
    query += ' '
    query += '*'
  }

  query += ' '

  query += `from ${table}`

  return query
}

interface IKeyValue {
  key: string
  value: string
}

export function Insert(table: string, data: Array<IKeyValue>, insert_id: boolean = false) {
  let query = `insert into ${table}`

  let keys = ''
  let values = ''

  data.forEach((data_item) => {
    if (keys !== '') keys += ','
    if (values !== '') values += ','
    keys += data_item.key
    values += `'${data_item.value}'`
  })

  if (insert_id) {
    keys = `id, ${keys}`
    values = `'${uuidv4()}', ${values}`
  }

  query += ` (${keys}) values (${values})`

  query += ' returning *'

  return query
}

export function Update(table: string, data: Array<IKeyValue>, where: { field: string; value: string }) {
  let query = `update ${table} set`

  data.forEach((item, index) => {
    if (index !== 0) query += ','
    query += ` ${item.key} = '${item.value}'`
  })

  query += ` where ${where.field} = '${where.value}'`

  query += ' returning *'

  return query
}

export function Remove(table: string, where: { field: string; value: string }) {
  let query = `delete from ${table}`

  query += ` where ${where.field} = '${where.value}'`

  query += ' returning *'

  return query
}

export function ParseRequestBody(request: Request): Array<{ key: string; value: string } | any> {
  let parsed_body = []

  for (const [key, value] of Object.entries(request.body)) {
    parsed_body.push({ key, value })
  }

  return parsed_body
}
