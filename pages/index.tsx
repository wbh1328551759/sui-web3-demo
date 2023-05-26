import { TransactionBlock, Connection, JsonRpcProvider } from '@mysten/sui.js';
import {useWallet, ConnectButton } from '@suiet/wallet-kit'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers';
import {useEffect, useState} from 'react';

export const formatV8Arg = (val: string) => {
  if (!val) return
  try { // hex
    const uint8Array = ethers.utils.arrayify(val)
    return Array.from(uint8Array)
  } catch (e) {
    console.error('formatV8Arg error: ', e)
  }
}

export default function Home() {
  const { signAndExecuteTransactionBlock, address } = useWallet()
  const [balance, setBalance] = useState('0')

  const handleMint = async () => {
    const suiProvider = new JsonRpcProvider(new Connection({ fullnode: 'https://fullnode.testnet.vincagame.com:443' }));

    const tx = new TransactionBlock()
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
      sender: '0x3d5526902fb9f8ba23f66e8d20cf7f8312ce2d50e98e2d6c5380cd58ee8a30e4'
    })
    console.log('res', res)
    const result = await signAndExecuteTransactionBlock({
      //@ts-ignore
      transactionBlock: tx,
      options: { showEffects: true },
    })
    console.log('result', result?.effects?.status?.status)
  }

  const handleTest = async () => {
    const suiProvider = new JsonRpcProvider(new Connection({ fullnode: 'https://wallet-rpc.mainnet.sui.io' }));

    const tx = new TransactionBlock()
    // tx.setGasBudget(100000000)
    const [coin1] = tx.splitCoins(tx.gas, [
      tx.pure(BigInt(new BigNumber(4).multipliedBy(Math.pow(10, 9)).toString())),
    ])
    const so_data = '0x0x0000000000000020cfd05b54c8ad2a4e3a67cef37a77c28b00000000645e2264030d4c6e5987c11800000000000000140e40519af01985208114ffac4441b9b13218572f0015000000000000004e3078356434623330323530363634356333376666313333623938633462353061356165313438343136353937333864366437333364353964306432313761393362663a3a636f696e3a3a434f494e00030000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000186a0'

    const src = ''

    const wormhole = '0x000400000000000000000000000000000000000000000000000000000000e8754700000000000000000000000000000000000000000000000000000000004591d3f400000000000000142967e7bb9daa5711ac332caf874bd47ef99b3820'

    const dist = '0x0000000000000001000000000000001410ed43c718714eb63d5aa57b78b54704e256024e000000000000001410ed43c718714eb63d5aa57b78b54704e256024e0000000000000014b04906e95ab5d797ada81508115611fee694c2b3000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014418cbafe5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012629b93b45f000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000002967e7bb9daa5711ac332caf874bd47ef99b382000000000000000000000000000000000000000000000000000000000645f73e40000000000000000000000000000000000000000000000000000000000000004000000000000000000000000b04906e95ab5d797ada81508115611fee694c2b3000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d56000000000000000000000000070a08beef8d36734dd67a491202ff35a6a16d97000000000000000000000000bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
    tx.moveCall({
      target: '0x2990f0ce69e3cc09192eec09bea2c677b8950cc8e40c252bc78d092394b0197e::wormhole_facet::so_swap_without_swap',
      arguments: [
        tx.object('0xaeab97f96cf9877fee2883315d459552b2b921edc16d7ceac6eab944dd88919c'),
        tx.object('0xc57508ee0d4595e5a8728974a4a93a787d38f339757230d441e895422c07aba9'),
        tx.object('0xf00feec4856093bf41a968947da8cb35f91c304a2df4051f11759fbf7fb7abf0'),
        tx.object('0x0000000000000000000000000000000000000000000000000000000000000006'),
        tx.object('0x6c85d499a88237a50d9da06133c9f93e75699602d0b8d035f1dea5f95376dd18'),
        tx.object('0x7f1473487136446d064565294ea445a97c391db1731831eca6ca427802c36a4a'),
        tx.pure(formatV8Arg(so_data)),
        tx.pure([]),
        tx.pure(formatV8Arg(wormhole)),
        tx.pure(formatV8Arg(dist)),

        tx.makeMoveVec({
          objects: [tx.object('0xa63ebdd83bebd2932c3070685c803d1c73101922eaf0aaee1cb76dd9d6a30c44')]
        }),
        tx.makeMoveVec({ objects: [coin1] })
      ],

      typeArguments: [
        "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
      ],
    })
    console.log('tx', tx)
    const res = await suiProvider.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: '0x3d5526902fb9f8ba23f66e8d20cf7f8312ce2d50e98e2d6c5380cd58ee8a30e4'
    })
    console.log('res', res)
    const result = await signAndExecuteTransactionBlock({
      //@ts-ignore
      transactionBlock: tx,
      options: { showEffects: true },
    })
  }

  useEffect(() => {
    const getBalance = async () => {
      const suiProvider = new JsonRpcProvider(new Connection({ fullnode: 'https://wallet-rpc.mainnet.sui.io' }));
      const { totalBalance } = await suiProvider.getBalance({
        owner: '0x3d5526902fb9f8ba23f66e8d20cf7f8312ce2d50e98e2d6c5380cd58ee8a30e4',
      })
      setBalance(ethers.utils.formatUnits(totalBalance, 9))
    }
    address && getBalance()
  }, [address])

  return (
    <>
      <ConnectButton />
      <div>address: {address}</div>
      <div>Balance: {balance}</div>
      <div>mint nft: <button onClick={handleMint}>mint</button></div>
      <div>test: <button onClick={handleTest}>test swap</button></div>
    </>
  )
}
