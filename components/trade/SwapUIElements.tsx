import React from 'react'
import { Popover, ActionIcon, Text, TextInput, Group, Button, Image, Avatar } from '@mantine/core'
import { AdjustmentsHorizontal, Percentage, ChevronDown } from 'tabler-icons-react'
import { ERC20Token } from '@/utils/Tokens'
import { ASSETS_CDN } from '@/utils/AppConfig'

const TokenButton = (props: any) => {
  const { token, myToken, openModal } = props

  return (
    <Button
      onClick={() => openModal(myToken)}
      leftIcon={
        <Avatar src={token && `${ASSETS_CDN}/${token?.symbol.toLowerCase()}.webp`} size={24} radius="xl">
          {token?.symbol.slice(0, 3)}
        </Avatar>
      }
      variant=""
      pr={0}
    >
      <Text pr={6}>{token?.symbol}</Text>
      <ChevronDown size={18} />
    </Button>
  )
}

const ChooseTokenButton = () => (
  <Button variant="light" radius="xl" compact>
    Choose token <ChevronDown />
  </Button>
)

const SwapDexButton = () => (
  <Button size="xl" radius="lg" variant="gradient">
    Swap
  </Button>
)

const SwapSettings = (props: any) => {
  const { slippage, setSlippage } = props

  return (
    <Popover position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon>
          <AdjustmentsHorizontal />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group position="apart">
          <Text size="sm">Slippage:</Text>
          <TextInput
            style={{ width: '6em' }}
            icon={<Percentage />}
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export { SwapSettings, TokenButton, ChooseTokenButton, SwapDexButton }
