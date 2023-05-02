import React from 'react'
import { Button, Menu, Anchor, Text, Badge, Group } from '@mantine/core'
import { ChevronDown, LayoutList, ChartCandle, ArrowsExchange } from 'tabler-icons-react'

const Component = () => {
  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <Button color="gray" variant="subtle">
          Trade <ChevronDown size={15} strokeWidth={1} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item key="swap" icon={<LayoutList />}>
          <Anchor href="/trade/swap" underline={false} color="DefaultMantineColor">
            <Text>Simple Swap</Text>
            <Text size="xs">The most user-friendly way to trade</Text>
          </Anchor>
        </Menu.Item>
        <Menu.Item key="limit" icon={<ChartCandle />} disabled>
          <Anchor href="/trade/limit" underline={false} color="DefaultMantineColor">
            <Group position="apart">
              <Text>Limit Order</Text>
              <Badge size="xs">Coming soon</Badge>
            </Group>
            <Text size="xs">Set the order with expected price</Text>
          </Anchor>
        </Menu.Item>
        <Menu.Item key="p2p" icon={<ArrowsExchange />} disabled>
          <Anchor href="/trade/p2p" underline={false} color="DefaultMantineColor">
            <Group position="apart">
              <Text>P2P Deal</Text>
              <Badge size="xs">Coming soon</Badge>
            </Group>
            <Text size="xs">Exchange tokens privately</Text>
          </Anchor>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Component
