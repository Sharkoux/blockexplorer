import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom'

const BlocksContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 100px);
    margin-top: 200px;
    background-color: rgb(34, 114, 255, 0.7);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    margin-right: 150px;
    margin-left: 150px;
    border-radius: 20px;
    color: white;
    padding-bottom: 100px;
    h1 {
        font-size: 22px;
        align-self: center;
        padding-top: 20px;
        color: white;
    }
    .informationBlock_Container {
        display: flex;
        flex-direction: column;
        background-color: rgb(255,255,255, 0.2);
        box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
        margin-top: 50px;
        border-radius: 20px;
        padding: 30px;
        align-items: center;
        justify-content: center;
        width: 40%;
        
    }
    .allBlock_Container {
        display: flex;
        justify-content: space-around;
        padding: 30px;
        flex-wrap: wrap;
    }
    .link {
        color: white;
        font-size: 17px;
    }
    h3 {
        color: rgb(100, 101, 115, 0.9);
    }
    
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);




/* Page Home (page d'accueil) */
function Block() {
    const [gasUsed, setGasUsed] = useState(null);
    const [gasLimit, setGasLimit] = useState(null);
    const [time, setTime] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]);
    const [miner, setMiner] = useState(null);
    const [hash, setHash] = useState(null);
    const [parentHash, setParentHash] = useState(null);
    const [nonce, setNonce] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        async function getBlock() {
            const blockData = await alchemy.core.getBlock(parseInt(id));
            let date = new Date(blockData?.timestamp * 1000)
            setTime(date.toString())
            setTransactions(blockData?.transactions?.length)
            setAllTransactions(blockData?.transactions)
            setMiner(blockData?.miner)
            setGasUsed(parseInt(blockData?.gasUsed?._hex, 16))
            setGasLimit(parseInt(blockData?.gasLimit?._hex, 16))
            setHash(blockData?.hash)
            setParentHash(blockData?.parentHash)
            setNonce(blockData?.nonce)
        }

        getBlock()
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    /* Return Home container with Banner and map data to card component */
    return (

        <BlocksContainer>
            <h1>Block #{id}</h1>
            <div className='allBlock_Container'>
                <div className="informationBlock_Container">
                    <h3>
                        Date of block creation:
                    </h3>
                    <p>{time}</p>
                    <h3>
                        Transactions:
                    </h3>
                    <p>
                        <Link className='links link' to={`/transactions`} state={allTransactions}>{transactions}</Link> transaction in this block
                    </p>
                    <h3>
                        Miner:
                    </h3>
                    <p>
                        <Link  className='links link' to={`/address/${miner}`} >{miner}</Link>
                    </p>
                </div>
                <div className="informationBlock_Container">
                    <h3>
                        Gas used:
                    </h3>
                    <p>
                        {gasUsed ? Utils.formatUnits(gasUsed, 'gwei') : ''} Ether
                    </p>
                    <h3>
                        Gas Limit:
                    </h3>
                    <p>
                        {gasLimit ? gasLimit : ''}
                    </p>
                </div>
                <div className="informationBlock_Container">
                    <h3>
                        Hash:
                    </h3>
                    <p>
                        {hash ? hash : ''}
                    </p>
                    <h3>
                        Parent Hash:
                    </h3>
                    <p>
                        {parentHash ? parentHash : ''}
                    </p>
                    <h3>
                        Nonce:
                    </h3>
                    <p>
                        {nonce ? nonce : ''}
                    </p>
                </div>
            </div>
        </BlocksContainer>
    )
}

export default Block