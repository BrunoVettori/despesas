// import { Router } from 'express'
// import { celebrate, Joi, Segments } from 'celebrate'

// import prisma from '../../database/prisma'
// // import auth from '../../middlewares/auth'
// import { create, read, update, remove } from '../../modules/Crud'

// const routes = Router()

// // Create
// routes.post(
//   '/usuario_grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       gurpo_id: Joi.string().required(),
//       usuario_id: Joi.string().required(),
//       permissao: Joi.string().required(),
//     }),
//   }),
//   async (req, res) => {
//     return await create(req, res, prisma.usuario_grupo)
//   },
// )

// // routes.use(auth)

// // Read
// routes.get(
//   '/usuario_grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string(),
//       gurpo_id: Joi.string(),
//       usuario_id: Joi.string(),
//       permissao: Joi.string(),
//       created_at: Joi.date(),
//       updated_at: Joi.date(),
//     }),
//   }),
//   (req, res) => {
//     read(req, res, prisma.usuario_grupo)
//   },
// )

// // Update
// routes.put(
//   '/usuario_grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string(),
//       gurpo_id: Joi.string(),
//       usuario_id: Joi.string(),
//       permissao: Joi.string(),
//       created_at: Joi.date(),
//       updated_at: Joi.date(),
//     }),
//   }),
//   (req, res) => {
//     update(req, res, prisma.usuario_grupo)
//   },
// )

// // Delete
// routes.delete(
//   '/usuario_grupo',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       id: Joi.string().required(),
//     }),
//   }),
//   (req, res) => {
//     remove(req, res, prisma.usuario_grupo)
//   },
// )

// export default routes
