// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
const sdk = new ThirdwebSDK("goerli");

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const contract = await sdk.getContract("0x0193a3EB1fF9d46b4279Db34405A3B2aa35a29f7", "nft-drop");

  const totalMinted = await contract.totalUnclaimedSupply()
  console.log('totalMinted', totalMinted)

  res.status(200).json({ name: 'John Doe' })
}
