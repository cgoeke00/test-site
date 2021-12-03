// // ------------ NodeJS runtime ---------------
// // Add aws-sdk in package.json as a dependency
// // Example:
// // {
// //     "dependencies": {
// //         "aws-sdk": "^2.0.9",
// //     }
// // }
// // Create your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users)
// // Format of the above file should be:
// //  [default]
// //  aws_access_key_id = YOUR_ACCESS_KEY_ID
// //  aws_secret_access_key = YOUR_SECRET_ACCESS_KEY


// class AwsClientHandler {
//     constructor (uniqueTitle) {
//     this.uniqueTitle = uniqueTitle
//     this.AWS = require('aws-sdk');
//     this.AWS.config.update({
//       accessKeyId: 'AKIAQAUYDWTWU6XJ2JL7',
//       secretAccessKey: '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',
//       region: 'us-east-1'
//     })
//     this.dynamoDbClient = new this.AWS.DynamoDB()
//     this.pollDataPromise
//     this.pollDataResolved
//   }
  
  
//   static userUpdateItem(userUpdateString) {
//       var userUpdateItemInput = createUserUpdateItemInput(this.uniqueTitle, userUpdateString);
//       executeUserUpdateItem1(this.dynamoDbClient, userUpdateItemInput).then(() => {
//         console.info('UpdateItem API call has been executed.')
//       }
//     );
//   }

//   static adminUpdateItem(formState) {
//     var adminUpdateItemInput = createAdminUpdateItemInput(this.uniqueTitle, formState);
//     executeAdminUpdateItem1(this.dynamoDbClient, adminUpdateItemInput).then(() => {
//         console.info('UpdateItem API call has been executed.')
//       }
//     );
//   }

//   static returnPollData() {
//     this.getPollData(this.uniqueTitle)
//     this.getPollDataHelper();
//   }
  
//  static adminPutItem(formState) {
//     var adminPutItemInput = this.createAdminPutItemInput(formState)
//     executePutItem1(this.dynamoDbClient, adminPutItemInput).then(() => {
//         console.info('PutItem API call has been executed.')
//       }
//     );
//   }

//   static deletePoll() {
//     // executeDeleteItem1().then(() => {
//     //   console.info('DeleteItem API call has been executed.')
//     // }
//     // );
//     this.executeDeleteItem1()
//   }

  
//   static executeUserUpdateItem1(userUpdateItemInput){
//     var dynamoDbClient = this.dynamoDbClient
//     async function executeUserUpdateItem(dynamoDbClient, userUpdateItemInput) {
//       // Call DynamoDB's updateItem API
//       try {
//         const userUpdateItemOutput = await dynamoDbClient.updateItem(userUpdateItemInput).promise();
//         console.info('Successfully updated item.');
//         // Handle updateItemOutput
//       } catch (err) {
//         handleUpdateItemError(err);
//       }
//     }
//     executeUserUpdateItem(this.dynamoDbClient, userUpdateItemInput)
//   }
  
//   static executeAdminUpdateItem1(adminUpdateItemInput) {
//     var dynamoDbClient = this.dynamoDbClient
//     async function executeAdminUpdateItem(dynamoDbClient, adminUpdateItemInput) {
//       // Call DynamoDB's updateItem API
//       try {
//         const adminUpdateItemOutput = await dynamoDbClient.updateItem(adminUpdateItemInput).promise();
//         console.info('Successfully updated item.');
//         // Handle updateItemOutput
//       } catch (err) {
//         handleUpdateItemError(err);
//       }
//     }
//     executeAdminUpdateItem(this.dynamoDbClient, adminUpdateItemInput)
//   }
  
//   static getPollData(UniqueTitle){

//     const documentClient = new this.AWS.DynamoDB.DocumentClient()
//     this.pollDataPromise = documentClient
//     .get({
//         TableName: "SeniorDesignLab3DB",
//         Key: {
//         'UniqueTitle': UniqueTitle
//         },
//     })
//     .promise()
//     .then(data => {return data.Item}) 
//     .catch(console.error)
//   }
  
//   static getPollDataHelper = async () => {
//     this.pollDataResolved = await this.pollDataPromise;
  
//     if(this.pollDataResolved != null){ // if query is successfull
//         console.log("This is the poll data")
//         console.log(this.pollDataResolved)
//         // localStorage["dynamoResponse"] = JSON.stringify(pollDataResolved)
//         // navigate("/userInterface/", {state: {pollDataResolved}}) //navigate to page and pass query result @ location.state.data
//     }
//     else {
//         setLoginstate({
//             ...loginState,
//             titleError
//         })
//     }
//   };
  
