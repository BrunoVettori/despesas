import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { create, read, update, remove } from '@modules/usuario'

const routes = Router()

// // Create
// routes.post(
//   '/grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       nome: Joi.string().required(),
//     }),
//   }),
//   async (req, res) => {
//     return await create(req, res, prisma.gurpo)
//   },
// )

// // Read
// routes.get(
//   '/grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string(),
//       nome: Joi.string(),
//       ativo: Joi.bool(),
//       created_at: Joi.date(),
//       updated_at: Joi.date(),
//     }),
//   }),
//   (req, res) => {
//     read(req, res, prisma.gurpo)
//   },
// )

// // Update
// routes.put(
//   '/grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string(),
//       nome: Joi.string(),
//       ativo: Joi.bool(),
//       created_at: Joi.date(),
//       updated_at: Joi.date(),
//     }),
//   }),
//   (req, res) => {
//     update(req, res, prisma.gurpo)
//   },
// )

// // Delete
// routes.delete(
//   '/grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string().required(),
//     }),
//   }),
//   (req, res) => {
//     remove(req, res, prisma.gurpo)
//   },
// )

export default routes
