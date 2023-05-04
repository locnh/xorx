import React, { useState, useEffect } from 'react'
import { Paper, Group, Text } from '@mantine/core'
import { GasStation } from 'tabler-icons-react'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { type DEXQuote, getTokenRate } from '@/utils/Tokens'
import { formatNumber } from '@/utils/Formatter'

const QuoteRate = (props: any) => {
  const { payToken, payAmount, getToken, setGetAmount } = props

  const fee = process.env.FEE ? parseFloat(process.env.FEE) : 0

  const { blockchain } = useBlockchain()

  const [quote, setQuote] = useState<DEXQuote>({
    rate: 0,
    estimatedGas: 0,
    fee: 0,
  })

  useEffect(() => {
    const fetchRate = async () => {
      if (payToken && getToken) {
        const data = await getTokenRate(payToken, getToken, blockchain, fee)
        if (data) setQuote(data)
      }
    }
    fetchRate()
  }, [payToken, getToken])

  useEffect(() => {
    const _amount = (payAmount * quote.rate) / 10 ** getToken?.decimals
    setGetAmount(_amount.toString())
  }, [payAmount, getToken, quote, setGetAmount])

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">{`1 ${payToken?.symbol} = ${formatNumber(
            (quote?.rate / 10 ** getToken?.decimals).toString()
          )} ${getToken?.symbol}`}</Text>
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
