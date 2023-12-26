import { Request } from 'express'

import { v4 as uuidv4 } from 'uuid'

// select * from usuarios where dia > 5 and nome like 'asdad' order by freela asc limit 100

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

// INSERT INTO films VALUES
//     ('UA502', 'Bananas', 105, DEFAULT, 'Comedy', '82 minutes');
// INSERT INTO films (code, title, did, date_prod, kind)
//     VALUES ('T_601', 'Yojimbo', 106, DEFAULT, 'Drama');

interface IKeyValueInsert {
  key: string
  value: string
}

export function Insert(table: string, data: Array<IKeyValueInsert>, insert_id: boolean = false) {
  let query = 'insert into'

  query += ' '
  query += table

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

  query += ' '
  query += `(${keys})`

  query += ' '
  query += 'values'

  query += ' '
  query += `(${values})`

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