//   static executePutItem1(adminPutItemInput) {
//     var dynamoDbClient = this.dynamoDbClient
//     async function executePutItem(dynamoDbClient, adminPutItemInput) {
//       // Call DynamoDB's putItem API
//       try {
//         const putItemOutput = await dynamoDbClient.putItem(putItemInput).promise();
//         console.info('Successfully put item.');
//         // Handle putItemOutput
//       } catch (err) {
//         handlePutItemError(err);
//       }
//     }
//     executePutItem(dynamoDbClient, adminPutItemInput)
//   }
  
//   static createUserUpdateItemInput(userResponseString) {
//     return {
//       "TableName": "SeniorDesignLab3DB",
//       "Key": {
//         "UniqueTitle": {
//           "S": this.uniqueTitle
//         }
//       },
//       "UpdateExpression": " ADD #083d0 :083d0",
//       "ExpressionAttributeValues": {
//         ":083d0": {
//           "SS": [
//             userResponseString
//           ]
//         }
//       },
//       "ExpressionAttributeNames": {
//         "#083d0": "responses"
//       }
//     }
//   }
  
//   static createAdminUpdateItemInput(formState) {

//     return {
//       "TableName": "SeniorDesignLab3DB",
//       "Key": {
//         "UniqueTitle": {
//           "S": this.uniqueTitle
//         }
//       },
//       "UpdateExpression": "SET #01c50 = :01c50, #01c51 = :01c51, #01c52 = :01c52, #01c53 = :01c53, #01c54 = :01c54, #01c55 = :01c55, #01c56 = :01c56, #01c57 = :01c57, #01c58 = :01c58, #01c59 = :01c59, #01c5a = :01c5a, #01c5b = :01c5b, #01c5c = :01c5c, #01c5d = :01c5d, #01c5e = :01c5e, #01c5f = :01c5f",
//       "ExpressionAttributeValues": {
//         ":01c50": {
//           "S": formState.location
//         },
//         ":01c51": {
//           "N": formState.votesPerSlot
//         },
//         ":01c52": {
//           "S": formState.dates
//         },
//         ":01c53": {
//           "S": formState.reminder
//         },
//         ":01c54": {
//           "S": formState.slotsTime
//         },
//         ":01c55": {
//           "S": formState.zone
//         },
//         ":01c56": {
//           "SS": formState.intervals
//         },
//         ":01c57": {
//           "S": formState.deadline
//         },
//         ":01c58": {
//           "N": formState.slotsBlock
//         },
//         ":01c59": {
//           "S": formState.notes
//         },
//         ":01c5a": {
//           "S": formState.end
//         },
//         ":01c5b": {
//           "N": formState.voterPerVoter
//         },
//         ":01c5c": {
//           "S": formState.invites
//         },
//         ":01c5d": {
//           "S": formState.start
//         },
//         ":01c5e": {
//           "S": formState.title
//         },
//         ":01c5f": {
//           "S": formState.invite
//         }
//       },
//       "ExpressionAttributeNames": {
//         "#01c50": "location",
//         "#01c51": "votesPerSlot",
//         "#01c52": "dates",
//         "#01c53": "reminder",
//         "#01c54": "slotsTime",
//         "#01c55": "zone",
//         "#01c56": "intervals",
//         "#01c57": "deadline",
//         "#01c58": "slotsBlock",
//         "#01c59": "notes",
//         "#01c5a": "end",
//         "#01c5b": "voterPerVoter",
//         "#01c5c": "invites",
//         "#01c5d": "start",
//         "#01c5e": "title",
//         "#01c5f": "invite"
//       }
//     }
//   }

//   static createAdminPutItemInput(formState) {
//     var formStateDictionary = {}
//     var adminPutItemInput = {}
//     var keysToDelete = ["titleError", "datesError", "datesFormatError", "startError",
//     "endError", "startEndError", "zoneError", "slotsError", "slotsBlockError",
//     "slotsTimeError", "invitesError", "reminderError", "votesPerSlotError",
//     "votesPerSlotError2", "voterPerVoterError", "voterPerVoterError2", "deadlineError", "deadlineFormatError"]
  
//     for (let [key, value] of Object.entries(formState)) {
//       console.log(key, value);
//       formStateDictionary[key] = value
//     }
  
//     formStateDictionary["UniqueTitle"] = formStateDictionary["title"]
  
