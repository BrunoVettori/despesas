import { sign, verify } from 'jsonwebtoken'

export function create(secret: string, expiresIn: string, data: any): string {
  const token = sign({ data: data }, secret, {
    expiresIn: expiresIn,
  })

  return token
}

export function token_verify(secret: string, expiresIn: string, token: string): any {
  if (token.includes('Bearer')) {
    token = token.replace('Bearer ', '')
  }

  const token_verify = verify(token, secret)

  return token_verify
}

export function refresh(secret: string, expiresIn: string, token: string): string {
  const token_verify: any = verify(token, secret)

  const new_token = sign({ data: token_verify['data'] }, secret, {
    expiresIn: expiresIn,
  })

  return new_token
}
