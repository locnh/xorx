import React, { useState, useEffect } from 'react'
import { Paper, Group, Text } from '@mantine/core'
import { GasStation } from 'tabler-icons-react'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { type DEXQuote, getTokenRate } from '@/utils/Tokens'

const QuoteRate = (props: any) => {
  const { payToken, payAmount, getToken, setGetAmount } = props

  const { blockchain } = useBlockchain()

  const [quote, setQuote] = useState<DEXQuote>({
    rate: 0,
    estimatedGas: 0,
    fee: 0,
  })

  useEffect(() => {
    const fetchRate = async () => {
      if (payToken && getToken && payAmount) {
        const data: DEXQuote = await getTokenRate(payToken, getToken, blockchain)
        if (data.rate) setQuote(data)
      }
    }
    fetchRate()
  }, [payToken, getToken, blockchain, payAmount])

  useEffect(() => {
    const _amount = (payAmount * quote.rate) / 10 ** getToken?.decimals
    setGetAmount(_amount.toString())
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

export { QuoteRate }
