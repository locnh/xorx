import React from 'react'
import NativeBalanceBlock from './NativeBalanceBlock'
import { Group, SimpleGrid } from '@mantine/core'
import { SUPPORTED_CHAINS as chains } from '@/utils/Chains'

const Component = () => {
  return (
    <Group position="center" p="xl">
      <SimpleGrid cols={3}>
        {chains.map((chain) => (
          <NativeBalanceBlock network={chain} key={chain.id} />
        ))}
      </SimpleGrid>
    </Group>
  )
}

export default Component
