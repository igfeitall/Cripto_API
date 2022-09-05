const {getById, listAll, deleteById, addItem} = require('../database/dynamo')

class tokenController{

  async create(req, res){

    const token = req.body
    
    // connection
    try {

      await addItem(token)
      return res.json(token)

    } catch (error) {

      console.error(error)
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  async list(req, res){

    // connection
    try {

      console.log('dentro do try');
      const tokenList = await listAll()
      return res.json(tokenList)

    } catch (error) {

      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  async get(req, res){

    const tokenId = Number(req.params.id)
    console.log(tokenId);

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

    const tokenId = Number(req.params.id)

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

module.exports = new tokenController()