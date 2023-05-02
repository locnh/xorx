import React from 'react'
import { Image, Anchor } from '@mantine/core'

const Logo = () => (
  <Anchor href="/">
    <Image src="/images/logo.webp" height={30} width={30} alt="Home" />
  </Anchor>
)

export default Logo
