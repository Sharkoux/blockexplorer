import Header from './header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer'
import { createGlobalStyle } from 'styled-components'
import BankInfoTicker from './slider'

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
        color: rgb(205,92,92, 0.8);
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



/* Component Layout (component to display header, footer and children) */
const Layout = ({ children }) => {
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