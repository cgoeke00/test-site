import React from "react"
import "./mystyles.scss"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <><nav class="navbar is-black" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <StaticImage src="../images/Iowa_Hawkeyes_logo.svg.png" width="50" height="28"/>
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
    <section class="hero is-warning is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" class="box">
                  <div class="field">
                    <label for="" class="label">Email</label>
                      <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required />
                  </div>
                  <div class="field">
                    <label for="" class="label">Password</label>
                      <input type="password" placeholder="*******" class="input" required />
                  </div>
                  <div class="field">
                    <label for="" class="checkbox">
                      <input type="checkbox" />
                    Remember me
                    </label>
                  </div>
                  <div class="field">
                    <button class="button is-warning">
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
