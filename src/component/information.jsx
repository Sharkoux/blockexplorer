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
    .first_Container {
        height: 50%;
        width: 100%;
        display: flex;
        border-bottom: 1px solid white;
    }
    .second_Container {
        height: 50%;
        width: 100%;
        display: flex;
        margin-top: 15px;
    }

`


/* Component Header (component to display header) */
function Information({ firstValue, secondValue, icone1, icone2 }) {


    return (
        <InformationContainer>
            <div className="first_Container"><p>{firstValue}</p></div>
            <div className="second_Container"><p>{secondValue}</p></div>
        </InformationContainer>
    )
}

export default Information