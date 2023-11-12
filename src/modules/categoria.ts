import { Request, Response } from "express";

class Crud {
  public async create(req: Request, res: Response, prisma_client: any) {
    const response = await prisma_client.create({
      data: req.body,
    });

    return res.json(response);
  }

  public async read(req: Request, res: Response, prisma_client: any) {
    const response = await prisma_client.findMany({
      where: req.body,
    });

    return res.json(response);
  }

  public async update(req: Request, res: Response, prisma_client: any) {
    const categoria = req.body.categoria;

    delete req.body.categoria;

    const response = await prisma_client.update({
      where: {
        categoria: categoria,
      },
      data: req.body,
    });

    return res.json(response);
  }

  public async delete(req: Request, res: Response, prisma_client: any) {
    const response = await prisma_client.delete({
      where: {
        categoria: req.body.categoria,
      },
    });

    return res.json(response);
  }
}

export default Crud;
