import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Group, Paper, ActionIcon, Text, Stack } from '@mantine/core'
import { ArrowsUpDown } from 'tabler-icons-react'
import { Address, useAccount } from 'wagmi'
import { getTokensList, type ERC20Token, getPopularTokens, getStableCoins, getNativeToken } from '@/utils/Tokens'
import { useBlockchain } from '@/contexts/BlockchainContext'
import ConnectButton from '@/components/common/ConnectButton'
import { SwapSettings, EstimatedRateGas, SearchTokens, SwapDexButton } from './SwapUIElements'
import { SwapCard } from './SwapCard'

const Component = () => {
  const { blockchain } = useBlockchain()
  const { isConnected } = useAccount()

  //console.log(blockchain)

  const [tokensList, setTokensList] = useState<ERC20Token[]>([])

  const [payToken, setPayToken] = useState<ERC20Token>()
  const [getToken, setGetToken] = useState<ERC20Token>()

  const [payAmount, setPayAmount] = useState<number | ''>('')
  const [getAmount, setGetAmount] = useState<number | ''>('')

  const [slippage, setSlippage] = useState<number>(0.1)
  const [estimatedGas, setEstimatedGas] = useState<number>(0)

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
      />
      <Group position="center" p="xl">
        <Paper shadow="md" radius="md" p="md" withBorder style={{ minWidth: 400 }}>
          <Stack>
            <Group position="apart">
              <Text>Swap</Text>
              <SwapSettings slippage={slippage} setSlippage={setSlippage} />
            </Group>
            <Stack>
              <SwapCard
                token={payToken}
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
                token={getToken}
                myToken={false}
                amount={getAmount}
                setAmount={setGetAmount}
                openModal={openModal}
              />
              <EstimatedRateGas
                payToken={payToken}
                payAmount={payAmount}
                setPayAmount={setPayAmount}
                getToken={getToken}
                getAmount={getAmount}
                setGetAmount={setGetAmount}
              />
              <Stack>{isConnected ? <SwapDexButton /> : <ConnectButton />}</Stack>
            </Stack>
          </Stack>
        </Paper>
      </Group>
    </>
  )
}

export default Component
