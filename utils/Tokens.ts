import axios from 'axios'
import { API_ENDPOINT } from './Endpoints'
import { Chain, Address, erc20ABI } from 'wagmi'
import { getContract, getProvider } from '@wagmi/core'
import { fee } from '@/utils/AppConfig'

const POPULAR_COINS = ['ETH', 'WETH', 'WBTC', 'BNB', 'WBNB', 'USDT', 'USDC', 'DOT', 'LTC']
const STABLE_COINS = ['USDT', 'USDC']

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

const getTokensList = async (chain: Chain): Promise<ERC20Token[]> => {
  const GET_TOKEN_LIST_ENDPOINT = `${API_ENDPOINT}/${chain.id}/tokens`
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
  xfee: number = fee
): Promise<DEXQuote> => {
  const GET_QUOTE_ENDPOINT = `${API_ENDPOINT}/${chain.id}/quote`
  const params = {
    fee: xfee,
    fromTokenAddress: fromToken.address,
    toTokenAddress: toToken.address,
    amount: 10 ** fromToken.decimals,
  }
  try {
    const response = await axios.get(GET_QUOTE_ENDPOINT, { params: params })
    const { toTokenAmount, estimatedGas } = response.data

    return { rate: toTokenAmount, estimatedGas: estimatedGas, fee: xfee } as DEXQuote
  } catch (error: any) {
    console.log(error)
    return { rate: 0, estimatedGas: 0, fee: xfee } as DEXQuote
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

export { getStableCoins, getPopularTokens, getTokensList, getNativeToken, getTokenRate, getTokenFromContract }
