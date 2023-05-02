import React from 'react'
import Link from 'next/link'
import Logo from '../common/Logo'
import ProfileMenu from 'components/common/ProfileMenu'
import NetworkMenu from 'components/common/NetworkMenu'
import BridgeMenu from 'components/common/BridgeMenu'
import TradeMenu from 'components/common/TradeMenu'
import DAOMenu from 'components/common/DAOMenu'
import BurgerMenu from 'components/common/BurgerMenu'

import { Header, Group, MediaQuery } from '@mantine/core'

const Component = () => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md" withBorder={false}>
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Group position="apart">
          <Group position="left">
            <Link href="/">
              <Logo />
            </Link>
            <TradeMenu />
            <DAOMenu />
          </Group>
          <Group position="right">
            <NetworkMenu />
            <ProfileMenu />
          </Group>
        </Group>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Group position="apart">
          <Group position="left" spacing="xs">
            <Link href="/">
              <Logo />
            </Link>
            <BurgerMenu />
          </Group>
          <Group position="right" spacing="xs">
            <NetworkMenu isMobile={true} />
            <ProfileMenu isMobile={true} />
          </Group>
        </Group>
      </MediaQuery>
    </Header>
  )
}

export default Component
