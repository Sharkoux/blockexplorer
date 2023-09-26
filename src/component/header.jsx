import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import BankInfoTicker from "./slider"

const Headers = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin: 50px;
    margin-left: 100px;
    margin-right: 100px;
    border-bottom: 2px solid #eaeaea;
    .logo {
        font-size: 1.5rem;
        font-weight: 700;
        text-decoration: none;
    }
    .logo_container {
        display: flex;
        align-items: center;
        margin-bottom: 50px;
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
        .links {
            color: rgb(205,92,92, 0.8);
        }
        .links:hover {
            color: black;
        }
    }
`



/* Component Header (component to display header) */
function Header() {



    return (
        <Headers>

            <div className="logo_container">
                <img src="/ether.png" className="logo_img"></img>
                <Link to='/' className="links logo">All<span>scan</span></Link>
            </div>
            <div className="nav">
                <Link to='/block' className="links">Block</Link>
                <Link to='/transaction' className="links">Transaction</Link>
                <Link to='/address' className="links">Address</Link>
            </div>
        </Headers>
    )
}

export default Header