import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const BlockContainers = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    height: 600px;
    background-color: rgb(255,255,255, 0.2);
    box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
    margin-top: 50px;
    border-radius: 20px;
    padding: 50px;
    color: white;
    width: 100%;
    margin: 30px;
    h1 {
        font-size: 22px;
        align-self: center;
        padding-top: 20px;
        color: white;
    }
    button {
        width: 200px;
        height: 42px;
        border-radius: 5px;
        border: 0;
        background-color: rgb(192,192,192, 0.7);
        color: white;
        font-weight: bold;
        cursor: pointer;
        align-self: center;
        margin-top: 20px;
    }
    button:hover {
        background-color: rgb(34, 114, 255, 0.8);
    }
    .scroll_Container {
        height: 100%;
        width: 100%;
        border: 3px solid rgb(255,255,255, 0.4);
        border-radius: 10px;
    }
`


/* Component Header (component to display header) */
function BlockContainer({ type }) {


    return (
        <BlockContainers>
            <h1>Latest {type}</h1>
            <div className="scroll_Container">

            </div>
            <button>View All {type}</button>
        </BlockContainers>
    )
}

export default BlockContainer