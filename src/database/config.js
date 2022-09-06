const AWS = require('aws-sdk')

class Database {
  static TABLE_NAME = 'Tokens'
  
  constructor() {
    this.config()

    return new AWS.DynamoDB.DocumentClient()
  }
  
  config(){
    
    AWS.config.update({ region: process.env.AWS_REGION })
    // AWS key logs
    AWS.config.getCredentials(function(error) {
      if (error) console.log(error.stack); // credentials not loaded
      else {
        console.log("Access Key:", AWS.config.credentials.accessKeyId);
        console.log("Secret Key:", AWS.config.credentials.secretAccessKey);
      }
    })
  }
}
module.exports = Database