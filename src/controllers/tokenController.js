const {getById, listAll, deleteById, addItem} = require('../database/dynamo')
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

  // listing all tokens
  async list(req, res){
    // receber apenas o ultimo timestamp

    // connection
    try {

      const dataAll = await listAll()
      const tokenList = getUniqueToken(dataAll)

      return res.json(tokenList)

    } catch (error) {

      console.log(error);
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }

  // get an history of a token
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

  // update all tokens
  async update(req, res){

    const { timestamp, rates } = await coinLayer.getLive()

    // validation
    
    // connection
    try {
      const dataAll = await listAll()
      const tokens = getUniqueToken(dataAll)
      
      tokens.map( async (token) => {

        const exchangeRate = rates[token.tokenId]
        const oldExchangeRate = token.exchangeRate
        
        // tratando valores 0
        let evolutionRate = exchangeRate >= oldExchangeRate? 1. : -1.
        if(!oldExchangeRate && !exchangeRate){
          evolutionRate = 0.
        }
        if(oldExchangeRate){
          evolutionRate = (exchangeRate-oldExchangeRate)/oldExchangeRate
        }

        const obj = {tokenId: token.tokenId, timestamp, exchangeRate, evolutionRate}
        console.log(obj);

        await addItem(obj)
      })
      
      return res.status(200).json({ updatedTokens: tokens })

    } catch (error) {

      console.error(error)
      return res.status(500).json({ error: 'Something went wrong in database, try again later' })

    }
  }
}

// return a list of the most recent tokens
function getUniqueToken(data){
  const uniqueTokens = []
  for (let i = data.Items.length-1; i>=0; i--){
    const item = data.Items[i]
    const miliseconds = item.timestamp * 1000
    const date = new Date(miliseconds).toLocaleString("en-US")

    addUnique(uniqueTokens, { tokenId: item.tokenId, 
                              timestamp: date,
                              exchangeRate: item.exchangeRate,
                              evolutionRate: item.evolutionRate})
  }

  return uniqueTokens
}

function addUnique(list, newItem){
  let unique = true
  for(item of list){
    if(newItem.tokenId === item.tokenId){
      unique = false
      break
    }
  }

  if(unique){
    list.push(newItem)
  }
}


module.exports = new tokenController()