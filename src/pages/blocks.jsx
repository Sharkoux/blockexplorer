import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import useGetData from '../hook/useGetData'
import LoadingSpinner from '../component/spinner';
import Tables from '../component/tables';
import useGetTotalSupply from '../hook/useGetTotalSupply'


/* global BigInt */

const BlocksContainer = styled.div`
position: relative;
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
padding-bottom: 70px;
@media (max-width: 1400px) {
    margin-right: 100px;
    margin-left: 100px;
}
@media (max-width: 1200px) {
    margin-right: 50px; 
    margin-left: 50px;
    overflow: auto;
}
@media (max-width: 800px) {
    margin-right: 20px;
    margin-left: 20px;
}
h1 {
    font-size: 22px;
    align-self: center;
    padding-top: 20px;
    color: white;
}
.address_Container {
    display: flex;
    width: 100%;
}
.informationAddress_Container {
    display: flex;
    flex-direction: column;
    background-color: rgb(255,255,255, 0.2);
    box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.75);
    border-radius: 20px;
    padding: 30px;
    align-items: center;
    justify-content: center;
    width: 400px;
    margin: auto;
    margin-top: 100px;
    margin-left: 15px;
    margin-right: 20px;
}
.link {
    color: white;
    font-size: 17px;
}
h3 {
    color: rgb(100, 101, 115, 0.9);
}
ul {
    list-style-type: none;
    padding: 15px;
    margin: 0;
    color: white;
    font-size: 17px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: rgb(255,255,255, 0.2);
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 10px;
    max-height: 250px;
    &::-webkit-scrollbar {
        width: 0px;
    };
}
li {
    padding: 10px;
    border-bottom: 1px solid rgb(255,255,255, 0.4);
}
.dropdownToken {
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
.dropdownToken:hover {
    background-color: rgb(34, 114, 255, 0.8);
}
.links {
    @media (max-width: 1000px) {
        font-size: 13px;
    }
}
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);




/* Page  */
function Blocks() {
    const [block, setBlock] = useState(null)
    const [spinner, setSpinner] = useState(true)



    const buttons = (getCategory) => {
        return (
            <></>
        )
    }

    useEffect(() => {
        const getBlock = async () => {
            let test = await alchemy.core.getBlockNumber()
            setBlock(test);
        }
        getBlock()
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    const Columns = React.useMemo(
        () => [

            { header: "Block", accessor: "number", sortable: false, cell: ({ value }) => <Link className="links link" to={`/block/${value}`}>{value}</Link> },
            { header: "Time", accessor: "timestamp", sortable: false, cell: ({ value }) => <Link className="links link" to={`/address/${value}`}>{value}</Link> },
            { header: "Txn", accessor: "transactions", sortable: false, cell: ({ value }) => <Link className="links link " to={`/address/${value}`}>{value.length}</Link> },
            { header: "Hash", accessor: "hash", sortable: false, cell: ({ value }) => <Link className="links link " to={`/transaction/${value}`}>{value}</Link> },
            { header: "Miner", accessor: "miner", sortable: false },
            { header: "Gas Used", accessor: "gasUsed", sortable: false, cell: ({ value }) => <p>{value?._hex}</p> },
            { header: "Gas Limit", accessor: "gasLimit", sortable: false, cell: ({ value }) => <p>{value?._hex}</p> },
            { header: "Base Fee", accessor: "baseFeePerGas", sortable: false, cell: ({ value }) => <p>{value?._hex}</p> }
        ]
    )



    return (

        <BlocksContainer>
            <h1>Blocks</h1>
            {spinner ? <LoadingSpinner /> : null}
            <Tables Columns={Columns} buttons={buttons} type={'blocks'} blocks={block} setSpinner={setSpinner} />
        </BlocksContainer>
    )
}

export default Blocks