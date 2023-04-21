import type { AppProps } from 'next/app'
import { WalletProvider } from '@suiet/wallet-kit';
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import {configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>

      <ThirdwebProvider activeChain="goerli">

          <WalletProvider chains={[
            {
              id: 'sui:testnet',
              name: 'Sui Testnet',
              rpcUrl: 'https://sui-testnet-wave3.coming.chat',
            }
          ]}>
            <Component {...pageProps} />
          </WalletProvider>
        </ThirdwebProvider>
    </WagmiConfig>

)
}
