import React from "react"
import Layout from "../components/Layout"

const LinkAccountPage: React.FC = () => (
  <Layout>
    <h1>Link Account</h1>
    <form>
      <label>
        Provider:
        <select>
          <option value="plaid">Plaid</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">Paypal</option>
        </select>
      </label>
      <button>Link Account</button>
    </form>
  </Layout>
)

export default LinkAccountPage
