import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from "./card"
import { Alchemy, Network, Utils } from 'alchemy-sdk';

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
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 0px;
        };
    }
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


/* Component Header (component to display header) */
function BlockContainer({ type, data }) {
    const [dataArray, setDataArray] = useState([]);



    useEffect(() => {
        if(type !== "Blocks" ) return
        async function getBlocks() {
            if (!data) return
            const numberOfBlocksToFetch = 10; // ou tout autre nombre de votre choix
            const fetchedBlocks = [];

            for (let i = 0; i < numberOfBlocksToFetch; i++) {
                try {
                    const blockNumber = data - i;
                    const blockData = await alchemy.core.getBlock(blockNumber);
                    if (blockData) {
                        fetchedBlocks.push(blockData);
                    }
                } catch (error) {
                    console.error(`Error fetching block:`, error);
                }
            }

            setDataArray(prevDataArray => [...prevDataArray, ...fetchedBlocks]);

        }
        getBlocks();
    }, [data]);


    return (
        <BlockContainers>
            <h1>Latest {type}</h1>
            <div className="scroll_Container">
                {dataArray.slice(0, 10).map((data, index) => {
                    return <Card key={index} type={type} data={data} />
                })}
            </div>
            <button>View All {type}</button>
        </BlockContainers>
    )
}

export default BlockContainer