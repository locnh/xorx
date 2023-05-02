import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Group, Button, Paper, ActionIcon, Text, Stack, TextInput } from '@mantine/core'
import { ArrowsUpDown } from 'tabler-icons-react'
import { Address, useAccount } from 'wagmi'
import { getTokensList, type ERC20Token, getPopularTokens, getStableCoins, getNativeToken } from '@/utils/Tokens'
import { useBlockchain } from '@/contexts/BlockchainContext'
import ConnectButton from '@/components/common/ConnectButton'
import { SwapSettings, EstimatedRateGas, TokenButton, SearchTokens } from './SwapUIElements'

const Component = () => {
  const { blockchain } = useBlockchain()
  const { address, isConnected } = useAccount()

  console.log(blockchain)

  const [tokensList, setTokensList] = useState<ERC20Token[]>([])

  const [payToken, setPayToken] = useState<ERC20Token>()
  const [getToken, setGetToken] = useState<ERC20Token>()

  const [payAmount, setPayAmount] = useState(0)
  const [getAmount, setGetAmount] = useState(0)

  const [payTokenBalance, setPayTokenBalance] = useState(0)
  const [getTokenBalance, setGetTokenBalance] = useState(0)

  const [slippage, setSlippage] = useState(0.1)
  const [estimatedGas, setEstimatedGas] = useState(0)

  // True is changing payToken, False is changing getToken
  const [changeMyToken, setChangeMyToken] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [isModalOpened, modalHandler] = useDisclosure(false)

  const openModal = (bool: boolean) => {
    setChangeMyToken(bool)
    modalHandler.open()
  }

  const changeToken = (token: ERC20Token) => {
    if (changeMyToken) {
      getToken == token ? swapPayGetTokens() : setPayToken(token)
    } else {
      payToken == token ? swapPayGetTokens() : setGetToken(token)
    }
    setSearchTerm('')
    setPayAmount(0)
    setGetAmount(0)
    modalHandler.close()
  }

  const swapPayGetTokens = () => {
    const token = payToken
    setPayToken(getToken)
    setGetToken(token)
  }

  useEffect(() => {
    const fetchTokens = async () => {
      const _tokensList = await getTokensList(blockchain)
      setTokensList(_tokensList)
      setPayToken(getNativeToken(_tokensList)[0])
      setGetToken(getStableCoins(_tokensList)[0])
    }
    fetchTokens()
  }, [blockchain])

  return (
    <>
      <SearchTokens
        tokensList={tokensList}
        changeToken={changeToken}
        isModalOpened={isModalOpened}
        modalHandler={modalHandler}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Group position="center" p="xl">
        <Paper shadow="md" radius="md" p="md" withBorder style={{ minWidth: 400 }}>
          <Stack>
            <Group position="apart">
              <Text>Swap</Text>
              <SwapSettings slippage={slippage} setSlippage={setSlippage} />
            </Group>
            <Stack>
              <Paper radius="md" p="md" withBorder>
                <Group position="apart">
                  <Group position="left">
                    <Text size="xs">You pay</Text>
                    {payTokenBalance > 0 ? (
                      <Button size="xs" variant="subtle" radius="xl" compact>
                        max
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Group>
                  <Text size="xs">Balance: {payTokenBalance}</Text>
                </Group>
                <Group position="apart">
                  <TextInput variant="unstyled" value={payAmount} />
                  <TokenButton token={payToken} myToken={true} openModal={openModal} />
                </Group>
                <Group position="apart">
                  <Text size="xs" color="dimmed"></Text>
                  <Text size="xs" color="dimmed">
                    {payToken?.name}
                  </Text>
                </Group>
              </Paper>
              <Group position="center" style={{ margin: '-1rem' }}>
                <ActionIcon onClick={() => swapPayGetTokens()} radius="xl">
                  <ArrowsUpDown size={16} />
                </ActionIcon>
              </Group>
              <Paper radius="md" p="md" withBorder>
                <Group position="apart">
                  <Text size="xs">You get</Text>
                  <Text size="xs">Balance: {getTokenBalance}</Text>
                </Group>
                <Group position="apart">
                  <TextInput variant="unstyled" value={getAmount} readOnly />
                  <TokenButton token={getToken} myToken={false} openModal={openModal} />
                </Group>
                <Group position="apart">
                  <Text size="xs" color="dimmed"></Text>
                  <Text size="xs" color="dimmed">
                    {getToken?.name}
                  </Text>
                </Group>
              </Paper>
              <EstimatedRateGas />
              <Stack>
                {isConnected ? (
                  <Button size="lg" radius="xl" variant="gradient">
                    Swap
                  </Button>
                ) : (
                  <ConnectButton />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Group>
    </>
  )
}

export default Component
