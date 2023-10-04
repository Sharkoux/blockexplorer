import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import useGetData from '../hook/useGetData'
import LoadingSpinner from '../component/spinner';
import Tables from '../component/tables';


/* global BigInt */

const AddressContainer = styled.div`
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
`

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);




/* Page  */
function Address() {

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

    const [balance, setBalance] = useState(null);
    const [allBalance, setAllBalance] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [open, setOpen] = useState(false);
    const { id } = useParams()

    const { price, GetPrice } = useGetData({ currencies: 'usd' })
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

    

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getAccount = async () => {
            setSpinner(true)
            const account = await alchemy.core.getBalance(id);
            setBalance(Utils.formatUnits(BigInt(parseInt(account._hex, 16)), 'ether'));
            const balances = await alchemy.core.getTokenBalances(id);
            const nonZeroBalances = balances.tokenBalances.filter((token) => {
                return token.tokenBalance !== "0";
            });
            const newBalances = [];
            for (let i = 0; i < nonZeroBalances.length; i++) {
                const metadata = await alchemy.core.getTokenMetadata(nonZeroBalances[i].contractAddress);
                let balance = nonZeroBalances[i].tokenBalance / Math.pow(10, metadata.decimals);
                newBalances.push({ name: metadata.name, balance: balance, symbol: metadata.symbol });
            }
            const filterdBalances = newBalances.filter(token => !token.symbol.includes('Visit') && !token.symbol == '' && !token.balance == '0')
            setAllBalance(filterdBalances);

            if (price === null) {
                GetPrice();
            }
        };

        getAccount();

    }, [id]);

    useEffect(() => {
        if (allBalance.length || price) {
            setSpinner(false)
        }
    }, [allBalance, price]);


    /* Return Home container with Banner and map data to card component */
    return (

        <AddressContainer>
            {spinner ? <LoadingSpinner /> : null}
            <h1>Address #{id}</h1>
            <div className='address_Container'>
                <div className='informationAddress_Container'>
                    <h3>Overview:</h3>
                    <p>ETH balance: {Math.round(balance)} ETH</p>
                    <p>ETH Value: {Math.round(balance * price)}$ </p>
                    <p>Token Holdings: </p>
                    <button className="dropdownToken" onClick={() => setOpen(!open)}>{allBalance.length} Tokens</button>
                    {open ?
                        <ul>
                            {allBalance?.map((token, index) => {
                                return (
                                    <li key={index}>
                                        {token.name}: {token.balance} {token.symbol}
                                    </li>
                                );
                            })}
                        </ul>
                        : null}
                </div>
                <Tables address={id} id={id} setCategory={setCategory} category={category} Columns={Columns} buttons={buttons} />
            </div>
        </AddressContainer>
    )
}

export default Address