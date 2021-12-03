// ------------ NodeJS runtime ---------------
// Add aws-sdk in package.json as a dependency
// Example:
// {
//     "dependencies": {
//         "aws-sdk": "^2.0.9",
//     }
// }
// Create your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users)
// Format of the above file should be:
//  [default]
//  aws_access_key_id = YOUR_ACCESS_KEY_ID
//  aws_secret_access_key = YOUR_SECRET_ACCESS_KEY

const AWS = require('aws-sdk');


function createDynamoDbClient() {
  // Set the region
  AWS.config.update({
    accessKeyId: 'AKIAQAUYDWTWU6XJ2JL7',
    secretAccessKey: 'meOhd7c7L+sKJG4EpNK+U2LRD01QS/u2UrXpJvVH',
    region: 'us-east-1'
})
  return new AWS.DynamoDB();
}


function returnData(UniqueTitle){

    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    dynamoDB
    .get({
        TableName: "SeniorDesignLab3DB",
        Key: {
        'UniqueTitle': UniqueTitle
        },
    })
    .promise()
    .then(data => console.log(data.Item))
    .catch(console.error)
}

createDynamoDbClient();
var response = returnData('yee')
console.log(response)