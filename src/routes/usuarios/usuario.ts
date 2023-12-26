import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

// import auth from '../../middlewares/auth'
import { create, read, update, remove } from '../../modules/Crud'

const routes = Router()

// Create
routes.post(
  '/usuario',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      documento: Joi.string().min(11).max(11).required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      salario: Joi.number().required(),
      data_salario: Joi.number(),
      vale: Joi.number(),
      data_vale: Joi.number(),
    }),
  }),
  async (req, res) => {
    return await create(req, res, prisma.usuario)
  },
)

// routes.use(auth)

// Read
routes.get(
  '/usuario',
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
      vale: Joi.number(),
      data_vale: Joi.number(),
      ativo: Joi.bool(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
    }),
  }),
  (req, res) => {
    read(req, res, prisma.usuario)
  },
)

// Update
routes.put(
  '/usuario',
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
      vale: Joi.number(),
      data_vale: Joi.number(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    update(req, res, prisma.usuario)
  },
)

// Delete
routes.delete(
  '/usuario',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    remove(req, res, prisma.usuario)
  },
)

export default routes
