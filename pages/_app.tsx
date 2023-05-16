import type { AppProps } from 'next/app'
import { WalletProvider } from '@suiet/wallet-kit';
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import {
  HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  AptosWalletAdapter,
  FewchaWalletAdapter,
  WalletProvider as AptosWalletProvider,
  PontemWalletAdapter,
  SpikaWalletAdapter,
  FletchWalletAdapter,
  AptosSnapAdapter,
  NightlyWalletAdapter,
  BitkeepWalletAdapter,
  TokenPocketWalletAdapter,
  BloctoWalletAdapter,
  WalletAdapterNetwork,
  Coin98WalletAdapter,
  FoxWalletAdapter,
  OpenBlockWalletAdapter
} from '@manahippo/aptos-wallet-adapter';
import { StarknetConfig } from '@starknet-react/core'
import { InjectedConnector as StarknetInjectedConnector } from '@starknet-react/core'

const starknetConnectors = [
  new StarknetInjectedConnector({ options: { id: 'braavos' } }),
  new StarknetInjectedConnector({ options: { id: 'argentX' } }),
]

export default function App({ Component, pageProps }: AppProps) {
  const wallets = [
    // new HippoWalletAdapter(),
    new HippoExtensionWalletAdapter(),
    new MartianWalletAdapter(),
    new AptosWalletAdapter(),
    new FewchaWalletAdapter(),
    new PontemWalletAdapter(),
    new SpikaWalletAdapter(),
    new FletchWalletAdapter(),
    new AptosSnapAdapter(),
    new NightlyWalletAdapter(),
    new BitkeepWalletAdapter(),
    new TokenPocketWalletAdapter(),
    new BloctoWalletAdapter({ network: WalletAdapterNetwork.Testnet, bloctoAppId:'6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46' }),
    new Coin98WalletAdapter(),
    new FoxWalletAdapter(),
    new OpenBlockWalletAdapter()
  ]
  return (

    <StarknetConfig autoConnect connectors={starknetConnectors}>

      <AptosWalletProvider autoConnect wallets={wallets}>
        <ThirdwebProvider activeChain="arbitrum">

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
      </AptosWalletProvider>


    </StarknetConfig>
)
}
