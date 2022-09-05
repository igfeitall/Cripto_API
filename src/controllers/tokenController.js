import {getById, listAll, deleteById, addItem} from '../database/dynamo'

class tokenController{

  async create(req, res){

    const token = req.body
    
    // connection
    try {

      const newToken = await addItem(token)
      return res.json(newToken)

    } catch (error) {

      console.error(error)
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  async list(req, res){

    // connection
    try {

      const tokenList = await listAll()
      return res.json(tokenList)

    } catch (error) {

      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  async get(req, res){

    const tokenId = req.param.id

    // connection
    try {
      
      const token = await getById(tokenId)
      return res.json(token)

    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }

  }

  async delete(req, res){

    const tokenId = req.param.id

    // connection
    try {
      
      const tokenDeleted = await deleteById(tokenId)
      return res.json(tokenDeleted)

    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })
      
    }

  }

}

export default new tokenController()