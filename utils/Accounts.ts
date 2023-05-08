import { fetchBalance } from '@wagmi/core'
import { Address } from 'wagmi'
import { type ERC20Token } from './Tokens'
import { BigNumber } from 'ethers'

interface Balance {
  decimals: number
  formatted: string
  symbol: string
  value: BigNumber
}

const getBalance = async (address: Address, token: ERC20Token): Promise<Balance | undefined> => {
  const params = token?.tags.includes('native') ? { address: address } : { address: address, token: token?.address }
  try {
    return (await fetchBalance(params)) as Balance
  } catch (err) {
    console.log()
  }

  return
}

export { getBalance, type Balance }
