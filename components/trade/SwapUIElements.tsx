import React from 'react'
import { Popover, ActionIcon, Text, TextInput, Group, Button, Image } from '@mantine/core'
import { AdjustmentsHorizontal, Percentage, ChevronDown } from 'tabler-icons-react'

const TokenButton = (props: any) => {
  const { token, myToken, openModal } = props

  return (
    <Button
      onClick={() => openModal(myToken)}
      leftIcon={<Image src={token?.logoURI} height={24} width={24} alt="" />}
      color="gray"
      radius="xl"
      variant="subtle"
    >
      {token?.symbol}
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
