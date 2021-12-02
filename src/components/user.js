import React,{useState}  from 'react'



var dynamoString = localStorage["dynamoResponse"]
var dynamoResponse = JSON.parse(dynamoString)
console.log("test")
console.log(dynamoResponse)


const optionsDates = []
for (let [key, interval] of Object.entries(dynamoResponse["intervals"])) {
    optionsDates.push({ value: interval, label: interval})
  }


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
            
            
            console.log(submitstate)

            delete submitstate.typeErr
            delete submitstate.dateError
            delete submitstate.timesFormatError
            delete submitstate.nameError


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
            </section>
        </div>


    )


}
export default User