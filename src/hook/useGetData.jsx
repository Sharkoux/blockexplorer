import React, { useState } from "react";
import axios from "axios";


export default function useGetData({ currencies }) {
    const [price, setPrice] = useState(null);
    const [marketCap, setMarketCap] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);

    const Dates = new Date(Date.now()).toLocaleDateString().replace(/\//g, '-');

    function GetData() {
        axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/history?date=${Dates}`)
            .then(res => {
                setMarketCap(res.data.market_data.market_cap[currencies]);
                setCurrentPrice(res.data.market_data.current_price);
                console.log(res.data.market_data.current_price)
            })
            .catch(err => {
                console.log(err);
            });
    }

    function GetPrice() {
        axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`)
            .then(res => {
                setPrice(res.data.result.ethusd);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return { price, GetData, GetPrice, marketCap, currentPrice};
}