import axios from 'axios'
import { API_ENDPOINT_1INCH, API_ENDPOINT_COINGECKO } from './Endpoints'
import { Chain, Address, erc20ABI } from 'wagmi'
import { getContract, getProvider } from '@wagmi/core'

const POPULAR_COINS = [
  'ETH',
  'WETH',
  'WBTC',
  'BBTC',
  'BNB',
  'WBNB',
  'USDT',
  'USDC',
  'BUSD',
  'DAI',
  'DOT',
  'LTC',
  'SHIB',
  'LINK',
]
const STABLE_COINS = ['USDT', 'USDC']

export interface CoinGecko {
  id: string
  symbol: string
  name: string
}

export interface ERC20Token {
  symbol: string
  name: string
  decimals: number
  address: Address
  logoURI: string
  tags: string[]
}

export interface DEXQuote {
  rate: number
  estimatedGas: number
  fee: number
}

export interface CoinPrice {
  currency: string
  rate: number
}

const getTokensList = async (chain: Chain): Promise<ERC20Token[]> => {
  const GET_TOKEN_LIST_ENDPOINT = `${API_ENDPOINT_1INCH}/${chain.id}/tokens`
  try {
    const response = await axios.get(GET_TOKEN_LIST_ENDPOINT)
    const { tokens } = response.data

    return Object.values(tokens).map((token) => token as ERC20Token)
  } catch (error: any) {
    console.log(error)
    return []
  }
}

const getNativeToken = (TokensList: ERC20Token[]): ERC20Token[] =>
  TokensList.filter((token) => token.tags.includes('native'))

const getPopularTokens = (TokensList: ERC20Token[]): any[] =>
  TokensList.filter((token) => POPULAR_COINS.includes(token.symbol))

const getStableCoins = (TokensList: ERC20Token[]): ERC20Token[] =>
  TokensList.filter((token) => STABLE_COINS.includes(token.symbol))

const getTokenRate = async (
  fromToken: ERC20Token,
  toToken: ERC20Token,
  chain: Chain,
  xfee: number = 0
): Promise<DEXQuote | undefined> => {
  const GET_QUOTE_ENDPOINT = `${API_ENDPOINT_1INCH}/${chain.id}/quote`
  const params = {
    fee: xfee,
    fromTokenAddress: fromToken?.address,
    toTokenAddress: toToken?.address,
    amount: 10 ** fromToken?.decimals,
  }
  try {
    const response = await axios.get(GET_QUOTE_ENDPOINT, { params: params })
    const { toTokenAmount, estimatedGas } = response.data

    return { rate: toTokenAmount, estimatedGas: estimatedGas, fee: xfee } as DEXQuote
  } catch (error: any) {
    console.log(error)
    return
  }
}

const getTokenFromContract = async (contractAddress: Address, chain: Chain): Promise<ERC20Token | null> => {
  const provider = getProvider({ chainId: chain.id })

  const contract = getContract({
    address: contractAddress,
    abi: erc20ABI,
    signerOrProvider: provider,
  })

  if (contract) {
    const token: ERC20Token = {
      symbol: await contract.symbol(),
      name: await contract.name(),
      decimals: await contract.decimals(),
      address: contract.address as Address,
      logoURI: '',
      tags: ['tokens'],
    }
    return token
  }

  return null
}

const getCoinsList = async (): Promise<CoinGecko[] | undefined> => {
  const params = { include_platform: false }
  const response = await axios.get(`${API_ENDPOINT_COINGECKO}/coins/list`, { params: params })

  if (response.status === 200) {
    return response.data
  }

  return
}

const getCoinId = async (token: ERC20Token): Promise<string | undefined> => {
  if (token.symbol) {
    const coinsList = await getCoinsList()

    if (coinsList) {
      const coin = coinsList.find((coin) => coin.symbol.toLowerCase() === token.symbol.toLowerCase())
      return coin ? coin.id : undefined
    }
  }

  return
}

const getCoinPrice = async (token: ERC20Token, currency: string = 'usd'): Promise<CoinPrice | undefined> => {
  const coinId = await getCoinId(token)

  if (coinId) {
    const params = { ids: coinId, vs_currencies: currency }
    const response = await axios.get(`${API_ENDPOINT_COINGECKO}/simple/price`, { params: params })

    if (response.status === 200) {
      const price: CoinPrice = { currency: currency, rate: response.data[coinId][currency] }
      return price
    }
  }

  return
}

export {
  getStableCoins,
  getPopularTokens,
  getTokensList,
  getNativeToken,
  getTokenRate,
  getTokenFromContract,
  getCoinPrice,
  getCoinsList,
  getCoinId,
}
