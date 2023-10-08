import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';

const Headers = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    margin: 28px;
    margin-left: 100px;
    margin-right: 100px;
    border-bottom: 3px solid #eaeaea;
    position: fixed;
    top: 0;
    width: 90%;
    background-color: rgb(255,255,255, 0.9);
    padding-bottom: 70px;
    @media (max-width: 1200px) {
        margin-left: 45px;
        margin-right: 50px;
    }
    @media (max-width: 800px) {
        margin-left: 15px;
        margin-right: 20px;
    }
    .logo {
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
    }
    .logo_container {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .logo_img {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.5rem;
    }
    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 30%;
        padding-right: 50px;
        margin-top: 20px;
        .links {
            color: rgb(0,0,0, 0.7);
        }
        .links:hover {
            color: black;
        }
        @media (max-width: 800px) {
            width: 50%;
            padding-right: 15px;
        }
    }
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


/* Component Header (component to display header) */
function Header() {
const [block, setBlock] = useState();  

    
    useEffect(() => {
        const getBlock = async () => {
            let test = await alchemy.core.getBlockNumber()
            setBlock(test);
        }
        getBlock()
    }, [])


    return (
        <Headers>

            <div className="logo_container">
                <img src="/ether.png" className="logo_img"></img>
                <Link to='/' className="links logo">All<span>scan</span></Link>
            </div>
            <div className="nav">
                <Link to='/blocks' className="links">Block</Link>
                <Link to='/transactions' state={block} className="links">Transaction</Link>
            </div>
        </Headers>
    )
}

export default Header