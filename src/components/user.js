import React,{useState}  from 'react'



var dynamoString = localStorage["dynamoResponse"]
var dynamoResponse = JSON.parse(dynamoString)
console.log("test")
console.log(dynamoResponse)


const optionsDates = []
for (let [key, interval] of Object.entries(dynamoResponse["intervals"])) {
    optionsDates.push({ value: interval, label: interval})
}
console.log(dynamoResponse["deadline"])


var y = dynamoResponse["deadline"]
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


//console.log(console.log(new Date().toLocaleString().replace(',','')))
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
                                    <button class="button is-warning" id="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
            </section>
        </div>


    )


}
export default User