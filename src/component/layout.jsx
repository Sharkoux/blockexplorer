import Header from './header'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
import { createGlobalStyle } from 'styled-components'
import BankInfoTicker from './InfoTicker'
import useGetData from '../hook/useGetData'


const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        font-family: 'Roboto', sans-serif;
        margin: 0;
    }
    .links {
        text-decoration: none;
        color: black;
    }
    span {
        color: rgb(34, 114, 255, 0.8);
    }
`


const symbols = {
    usd: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    cny: '¥',
    inr: '₹',
    rub: '₽',
    krw: '₩',
    btc: '₿',
    eth: 'Ξ',
    ltc: 'Ł',
    xrp: 'Ʀ',
    eos: '₳',
    bnb: 'Ƀ',
    link: '£',
    bch: '₿',
    dot: '₯',

};


const generateBankInfos = (data) => {
    const keys = [
        "usd", "eur", "gbp", "jpy", "cny", "inr", "rub", "krw", "btc", "eth", "ltc", "xrp", "eos", "bnb", "link", "bch", "dot"
    ];

    return keys.map(key => {
        const symbol = symbols[key];

        if (data[key]) {
            return `ETH/${key.toUpperCase()}: ${data[key]?.toFixed(2)}${symbol}`;
        }
    }).filter(Boolean);
};


/* Component Layout (component to display header, footer and children) */
const Layout = ({ children }) => {
    const [currentPrices, setCurrentPrices] = useState(null)

    const { GetData, currentPrice } = useGetData({ currencies: 'usd' })

    useEffect(() => {
        if (currentPrices === null) {
            GetData()
            setCurrentPrices(currentPrice)
        }
    }, [currentPrice])

    let bankInfo = currentPrices ? generateBankInfos(currentPrice) : [];


    return (
        <React.Fragment>
            <GlobalStyle />
            <BankInfoTicker data={bankInfo} speed={2} />
            <Header />
            <main>
                {children}
                <Outlet />{' '}
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Layout