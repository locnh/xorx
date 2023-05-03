import React, { useEffect, useState } from 'react'
import { Popover, ActionIcon, Text, TextInput, Paper, Group, Button, Modal, Stack, Image, Space } from '@mantine/core'
import { AdjustmentsHorizontal, Percentage, GasStation, ChevronDown, Search } from 'tabler-icons-react'
import { ERC20Token, DEXQuote, getTokenRate } from '@/utils/Tokens'
import { useBlockchain } from '@/contexts/BlockchainContext'

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

const EstimatedRateGas = (props: any) => {
  const { payToken, payAmount, setPayAmount, getToken, getAmount, setGetAmount } = props

  const { blockchain } = useBlockchain()
  const [quote, setQuote] = useState<DEXQuote>({
    rate: 0,
    estimatedGas: 0,
    fee: 0,
  })

  useEffect(() => {
    const fetchRate = async () => {
      const data: DEXQuote = await getTokenRate(payToken, getToken, blockchain)
      if (data.rate) setQuote(data)
    }
    fetchRate()
  }, [payToken, getToken, blockchain])

  useEffect(() => {
    const _amount = (payAmount * quote.rate) / 10 ** getToken.decimals
    setGetAmount(_amount)
  }, [payAmount, getToken, quote, setGetAmount])

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">{`1 ${payToken?.symbol} = ${quote?.rate / 10 ** getToken?.decimals} ${
            getToken?.symbol
          }`}</Text>
        </Group>
        <Group position="right">
          <GasStation size={14} />
          <Text size="xs">{quote?.estimatedGas}</Text>
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
  const { tokensList, isModalOpened, modalHandler, changeToken } = props

  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <Modal opened={isModalOpened} onClose={modalHandler.close} withCloseButton={false} centered>
      <Stack>
        <TextInput
          icon={<Search />}
          value={searchTerm}
          placeholder="Search name or contract address"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) => setSearchTerm('')}
        />
        <Group>
          {tokensList.map((token: ERC20Token, i: any) =>
            searchTerm.length > 1 &&
            (token.symbol.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
              token.address.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ? (
              <Button
                onClick={() => changeToken(token)}
                leftIcon={<Image src={token.logoURI} height={24} width={24} alt="" />}
                color="gray"
                radius="xl"
                uppercase
                key={i}
              >
                {token.symbol}
              </Button>
            ) : (
              ''
            )
          )}
        </Group>
      </Stack>
    </Modal>
  )
}

export { SwapSettings, EstimatedRateGas, TokenButton, ChooseTokenButton, SearchTokens, SwapDexButton }
