import React from 'react'
import { Footer, Group, Text, Anchor } from '@mantine/core'

const Component = () => {
  return (
    <Footer height={60} p="md" withBorder={false}>
      <Group position="apart">
        <Text size="xs">© {new Date().getFullYear()} XORX GmbH</Text>

        <Anchor href="https://metastake.cc" target="_blank" underline={false} color="DefaultMantineColor">
          <Text size="xs">Powered by MetaStake Labs</Text>
        </Anchor>
      </Group>
    </Footer>
  )
}

export default Component
