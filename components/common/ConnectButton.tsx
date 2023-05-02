import React from 'react'
import { Connector, useConnect } from 'wagmi'
import { Button, UnstyledButton, Drawer, Stack, Group, Loader, Text, Avatar } from '@mantine/core'
import { Wallet } from 'tabler-icons-react'
import { useDisclosure } from '@mantine/hooks'

const Component = (props: any) => {
  const { connect, connectors, pendingConnector, isLoading } = useConnect()
  const [opened, { open, close }] = useDisclosure(false)

  const { isMobile } = props

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right" size="xs" padding="xl" title="Connect Wallet">
        <Stack>
          {connectors.map((connector, i) => (
            <UnstyledButton onClick={() => connect({ connector })} key={i}>
              <Group position="apart">
                {ConnectIcon(connector)}
                {isLoading && pendingConnector?.id === connector.id && <Loader variant="bars" />}
              </Group>
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>

      <Button radius="md" onClick={open} variant="gradient">
        <Wallet /> {isMobile ? '' : 'Connect Wallet'}
      </Button>
    </>
  )
}

const ConnectIcon = (connector: Connector) => {
  const size = 33

  switch (connector.id) {
    case 'walletConnect':
      return (
        <Group>
          <Avatar src="/images/walletConnectors/walletconnect.svg" size={size}></Avatar>
          <div>
            <Text>WalletConnect</Text>
            <Text size="xs" color="dimmed">
              Safepal, TrustWallet, ..
            </Text>
          </div>
        </Group>
      )
    case 'metaMask':
      return (
        <Group>
          <Avatar src="/images/walletConnectors/metamask.svg" size={size}></Avatar>
          <div>
            <Text>MetaMask</Text>
            <Text size="xs" color="dimmed">
              Metamask.io
            </Text>
          </div>
        </Group>
      )
    case 'injected':
      return (
        <Group>
          <Avatar src="/images/walletConnectors/safepal.png" size={size}></Avatar>
          <div>
            <Text>Browser</Text>
            <Text size="xs" color="dimmed">
              Safepal, Brave ...
            </Text>
          </div>
        </Group>
      )
    case 'ledger':
      return (
        <Group>
          <Avatar src="/images/walletConnectors/ledger.webp" size={size}></Avatar>
          <div>
            <Text>Ledger</Text>
            <Text size="xs" color="dimmed">
              Ledger.com
            </Text>
          </div>
        </Group>
      )

    case 'coinbaseWallet':
      return (
        <Group>
          <Avatar src="/images/walletConnectors/coinbasewallet.svg" size={size}></Avatar>
          <div>
            <Text>Coinbase Wallet</Text>
            <Text size="xs" color="dimmed">
              Coinbase.com
            </Text>
          </div>
        </Group>
      )
  }
}

export default Component
