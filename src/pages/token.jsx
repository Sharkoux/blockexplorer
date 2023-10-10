import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import useGetData from '../hook/useGetData'
import LoadingSpinner from '../component/spinner';
import Tables from '../component/tables';
import useGetTotalSupply from '../hook/useGetTotalSupply'

/* global BigInt */

const TokenContainer = styled.div`
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
overflow: auto;
@media (max-width: 1400px) {
    margin-right: 100px;
    margin-left: 100px;
}
@media (max-width: 1200px) {
    margin-right: 50px;
    margin-left: 50px;
    
}
@media (max-width: 800px) {
    margin-right: 20px;
    margin-left: 20px;
}

h1 {
    font-size: 22px;
    text-align: center;
    padding-top: 20px;
    color: white;
    @media (max-width: 1200px) {
        font-size: 18px;
    }
}
.address_Container {
    display: flex;
    width: 100%;
    flex-direction: column;
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
    @media (max-width: 800px) {
        width: 250px;
        text-align: center;
    }
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
function Token() {
    const [suply, setSuply] = useState(null)
    const [dataGeneral, setDataGeneral] = useState(null)
    const [spinner, setSpinner] = useState(true);

    const { id } = useParams()

    const { totalSupply, getERC20TotalSupply } = useGetTotalSupply()

    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    useEffect(() => {
        const getData = async () => {
            const data = await alchemy.core.getTokenMetadata(id);
            console.log(data)
            setDataGeneral(data)
        }
        getData()
        getERC20TotalSupply(id)
    }, [])

    useEffect(() => {
        if (totalSupply) {
            setSpinner(false)
            setSuply(Utils.formatUnits(BigInt(totalSupply), dataGeneral?.decimals))
        }
    }, [totalSupply])

    const [category, setCategory] = useState(["external", "internal", "erc20", "erc721", "erc1155"])

    const buttons = (getCategory) => {
        return (
            <div className="button_Container">
                <button onClick={() => getCategory(["external", "internal", "erc20", "erc721", "erc1155"])}>All</button>
                <button onClick={() => getCategory(["internal"])}>Internal</button>
                <button onClick={() => getCategory(["external"])}>External</button>
                <button onClick={() => getCategory(["erc20"])}>ERC20</button>
                <button onClick={() => getCategory(["erc721"])}>ERC721</button>
                <button onClick={() => getCategory(["erc1155"])}>ERC1155</button>
            </div>
        )
    }


    const Columns = React.useMemo(
        () => [
            { header: "Asset", accessor: "asset", sortable: true, cell: ({ value, row }) => { const link = row?.rawContract?.address ? row?.rawContract?.address : 'ETH'; return (<Link className="links link " to={`/token/${link}`}>{value}</Link>) } },
            { header: "Block", accessor: "blockNum", sortable: true, cell: ({ value }) => <Link className="links link" to={`/block/${value}`}>{value}</Link> },
            { header: "From", accessor: "from", sortable: true, cell: ({ value }) => <Link className="links link" to={`/address/${value}`}>{value}</Link> },
            { header: "To", accessor: "to", sortable: true, cell: ({ value }) => <Link className="links link " to={`/address/${value}`}>{value}</Link> },
            { header: "Hash", accessor: "hash", sortable: true, cell: ({ value }) => <Link className="links link " to={`/transaction/${value}`}>{value}</Link> },
            { header: "Category", accessor: "category", sortable: true },
            { header: "Unique ID", accessor: "uniqueId", sortable: true },
            { header: "Value", accessor: "value", sortable: true }
        ]
    )


    return (

        <TokenContainer>
            {spinner ? <LoadingSpinner /> : null}
            <h1>Token #{id}</h1>
            <div className='address_Container'>
                <div className='informationAddress_Container'>
                    <h3>{dataGeneral?.name}</h3>
                    <img src={dataGeneral?.logo} />
                    <p> Total Supply: {suply}  {dataGeneral?.symbol}</p>


                </div>
                <Tables address={id} id={id} category={category} setCategory={setCategory} Columns={Columns} buttons={buttons} />
            </div>
        </TokenContainer>
    )
}

export default Token