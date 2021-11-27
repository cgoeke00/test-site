import React, {useState} from "react"
import "./mystyles.scss"
import Header from "../components/header"

const IndexPage = () => {
 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  function print () {
    console.log(email)
    console.log(password)
  }
  return (
    <><Header></Header>
    <section class="hero is-warning is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" class="box">
                <div class="field">
                  <label for="" class="label">Email</label>
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" onChange={event => setEmail(event.target.value)} required />
                </div>
                <div class="field">
                  <label for="" class="label">Password</label>
                  <input type="password" placeholder="*******" class="input" onChange={event => setPassword(event.target.value)} required />
                </div>
                <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div class="field">
                  <button class="button is-warning" onClick={() => print()}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section></>
  )
}

export default IndexPage
