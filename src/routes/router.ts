import { errors } from 'celebrate'
import { Router } from 'express'

// import auth from '../middlewares/auth'

import usuario from './usuarios/usuario'

// import usuario_grupo from './usuarios/usuario_grupo'

// import grupo from './usuarios/grupo'

const routes = Router()

// Usuario
routes.use(usuario)
// routes.use(grupo)
// routes.use(usuario_grupo)

console.log('errors()', errors())

routes.use(errors())

export default routes
