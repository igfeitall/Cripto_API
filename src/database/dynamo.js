import { dynamoClient, TABLE_NAME } from './config'

const getById = async (id) => {
  const params = {
      TableName: TABLE_NAME,
      Key: {
          id,
      }
  }

  return dynamoClient.get(params).promise()
}

const listAll = async () => {
  const params = {
    TableName: TABLE_NAME
  }

  return dynamoClient.scan(params).promise()
}

const deleteById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    }
  }

  return dynamoClient.delete(params).promise()
}

const addItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item:item
  }
  
  return dynamoClient.put(params).promise()
}

export default {getById, listAll, deleteById, addItem}