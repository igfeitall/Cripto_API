import { Router } from 'express'
import tokenController from './controllers/tokenController'

const routes = new Router()

routes.get('/', (req, res) =>{

  return res.json({message : 'Working...'})
})

// test post
routes.post('/tokens', tokenController.create)
routes.get('/tokens', tokenController.list)
routes.get('/tokens/:id', tokenController.get)
routes.delete('/tokens/:id', tokenController.delete)

export default routes