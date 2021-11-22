import React from 'react'
import "./mystyles.scss"
import { StaticImage } from "gatsby-plugin-image"

export default function admin() {
    return (
        <><nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <StaticImage src="../images/Iowa_Hawkeyes_logo.svg.png" width="50" height="28" />
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">
                        Hawkeye Polling
                    </a>
                </div>
            </div>
        </nav>
        <section class="section">
            <h1 class="title">Create/Edit a Poll</h1>
            <div class="field">
                <label class="label">Title
                    <div class="control">
                        <input class="input" type="text" placeholder="Required"/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Location
                    <div class="control">
                        <input class="input" type="text" placeholder="Optional"/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Notes
                    <div class="control">
                        <input class="input" type="text" placeholder="Optional"/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Dates
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DD,YYYY-MM-DD,etc."/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">Start Time
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DDThh:mm:ss.sssZ"/>
                    </div>
                </label>
            </div>
            <div class="field">
                <label class="label">End Time
                    <div class="control">
                        <input class="input" type="text" placeholder="YYYY-MM-DDThh:mm:ss.sssZ"/>
                    </div>
                </label>
            </div>
            <div class="field">
            <label class="label">Time Zone</label>
                <div class="control">
                    <div class="select">
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
                        <input class="input" type="text" placeholder="Required"/>
                    </div>
                </label>
            </div>
            <div class="field">
            <label class="label">Votes per Slot</label>
                <div class="control">
                    <label class="radio mr-4">
                        <input type="radio" name="question"/>
                            Restrict
                    </label>
                    <label class="radio">
                        <input type="radio" name="question"/>
                            Not
                    </label>
                 </div>
            </div>
            <div class="field">
            <label class="label">Votes per Voter</label>
                <div class="control">
                    <label class="radio mr-4">
                        <input type="radio" name="question"/>
                            Restrict
                    </label>
                    <label class="radio">
                        <input type="radio" name="question"/>
                            Not
                    </label>
                 </div>
            </div>
            <div class="field">
            <label class="label">Allow Invites</label>
                <div class="control">
                    <label class="radio mr-6">
                        <input type="radio" name="question"/>
                            Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="question"/>
                            No
                    </label>
                 </div>
            </div>
            <div class="field">
            <label class="label">Send Reminder</label>
                <div class="control">
                    <label class="radio mr-6">
                        <input type="radio" name="question"/>
                            Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="question"/>
                            No
                    </label>
                 </div>
            </div>
            <div class="field">
            <label class="label">Set Deadline</label>
                <div class="control">
                    <label class="radio mr-6">
                        <input type="radio" name="question"/>
                            Yes
                    </label>
                    <label class="radio">
                        <input type="radio" name="question"/>
                            No
                    </label>
                 </div>
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
