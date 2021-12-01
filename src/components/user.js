import React,{useState}  from 'react'
import { StaticImage } from "gatsby-plugin-image"

const User = () => {
    const [submitstate,setSubmitState] = useState({
        date:"",
        times:"",
        type:"",
        dateFormatError:"",
        dateError: "",                       
        timesFormatError:"", 
        typeErr:"",


    })
    const handleChange = event => {
        setSubmitState({
            ...submitstate,
           [event.target.name]:event.target.value
        })
    }
    const validate = () => {
        let dateFormatError = ""
        let timesFormatError = ""
        let dateError = ""
        let typeErr = ""
        if(!submitstate.date){
            dateError ="Dates cannot be empty"
        }
        if(submitstate.date){
            let a = []
            a = submitstate.date.split(",")
            for(var i = 0; i<a.length;i++){
                if(!/^\d{2}([./-])\d{2}\1\d{4}$/.test(a[i])){
                    dateFormatError = "Invalid format for dates"
                }
            }
        }
        if(!submitstate.times || /^([01]\d|2[0-3]):([0-5]\d)$/.test(formState.start) == false){
            timesFormatError = "Invlaid format for time"
        }
        if(!submitstate.type){
            typeErr = "Please select a type"
        }
        if(typeErr || timesFormatError || dateError || dateFormatError ){
            setSubmitState({
                ...submitstate,
                dateError,dateFormatError, typeErr, timesFormatError 
            })
            return false
        }
        return true
    }

    const handleSubmit = event => {
        event.preventDefault()
        const isValid = validate();
        if(isValid){
            console.log(formState)
            submitstate.typeErr=""
            submitstate.dateError=""
            submitstate.dateFormatError=""
            
            setSubmitState({
                ...submitstate
            })
        }
        else{
            console.log("Invalid")
        }
    }
    return (
        <section class="section">
        <h1 class="title">User</h1>
        <div class="field">
            <label class="label">Date
                <div class="control">
                    <input class="input" name="date" type="text" placeholder="Required"  onChange={handleChange} value={formState.title}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.titleError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Times
                <div class="control">
                    <input class="input" name="times" type="text" placeholder="Required"  onChange={handleChange} value={formState.title}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.titleError}</div>
                </div>
            </label>
        </div>


        </section>




    )




    }

export default User

