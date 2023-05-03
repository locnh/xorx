import { NextApiRequest, NextApiResponse } from 'next'
import { fee, referrerAddress } from 'utils/AppConfig'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { chainId, fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query

  const params =
    fee > 0
      ? {
          fee: fee,
          referrerAddress: referrerAddress,
          fromTokenAddress: fromTokenAddress,
          toTokenAddress: toTokenAddress,
          amount: amount,
          fromAddress: fromAddress,
          slippage: slippage,
        }
      : {
          fromTokenAddress: fromTokenAddress,
          toTokenAddress: toTokenAddress,
          amount: amount,
          fromAddress: fromAddress,
          slippage: slippage,
        }

  try {
    const response = await axios.get(`https://api.1inch.io/v5.0/${chainId}/swap`, { params: params })

    return res.status(response.status).send(response.data)
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).send(error.response.data)
    }

    return res.status(500).json({ statusCode: 500, error: 'Internal Server Error', message: 'Internal Server Error' })
  }
}

export default handler
