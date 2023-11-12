import prisma from "./database/prisma";
import Token from "./auth/Token";
import bcrypt from "bcrypt";

import { Request, Response, response } from "express";

async function Login(req: Request, res: Response) {
  const senha = req.body.senha;

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Sistema não configurado");
  }

  const token = new Token(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

  const user = await prisma.usuario.findMany({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return response.status(401).json("Usuário não encontrado");
  }

  console.log(user);

  // if (user && user.senha) {
  //   if (await bcrypt.compare(senha, user.senha)) {
  //     delete user.senha;

  //     user.schema = req.body.schema;

  //     return res.json(token.create(user));
  //   }
  // }

  return false;
}

export default Login;
