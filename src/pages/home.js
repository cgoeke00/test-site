import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const HomePage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Welcome to Hawkeye Polling!</h1>
    <h2> </h2>
    <Link to="/">Go to the admin portal</Link>
    <h1> </h1>
    <Link to="/pollloginpage/">Respond to a poll</Link>
  </Layout>
)

export default HomePage
