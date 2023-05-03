import React from 'react'
import { Paper, Group, Text, Button, TextInput } from '@mantine/core'
import { TokenButton } from './SwapUIElements'

const SwapCard = (props: any) => {
  const { isConnected, token, myToken, balance, setBalance, amount, setAmount, openModal } = props

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(event.target.value)
    const newValue = isNaN(parsedValue) ? '' : parsedValue.toString()
    setAmount(newValue)
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
        <TextInput
          type="number"
          inputMode="decimal"
          onChange={handleValueChange}
          placeholder="0"
          size="xl"
          variant="unstyled"
          value={amount}
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
