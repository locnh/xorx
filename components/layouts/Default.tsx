import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import NoSsr from '../NoSsr'
import Header from './Header'
import Footer from './Footer'
import { AppShell } from '@mantine/core'

const Layout: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`${pageName} | XOR eXchange - The Next Generation DEX Aggregator`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.webp" />
    </Head>
    <NoSsr>
      <AppShell header={<Header />} footer={<Footer />}>
        {children}
      </AppShell>
    </NoSsr>
  </>
)

export default Layout
