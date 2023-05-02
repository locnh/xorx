import React from 'react'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { AppProps } from 'next/app'
import { BlockchainProvider } from '@/contexts/BlockchainContext'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LedgerConnector } from '@wagmi/connectors/ledger'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { SUPPORTED_CHAINS } from '@/utils/Chains'

const { chains, provider } = configureChains(SUPPORTED_CHAINS, [publicProvider()])

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Extension',
        shimDisconnect: true,
      },
    }),
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new LedgerConnector({ chains }),
  ],
  provider,
})

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <WagmiConfig client={client}>
          <BlockchainProvider>
            <Component {...pageProps} />
          </BlockchainProvider>
        </WagmiConfig>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
