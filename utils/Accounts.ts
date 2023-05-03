import { fetchBalance } from '@wagmi/core'
import { Address } from 'wagmi'
import { ERC20Token } from './Tokens'
import { BigNumber } from 'ethers'
interface Balance {
  decimals: number | null
  formatted: string | null
  symbol: string | null
  value: BigNumber | null
}

const getBalance = async (address: Address, token: ERC20Token) => {
  let params = token?.tags.includes('native') ? { address: address } : { address: address, token: token?.address }
  try {
    return (await fetchBalance(params)) as Balance
  } catch (err) {
    console.log(err)
  }

  return {
    decimals: null,
    formatted: null,
    symbol: null,
    value: null,
  }
}

export { getBalance, type Balance }
