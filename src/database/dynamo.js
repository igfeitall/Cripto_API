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
      Limit,
      ScanIndexForward: false
    }

  return dynamoClient.query(params).promise()
}

const listAll = async () => {
  const params = {
    TableName: Database.TABLE_NAME
  }

  return dynamoClient.scan(params).promise()
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

module.exports = {getById, listAll, deleteById, addItem}