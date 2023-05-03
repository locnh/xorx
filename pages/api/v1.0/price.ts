import { NextApiRequest, NextApiResponse } from 'next'
import { CoinGeckoClient } from 'coingecko-api-v3'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query

  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  })

  if (symbol) {
    const coinsList = await client.coinList({ include_platform: false })

    if (coinsList) {
      const coin = coinsList.find((_coin) => symbol.toString().toLowerCase() === (_coin.symbol as string).toLowerCase())
      if (coin) {
        const input = {
          ids: coin.id as string,
          vs_currencies: 'usd',
        }

        const price = await client.simplePrice(input)
        return res.status(200).json(price[coin.id as string])
      }
    }
  }

  return res.status(404).json({ message: 'Coin not found' })
}

export default handler
