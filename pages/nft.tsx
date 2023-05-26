import React, {useEffect, useState} from 'react'
import { NextPage } from 'next'
import { Connection, JsonRpcProvider, Coin } from '@mysten/sui.js'
import { useWallet } from '@suiet/wallet-kit'

const NftPage: NextPage = () => {
  const { address } = useWallet()
  const [nfts, setNfts] = useState([])
  useEffect(() => {
    const suiProvider = new JsonRpcProvider(new Connection({ fullnode: 'https://wallet-rpc.mainnet.sui.io' }));
    const getNfts = async () => {
      const allObjects = await suiProvider.getOwnedObjects({
        owner: address,
        options: {
          showType: true,
          showDisplay: true,
          showContent: true,
        }
      });
      const objectIDs = (allObjects?.data || [])
        .filter((item) => !Coin.isCoin(item))
        .map((anObj) => anObj.data.objectId);
      const allObjRes = await suiProvider.multiGetObjects({
        ids: objectIDs,
        options: {
          showContent: true,
          showDisplay: true,
          showType: true,
        },
      });
      const nftList = allObjRes.filter(obj => obj.data).map(obj => ({
        objectId: obj.data.objectId,
        image: (obj.data?.display?.data as any)?.image_url.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/'),
        name: (obj.data?.display?.data as any).name
      }))

      setNfts(nftList)
    }
    address && getNfts()
  }, [address])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {nfts.map(nft => (
        <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '25%' }} key={nft.objectId}>
          <img width={'300px'} height={'300px'} style={{ minHeight: '300px' }} src={nft.image} alt=""/>
          <p style={{}}>{nft.objectId}</p>
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  )
}

export default NftPage