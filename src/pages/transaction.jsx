import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom'
import { all } from 'axios';

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
padding-bottom: 100px;
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
    margin-top: 50px;
    border-radius: 20px;
    padding: 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 30px;
    
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
    
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);




/* Page  */
function Transaction() {
    const [gasPrice, setGasPrice] = useState(null);
    const [time, setTime] = useState(null);
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
            setBlock(alltxn.blockNumber)
            setTime(alltxn.timestamp)
            setFrom(alltxn.from)
            setTo(alltxn.to)
            setGasPrice(Utils.formatUnits(parseInt(alltxn.gasPrice._hex, 16), 'gwei'))
            setValue(Utils.formatUnits(parseInt(alltxn.value._hex, 16), 'gwei'))
            console.log(alltxn)
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
                    <h3>
                        Block:
                    </h3>
                    <p>{block}</p>
                    <h3>
                        Date of transactions:
                    </h3>
                    <p>
                        {time}
                    </p>
                    <h3>
                        From :
                    </h3>
                    <p>
                        {from}
                    </p>
                    <h3>
                        To :
                    </h3>
                    <p>
                        {to}
                    </p>
                    <h3>
                        Gas price:
                    </h3>
                    <p>
                        {gasPrice}
                    </p>
                    <h3>
                        Value:
                    </h3>
                    <p>
                        {value}
                    </p>
                </div>

            </div>
        </TransactionContainer>
    )
}

export default Transaction