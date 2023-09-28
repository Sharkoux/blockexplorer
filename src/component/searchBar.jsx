import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'

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


/* Component Header (component to display header) */
function SearchBar() {


    return (
        <SearchBars>
            <select >
                <option value="All filter" >All filter</option>
                <option value="Address">Address</option>
                <option value="Tokens">Tokens</option>
            </select>
            <input type="text" placeholder="Search by address / Txn Hash / Block / Token" />
            <button type="submit">Search</button>
        </SearchBars>
    )
}

export default SearchBar