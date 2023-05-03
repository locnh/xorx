import React, { useState, useEffect } from 'react'
import { Paper, Group, Text, Button, TextInput } from '@mantine/core'
import { TokenButton } from './SwapUIElements'
import { getBalance, type Balance } from '@/utils/Accounts'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { getNativeToken, getStableCoins } from '@/utils/Tokens'
import { useAccount } from 'wagmi'

const SwapCard = (props: any) => {
  const { tokensList, token, setToken, myToken, amount, setAmount, openModal } = props
  const { address, isConnected } = useAccount()
  const { blockchain } = useBlockchain()

  const [balance, setBalance] = useState<number>(0)

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(event.target.value)
    const newValue = isNaN(parsedValue) ? '0' : parsedValue.toString()
    setAmount(newValue)
  }

  useEffect(() => {
    setToken(myToken ? getNativeToken(tokensList)[0] : getStableCoins(tokensList)[0])
    setAmount('')
  }, [tokensList, myToken, setAmount, setToken])

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        const data: Balance = await getBalance(address, token)
        if (data.formatted) setBalance(Number(data.formatted))
      }
    }

    fetchBalance()
  }, [token])

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">You pay</Text>
          {balance ? (
            myToken ? (
              <Button onClick={() => setAmount(balance)} size="xs" variant="subtle" radius="xl" compact>
                max
              </Button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </Group>
        {isConnected ? <Text size="xs">Balance: {balance}</Text> : ''}
      </Group>
      <Group position="apart">
        <TextInput
          type="number"
          step="any"
          inputMode="decimal"
          onChange={handleValueChange}
          placeholder="0"
          size="xl"
          variant="unstyled"
          value={amount}
          readOnly={!myToken}
        />
        <TokenButton token={token} myToken={myToken} openModal={openModal} />
      </Group>
      <Group position="apart">
        <Group position="left">
          <Text size="xs" color="dimmed">
            {token?.name}
          </Text>
        </Group>
        <Group position="right">
          <Text size="xs" color="dimmed">
            {token?.name}
          </Text>
        </Group>
      </Group>
    </Paper>
  )
}

export { SwapCard }
