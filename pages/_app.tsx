import type { AppProps } from 'next/app'
import { WalletProvider } from '@suiet/wallet-kit';
import { StarknetConfig } from '@starknet-react/core'
import { InjectedConnector as StarknetInjectedConnector } from '@starknet-react/core'
import '@suiet/wallet-kit/style.css';

const starknetConnectors = [
  new StarknetInjectedConnector({ options: { id: 'braavos' } }),
  new StarknetInjectedConnector({ options: { id: 'argentX' } }),
]

export default function App({ Component, pageProps }: AppProps) {
  return (

    <StarknetConfig autoConnect connectors={starknetConnectors}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </StarknetConfig>
)
}
