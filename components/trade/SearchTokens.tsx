import React, { useState } from 'react'
import { Modal, Stack, TextInput, Group, Button, Image, Divider, Avatar } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { type ERC20Token, getPopularTokens } from '@/utils/Tokens'
import { ASSETS_CDN } from '@/utils/AppConfig'

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
                <Avatar src={`${ASSETS_CDN}/${(token as ERC20Token)?.symbol.toLowerCase()}.webp`} size={24}>
                  {(token as ERC20Token).symbol}
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
        <Group>
          {tokensList.map((token: ERC20Token) =>
            searchTerm.length > 1 &&
            (token.symbol.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
              token.address.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ? (
              <Button
                onClick={() => changeToken(token)}
                key={token.address}
                leftIcon={
                  <Avatar src={`${ASSETS_CDN}/${(token as ERC20Token)?.symbol.toLowerCase()}.webp`} size={24}>
                    {token?.symbol}
                  </Avatar>
                }
                color="gray"
                radius="xl"
                uppercase
              >
                {token.symbol}
              </Button>
            ) : (
              ''
            )
          )}
        </Group>
      </Stack>
    </Modal>
  )
}

export { SearchTokens }
