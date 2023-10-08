import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
const { Alchemy, Network } = require("alchemy-sdk");

const SearchBars = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    max-width: 1200px;
    width: 100%;
    height: 50px;
    margin: auto;
    padding-bottom: 60px;
    @media (max-width: 800px) {

    }
    select {
        width: 150px;
        height: 42px;
        border-radius: 5px 0px 0px 5px;
        border: 0;
        
    }
    select:focus {
        outline: none;
    }
    input {
        width: 1000px;
        height: 40px;
        margin: 0;
        border: 0;
        border-radius: 0px;
        @media (max-width: 800px) {
            width: auto;
        }
    }
    input:focus {
        outline: none;
    }
    button {
        width: 60px;
        height: 42px;
        border-radius: 0px 5px 5px 0px;
        border: 0;
        background-color: rgb(192,192,192, 0.7);
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
    button:hover {
        background-color: rgb(34, 114, 255, 0.8);
    }
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

/* Component Header (component to display header) */
function SearchBar() {
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All filter")
    const navigate = useNavigate()

    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === "Enter") {
                e.preventDefault()
                handleSubmit()
            }
        }
        window.addEventListener("keydown", handleEnter)
        return () => {
            window.removeEventListener("keydown", handleEnter)
        }
    }, [search])

    const handleSubmit = (e) => {

        let re = /^[0-9]{8}$/;
        if (search.length === 66 || filter === "Txn") {
            try {
                navigate(`/transaction/${search}`)
            } catch (error) {
                console.log(error)
                navigate(`*`, { state: error })
            }
        }
        if (search.length === 42 || filter === "Address") {
            const userOrnot = async () => {
                try {
                    const result = await alchemy.core.isContractAddress(search)

                    if (result) {
                        navigate(`/token/${search}`)
                    }
                    else {
                        navigate(`/address/${search}`)
                    }
                } catch (error) {
                    console.log(error)
                    navigate(`*`, { state: error })
                }
            }
            userOrnot()
            console.log('it s an address')
        }
        if (re.test(search)) {
            navigate(`/block/${search}`)
            console.log('it s a block')
        }
    }


    return (
        <SearchBars>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All filter" >All filter</option>
                <option value="Address">Address</option>
                <option value="Txn">Txn</option>
                <option value="Block">Block</option>
            </select>
            <input type="text" placeholder="Search by address / Txn Hash / Block / Token" onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" onClick={() => handleSubmit()} >Search</button>
        </SearchBars>
    )
}

export default SearchBar