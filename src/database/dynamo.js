const Database = require('./config')
const dynamoClient = new Database()

const getById = async (tokenId) => {
  const Limit = 5
  const params = {
      TableName: Database.TABLE_NAME,
      KeyConditionExpression: 'tokenId = :id',
      ExpressionAttributeValues: {
        ':id': tokenId
      },
      Limit
    }

  return dynamoClient.query(params).promise()
}

const listAll = async () => {
  const params = {
    TableName: Database.TABLE_NAME
  }

  return dynamoClient.scan(params).promise()
}

const listAllId = () => {
  const params = {
    TableName: Database.TABLE_NAME
  }

  const uniqueId = []
  dynamoClient.scan(params, (error, data) => {
    console.log(data);
    if(error){
      console.log(error);
      return error
    }
    
    for (item of data.Items){
      addItem(uniqueId, { tokenId: item.tokenId, exchangeRate: item.exchangeRate})
    }

    return uniqueId
  })
}

const deleteById = async (tokenId) => {

  const queryParams = {
    TableName: Database.TABLE_NAME,
    KeyConditionExpression: 'tokenId = :id',
    ExpressionAttributeValues: { ':id': tokenId }
  }

  const queryResults = await dynamoClient.query(queryParams).promise()
  if (queryResults.Items && queryResults.Items.length > 0) {
    
    const batchCalls = chunks(queryResults.Items, 5).map( async (chunk) => {
      const deleteRequests = chunk.map( item => {
        return {
          DeleteRequest : {
            Key : {
              'tokenId' : item.tokenId,
              'timestamp' : item.timestamp,

            }
          }
        }
      })

      const batchWriteParams = {
        RequestItems : {
          [Database.TABLE_NAME] : deleteRequests
        }
      }

      await dynamoClient.batchWrite(batchWriteParams).promise()
    })

    await Promise.all(batchCalls)
  }
}

const addItem = async (item) => {
  const params = {
    TableName: Database.TABLE_NAME,
    Item:item
  }
  
  return dynamoClient.put(params).promise()
}

/// não deveria estar aqui

function chunks(inputArray, perChunk) {
  return inputArray.reduce((all,one,i) => {
    const ch = Math.floor(i/perChunk); 
    all[ch] = [].concat((all[ch]||[]),one); 
    return all
 }, [])
}

module.exports = {getById, listAll, listAllId, deleteById, addItem}