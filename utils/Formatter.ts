import { Address } from 'wagmi'

const formatNumber = (value: string, dp: number = 6) => {
  return +parseFloat(value).toFixed(dp)
}

const maskAddress = (address: Address, head: number = 4, tail: number = 4) =>
  `${address.slice(0, head)}..${address.slice(address.length - tail)}`

export { formatNumber, maskAddress }
