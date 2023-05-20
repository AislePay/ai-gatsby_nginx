import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

// This is a placeholder. In a real application, you would use authentication state.
const isAuthenticated = false;

const HomePage: React.FC = () => (
  <Layout>
    <h1>Welcome</h1>
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/link-account">Link Account</Link></li>
            <li><Link to="/create-transaction">Create Transaction</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/signin">Signin</Link></li>
          </>
        )}
      </ul>
    </nav>
  </Layout>
)

export default HomePage

