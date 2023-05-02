import React from 'react'
import { useAccount, useDisconnect, Address } from 'wagmi'
import { Anchor, Badge, Button, Menu, Group, Text, useMantineColorScheme } from '@mantine/core'
import { Power, Wallet, Sun, Moon, PigMoney, BrandDiscord, BrandGithub, BrandTwitter } from 'tabler-icons-react'
import ConnectButton from './ConnectButton'
import { maskAddress } from '@/utils/Formatter'

const Component = (props: any) => {
  const { address, isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const { isMobile } = props

  if (isConnected) {
    return (
      <Menu position="bottom-end">
        <Menu.Target>
          <Button color="gray" radius="md" leftIcon={<Wallet />}>
            {!isMobile ? maskAddress(address as Address) : maskAddress(address as Address, 0)}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Private zone</Menu.Label>
          <Menu.Item icon={<PigMoney />} disabled>
            <Group position="apart">
              <Anchor underline={false} color="DefaultMantineColor" href="/balance">
                Balance
              </Anchor>
              <Badge size="sm">soon</Badge>
            </Group>
          </Menu.Item>
          <Menu.Item onClick={() => toggleColorScheme()} icon={colorScheme === 'dark' ? <Sun /> : <Moon />}>
            Switch
          </Menu.Item>
          <Menu.Item onClick={() => disconnectAsync()} icon={<Power />}>
            Disconnect
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>
            <Text>Communities</Text>
          </Menu.Label>
          <Menu.Item icon={<BrandDiscord />}>
            <Anchor href="https://discord.gg/#" target="_blank" underline={false} color="DefaultMantineColor">
              Discord
            </Anchor>
          </Menu.Item>
          <Menu.Item icon={<BrandTwitter />}>
            <Anchor href="https://twitter.com/#" target="_blank" underline={false} color="DefaultMantineColor">
              Twitter
            </Anchor>
          </Menu.Item>
          <Menu.Item icon={<BrandGithub />}>
            <Anchor href="https://github.com/#" target="_blank" underline={false} color="DefaultMantineColor">
              Github
            </Anchor>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return <ConnectButton isMobile={isMobile} />
}

export default Component
