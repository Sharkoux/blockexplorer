import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom'
import { all } from 'axios';

/* global BigInt */

const TransactionContainer = styled.div`
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
padding-bottom: 70px;
h1 {
    font-size: 22px;
    align-self: center;
    padding-top: 20px;
    color: white;
}
.informationTransaction_Container {
    display: flex;
    flex-direction: column;
    background-color: rgb(255,255,255, 0.2);
    box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
    margin: 70px;
    margin-top: 100px;
    border-radius: 20px;
    padding: 30px;
    align-items: center;
    justify-content: center;
    width: 400px;
    
    
}
.allBlock_Container {
    display: flex;
    justify-content: space-around;
    padding: 30px;
    flex-wrap: wrap;
    width: 100%;
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




/* Page  */
function Transaction() {
    const [gasPrice, setGasPrice] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [block, setBlock] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [value, setValue] = useState(null);
    const [nonce, setNonce] = useState(null);

    const { id } = useParams()

    useEffect(() => {
        const transac = async () => {
            const alltxn = await alchemy.core.getTransaction(id)
            setBlock(alltxn?.blockNumber)
            setFrom(alltxn?.from)
            setTo(alltxn?.to)
            setGasPrice(Utils.formatUnits(parseInt(alltxn?.gasPrice?._hex, 16), 'gwei'))
            let values = Utils.formatUnits(BigInt(parseInt(alltxn?.value?._hex, 16)), 'ether')
            setValue(values)
        }
        transac()
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    /* Return Home container with Banner and map data to card component */
    return (

        <TransactionContainer>
            <h1>Transaction #{id}</h1>
            <div className='allBlock_Container'>
                <div className="informationTransaction_Container">
                    <h3 >
                        Block:
                    </h3>
                    <Link className='links link' to={`/block/${block}`}>{block}</Link>
                </div>
                <div className="informationTransaction_Container">
                    <h3>
                        From :
                    </h3>
                    <Link  className='links link' to={`/address/${from}`}>{from}</Link>
                </div>
                <div className="informationTransaction_Container">
                    <h3>
                        To :
                    </h3>
                    <Link className='links link' to={`/address/${to}`}>
                        {to}
                    </Link>
                </div>
                <div className="informationTransaction_Container">
                    <h3>
                        Gas price:
                    </h3>
                    <p>
                        {Math.round(gasPrice)} GWEI
                    </p>
                </div>
                <div className="informationTransaction_Container">
                    <h3>
                        Value:
                    </h3>
                    <p>
                        {value} Ether
                    </p>
                </div>

            </div>
        </TransactionContainer>
    )
}

export default Transaction