import { useWallet } from "@manahippo/aptos-wallet-adapter";

const AptosPage = () => {
  const {
    autoConnect,
    connect,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
    connecting,
    connected,
    disconnecting,
    wallet: currentWallet,
    signMessage,
    signTransaction,
    network,
  } = useWallet();
  console.log('currentWallet', currentWallet)
  if (connected) {
    return (
      // @ts-ignore
      <div>{account?.address}</div>
    )
  }
  return (


    <div>
      {wallets.map((wallet) => {
          const option = wallet.adapter;
          return (
            <button
              onClick={async () => {
                await connect(option.name);
              }}
              id={option.name.split(' ').join('_')}
              key={option.name}
              className="connect-btn">
              {option.name}
            </button>
          );
        })}
    </div>
  )
}

export default AptosPage