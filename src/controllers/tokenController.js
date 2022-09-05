import {getById, listAll, deleteById, addItem} from '../database/dynamo'

class tokenController{

  async create(req, res){

    const token = req.body
    
    // connection
    try {

      const newToken = await addItem(token)
      res.json(newToken)
    } catch (err) {

      console.error(error)
      res.status(500).json({ error: 'Something went wrong in database, try again later' })
    }
  }

  async list(req, res){

    // connection
    try {

      const tokenList = await listAll()
      res.json(tokenList)
    } catch (error) {

      console.log(error);
      res.status(500).json({ error: 'Something went wrong in database, try again later' })
    }
  }

}

export default new tokenController()