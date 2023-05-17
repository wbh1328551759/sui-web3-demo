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
  // console.log('account',chain, connector)

  // const handleTransaction = async () => {
  //   const textAmount = 0.00001
  //   const uint256DepositAmount = uint256.bnToUint256(new BigNumber(textAmount).multipliedBy(Math.pow(10, 18)).toString())
  //
  //   const approveArgs: RawArgs = {
  //     spender: '0x41fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023',
  //     amount: { type: 'struct', ...uint256DepositAmount }
  //   }
  //   const approveCalldata = stark.compileCalldata(approveArgs)
  //   console.log('approveCalldata', approveCalldata)
  //
  //   const approveCall = {
  //     "contractAddress": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  //     "entrypoint": "approve",
  //     "calldata": [
  //         "1865474183096745675831575676844391349131672372457503153362467315114684543011",
  //         "10000000000000",
  //         "0"
  //     ]
  //   }
  //     // [
  //     //   "1865474183096745675831575676844391349131672372457503153362467315114684543011",
  //     //   "10000000000000",
  //     //   "0"
  //     // ]
  //
  //
  //   const uint256OutputAmount = uint256.bnToUint256(new BigNumber(0.0163815).multipliedBy(Math.pow(10, 18)).toString())
  //   const swapArgs: RawArgs = {
  //     amountIn: { type: 'struct', ...uint256DepositAmount },
  //     amountOutMin: { type: 'struct', ...uint256OutputAmount },
  //     path: [
  //       "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  //       "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"
  //     ],
  //     to: address!,
  //     deadline: "0x6462f4ca"
  //   }
  //   const swapCalldata = stark.compileCalldata(swapArgs)
  //   console.log('swapCalldata', swapCalldata)
  //
  //   const swapCall = {
  //     "contractAddress": "0x41fd22b238fa21cfcf5dd45a8548974d8263b3a531a60388411c5e230f97023",
  //     "entrypoint": "swap_exact_tokens_for_tokens",
  //     "calldata": [
  //         "1000000000000000",
  //         "0",
  //         "164074017696052849",
  //         "0",
  //         "2",
  //         "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  //         "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
  //         "0x01531162cF0f7BcbfFf2301AF548eA1e5E93F7f88066b545Bf51B5BB8432C6BE",
  //         "1684207820"
  //     ]
  //     // [
  //     //   "100000000000000",
  //     //   "0",
  //     //   "164074017696052849",
  //     //   "0",
  //     //   "2",
  //     //   "2087021424722619777119509474943472645767659996348769578120564519014510906823",
  //     //   "385291772725090318157700937045086145273563247402457518748197066808155336371",
  //     //   "599081148528555059463991229516100190117485441143479203992778585328839739070",
  //     //   "1684204130"
  //     // ]
  //   }
  //   account?.execute([approveCall])
  //   // account?.execute([approveCall, swapCall])
  // }


  const handleSwap = async () => {
    const testAmount = '0.00001'
    // const parseAmount = ethers.utils.parseUnits(testAmount, 18).toString()
    const parseAmount = '100000007476100'
    const uint256DepositAmount = uint256.bnToUint256(parseAmount)

    const swapContract = '0x01b01a0b51c67fa18d821dad0af4df0fce1bd41a7340e497bb41745a5c08295c'
    const approveContract = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

    const approveCall = {
      "contractAddress": approveContract,
      "entrypoint": "approve",
      "calldata": [
        swapContract,
        parseAmount,
        "0"
      ]
    }

    const swapCall = {
      "contractAddress": swapContract,
      "entrypoint": "swap_out",
      "calldata": [
        "0x01f288712fc0c7cb19fa388550ace525000000006462ee350330db3f5ff8d476",
        '5',
        "0x0e9D66A7008ca39AE759569Ad1E911d29547E892",
        parseAmount,
        '0',
        '210000378000',
        '0'
      ]
    }
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