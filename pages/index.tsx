import React from 'react'
import { NextPage } from 'next'
import Swap from 'components/trade/Swap'
import Layout from 'components/layouts/Default'

const page: NextPage = () => {
  return (
    <Layout pageName="Home">
      <Swap />
    </Layout>
  )
}
export default page
