import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// AWS key logs
AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); // credentials not loaded
  else {
    console.log("Access Key:", AWS.config.credentials.accessKeyId);
    console.log("Secret Key:", AWS.config.credentials.secretAccessKey);
  }
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'token'

export default {dynamoClient, TABLE_NAME}