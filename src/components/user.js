import React,{useState}  from 'react'

var success;
var y;
var title;
var notes;
var location;
if (typeof window !== 'undefined') {
    var dynamoString = localStorage["dynamoResponse"]
}
else
{
    var dynamoString = ''
}

var dynamoResponse = JSON.parse(dynamoString)
console.log("test")
console.log(dynamoResponse)


const optionsDates = []
const takenDates = []
if(dynamoString != null){
  for (let userResponse in dynamoResponse["responses"]){
      console.log(JSON.parse(dynamoResponse["responses"][userResponse])["date"])
      takenDates.push(JSON.parse(dynamoResponse["responses"][userResponse])["date"])
    }
    for (let [key, interval] of Object.entries(dynamoResponse["intervals"])) {
        if (!(takenDates.includes(interval))){
        optionsDates.push({ value: interval, label: interval})
        }
    }
     y = dynamoResponse["deadline"]
     title = dynamoResponse["UniqueTitle"]
     location = dynamoResponse["location"]
     notes = dynamoResponse["notes"]
}
else {
  takenDates.push("Fail")
  optionsDates.push("Fail")
   y = ""
   title = ""
   location = ""
   notes = ""
}





//var y = ('2021-12-03 10:57:30')
var flag = 0
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
      return dateTime;
    }
    setInterval(function(){
        var currentTime = getDateTime();
        //console.log(currentTime)
        if(currentTime.localeCompare(y) == 0){
            flag = 1
            document.getElementById("button").disabled = true;
        }
    }, 1000);



const User = () => {
    const [submitstate,setSubmitState] = useState({
        date:"",
        type:"",
        name: "",
        nameError: "",
        dateError: "",                       
        timesFormatError:"", 
        typeErr:"",
    })

    const [status, setStatus] = React.useState(0)
    const radioHandler = (status) => {
        setStatus(status);
    };
    const handleChange = event => {
        setSubmitState({
            ...submitstate,
           [event.target.name]:event.target.value
        })
    }
    const validate = () => {
        let dateError = ""
        let typeErr = ""
        let nameError = ""
        if(submitstate.date == 'Select dropdown'){
            dateError ="Please Select a Date"
        }
        
        if(submitstate.name == ''){
            nameError = "Please Enter Name"
        }
        if(status == 0) {
            typeErr = "Please select a type"
        }
        
        if(typeErr || dateError || nameError ){
            setSubmitState({
                ...submitstate,
                dateError, typeErr
            })
            return false
        }
        return true
    }

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate();
        if(isValid){

            success = "Confirmed for: \n Title = " + title + " \n , Location = " + location + " \n , Notes = " + notes + " \n , Time = " + submitstate.date + " \n , Name = " + submitstate.name 

            console.log(submitstate)

            delete submitstate.typeErr
            delete submitstate.dateError
            delete submitstate.timesFormatError
            delete submitstate.nameError

            const updateItemInput = createUpdateItemInput(dynamoResponse["UniqueTitle"], JSON.stringify(submitstate));

            executeUpdateItem(dynamoDbClient, updateItemInput).then(() => {
                console.info('UpdateItem API call has been executed.')
              }
            );


            console.log(submitstate)

            // submitstate.typeErr=""
            // submitstate.dateError=""
            // submitstate.nameError=""
            
            setSubmitState({
                ...submitstate
            })
        }
        else{
            console.log("Invalid")
        }
    }
    return (
        <div class="container has-text-centered">
            <section class="section">
            <h1 class="title">User</h1>
                <form class="box">
                    <div class="field">
                        <label class="label">Name
                            <div class="control">
                                <input class="input" name="name" type="text" placeholder="Required"  onChange={handleChange} value={submitstate.name}/>
                                <div style ={{fontSize:12, color:"red"}}>{submitstate.nameError}</div>
                            </div>
                        </label>
                    </div>  
                <div class="field">
                <label class="label">Time Slots</label>
                    <div style ={{fontSize:12, color:"red"}}>{submitstate.dateError}</div>
                        <div class="control">
                            <div class="select">
                                <select id='1' name="date" onChange={handleChange} value={submitstate.date}>
                                    <option>Select dropdown</option>
                                    {optionsDates.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div> 
                <div class="field">
                    <label class="label">Type</label>
                        <div style ={{fontSize:12, color:"red"}}>{submitstate.typeErr}</div>
                            <div class="control">
                                <label class="radio mr-4">
                                    <input type="radio" name="type" checked={status === 1} onClick={(e) => radioHandler(1)} onChange={handleChange} value="Vote"/>
                                        Vote
                                </label>
                                <label class="radio">
                                    <input type="radio" name="type" checked={status === 2} onClick={(e) => radioHandler(2)} onChange={handleChange} value="Reserve"/>
                                        Reserve
                                </label>
                            </div>
                        </div> 
                        <div class="field is-grouped">
                            <div class="container has-text-centered">
                                <div class="control">
                                    <button class="button is-warning" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <p> { success }</p>
            </section>
        </div>


    )


}
export default User


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

