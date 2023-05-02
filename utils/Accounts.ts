import { fetchBalance } from '@wagmi/core'
import { Address } from 'wagmi'
import { ERC20Token } from './Tokens'

const getBalance = async (address: Address, token: ERC20Token) => {
  let params = token.tags.includes('native') ? { address: address } : { address: address, token: token.address }
  try {
    return await fetchBalance(params)
  } catch (err) {
    console.log(err)
    return {
      decimals: null,
      formatted: null,
      symbol: null,
      value: null,
    }
  }
}

export { getBalance }
