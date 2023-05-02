import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button, Menu } from '@mantine/core'
import { ChevronDown, QuestionMark } from 'tabler-icons-react'
import { Chain, getChainLogo } from '@/utils/Chains'
import { useNetwork, useAccount } from 'wagmi'
import { switchNetwork } from '@wagmi/core'
import { SUPPORTED_CHAINS as chains } from '@/utils/Chains'
import { useBlockchain } from '@/contexts/BlockchainContext'

const Component = (props: any) => {
  const { blockchain, setBlockchain } = useBlockchain()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    if (chain && chain.id !== blockchain.id) setBlockchain(chain)
  })

  const handleNetworkChange = (chain: Chain) => {
    if (isConnected && blockchain.id !== chain.id) switchNetwork({ chainId: chain.id })
    setBlockchain(chain)
  }

  const chainLogo = blockchain ? (
    getChainLogo(blockchain) ? (
      <Image src={getChainLogo(blockchain)} height={20} width={20} alt={blockchain.name} />
    ) : (
      <QuestionMark size={20} />
    )
  ) : (
    <QuestionMark size={20} />
  )

  const { isMobile } = props

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button color="gray" leftIcon={chainLogo} radius="xl" variant="subtle">
          {!isMobile ? blockchain.name : ''}
          <ChevronDown size={15} strokeWidth={1} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {chains.map((_chain) => (
          <Menu.Item
            key={_chain.id}
            disabled={_chain.id === blockchain.id}
            icon={<Image src={getChainLogo(_chain)} height={20} width={20} alt={_chain.name} />}
            onClick={() => handleNetworkChange(_chain)}
          >
            {_chain.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default Component
