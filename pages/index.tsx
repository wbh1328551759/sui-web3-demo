import { TransactionBlock, Connection, JsonRpcProvider } from '@mysten/sui.js';
import {useWallet, ConnectButton } from '@suiet/wallet-kit'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers';

export const SUI_DEFAULT_SINGER = '0x3fec9fbe3f0fab212cabbd70bdb180d78a03fb8cadb3b32737ea71911440b2fb' // 我的地址

export const SUI_DEFAULT_GAS_OBJECTID = '0xac471cf06c33b00fd539671ff5831ea46fca7c470ca401d74e92ab1493c51f62' //我的地址下的一个object


export const SUI_TESTNET_NODE_URL = 'https://testnet.suiet.app'

const textToBytes = (text: string): number[] | string => {
  if (!text) return text
  return Array.from(
    Uint8Array.from(
      Buffer.from(
        text,
        'utf8'
      )
    )
  )
}
export const formatV8Arg = (val: string) => {
  if (!val) return
  try { // hex
    const uint8Array = ethers.utils.arrayify(val)
    const newBytes = new Uint8Array(uint8Array.length + 1)
    newBytes.set([uint8Array.length], 0)
    newBytes.set(uint8Array, 1)
    return newBytes
  } catch (e) {
    console.error('formatV8Arg error: ', e)
  }
}

export default function Home() {
  const { signAndExecuteTransactionBlock, allAvailableWallets } = useWallet()
  console.log('allAvailableWallets', allAvailableWallets)

  const handleMint = async () => {
    const suiProvider = new JsonRpcProvider(new Connection({ fullnode: 'https://fullnode.testnet.vincagame.com:443' }));

    const tx = new TransactionBlock()
    // tx.setGasBudget(100000000)
    const [coin1, coin2] = tx.splitCoins(tx.gas, [
      tx.pure(BigInt(new BigNumber(0.03).multipliedBy(Math.pow(10, 9)).toString())),
      tx.pure(BigInt(new BigNumber(0.03).multipliedBy(Math.pow(10, 9)).toString())),
    ])


    tx.moveCall({
      target: '0xf1d4ee4b3a2787cd066180857fa0170ccd721c28e20d5f334f48d585ed367284::suicat::mint',
      arguments: [
        tx.pure('0x5055e205e2a783376ad64e1d49ae87409ac171e4d9c8d3ade32fc74cb0d112c0'),
        tx.pure('0x6'),
        tx.makeMoveVec({ objects: [coin1, coin2] }),
      ],
      typeArguments: [],
    })
    const res = await suiProvider.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: '0x57052aa443706c3492f7214495f59a2ec71efcf50241b3023ce4278eab1dad30'
    })
    console.log('res', res)
    const result = await signAndExecuteTransactionBlock({
      //@ts-ignore
      transactionBlock: tx,
      options: { showEffects: true },
    })
    console.log('result', result?.effects?.status?.status)
  }

  return (
    <>
      <ConnectButton />
      <div>mint nft: <button onClick={handleMint}>mint</button></div>
    </>
  )
}
