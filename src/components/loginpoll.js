import React,{useState}  from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
var dynamoResponse = null
var dynamoResponseFinal = null


const Loginpoll = () =>  {
    
    const [loginState,setLoginstate] = useState({
        title:"",
        titleError:"",
    })
    const handleChange = event => {
        setLoginstate({
            ...loginState,
            [event.target.name]:event.target.value
        })
    }
    const validate = () =>{
    let titleError = "";


    //query database with primary key = title ////////////////////////////////////////
    const AWS = require('aws-sdk');


    function createDynamoDbClient() {
    // Set the region
    AWS.config.update({
        accessKeyId: 'AKIAQAUYDWTWU6XJ2JL7',
        secretAccessKey: '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',
        region: 'us-east-1'
    })
    return new AWS.DynamoDB();
    }


    function returnData(UniqueTitle){

        const documentClient = new AWS.DynamoDB.DocumentClient()

        dynamoResponse = documentClient
        .get({
            TableName: "SeniorDesignLab3DB",
            Key: {
            'UniqueTitle': UniqueTitle
            },
        })
        .promise()
        .then(data => {return data.Item}) 
        .catch(console.error)
    }


    createDynamoDbClient();
    returnData(loginState.title)

    const returnDataHelper = async () => {
        dynamoResponseFinal = await dynamoResponse;
        
        console.log(dynamoResponseFinal)

        if(dynamoResponseFinal != null){ // if query is successfull
            localStorage["dynamoResponse"] = JSON.stringify(dynamoResponseFinal)
            navigate("/userInterface/", {state: {dynamoResponseFinal}}) //navigate to page and pass query result @ location.state.data
        }
        else {
            setLoginstate({
                ...loginState,
                titleError
            })
        }
    };

    returnDataHelper();


    ///////////////////////////////////////////////////////////////////////////////////////////
}

    
    const handleSubmit = event =>{
    event.preventDefault()
    const isValid = validate();
        if(isValid){
            console.log(loginState)
            loginState.titleError ="";
            setLoginstate({
                ...loginState
            })
        } else{
            console.log("error")
        }

    }
    
    
    return (
        
        <section class="hero is-success is-fullheight is-warning">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title has-text-black">User Poll Access</h3>
                        <hr class="login-hr"></hr>
                        <p class="subtitle has-text-black">Go Hawks!</p>
                        <div class="box">
                            <figure class="avatar mb-4">
                                <StaticImage src="../images/Iowa_Hawkeyes_logo.svg.png"/>
                            </figure>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" name="title" type="title" placeholder="Enter name of desired poll." onChange={handleChange} value={loginState.title}/>  
                                    <div style ={{fontSize:20, color:"red"}}>{loginState.titleError}</div>  
                                </div>
                            </div>
                            <button class= "button is-block is-info is-large is-fullwidth is-warning"  onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}
export default Loginpoll