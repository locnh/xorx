import { NextApiRequest, NextApiResponse } from 'next'
import {
  getStableCoins,
  getPopularTokens,
  getTokensList,
  getNativeToken,
  getTokenRate,
  getTokenFromContract,
  getCoinPrice,
} from '@/utils/Tokens'
import { maskAddress } from '@/utils/Formatter'

import { bsc as chain } from '@wagmi/chains'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const tokens = await getTokensList(chain)
  const popularCoins = getPopularTokens(tokens)
  const nativetoken = getNativeToken(popularCoins)[0]
  const stablecoin = getStableCoins(popularCoins)[0]
  // const { rate, fee } = await getTokenRate(nativetoken, stablecoin, chain)
  // // console.log('====chainId', chain.id)
  // // console.log('====popularCoins', popularCoins)
  // // console.log('====stablecoin', stablecoin)
  // // console.log('====native', nativetoken)
  // console.log('====rate & fee', rate, fee)
  // console.log(`1 ${nativetoken.symbol} = ${rate / 10 ** stablecoin.decimals} ${stablecoin.symbol}`)

  // const token = await getTokenFromContract('0xe9e7cea3dedca5984780bafc599bd69add087d56', chain)
  // console.log('====contract', token)

  const price = await getCoinPrice(nativetoken)
  console.log('====Price', price)

  // console.log(maskAddress('0xe9e7cea3dedca5984780bafc599bd69add087d56'))
  // console.log(maskAddress('0xe9e7cea3dedca5984780bafc599bd69add087d56', 0, 4))

  res.status(200).send({ ok: 'OK' })
}

export default handler
