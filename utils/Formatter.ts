import { Address } from 'wagmi'

const formatNumber = (value: number, dp: number = 6): number => {
  if (isNaN(value) || value === 0) {
    return 0
  }

  return +parseFloat(value.toString()).toFixed(dp)
    ? +parseFloat(value.toString()).toFixed(dp)
    : formatNumber(value, dp + 1)
}

const maskAddress = (address: Address, head: number = 4, tail: number = 4): string =>
  `${address.slice(0, head)}..${address.slice(address.length - tail)}`

export { formatNumber, maskAddress }
