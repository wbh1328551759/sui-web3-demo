import {
  useContract,
  useClaimNFT,
} from '@thirdweb-dev/react';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();

  const { contract } = useContract("0x9bf0a33d4BbDdD436B4Fa5204B553fe7b01049e1", "nft-drop");
  const {
    mutate: claimNft,
  } = useClaimNFT(contract);

  const handleMintEvm = async () => {
    try {
      await claimNft({
        to: "0x0E40519aF01985208114fFac4441b9b13218572F",
        quantity: 1,
        // options: {
        //   pricePerToken: 0.02
        // }
      })
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <>
      <ConnectWallet/>
      {address}
      <div>mint Nft in evm: <button onClick={handleMintEvm}>mint</button></div>
    </>
  )
}
