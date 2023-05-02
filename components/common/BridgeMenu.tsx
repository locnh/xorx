import React from 'react'
import Bridges from '@/utils/Bridges'
import { Button, Menu, Anchor, Image } from '@mantine/core'
import { ChevronDown } from 'tabler-icons-react'

const Component = () => {
  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <Button color="gray" variant="subtle">
          Bridges <ChevronDown size={15} strokeWidth={1} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {Bridges.map((bridge) => (
          <Menu.Item
            key={bridge.network}
            icon={
              <Image
                src={`/images/networks/${bridge.network.split('-')[0]}.webp`}
                height={20}
                width={20}
                alt={bridge.name}
              />
            }
          >
            <Anchor href={bridge.bridgeURL} target="_blank" underline={false} color="DefaultMantineColor">
              {bridge.name}
            </Anchor>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default Component
