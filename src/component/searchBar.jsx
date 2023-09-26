import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const SearchBars = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    width: 600px;
    height: 50px;
    margin: auto;
    select {
        width: 150px;
        height: 30px;
        border-radius: 5px 0px 0px 5px;
    }
    input {
        width: 400px;
        height: 30px;
    }
`


/* Component Header (component to display header) */
function SearchBar() {


    return (
        <SearchBars>
            <select name="All filter" >
                <option value="All filter">All filter</option>
                <option value="Address">Address</option>
                <option value="Tokens">Tokens</option>
            </select>
            <input type="text" placeholder="Search by address / Txn Hash / Block / Token" />
            <button type="submit">Search</button>
        </SearchBars>
    )
}

export default SearchBar