import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import useGetData from '../hook/useGetData'
import LoadingSpinner from '../component/spinner';
import Tables from '../component/tables';
import useGetTotalSupply from '../hook/useGetTotalSupply'
import { useLocation } from "react-router-dom";

/* global BigInt */

const TransactionsContainer = styled.div`
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
.allBlock_Container {
    margin: auto;
    @media (max-width: 1200px) {
        margin: 0;
    }
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
function Transactions() {
    const [dataGeneral, setDataGeneral] = useState(null)
    const [spinner, setSpinner] = useState(true);

    const { state } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const [category, setCategory] = useState(["external", "internal", "erc20", "erc721", "erc1155"])

    const buttons = (getCategory) => {
        return (
            <></>
        )
    }


    const Columns = React.useMemo(
        () => [

            { header: "Txn Hash", accessor: "hash", sortable: true, cell: ({ value }) => <Link className="links link" to={`/transaction/${value}`}>{value}</Link> },
            { header: "Block", accessor: "blockNumber", sortable: true, cell: ({ value }) => <Link className="links link" to={`/block/${value}`}>{value}</Link> },
            { header: "From", accessor: "from", sortable: true, cell: ({ value }) => <Link className="links link " to={`/address/${value}`}>{value}</Link> },
            { header: "To", accessor: "to", sortable: true, cell: ({ value }) => <Link className="links link " to={`/address/${value}`}>{value}</Link> },
            { header: "Value", accessor: "value", sortable: true, cell: ({ value }) => { const values = Utils.formatUnits(BigInt(parseInt(value?._hex, 16)), 'ether'); return <p>{values.toString()} ETH</p> } },
        ]
    )


    useEffect(() => {
        const getTransactions = async () => {
            setSpinner(true)
            if (typeof state === 'number') {
                let allTransactions = await alchemy.core.getBlock(state);
                setDataGeneral(allTransactions)
                setSpinner(false)
            }
           if(Array.isArray(state)) {
                let transactions = new Object()
                transactions.transactions = state
                setDataGeneral(transactions)
                setSpinner(false)
            }


        }
        getTransactions()

    }, [])



    return (

        <TransactionsContainer>
            {spinner ? <LoadingSpinner /> : null}
            <h1>Transactions:</h1>
            <div className='allBlock_Container'>
                <Tables
                    Columns={Columns}
                    buttons={buttons}
                    category={category}
                    setCategory={setCategory}
                    type={'transactions'}
                    transactions={dataGeneral}
                    setSpinner={setSpinner}
                />
            </div>
        </TransactionsContainer>
    )
}

export default Transactions