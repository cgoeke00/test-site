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
        voterPerVoterError:"",  
        deadlineError:"",
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
        let voterPerVoterError= "";  
        let deadlineError ="";
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
        if(!formState.slots){
            slotsError = "Please enter a slot number"
        }
        if((formState.votesPerSlot == "" && status == 1) || status == 0){
            votesPerSlotError = "Please enter a number"
        }
        if((formState.voterPerVoter == "" && status2 == 1)|| status2 == 0){
            voterPerVoterError = "Please enter a number"
        }
        if(!formState.invites){
            invitesError = "Select an option"
        }
        if(!formState.reminder){
            reminderError = "Select an option"
        }
        if((formState.deadline == "" && status3 == 1) || status3 == 0){
            deadlineError = "Please enter in a deadline"
        }
        if(titleError || datesError || datesFormatError || startError || endError || zoneError || votesPerSlotError || voterPerVoterError || deadlineError || invitesError || reminderError){
            setFormState({
                ...formState,
                titleError,datesError,datesFormatError,startError,endError,zoneError,votesPerSlotError,voterPerVoterError,invitesError,reminderError,deadlineError
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
            formState.voterPerVoterError=""
            formState.deadlineError=""
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
                    <input class="input" name="deadline" type="text" placeholder="DD-MM-YYYY:hh-mm" onChange={handleChange} value={formState.deadline}/>
                    <div style ={{fontSize:12, color:"red"}}>{formState.deadlineError}</div>
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