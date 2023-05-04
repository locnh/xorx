import React, { useState, useEffect } from 'react'
import { Paper, Group, Text, Loader } from '@mantine/core'
import { GasStation } from 'tabler-icons-react'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { type DEXQuote, getTokenRate } from '@/utils/Tokens'
import { formatNumber } from '@/utils/Formatter'
import { refreshRateInterval } from '@/utils/AppConfig'

const QuoteRate = (props: any) => {
  const { payToken, payAmount, getToken, setGetAmount } = props

  const fee = process.env.FEE ? parseFloat(process.env.FEE) : 0

  const { blockchain } = useBlockchain()

  const [quoteLoading, setQuoteLoading] = useState<boolean>(false)

  const [quote, setQuote] = useState<DEXQuote>({
    rate: 0,
    estimatedGas: 0,
    fee: 0,
  })

  useEffect(() => {
    const fetchRate = async () => {
      if (payToken && getToken) {
        const data = await getTokenRate(payToken, getToken, blockchain, fee)
        if (data) {
          setQuote(data)
          setQuoteLoading(false)
        }
      }
    }

    setQuoteLoading(true)
    setTimeout(fetchRate, 600)

    const interval = setInterval(() => {
      setQuoteLoading(true)
      setTimeout(fetchRate, 600)
    }, refreshRateInterval)

    return () => clearInterval(interval)
  }, [payToken, getToken])

  useEffect(() => {
    const _amount = (payAmount * quote.rate) / 10 ** getToken?.decimals
    setGetAmount(_amount.toString())
  }, [payAmount, getToken, quote, setGetAmount])

  console.log(quote)
  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">
          {quoteLoading ? (
            <Loader size="xs" />
          ) : (
            <Text size="xs">
              {`1 ${payToken?.symbol} = ${formatNumber(quote?.rate / 10 ** getToken?.decimals)} ${getToken?.symbol}`}
            </Text>
          )}
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
