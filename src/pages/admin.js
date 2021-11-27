import React from 'react'
import { useForm } from "react-hook-form";
import Header from '../components/header'
import "./mystyles.scss"



export default function Admin() {
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
    //started to work on form validation 
    const validateTitle = data=> {
        const errors = {};
        if(!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(data.start)){
            errors.title='Please Enter valid start'
        }
    }
    const form = useForm({
        values: {
            title:'',
            location:'',
            notes:'',
            dates: '',
            start:'',
            end: '',
            zone: '',
            slots: '',
            votesPerSlot: '',
            voterPerVoter: '',  
            deadline: '',
        },
        validate:validateTitle,
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    });
    return (
        <><Header></Header>
        <section class="section">
            <h1 class="title">Create/Edit a Poll</h1>
            <div class="field">
                <label class="label">Title
                    <div class="control">
                        <input class="input" type="text" placeholder="Required" value={form.title}/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Location
                    <div class="control">
                        <input class="input" type="text" placeholder="Optional" value={form.location}/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Notes
                    <div class="control">
                        <input class="input" type="text" placeholder="Optional" value={form.notes}/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Dates
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DD,YYYY-MM-DD,etc." value={form.dates}/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Start Time
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DDThh:mm:ss.sssZ" value={form.start}/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">End Time
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DDThh:mm:ss.sssZ" value={form.end}/>
                    </div>
                </label>
            </div>
            <div class="field">
            <label class="label">Time Zone</label>
                <div class="control">
                    <div class="select" value={form.zone}>
                        <select>
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
                        <input class="input" type="text" placeholder="Required" value={form.slots}/>
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
                        <input class="input" type="text" placeholder="" value={form.votesPerSlot}/>
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
                        <input class="input" type="text" placeholder="" value={form.voterPerVoter}/>
                    </div>
                </label>
            </div>)}
            </div>
            <div class="field">
            <label class="label">Allow Invites</label>
                <div class="control">
                    <label class="radio mr-6">
                        <input type="radio" name="Invites"/>
                            Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="Invites"/>
                            No
                    </label>
                 </div>
            </div>
            <div class="field">
            <label class="label">Send Reminder</label>
                <div class="control">
                    <label class="radio mr-6">
                        <input type="radio" name="send"/>
                            Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="send"/>
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
                        <input class="input" type="text" placeholder="YYYY-MM-DDThh:mm:ss.sssZ" value={form.deadline}/>
                    </div>
                </label>
            </div>)}
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-warning">Publish</button>
                </div>
                <div class="control">
                    <button class="button  is-warning is-light">Edit</button>
                </div>
            </div>
        </section>
        </>
    )
}
