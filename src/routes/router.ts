import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import Login from "../Login";

import prisma from "../database/prisma";
import auth from "../middlewares/auth";
import Categoria from "../modules/categoria";
import Crud from "../modules/Crud";

const routes = Router();
const crud = new Crud();
const categoria = new Categoria();

// Login
routes.get(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      senha: Joi.string().required(),
    }),
  }),
  (req, res) => {
    Login(req, res);
  }
);

// #region Usuario

// Create
routes.post(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      documento: Joi.string().min(11).max(11).required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      salario: Joi.number().required(),
      data_salario: Joi.number(),
    }),
  }),
  (req, res) => {
    crud.create(req, res, prisma.usuario);
  }
);

routes.use(auth);

// Read
routes.get(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      nome: Joi.string(),
      sobrenome: Joi.string(),
      documento: Joi.string().min(11).max(11),
      email: Joi.string(),
      senha: Joi.string(),
      salario: Joi.number(),
      data_salario: Joi.number(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.usuario);
  }
);

// Update
routes.put(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      nome: Joi.string(),
      sobrenome: Joi.string(),
      documento: Joi.string().min(11).max(11),
      email: Joi.string(),
      senha: Joi.string(),
      salario: Joi.number(),
      data_salario: Joi.number(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.usuario);
  }
);

// Delete
routes.delete(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.usuario);
  }
);

// #endregion

// #region Despesas

// Create
routes.post(
  "/despesas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string().required(),
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
      data: Joi.date().required(),
      pagamento: Joi.string().required(),
      usuario_id: Joi.string().required(),
      despesa_conjunta: Joi.bool().required(),
      parcelado: Joi.bool().required(),
      parcelas_id: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.create(req, res, prisma.despesas);
  }
);

// Read
routes.get(
  "/despesas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      categoria: Joi.string(),
      descricao: Joi.string(),
      valor: Joi.number(),
      data: Joi.date(),
      pagamento: Joi.string(),
      usuario_id: Joi.string(),
      despesa_conjunta: Joi.bool(),
      parcelado: Joi.bool(),
      parcelas_id: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.despesas);
  }
);

// Update
routes.put(
  "/despesas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      categoria: Joi.string(),
      descricao: Joi.string(),
      valor: Joi.number(),
      data: Joi.date(),
      pagamento: Joi.string(),
      usuario_id: Joi.string(),
      despesa_conjunta: Joi.bool(),
      parcelado: Joi.bool(),
      parcelas_id: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.despesas);
  }
);

// Delete
routes.delete(
  "/despesas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.despesas);
  }
);

// #endregion

// #region Categorias

// Create
routes.post(
  "/categoria",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string().required(),
    }),
  }),
  (req, res) => {
    categoria.create(req, res, prisma.categoria);
  }
);

// Read
routes.get(
  "/categoria",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string(),
    }),
  }),
  (req, res) => {
    categoria.read(req, res, prisma.categoria);
  }
);

// Update
routes.put(
  "/categoria",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string().required(),
    }),
  }),
  (req, res) => {
    categoria.update(req, res, prisma.categoria);
  }
);

// Delete
routes.delete(
  "/categoria",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string().required(),
    }),
  }),
  (req, res) => {
    categoria.delete(req, res, prisma.categoria);
  }
);

// #endregion

// #region Parcelas

// Create
routes.post(
  "/parcelas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      data_inicio: Joi.date().required(),
      total_vezes: Joi.number().required(),
      valor_parcelado: Joi.number().required(),
      valor_total: Joi.number().required(),
    }),
  }),
  (req, res) => {
    crud.create(req, res, prisma.parcelas);
  }
);

// Read
routes.get(
  "/parcelas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      data_inicio: Joi.date(),
      total_vezes: Joi.number(),
      valor_parcelado: Joi.number(),
      valor_total: Joi.number(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.parcelas);
  }
);

// Update
routes.put(
  "/parcelas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      data_inicio: Joi.date(),
      total_vezes: Joi.number(),
      valor_parcelado: Joi.number(),
      valor_total: Joi.number(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.parcelas);
  }
);

// Delete
routes.delete(
  "/parcelas",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.parcelas);
  }
);

// #endregion

// #region Recorrencias

// Create
routes.post(
  "/recorrencia",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      despesas_id: Joi.string().required(),
      ativo: Joi.bool().required(),
    }),
  }),
  (req, res) => {
    crud.create(req, res, prisma.recorrencia);
  }
);

// Read
routes.get(
  "/recorrencia",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      despesas_id: Joi.string(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.recorrencia);
  }
);

// Update
routes.put(
  "/recorrencia",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      despesas_id: Joi.string(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.recorrencia);
  }
);

// Delete
routes.delete(
  "/recorrencia",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.recorrencia);
  }
);

// #endregion

export default routes;
