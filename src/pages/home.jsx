import React, { useEffect } from 'react'
import styled from 'styled-components'
import SearchBar from '../component/searchBar'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 100px);
    margin-top: 200px;
    background-color: rgb(34, 114, 255, 0.7);
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        margin-right: 150px;
        margin-left: 150px;
        border-radius: 20px;
    .search_Container {
        display: flex;
        flex-direction: column;
        height: 200px;
        background-color: rgb(255,255,255, 0.2);
        box-shadow: 0px 0px 15px 0px rgba(255,255,255,0.75);
        margin-top: 50px;
        margin-right: 150px;
        margin-left: 150px; 
        border-radius: 20px;
        padding: 50px;
        h1 {
            font-size: 22px;
            align-self: center;
            padding-top: 20px;
            color: white;
        }
    }
`



/* Page Home (page d'accueil) */
function Home() {


    /* Return Home container with Banner and map data to card component */
    return (

        <HomeContainer>
            <div className='search_Container'>
                <h1>Ethereum Chain Explorer: </h1>
                <SearchBar />

            </div>
        </HomeContainer>
    )
}

export default Home