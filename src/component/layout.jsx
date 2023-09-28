import Header from './header'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
import { createGlobalStyle } from 'styled-components'
import BankInfoTicker from './InfoTicker'
import useGetData from '../hook/getData'

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

const bankInfos = [
    "ETH/USD: 1,000.00$",
    "ETH/EUR: 1,000.00€",
    "ETH/GBP: 1,000.00£",
    "ETH/JPY: 1,000.00¥",
    "ETH/CNY: 1,000.00¥",
    "ETH/INR: 1,000.00₹",
    "ETH/RUB: 1,000.00₽",
    "ETH/KRW: 1,000.00₩",
    "ETH/BTC: 1,000.00₿",
    "ETH/ETH: 1,000.00Ξ",
    "ETH/LTC: 1,000.00Ł",
    "ETH/XRP: 1,000.00Ʀ",
    "ETH/ADA: 1,000.00₳",
    "ETH/BNB: 1,000.00Ƀ",
    "ETH/USDT: 1,000.00₮",
    "ETH/DOGE: 1,000.00Ð",
    "ETH/USDC: 1,000.00$",
    "ETH/DOT: 1,000.00₯",
    // ... Ajoutez autant d'informations que vous le souhaitez
];

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
    ada: '₳',
    bnb: 'Ƀ',
    usdt: '₮',
    doge: 'Ð',
    usdc: '$',
    dot: '₯',

};


const generateBankInfos = (data) => {
    const keys = [
        "usd", "eur", "gbp", "jpy", "cny", "inr", "rub", "krw", "btc", "eth", "ltc", "xrp", "ada", "bnb", "usdt", "doge", "usdc", "dot"
    ];

    keys.map(key => {
        const value = data[key];
        const symbol = symbols[key];
        console.log(symbols[key], value)
        if (value !== undefined) {
            return `ETH/${key.toUpperCase()}: ${value?.toFixed(2)}${symbol}`;
        }
    });
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
    }, [])
    //const bankInfo = generateBankInfos(currentPrice);
    console.log(currentPrice)

    return (
        <React.Fragment>
            <GlobalStyle />
            <BankInfoTicker data={bankInfos} speed={2} />
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