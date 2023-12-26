import { Request, Response, response } from 'express'

export async function create(req: Request, res: Response) {
  const response = await create({
    data: req.body,
  })

  return res.json(response)
}

export async function read(req: Request, res: Response) {
  const response = await prisma_client.findMany({
    where: req.body,
  })

  return res.json(response)
}

export async function update(req: Request, res: Response) {
  const id = req.body.id

  delete req.body.id

  const response = await prisma_client.update({
    where: {
      id: id,
    },
    data: req.body,
  })

  return res.json(response)
}

export async function remove(req: Request, res: Response) {
  const id = req.body.id

  delete req.body.id

  const response = await prisma_client.delete({
    where: {
      id: id,
    },
    data: req.body,
  })

  return res.json(response)
}
