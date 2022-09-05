import { Router } from 'express'
import tokenController from './controllers/tokenController'

const routes = new Router()

routes.get('/', (req, res) =>{

  return res.json({message : 'Working...'})
})

// test post
routes.post('/token', tokenController.create)
routes.get('/token', tokenController.list)

export default routes