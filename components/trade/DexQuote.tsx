import React, { useState, useEffect, useMemo } from 'react'
import { Paper, Group, Text, Loader } from '@mantine/core'
import { GasStation } from 'tabler-icons-react'
import { useBlockchain } from '@/contexts/BlockchainContext'
import { type DEXRate, getTokenRate, ERC20Token } from '@/utils/Tokens'
import { formatNumber } from '@/utils/Formatter'
import { refreshRateInterval, refreshFeeDataInterval } from '@/utils/AppConfig'
import { type FeeData, getFeeData } from '@/utils/Chains'

const fee = process.env.FEE ? parseFloat(process.env.FEE) : 0

export const DexQuote = (props: any) => {
  const { payToken, payAmount, getToken, setGetAmount, nativeToken } = props

  const { blockchain } = useBlockchain()

  const [quoteLoading, setQuoteLoading] = useState<boolean>(false)
  const [quote, setQuote] = useState<DEXRate | undefined>()
  const [feeData, setFeeData] = useState<FeeData | undefined>()

  const networkFee = useMemo(() => {
    if (feeData?.gasPrice && quote) {
      console.log(feeData)

      return feeData.gasPrice.toNumber() * quote.estimatedGas
    }
  }, [feeData, quote])

  const rateText = useMemo(
    () =>
      quote && `1 ${payToken?.symbol} = ${formatNumber(quote?.rate / 10 ** getToken?.decimals)} ${getToken?.symbol}`,
    [payToken, getToken, quote]
  )

  useEffect(() => {
    const fetchFeeData = async () => {
      const _feeData = await getFeeData(blockchain)
      _feeData && setFeeData(_feeData)
    }

    fetchFeeData()

    const interval = setInterval(() => {
      fetchFeeData()
    }, refreshFeeDataInterval)

    return () => clearInterval(interval)
  }, [blockchain])

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
    if (quote) {
      const _amount = (payAmount * quote.rate) / 10 ** getToken?.decimals
      setGetAmount(_amount.toString())
    }
  }, [payAmount, getToken, quote, setGetAmount])

  return (
    <Paper radius="md" p="md" withBorder>
      <Group position="apart">
        <Group position="left">{quoteLoading ? <Loader size="xs" /> : <Text size="xs">{rateText}</Text>}</Group>
        <Group position="right">
          <GasStation size={14} />
          <Text size="xs">{quote?.estimatedGas}</Text>
        </Group>
      </Group>
      <Group position="apart">
        <Group position="left">
          <Text size="xs">Network Fee</Text>
        </Group>
        <Group position="right">
          <Text size="xs">
            {networkFee &&
              `${formatNumber(networkFee / 10 ** (nativeToken as ERC20Token).decimals, 4)} ${nativeToken.symbol}`}
          </Text>
        </Group>
      </Group>
    </Paper>
  )
}
