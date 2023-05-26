import {useAccount, useConnectors, useContractRead, useNetwork, useWaitForTransaction } from '@starknet-react/core'
import { Call, RawArgs, stark, uint256 } from 'starknet'
import BigNumber from 'bignumber.js'
import {ethers} from 'ethers'
import {useState} from 'react'
import ERC20ABI from '../constants/starknet_erc20.json'
import { utils } from 'ethers'

const Starknet = () => {
  const { address, account } = useAccount()
  const { connectors, connect, disconnect } = useConnectors()
  const { chain } = useNetwork()
  const [hash, setHash] = useState('')
  const { data, error, isLoading } = useWaitForTransaction({
    hash,
    watch: true,
  })
  const {data: balance, isLoading: isLoadingBalance} = useContractRead({
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  const handleSwap = async () => {

    const testData = [
      {
        "contractAddress": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        "entrypoint": "approve",
        "calldata": [
          "0x01b01a0b51c67fa18d821dad0af4df0fce1bd41a7340e497bb41745a5c08295c",
          "3838173627289100",
          "0"
        ]
      },
      {
        "contractAddress": "0x01b01a0b51c67fa18d821dad0af4df0fce1bd41a7340e497bb41745a5c08295c",
        "entrypoint": "swap_out",
        "calldata": [
          "0x00f288712fc0c7cb19fa388550ace525000000006464a01903e902dcc98ac53a",
          "5",
          "0x1aA5eF6233f209927861B61085074767CE94c18C",
          "3838173627289100",
          "0",
          "2838173627289000",
          "0"
        ]
      }
    ]
    const response = await account?.execute(testData)
    setHash(response?.transaction_hash ?? '')
    console.log('response', response?.transaction_hash)

  }
  return (
    <div>
      {chain?.name}
      {address ? (
        <div>
          当前账户：{address}
          <div>Balance: {isLoadingBalance && 'loading...'} {utils.formatUnits(balance?.[0]?.low.toString() || '0', 18)}</div>
          <button onClick={disconnect}>disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={() => connect(connectors[0])}>Connect Braavos</button>
          <button onClick={() => connect(connectors[1])}>Connect ArgentX</button>
        </div>
      )}

      {/*<div><button onClick={handleTransaction}>send Transaction</button></div>*/}
      <div><button onClick={handleSwap}>swap</button></div>
      <div>tx hash: {hash}</div>
      <div>Transaction Status: </div>
      <div>{`data: ${data && JSON.stringify(data)}`}</div>
      <div>isLoading: {isLoading}</div>
      <div>{`error: ${error && JSON.stringify(error)}` }</div>
    </div>
  )
}

export default Starknet