import styled from "styled-components"
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import { Alchemy, Network, Utils } from 'alchemy-sdk';

const Cards = styled(Link)`
    display: flex;
    height: 10%;
    background-color: rgb(255,255,255, 0.3);
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    color: rgb(100, 101, 115, 0.9);
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    list-style: none;
    img {
        height: 35px;
        width: 35px;
        margin-right: 10px;
        color: white;
        border-right: 3px solid white;
        padding-right: 15px;
    }
    .container_Hash {
        overflow: hidden;
        width: 30%;
        @media (max-width: 500px) {
            width: 100%;
        }
    }
    .container_FromTo {
        display: flex;
        flex-direction: column;
        p {
            margin: 0;
        }
        @media (max-width: 500px) {
            display: none;
        }
    }
`


function Card({ type, data, data2 }) {
    const [block, setBlock] = useState(null)
    const [transaction, setTransaction] = useState(null)
    const [value, setValue] = useState(null)

    useEffect(() => {
        if (type === "Blocks") {
            setBlock(data)
        }
        if (type === "Transactions") {
            setTransaction(data2)
        }
    }, [data, data2])

    return (
        <Cards to={type === "Blocks" ? `/block/${block?.number}` : `/transaction/${data2?.hash}`}>
            {
                type === "Blocks" ?
                    <>
                        <img src="/blocs.png"></img>
                        <p>Number Block: {block?.number}</p>
                        <p>Number Transactions in Block: {block?.transactions?.length} txns</p>
                    </>
                    :
                    <>
                        <img src="/transaction.png"></img>
                        <div className="container_Hash"><p>Hash: {transaction?.hash?.slice(0, 16)}...</p></div>
                        <div className="container_FromTo"><p>From: {transaction?.from?.slice(0, 16)}...</p><p>To: {transaction?.to?.slice(0, 16)}...</p></div>
                    </>
            }

        </Cards>
    )
}

export default Card