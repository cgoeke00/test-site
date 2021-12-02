import React from 'react'
import moment from 'moment'
import { dataToItem, deltaToExpression, itemToData } from 'dynamo-converters';

var formStateDictionary = {};
var tempDynamoJson = {};
var dynamoJson = {}

const Form = () => {

    const[formState,setFormState] = React.useState({
        title:"",
        location:"",
        notes:"",
        dates: "",
        start:"",
        end: "",
        zone: "",
        slotsTime: "",
        slotsBlock:"",
        intervals:"",
        votesPerSlot: "",
        voterPerVoter: "", 
        invites:"", 
        reminder:"",
        deadline: "",
        titleError:"",
        datesError:"",
        datesFormatError:"",
        startError:"",
        endError:"",
        startEndError:"",
        zoneError:"",
        slotsError:"",
        slotsBlockError :"",
        slotsTimeError:"",
        invitesError:"",
        reminderError:"",
        votesPerSlotError:"",
        votesPerSlotError2:"",
        voterPerVoterError:"",
        voterPerVoterError2:"",  
        deadlineError:"",
        deadlineFormatError:"",
    })

    const [status, setStatus] = React.useState(0)
    const radioHandler = (status) => {
        setStatus(status);
    };

    const [status2, setStatus2] = React.useState(0)
    const radioHandler2 = (status2) => {
        setStatus2(status2);
    };

    const [status3, setStatus3] = React.useState(0)
    const radioHandler3 = (status3) => {
        setStatus3(status3);
    };

    const [status4, setStatus4] = React.useState(0)
    const radioHandler4 = (status4) => {
        setStatus4(status4);
    };

    const handleChange = event => {
        setFormState({
            ...formState,
           [event.target.name]:event.target.value
        })
    }

    const validate = () =>{
        let titleError = "";
        let datesError = "";
        let datesFormatError ="";
        let startError ="";
        let endError = "";
        let zoneError = "";
        let slotsError ="";
        let slotsBlockError ="";
        let slotsTimeError="";
        let invitesError= "";
        let reminderError="";
        let votesPerSlotError ="";
        let votesPerSlotError2 ="";
        let voterPerVoterError= "";  
        let voterPerVoterError2= "";  
        let deadlineError ="";
        let deadlineFormatError="";
        let startEndError = "";

        let a = []
        var b = []
        var c = []
        a = formState.dates.split(",")
        for(var i = 0; i<a.length;i++){
            b[i] = a[i] +' '+  formState.start
            c[i] = a[i] +' '+ formState.end
        }
        

        if(!formState.title){
            titleError = "title cannot be empty"
        }

        if(!formState.dates){
            datesError ="dates cannot be empty"
        }

        if(formState.dates){
            let a = []
            a = formState.dates.split(",")
            for(var i = 0; i<a.length;i++){
                if(!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(a[i])){
                    datesFormatError = "Invalid format for dates"
                }
            }
        }

        if(!formState.start || /^(0?[1-9]|1[0-2]):([0-5]\d)\s?((?:[Aa]|[Pp])\.?[Mm]\.?)$/.test(formState.start) == false){
            startError = "Invlaid format for time"
        }

        if(!formState.end || /^(0?[1-9]|1[0-2]):([0-5]\d)\s?((?:[Aa]|[Pp])\.?[Mm]\.?)$/.test(formState.end) == false){
            endError = "Invlaid format for time"
        }

        if(formState.zone == ''){
            zoneError = "Please select a Zone"
        }

        if(formState.votesPerSlot == "" && status == 1){
            votesPerSlotError = "Please enter a number"
        }

        if(status == 0){
            votesPerSlotError2 = "Select an option"
        }

        if(formState.voterPerVoter == "" && status2 == 1){
            voterPerVoterError = "Please enter a number"
        }

        if(status2 == 0){
            voterPerVoterError2 = "Select an option"
        }

        if(!formState.invites){
            invitesError = "Select an option"
        }

        if(!formState.reminder){
            reminderError = "Select an option"
        }

        if(formState.deadline == ""  && status3 == 0){
            deadlineError = "Please select an option"
        }

        if(/^([1-9]|([012][0-9])|(3[01]))\-([0]{0,1}[1-9]|1[012])\-\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)\s?((?:[Aa]|[Pp])\.?[Mm]\.?)$/.test(formState.deadline) == false && status3 == 1){
            deadlineFormatError = "Invalid format for deadline"
        }
        let p = []
        if(status4 == 1){
            for(var i = 0; i<b.length;i++){
                p.push(intervals(b[i],c[i],formState.slotsTime))
                p.concat(p)
            }
            formState.intervals = p
            let z = []
            let x = []
            z = formState.intervals
            z.forEach(element => {
                for(i=0;i<element.length;i++){
                    x.push(formatDate(element[i]))
                }
            });
            formState.intervals = x
            
        }
        let r = []
        if(status4 == 2){
            var diff = Math.abs(new Date(b[0]) - new Date(c[0]));
            var minutes = Math.floor((diff/1000)/60);
            var slotmins = minutes/parseInt(formState.slotsBlock)
            for(var i = 0; i<b.length;i++){
                r.push(intervals(b[i],c[i],slotmins))
                r.concat(r)
            }
            formState.intervals = r
            let s = []
            let t = []
            s = formState.intervals
            s.forEach(element => {
                for(i=0;i<element.length;i++){
                    t.push(formatDate(element[i]))
                }
            })
            formState.intervals = t
            
        }

        if(status4 == 1 && !/^(?:[5-9]|\d\d\d*)$/.test(formState.slotsTime) == true){
            slotsTimeError = "Enter greater >= 5"
        }

        if(status4 == 2 && !/^[1-9][0-9]*$/.test(formState.slotsBlock) == true){
            slotsBlockError = "Enter in a number >= 1"
        }

        if(status4 == 0){
            slotsError = "Please select an option"
        }
        
        if(formState.intervals.length == 0){
            startEndError = "Check start and end times"
        }
        if(titleError || datesError || datesFormatError || startError || endError || slotsError || zoneError || votesPerSlotError || 
            voterPerVoterError || deadlineError || invitesError || reminderError || deadlineFormatError 
            || votesPerSlotError2 || voterPerVoterError2 || slotsBlockError || slotsTimeError || startEndError){
            setFormState({
                ...formState,
                titleError,datesError,datesFormatError,startError,endError,zoneError,slotsError,votesPerSlotError,voterPerVoterError,
                invitesError,reminderError,deadlineError,deadlineFormatError,votesPerSlotError2,voterPerVoterError2,slotsBlockError,slotsTimeError,startEndError
            })
            return false
        }
        return true
    }

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate();

        if(isValid){
            
            ////////////////////////////////////////////////////////////////////////////
            for (const [key, value] of Object.entries(formState)) {
                console.log(key, value);
                formStateDictionary[key] = value
              }

            formStateDictionary["UniqueTitle"] = formStateDictionary["title"]
            tempDynamoJson = dataToItem(formStateDictionary);

            // var keysToDelete = ["titleError", "datesError", "datesFormatError", "startError",
            // "endError", "startEndError", "zoneError", "slotsError", "slotsBlockError",
            //  "slotsTimeError", "invitesError", "reminderError", "votesPerSlotError",
            //   "votesPerSlotError2", "voterPerVoterError", "voterPerVoterError2", "deadlineError", "deadlineFormatError"]
              
            // keysToDelete.forEach(tempDynamoJson.deleteFunc());


            dynamoJson["TableName"] = "SeniorDesignLab3DB";
            dynamoJson["Item"] = tempDynamoJson;

            console.log(dynamoJson);

            executePutItem(dynamoDbClient, putItemInput).then(() => {
                console.info('PutItem API call has been executed.')
              }
            );
            ////////////////////////////////////////////////////////////////////////////


            console.log(formState)
            formState.titleError=""
            formState.datesError=""
            formState.datesFormatError=""
            formState.startError=""
            formState.endError=""
            formState.zoneError=""
            formState.slotsError=""
            formState.slotsBlockError=""
            formState.slotsTimeError=""
            formState.invitesError=""
            formState.reminderError=""
            formState.votesPerSlotError=""
            formState.votesPerSlotError2=""
            formState.voterPerVoterError=""
            formState.voterPerVoterError2=""
            formState.deadlineError=""
            formState.deadlineFormatError=""
            formState.startEndError=""
            setFormState({
                ...formState
            })
        }
        else{
            console.log("Invalid")
            
        }
        
    }

    function intervals(startString, endString,x) {
        var start = moment(startString, 'YYYY-MM-DD hh:mm a');
        var end = moment(endString, 'YYYY-MM-DD hh:mm a');
        // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
        // note that 59 will round up to 60, and moment.js handles that correctly
        start.minutes(Math.ceil(start.minutes() / 15) * 15);
        var result = [];
        var current = moment(start);
        while (current <= end) {
            result.push(current.format('YYYY-MM-DD HH:mm'));
            current.add(x, 'minutes');
        }
        return result;
    }

    function formatDate(date) {
        var d = new Date(date);
        var hh = d.getHours();
        var m = d.getMinutes();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh-12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }
        m = m<10?"0"+m:m;
        
        h = h<10?"0"+h:h;
        var pattern = new RegExp("0?"+hh+":"+m);
        return date.replace(pattern,h+":"+m+" "+dd)
    }

    return(
        <section class="section">
        <h1 class="title">Create/Edit a Poll</h1>
        <div class="field">
            <label class="label">Title
                <div class="control">
                    <input class="input" name="title" type="text" placeholder="Required"  onChange={handleChange} value={formState.title}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.titleError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Location
                <div class="control">
                    <input class="input"  name="location" type="text" placeholder="Optional" onChange={handleChange} value={formState.location}/>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Notes
                <div class="control">
                    <input class="input" name="notes" type="text" placeholder="Optional" onChange={handleChange} value={formState.notes}/>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Dates
                <div class="control">
                    <input class="input" name="dates" type="text" placeholder="YYYY-MM-DD,YYYY-MM-DD,etc." onChange={handleChange} value={formState.dates}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.datesError}</div>
                    <div style ={{fontSize:12, color:"red"}}>{formState.datesFormatError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Start Time
                <div class="control">
                    <input class="input" name="start" type="text" placeholder="hh:mm am/pm" onChange={handleChange} value={formState.start}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.startError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">End Time
                <div class="control">
                    <input class="input" name="end" type="text" placeholder="hh:mm am/pm" onChange={handleChange} value={formState.end}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.endError}</div>
                    <div style ={{fontSize:12, color:"red"}}>{formState.startEndError}</div>
                </div>
            </label>
        </div>
        <div class="field">
        <label class="label">Time Zone</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.zoneError}</div>
            <div class="control">
                <div class="select">
                    <select name="zone" onChange={handleChange} value={formState.zone}>
                        <option>Select dropdown</option>
                        <option>CST</option>
                        <option>EST</option>
                        <option>PST</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
        <label class="label">Slot Selection By:</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.slotsError}</div>
            <div class="control">
                <label class="radio mr-4">
                    <input type="radio" name="Restrict0" checked={status4 === 1} onClick={(e) => radioHandler4(1)} />
                        Time
                </label>
                <label class="radio">
                    <input type="radio" name="Restrict0" checked={status4 === 2} onClick={(e) => radioHandler4(2)}/>
                        Blocks
                </label>
                </div>
                {status4 === 1 && (<div class="field">
            <label class="label">Time for each block
                <div class="control">
                    <input class="input"  name="slotsTime" type="text" placeholder="minutes" onChange={handleChange} value={formState.slotsTime}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.slotsTimeError}</div>
                </div>
            </label>
        </div>)}
        {status4 === 2 && (<div class="field">
            <label class="label">How many blocks
                <div class="control">
                    <input class="input"  name="slotsBlock" type="text" placeholder="number" onChange={handleChange} value={formState.slotsBlock}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.slotsBlockError}</div>
                </div>
            </label>
        </div>)}
        </div>
        <div class="field">
        <label class="label">Votes per Slot</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.votesPerSlotError2}</div>
            <div class="control">
                <label class="radio mr-4">
                    <input type="radio" name="Restrict" checked={status === 1} onClick={(e) => radioHandler(1)} />
                        Restrict
                </label>
                <label class="radio">
                    <input type="radio" name="Restrict" checked={status === 2} onClick={(e) => radioHandler(2)}/>
                        Not
                </label>
                </div>
                {status === 1 && (<div class="field">
            <label class="label">Restrict by
                <div class="control">
                    <input class="input"  name="votesPerSlot" type="text" placeholder="" onChange={handleChange} value={formState.votesPerSlot}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.votesPerSlotError}</div>
                </div>
            </label>
        </div>)}
        </div>
        <div class="field">
        <label class="label">Votes per Voter</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.voterPerVoterError2}</div>
            <div class="control">
                <label class="radio mr-4">
                    <input type="radio" name="Restrict2" checked={status2 === 1} onClick={(e) => radioHandler2(1)}/>
                        Restrict
                </label>
                <label class="radio">
                    <input type="radio" name="Restrict2" checked={status2 === 2} onClick={(e) => radioHandler2(2)}/>
                        Not
                </label>
                </div>
            {status2 === 1 && (<div class="field">
            <label class="label">Restrict by
                <div class="control">
                    <input class="input" name="voterPerVoter" type="text" placeholder="" onChange={handleChange} value={formState.voterPerVoter}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.voterPerVoterError}</div>
                </div>
            </label>
        </div>)}
        </div>
        <div class="field">
        <label class="label">Allow Invites</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.invitesError}</div>
            <div class="control">
                <label class="radio mr-6">
                    <input type="radio" name="invites" onChange={handleChange} value="yes"/>
                        Yes
                </label>
                <label class="radio">
                    <input type="radio" name="invites" onChange={handleChange} value="no"/>
                        No
                </label>
                </div>
        </div>
        <div class="field">
        <label class="label">Send Reminder</label>
        <div style ={{fontSize:12, color:"red"}}>{formState.reminderError}</div>
            <div class="control">
                <label class="radio mr-6">
                    <input type="radio" name="reminder" onChange={handleChange} value="yes"/>
                        Yes
                </label>
                <label class="radio">
                    <input type="radio" name="reminder" onChange={handleChange} value="no"/>
                        No
                </label>
                </div>
        </div>
        <div class="field">
        <label class="label">Set Deadline</label>
            <div class="control">
            <div style ={{fontSize:12, color:"red"}}>{formState.deadlineError}</div>
                <label class="radio mr-6">
                    <input type="radio" name="set" checked={status3 === 1} onClick={(e) => radioHandler3(1)}/>
                        Yes
                </label>
                <label class="radio">
                    <input type="radio" name="set" checked={status3 === 2} onClick={(e) => radioHandler3(2)}/>
                        No
                </label>
                </div>
            {status3 === 1 && (<div class="field">
            <label class="label">Deadline by
                <div class="control">
                    <input class="input" name="deadline" type="text" placeholder="DD-MM-YYYY hh:mm" onChange={handleChange} value={formState.deadline}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.deadlineFormatError}</div>
                </div>
            </label>
        </div>)}
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-warning" onClick={handleSubmit}>Publish</button>
            </div>
            <div class="control">
                <button class="button  is-warning is-light">Edit</button>
            </div>
        </div>
    </section>
    );
}
export default Form


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

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'AKIAQAUYDWTW6BQE2UFZ',
    secretAccessKey: 'AJaB8/T4erwVjJgGYaypk3gn4Dq1YR5B1zWWwtRG',
    region: 'us-east-1'
})

