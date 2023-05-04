import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Group, Paper, ActionIcon, Text, Stack } from '@mantine/core'
import { ArrowsUpDown } from 'tabler-icons-react'
import { Address, useAccount } from 'wagmi'
import { getTokensList, type ERC20Token, getPopularTokens, getStableCoins, getNativeToken } from '@/utils/Tokens'
import { useBlockchain } from '@/contexts/BlockchainContext'
import ConnectButton from '@/components/common/ConnectButton'
import { SwapSettings, SwapDexButton } from './SwapUIElements'
import { SearchTokens } from './SearchTokens'
import { QuoteRate } from './QuoteRate'
import { SwapCard } from './SwapCard'

const Component = () => {
  const { blockchain } = useBlockchain()
  const { address, isConnected } = useAccount()

  const [tokensList, setTokensList] = useState<ERC20Token[]>([])

  const [payToken, setPayToken] = useState<ERC20Token>()
  const [getToken, setGetToken] = useState<ERC20Token>()

  const [payAmount, setPayAmount] = useState<number | ''>('')
  const [getAmount, setGetAmount] = useState<number | ''>('')

  const [slippage, setSlippage] = useState<number>(0.1)

  // True is changing payToken, False is changing getToken
  const [changeMyToken, setChangeMyToken] = useState<boolean>(false)

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
    modalHandler.close()
  }

  const swapPayGetTokens = () => {
    const token = payToken
    setPayToken(getToken)
    setGetToken(token)

    const amount = payAmount
    setPayAmount(getAmount)
    setGetAmount(amount)
  }

  useEffect(() => {
    const fetchTokens = async () => {
      const _tokensList = await getTokensList(blockchain)
      setTokensList(_tokensList)
    }
    fetchTokens()
  }, [blockchain, address])

  return (
    <>
      <SearchTokens
        tokensList={tokensList}
        changeToken={changeToken}
        isModalOpened={isModalOpened}
        modalHandler={modalHandler}
      />
      <Group position="center" p="xl">
        <Paper shadow="md" radius="md" p="md" withBorder style={{ minWidth: 390 }}>
          <Stack>
            <Group position="apart">
              <Text>Swap</Text>
              <SwapSettings slippage={slippage} setSlippage={setSlippage} />
            </Group>
            <Stack>
              <SwapCard
                tokensList={tokensList}
                token={payToken}
                setToken={setPayToken}
                myToken={true}
                amount={payAmount}
                setAmount={setPayAmount}
                openModal={openModal}
              />
              <Group position="center" style={{ margin: '-1rem' }}>
                <ActionIcon onClick={() => swapPayGetTokens()} radius="xl">
                  <ArrowsUpDown size={16} />
                </ActionIcon>
              </Group>
              <SwapCard
                tokensList={tokensList}
                token={getToken}
                setToken={setGetToken}
                myToken={false}
                amount={getAmount}
                setAmount={setGetAmount}
                openModal={openModal}
              />
              {payAmount ? (
                <QuoteRate
                  payToken={payToken}
                  payAmount={payAmount}
                  setPayAmount={setPayAmount}
                  getToken={getToken}
                  setGetAmount={setGetAmount}
                />
              ) : (
                <></>
              )}
              <Stack>{isConnected ? <SwapDexButton /> : <ConnectButton />}</Stack>
            </Stack>
          </Stack>
        </Paper>
      </Group>
    </>
  )
}

export default Component
