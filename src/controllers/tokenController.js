const {getById, listAll, deleteById, addItem} = require('../database/dynamo')
const { getLive } = require('./coinLayerController')
const coinLayer = require('./coinLayerController')

class tokenController{

  // adding new token
  async create(req, res){

    const { tokens } = req.body
    const {timestamp, rates} = await coinLayer.getLive()

    // validation
    
    // connection
    try {
      // aprender a fazer log
      // const objArray = []

      tokens.map( async (token) => {

        const exchangeRate = rates[token]
        const evolutionRate = 0
        const obj = {tokenId: token, timestamp, exchangeRate, evolutionRate}

        await addItem(obj)
        //objArray.push(obj)
        //console.log('iterando',objArray)
      })

      //console.log('fora do loop',objArray)
      //JSON.stringify(objArray)
      return res.status(200).json({ ok: "True"})

    } catch (error) {

      console.error(error)
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  // listing all tokens (incompleto)
  async list(req, res){
    // receber apenas o ultimo timestamp

    // connection
    try {

      const tokenList = await listAll()
      return res.json(tokenList)

    } catch (error) {

      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  // get an history of a token (incompleto)
  async get(req, res){

    const tokenId = String(req.params.id)
    console.log(tokenId, typeof tokenId);

    // connection
    try {
      
      const token = await getById(tokenId)
      return res.json(token)

    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }

  }

  // deleting all presence of an token
  async delete(req, res){

    const tokenId = String(req.params.id)

    // validation

    // connection
    try {
      
      await deleteById(tokenId)
      return res.status(200).json({ ok: 'True'})

    } catch (error) {
      
      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }

  }

  // update incompleto
  async update(req, res){

    // fazer a query para o update
    const tokens = "query"
    const { timestamp, rates } = await coinLayer.getLive()

    // validation
    
    // connection
    try {
      
      tokens.map( async (token) => {

        const exchangeRate = rates[token.tokenId]
        const evolutionRate = (exchangeRate-token.exchangeRate)/exchangeRate
        const obj = {tokenId: token, timestamp, exchangeRate, evolutionRate}


        console.log(obj);
        await addItem(obj)
        return res.status(200).json(obj)
      })

    } catch (error) {

      console.error(error)
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }
}

module.exports = new tokenController()