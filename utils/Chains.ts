import { type Chain } from 'wagmi'
import { mainnet, bsc, polygon, arbitrum, optimism, avalanche, fantom, zkSync, goerli, bscTestnet } from 'wagmi/chains'

export const SUPPORTED_CHAINS = [mainnet, bsc, polygon, arbitrum, optimism, avalanche, fantom, zkSync]

export { type Chain }

export const getChainById = (chainId: number | undefined): Chain | undefined =>
  SUPPORTED_CHAINS.find((chain) => chain.id === chainId)

export const getChainLogo = (chain: Chain): string => {
  switch (chain.id) {
    case 1:
    case 5:
      return '/images/networks/ethereum.webp'

    case 56:
    case 97:
      return '/images/networks/bsc.webp'

    case 10:
    case 420:
      return '/images/networks/optimism.webp'

    case 137:
    case 80001:
      return '/images/networks/polygon.webp'

    case 42161:
    case 421613:
      return '/images/networks/arbitrum.webp'

    case 43113:
    case 43114:
      return '/images/networks/avalanche.webp'

    case 250:
    case 4002:
      return '/images/networks/fantom.webp'

    case 324:
    case 3030:
      return '/images/networks/zksync.webp'
  }
  return ''
}
