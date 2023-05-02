import { createContext, useContext, useState } from 'react'
import { type Chain, SUPPORTED_CHAINS as chains } from '@/utils/Chains'

interface BlockchainContextData {
  blockchain: Chain
  setBlockchain: (blockchain: Chain) => void
}

const BlockchainContext = createContext<BlockchainContextData>({
  blockchain: chains[0],
  setBlockchain: () => {},
})

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider')
  }
  return context
}

export function BlockchainProvider(props: React.PropsWithChildren<{}>) {
  const [blockchain, setBlockchain] = useState<Chain>(chains[0])

  const value: BlockchainContextData = {
    blockchain,
    setBlockchain,
  }

  return <BlockchainContext.Provider value={value} {...props} />
}
