import React,{useState}  from 'react'



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
        let dateFormatError = ""
        let timesFormatError = ""
        let dateError = ""
        let typeErr = ""
        if(submitstate.date == ''){
            dateError ="Please Select a Date"
        }
        if(submitstate.times == ''){
            timesFormatError ="Please Select a Time"
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
            console.log(submitstate)
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
            <label class="label">Date</label>
                <div style ={{fontSize:12, color:"red"}}>{submitstate.dateError}</div>
                    <div class="control">
                        <div class="select">
                            <select name="zone" onChange={handleChange} value={submitstate.date}>
                                <option>Select dropdown</option>
                                <option>CST</option>
                                <option>EST</option>
                                <option>PST</option>
                            </select>
                        </div>
                    </div>
                </div> 
                <div class="field">
                <label class="label">Times</label>
                    <div style ={{fontSize:12, color:"red"}}>{submitstate.timesFormatError}</div>
                        <div class="control">
                            <div class="select">
                                <select name="zone" onChange={handleChange} value={submitstate.times}>
                                    <option>Select dropdown</option>
                                    <option>CST</option>
                                    <option>EST</option>
                                    <option>PST</option>
                                </select>
                            </div>
                        </div>
                    </div> 

                 <div class="field">
                <label class="label">Type</label>
                <div style ={{fontSize:12, color:"red"}}>{submitstate.typeErr}</div>
                    <div class="control">
                        <label class="radio mr-4">
                            <input type="radio" name="Restrict" checked={status === 1} onClick={(e) => radioHandler(1)}/>
                                Vote
                        </label>
                        <label class="radio">
                            <input type="radio" name="Restrict" checked={status === 2} onClick={(e) => radioHandler(2)}/>
                                Reserve
                        </label>
                    </div>
                 </div> 
                <div class="field is-grouped">
                <div class="control">
                    <button class="button is-warning" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
         </section>



    )


}
export default User

