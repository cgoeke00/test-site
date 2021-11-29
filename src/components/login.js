import React,{useState}  from 'react'
import { StaticImage } from "gatsby-plugin-image"


const Login = () =>  {
    
    const [loginState,setLoginstate] = useState({
        email:"",
        password:"",
        emailError:"",
        passwordError:"",
    })
    const handleChange = event => {
        setLoginstate({
            ...loginState,
            [event.target.name]:event.target.value
        })
    }
    const validate = () =>{
    let emailError = "";
    let passwordError = "";
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginState.email) == false || loginState.email == ""){
        emailError = "Invalid email"
    }
    if(!loginState.password){
        passwordError = "Invalid password"
    }
    if(emailError || passwordError){
        setLoginstate({
            ...loginState,
            emailError,passwordError
        })
        return false
    }
    return true
    }
    const handleSubmit = event =>{
    event.preventDefault()
    const isValid = validate();
        if(isValid){
            console.log(loginState)
            loginState.emailError ="";
            loginState.passwordError="";
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
                        <h3 class="title has-text-black">Login to Hawkeye Polling</h3>
                        <hr class="login-hr"></hr>
                        <p class="subtitle has-text-black">Go Hawks!</p>
                        <div class="box">
                            <figure class="avatar mb-4">
                                <StaticImage src="../images/Iowa_Hawkeyes_logo.svg.png"/>
                            </figure>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" name="email" type="email" placeholder="Your Email" onChange={handleChange} value={loginState.email}/>  
                                    <div style ={{fontSize:20, color:"red"}}>{loginState.emailError}</div>  
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" name="password" type="password" placeholder="Your Password" onChange={handleChange} value={loginState.password}/>
                                    <div style ={{fontSize:20, color:"red"}}>{loginState.passwordError}</div>
                                </div>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth is-warning" onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}
export default Login