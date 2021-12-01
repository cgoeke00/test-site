import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../pages/mystyles.scss"

const Header = () => {
  return(
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
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
  )
}

export default Header
