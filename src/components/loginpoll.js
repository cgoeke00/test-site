import React,{useState}  from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"


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
        accessKeyId: 'AKIAQAUYDWTW6BQE2UFZ',
        secretAccessKey: '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',
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
    var response = returnData(loginState.title)
    console.log(response)
    ///////////////////////////////////////////////////////////////////////////////////////////


    if(response != null ){ // if query is successfull
        navigate("/userInterface/", {state: response}) //navigate to page and pass query result @ location.state.response
        return true
    }


    if(titleError){
        setLoginstate({
            ...loginState,
            titleError
        })
        return false
    }
    return false
    }


    
    const handleSubmit = event =>{
    event.preventDefault()
    const isValid = validate();
        if(isValid){
            //console.log(loginState)
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