const Database = require('./config')
const dynamoClient = new Database()

const getById = async (id) => {
  const params = {
      TableName: Database.TABLE_NAME,
      Key: {
          id: id
      }
  }

  return dynamoClient.get(params).promise()
}

const listAll = async () => {
  const params = {
    TableName: Database.TABLE_NAME
  }

  return dynamoClient.scan(params).promise()
}

const deleteById = async (id) => {
  const params = {
    TableName: Database.TABLE_NAME,
    Key: {
      id: id
    }
  }

  return dynamoClient.delete(params).promise()
}

const addItem = async (item) => {
  const params = {
    TableName: Database.TABLE_NAME,
    Item:item
  }
  
  return dynamoClient.put(params).promise()
}

module.exports = {getById, listAll, deleteById, addItem}