import React from 'react'
import { Button, Menu, Anchor, Text, Badge, Group } from '@mantine/core'
import { ChevronDown, Plant, BuildingBank } from 'tabler-icons-react'

const Component = () => {
  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <Button color="gray" variant="subtle">
          DAO <ChevronDown size={15} strokeWidth={1} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item key="staking" icon={<Plant />} disabled={true}>
          <Anchor href="/dao/staking" underline={false} color="DefaultMantineColor">
            <Group position="apart">
              <Text>Staking</Text>
              <Badge size="xs">Coming soon</Badge>
            </Group>
          </Anchor>
        </Menu.Item>
        <Menu.Item key="governance" icon={<BuildingBank />} disabled={true}>
          <Anchor href="/dao/governance" underline={false} color="DefaultMantineColor">
            <Group position="apart">
              <Text>Governance</Text>
              <Badge size="xs">Coming soon</Badge>
            </Group>
          </Anchor>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Component
