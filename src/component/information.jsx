import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 150px;
    background-color: rgb(255,255,255, 0.2);
    box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
    margin-top: 50px;
    border-radius: 20px;
    padding: 50px;
    color: white;
    width: 350px;
    margin: auto;
    .first_Container {
        height: 50%;
        width: 100%;
        display: flex;
        border-bottom: 1px solid white;
        align-items: center;
    }
    .second_Container {
        height: 50%;
        width: 100%;
        display: flex;
        margin-top: 15px;
        align-items: center;
    }
    img {
        height: 35px;
        width: 35px;
        margin-right: 10px;
        color: white;
    }
    p {
        font-size: 20px;
    }

`


/* Component Header (component to display header) */
function Information({ firstValue, secondValue, icone1, icone2 }) {


    return (
        <InformationContainer>
            <div className="first_Container"><img src={icone1}></img><p>{firstValue}</p></div>
            <div className="second_Container"><img src={icone2}></img><p>{secondValue}</p></div>
        </InformationContainer>
    )
}

export default Information