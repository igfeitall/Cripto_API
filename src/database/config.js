import AWS from 'aws-sdk'

class Database {
  static TABLE_NAME = 'token'

  constructor() {
    return new AWS.DynamoDB.DocumentClient()
  }

  static config(){
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

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

export default Database