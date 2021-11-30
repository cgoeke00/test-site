import React from 'react'


const Form = () => {
    const[formState,setFormState] = React.useState({
        title:"",
        location:"",
        notes:"",
        dates: "",
        start:"",
        end: "",
        zone: "",
        slots: "",
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
        zoneError:"",
        slotsError:"",
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
        let invitesError= "";
        let reminderError="";
        let votesPerSlotError ="";
        let votesPerSlotError2 ="";
        let voterPerVoterError= "";  
        let voterPerVoterError2= "";  
        let deadlineError ="";
        let deadlineFormatError="";
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
                if(!/^\d{2}([./-])\d{2}\1\d{4}$/.test(a[i])){
                    datesFormatError = "Invalid format for dates"
                }
            }
        }
        if(!formState.start || /^([01]\d|2[0-3]):([0-5]\d)$/.test(formState.start) == false){
            startError = "Invlaid format for time"
        }
        if(!formState.end || /^([01]\d|2[0-3]):([0-5]\d)$/.test(formState.end) == false){
            endError = "Invlaid format for time"
        }
        if(formState.zone == ''){
            zoneError = "Please select a Zone"
        }
        if(/^([1-9][0-9]{0,2}|1000)$/.test(formState.slots)==false){
            slotsError = "Please enter a slot number (1-999)"
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
        if(/^([1-9]|([012][0-9])|(3[01]))\-([0]{0,1}[1-9]|1[012])\-\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/.test(formState.deadline) == false && status3 == 1){
            deadlineFormatError = "Invalid format for deadline"
        }
        if(titleError || datesError || datesFormatError || startError || endError || slotsError || zoneError || votesPerSlotError || voterPerVoterError || deadlineError || invitesError || reminderError || deadlineFormatError || votesPerSlotError2 || voterPerVoterError2){
            setFormState({
                ...formState,
                titleError,datesError,datesFormatError,startError,endError,zoneError,slotsError,votesPerSlotError,voterPerVoterError,invitesError,reminderError,deadlineError,deadlineFormatError,votesPerSlotError2,voterPerVoterError2
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
            formState.titleError=""
            formState.datesError=""
            formState.datesFormatError=""
            formState.startError=""
            formState.endError=""
            formState.zoneError=""
            formState.slotsError=""
            formState.invitesError=""
            formState.reminderError=""
            formState.votesPerSlotError=""
            formState.votesPerSlotError2=""
            formState.voterPerVoterError=""
            formState.voterPerVoterError2=""
            formState.deadlineError=""
            formState.deadlineFormatError=""
            setFormState({
                ...formState
            })
        }
        else{
            console.log("Invalid")
        }
        
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
                    <input class="input" name="dates" type="text" placeholder="DD-MM-YYYY, DD-MM-YYYY,etc." onChange={handleChange} value={formState.dates}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.datesError}</div>
                    <div style ={{fontSize:12, color:"red"}}>{formState.datesFormatError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">Start Time
                <div class="control">
                    <input class="input" name="start" type="text" placeholder="hh:mm" onChange={handleChange} value={formState.start}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.startError}</div>
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">End Time
                <div class="control">
                    <input class="input" name="end" type="text" placeholder="hh:mm" onChange={handleChange} value={formState.end}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.endError}</div>
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
            <label class="label"># of Slots
                <div class="control">
                    <input class="input" name="slots" type="text" placeholder="Required" onChange={handleChange} value={formState.slots}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.slotsError}</div>
                </div>
            </label>
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
                    <input class="input" name="deadlinedate" type="text" placeholder="DD-MM-YYYY hh:mm" onChange={handleChange} value={formState.deadline}/>
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