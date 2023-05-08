import React, { useState } from 'react'
import { Modal, Stack, TextInput, Group, Button, Divider, Avatar, UnstyledButton, Text, Space } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { type ERC20Token, getPopularTokens } from '@/utils/Tokens'
import { ASSETS_CDN } from '@/utils/AppConfig'
import { maskAddress } from '@/utils/Formatter'

const SearchTokens = (props: any) => {
  const { tokensList, isModalOpened, modalHandler, changeToken } = props

  const [searchTerm, setSearchTerm] = useState<string>('')
  const popularTokens = getPopularTokens(tokensList)

  return (
    <Modal opened={isModalOpened} onClose={modalHandler.close} withCloseButton={false} centered>
      <Stack>
        <TextInput
          icon={<Search />}
          value={searchTerm}
          placeholder="Search name or contract address"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) => setSearchTerm('')}
        />
        <Group position="center">
          {popularTokens.map((token: ERC20Token) => (
            <Button
              onClick={() => changeToken(token)}
              key={token.address}
              leftIcon={
                <Avatar src={`${ASSETS_CDN}/${token.symbol.toLowerCase()}.webp`} size={24} radius="xl">
                  {token.symbol.slice(0, 3)}
                </Avatar>
              }
              color="gray"
              radius="xl"
              uppercase
            >
              {token.symbol}
            </Button>
          ))}
        </Group>
        <Divider />
        <Stack>
          {tokensList.map((token: ERC20Token) =>
            searchTerm.length > 1 &&
            (token.symbol.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
              token.address.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ? (
              <UnstyledButton onClick={() => changeToken(token)} key={token.address} p={9}>
                <Group position="apart">
                  <Group position="left">
                    <Avatar src={`${ASSETS_CDN}/${token.symbol.toLowerCase()}.webp`} size={24} radius="xl">
                      {token.symbol.slice(0, 3)}
                    </Avatar>
                    {token.symbol}
                  </Group>
                  <Text size="sm" color="dimmed">
                    {maskAddress(token?.address, 0, 6)}
                  </Text>
                </Group>
              </UnstyledButton>
            ) : (
              ''
            )
          )}
        </Stack>
      </Stack>
    </Modal>
  )
}

export { SearchTokens }
