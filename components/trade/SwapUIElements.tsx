import React from 'react'
import Image from 'next/image'
import { Popover, ActionIcon, Text, TextInput, Paper, Group, Button, Modal, Stack } from '@mantine/core'
import { AdjustmentsHorizontal, Percentage, GasStation, ChevronDown, Search } from 'tabler-icons-react'
import { ERC20Token } from '@/utils/Tokens'

const TokenButton = (props: any) => {
  const { token, myToken, openModal } = props

  return (
    <Button
      onClick={() => openModal(myToken)}
      leftIcon={<Image src={token?.logoURI} height={24} width={24} alt={token?.name} />}
      color="gray"
      radius="xl"
      variant="subtle"
      uppercase
      compact
    >
      {token?.symbol} <ChevronDown />
    </Button>
  )
}

const ChooseTokenButton = () => (
  <Button variant="light" radius="xl" compact>
    Choose token <ChevronDown />
  </Button>
)

const EstimatedRateGas = (props: any) => {
  const { estimatedGas } = props

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">rate</Text>
        </Group>
        <Group position="right">
          <GasStation size={14} />
          <Text size="xs">{estimatedGas}</Text>
        </Group>
      </Group>
    </Paper>
  )
}

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

const SearchTokens = (props: any) => {
  const { tokensList, isModalOpened, modalHandler, changeToken, searchTerm, setSearchTerm } = props

  return (
    <Modal opened={isModalOpened} onClose={() => modalHandler.close()} withCloseButton={false} centered>
      <Stack>
        <TextInput
          icon={<Search />}
          value={searchTerm}
          placeholder="Search name or contract address"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Group>
          {tokensList.map((token: ERC20Token) => {
            if (
              searchTerm &&
              (token.symbol.toLowerCase().search(searchTerm.toLowerCase()) !== -1 ||
                token.address.toLowerCase().search(searchTerm.toLowerCase()) !== -1)
            ) {
              return (
                <Button
                  onClick={() => changeToken(token)}
                  leftIcon={<Image src={token.logoURI} height={24} width={24} alt={token.name} />}
                  color="gray"
                  radius="xl"
                  uppercase
                  key={token.address}
                >
                  {token.symbol}
                </Button>
              )
            } else {
              return
            }
          })}
        </Group>
      </Stack>
    </Modal>
  )
}

export { SwapSettings, EstimatedRateGas, TokenButton, ChooseTokenButton, SearchTokens }
