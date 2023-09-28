import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../component/searchBar'
import Information from '../component/information'
import Durée from '../component/lineCharts'
import BlockContainer from '../component/blocksAndTransaction'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import useGetData from '../hook/getData'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 100px);
    margin-top: 200px;
    background-color: rgb(34, 114, 255, 0.7);
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        margin-right: 150px;
        margin-left: 150px;
        border-radius: 20px;
    .search_Container {
        display: flex;
        flex-direction: column;
        height: 200px;
        background-color: rgb(255,255,255, 0.2);
        box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
        margin-top: 50px;
        margin-right: 150px;
        margin-left: 150px; 
        border-radius: 20px;
        padding: 50px;
        h1 {
            font-size: 22px;
            align-self: center;
            padding-top: 20px;
            color: white;
        }
    }
    .info_Container {
        display: flex;
        justify-content: space-around;
        padding: 30px;
    }
`
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);




/* Page Home (page d'accueil) */
function Home() {
    const [gasPrice, setGasPrice] = useState(null);
    const [block, setBlock] = useState();
    const [prices, setPrice] = useState(null);
    const [marketCaps, setMarketCap] = useState(null);

    const { price, GetData, GetPrice, marketCap } = useGetData({ currencies: 'usd' })

    useEffect(() => {
        async function getBlockNumber() {
            setBlock(await alchemy.core.getBlockNumber());
            let formatGas = await alchemy.core.getGasPrice()
            setGasPrice(Utils.formatUnits(parseInt(formatGas._hex, 16), 'gwei'));
        }

        getBlockNumber();
    }, [block]);

    useEffect(() => {
        if (marketCaps === null) {
            GetData()
            setMarketCap(marketCap)
        }
        if (prices === null) {
            GetPrice()
            setPrice(price)
        }
    }, [price, marketCap])





    /* Return Home container with Banner and map data to card component */
    return (

        <HomeContainer>
            <div className='search_Container'>
                <h1>Ethereum Chain Explorer: </h1>
                <SearchBar />
            </div>
            <div className='info_Container'>
                <Information firstValue={`ETH price: ${prices}$`} secondValue={`ETH Market cap: ${marketCaps} $`} />
                <Durée />
                <Information firstValue={`Gas price: ${gasPrice} GWEI`} secondValue={`Latest Block: ${block}`} />
            </div>
            <div className='info_Container'>
                <BlockContainer type='Blocks' />
                <BlockContainer type='Transactions' />
            </div>
        </HomeContainer>
    )
}

export default Home