// Create the DynamoDB Client with the region you want
const region = 'us-east-1';
const dynamoDbClient = createDynamoDbClient(region);

// Create the input for putItem call
const putItemInput = createPutItemInput();
// const putItemInput = dynamoJson;


 // Call DynamoDB's putItem API
// executePutItem(dynamoDbClient, putItemInput).then(() => {
//     console.info('PutItem API call has been executed.')
//   }
// );

function createDynamoDbClient(regionName) {
  // Set the region
//   AWS.config.update({region: regionName});
  // Use the following config instead when using DynamoDB Local
//   AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'AKIAQAUYDWTW6BQE2UFZ', secretAccessKey: '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'});
  return new AWS.DynamoDB();
}

function createPutItemInput() {
  return dynamoJson
}

async function executePutItem(dynamoDbClient, putItemInput) {
  // Call DynamoDB's putItem API
  try {
    const putItemOutput = await dynamoDbClient.putItem(putItemInput).promise();
    console.info('Successfully put item.');
    // Handle putItemOutput
  } catch (err) {
    handlePutItemError(err);
  }
}

// Handles errors during PutItem execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
function handlePutItemError(err) {
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

// function deleteFunc(key) {
//     if(this.hasKey(key)) {
//        delete this.container[key];
//        return true;
//     }
//     return false;
//  }