// Create the DynamoDB Client with the region you want
const region = 'us-east-1';
// const dynamoDbClient = createDynamoDbClient(region);

const dynamoDbClient = createDynamoDbClient(region);

function createDynamoDbClient() {
    AWS.config.update({
        accessKeyId: 'AKIAQAUYDWTW6BQE2UFZ',
        secretAccessKey: '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',
        region: 'us-east-1'
    })
  // Use the following config instead when using DynamoDB Local
  // AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'access_key_id', secretAccessKey: 'secret_access_key'});
  return new AWS.DynamoDB();
}

function createUpdateItemInput(UniqueTitle, userResponseString) {
  return {
    "TableName": "SeniorDesignLab3DB",
    "Key": {
      "UniqueTitle": {
        "S": UniqueTitle
      }
    },
    "UpdateExpression": " ADD #083d0 :083d0",
    "ExpressionAttributeValues": {
      ":083d0": {
        "SS": [
          userResponseString
        ]
      }
    },
    "ExpressionAttributeNames": {
      "#083d0": "responses"
    }
  }
}

async function executeUpdateItem(dynamoDbClient, updateItemInput) {
  // Call DynamoDB's updateItem API
  try {
    const updateItemOutput = await dynamoDbClient.updateItem(updateItemInput).promise();
    console.info('Successfully updated item.');
    // Handle updateItemOutput
  } catch (err) {
    handleUpdateItemError(err);
  }
}

// Handles errors during UpdateItem execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
function handleUpdateItemError(err) {
  if (!err) {
    console.error('Encountered error object was empty');
    return;
  }
  if (!err.code) {
    console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
    return;
  }
  switch (err.code) {
    case 'ConditionalCheckFailedException':
      console.error(`Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err.message}`);
      return;
    case 'TransactionConflictException':
      console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
       'with exponential back-off. Error: ${err.message}`);
       return;
    case 'ItemCollectionSizeLimitExceededException':
      console.error(`An item collection is too large, you're using Local Secondary Index and exceeded size limit of` + 
        `items per partition key. Consider using Global Secondary Index instead. Error: ${err.message}`);
      return;
    default:
      break;
    // Common DynamoDB API errors are handled below
  }
  handleCommonErrors(err);
}

function handleCommonErrors(err) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
        + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
      return;
    case 'ResourceNotFoundException':
      console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
      return;
    case 'ServiceUnavailable':
      console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ThrottlingException':
      console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'UnrecognizedClientException':
      console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
        + `Error: ${err.message}`);
      return;
    case 'ValidationException':
      console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
        + `fix input before retrying. Error: ${err.message}`);
      return;
    case 'RequestLimitExceeded':
      console.error(`Throughput exceeds the current throughput limit for your account, `
        + `increase account level throughput before retrying. Error: ${err.message}`);
      return;
    default:
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
      return;
  }
}