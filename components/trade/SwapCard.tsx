import React from 'react'
import { Paper, Group, Text, Button, TextInput } from '@mantine/core'
import { TokenButton } from './SwapUIElements'

const SwapCard = (props: any) => {
  const { isConnected, token, myToken, balance, setBalance, amount, setAmount, openModal } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const amount = parseFloat(inputValue)
    console.log(amount)
    if (!isNaN(amount)) setAmount(amount)
  }

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">You pay</Text>
          {balance > 0 ? (
            myToken ? (
              <Button onClick={setBalance(balance)} size="xs" variant="subtle" radius="xl" compact>
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
        <TextInput type="number" onChange={handleChange} size="xl" variant="unstyled" value={amount} placeholder="0" />
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
