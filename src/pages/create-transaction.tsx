import React from "react"
import Layout from "../components/Layout"

const CreateTransactionPage: React.FC = () => (
  <Layout>
    <h1>Create Transaction</h1>
    <form>
      <label>
        Linked Account ID:
        <input type="text" name="linkedAccountId" />
      </label>
      <label>
        Amount:
        <input type="number" name="amount" />
      </label>
      <label>
        Description:
        <input type="text" name="description" />
      </label>
      <button>Create Transaction</button>
    </form>
  </Layout>
)

export default CreateTransactionPage