//     for (let key in formStateDictionary) {
//       if(keysToDelete.includes(key)) {
//           delete formStateDictionary[key];
//       }
//     }
  
//     var tempDynamoJson = dataToItem(formStateDictionary);
//     adminPutItemInput["TableName"] = "SeniorDesignLab3DB";
//     adminPutItemInput["Item"] = tempDynamoJson;
  
//     delete adminPutItemInput["Item"]["modified"];
//     delete adminPutItemInput["Item"]["created"];
  
//     return adminPutItemInput
//   }

//   static createDeleteItemInput() {
//       return {
//         "TableName": "SeniorDesignLab3DB",
//         "Key": {
//           "UniqueTitle": {
//             "S": this.uniqueTitle
//           }
//         }
//       }
//     }
    
//   static executeDeleteItem1() {
//       var dynamoDbClient = this.dynamoDbClient
//       var deleteItemInput = this.createDeleteItemInput()
  
//       async function executeDeleteItem(dynamoDbClient, deleteItemInput) {
//       // Call DynamoDB's deleteItem API
//       const deleteItemOutput = await dynamoDbClient.deleteItem(deleteItemInput).promise();
//       console.info('Successfully deleted item.');
//       }
//       console.log(deleteItemInput)
//       executeDeleteItem(dynamoDbClient, deleteItemInput)
//     }
  
  
//   // Handles errors during UpdateItem execution. Use recommendations in error messages below to 
//   // add error handling specific to your application use-case. 
//   static handleUpdateItemError(err) {
//     if (!err) {
//       console.error('Encountered error object was empty');
//       return;
//     }
//     if (!err.code) {
//       console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
//       return;
//     }
//     switch (err.code) {
//       case 'ConditionalCheckFailedException':
//         console.error(`Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`);
//         return;
//       case 'TransactionConflictException':
//         console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
//          'with exponential back-off. Error: ${err.message}`);
//          return;
//       case 'ItemCollectionSizeLimitExceededException':
//         console.error(`An item collection is too large, you're using Local Secondary Index and exceeded size limit of` + 
//           `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`);
//         return;
//       default:
//         break;
//       // Common DynamoDB API errors are handled below
//     }
//     handleCommonErrors(err);
//   }

//   static handleDeleteItemError(err) {
//     if (!err) {
//       console.error('Encountered error object was empty');
//       return;
//     }
//     if (!err.code) {
//       console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
//       return;
//     }
//     switch (err.code) {
//       case 'ConditionalCheckFailedException':
//         console.error(`Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`);
//         return;
//       case 'TransactionConflictException':
//         console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
//          'with exponential back-off. Error: ${err.message}`);
//          return;
//       case 'ItemCollectionSizeLimitExceededException':
//         console.error(`An item collection is too large, you're using Local Secondary Index and exceeded size limit of` + 
//           `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`);
//         return;
//       default:
//         break;
//       // Common DynamoDB API errors are handled below
//     }
//     handleCommonErrors(err);
//     }
  
//   static handleCommonErrors(err) {
//     switch (err.code) {
//       case 'InternalServerError':
//         console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
//         return;
//       case 'ProvisionedThroughputExceededException':
//         console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
//           + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
//         return;
//       case 'ResourceNotFoundException':
//         console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
//         return;
//       case 'ServiceUnavailable':
//         console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
//         return;
//       case 'ThrottlingException':
//         console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
//         return;
//       case 'UnrecognizedClientException':
//         console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
//           + `Error: ${err.message}`);
//         return;
//       case 'ValidationException':
//         console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
//           + `fix input before retrying. Error: ${err.message}`);
//         return;
//       case 'RequestLimitExceeded':
//         console.error(`Throughput exceeds the current throughput limit for your account, `
//           + `increase account level throughput before retrying. Error: ${err.message}`);
//         return;
//       default:
//         console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
//         return;
//     }
//   }
// }
// // export default new AwsClientHandler;



// // // example function calls

// // let clientHandler = new AwsClientHandler("Pole");
// // clientHandler.returnPollData()
// // clientHandler.deletePoll()


// // user update string is the stringified JSON made from the user's response
// // clientHandler.userUpdateItem(userUpdateString)
// // admin update formState is the formstate created by the update poll page
// // clientHandler.adminUpdateItem(adminUpdateFormState)
// // adminPutFormState is the formstate created when the admin creates the poll
// // clientHandler.adminPutItem(adminPutFormState)
// // does not take any input, just returns the poll data for the unique title






