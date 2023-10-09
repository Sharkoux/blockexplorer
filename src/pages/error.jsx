import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 100px);
    margin-top: 200px;
    background-color: rgb(34, 114, 255, 0.7);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    margin-right: 150px;
    margin-left: 150px;
    border-radius: 20px;
    color: white;
    align-items: center;
    justify-content: center;
    @media (max-width: 1400px) {
        margin-right: 100px;
        margin-left: 100px;
    }
    @media (max-width: 1200px) {
        margin-right: 50px;
        margin-left: 50px;
        text-align: center;
    }
    @media (max-width: 800px) {
        margin-right: 20px;
        margin-left: 20px;
    }
`




/* Page Home (page d'accueil) */
function Error() {


    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    console.log(location.state)

    /* Return Home container with Banner and map data to card component */
    return (

        <ErrorContainer>
            {location.state === undefined ? <h1>ERROR 404</h1> : <h1>ERROR {location.state.message.split('(')[0].toUpperCase()}</h1>}
        </ErrorContainer>
    )
}

export default Error