import React, { useState, useEffect } from 'react'
import { Paper, Group, Text, Button, TextInput } from '@mantine/core'
import { TokenButton } from './SwapUIElements'
import { getBalance, type Balance } from '@/utils/Accounts'
import { useAccount } from 'wagmi'

const SwapCard = (props: any) => {
  const { token, myToken, amount, setAmount, openModal } = props
  const { address, isConnected } = useAccount()

  const [balance, setBalance] = useState<number>(0)

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(event.target.value)
    const newValue = isNaN(parsedValue) ? '' : parsedValue.toString()
    setAmount(newValue)
  }

  useEffect(() => {
    const fetchBalance = async () => {
      if (address && isConnected) {
        const data: Balance = await getBalance(address, token)
        if (data.formatted) setBalance(Number(data.formatted))
      }
    }

    fetchBalance()
  }, [address, isConnected, token])

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
