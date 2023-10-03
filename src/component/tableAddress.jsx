import styled from "styled-components"
import { Link } from 'react-router-dom'
import React, { lazy, useEffect, useState } from "react"
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Table } from 'sharkoux-packages-tables'

/* global BigInt */

const Styles = styled.div`
    margin: 0;
    margin-top: 100px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-right: 50px;
    tr {
        background: none;
    }
    table {
        background-color: rgb(255,255,255, 0.2);
        box-shadow: 0px 0px 10px 0px rgba(255,255,255, 0.75);
        color: white;
        padding: 10px;
    }
    .cell {
        color: white;
        max-width: 250px;
        overflow: hidden;
        border-right: 1px solid white!important;
        border-bottom: 1px solid white!important;
        padding: 5px;
    }
    button {
        background-color: rgb(192,192,192, 0.7);
        border: 0;
        color: white;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        margin: 10px;
    }
    button:hover {
        background-color: rgb(34, 114, 255, 0.8);
    }
    .Columns {
        font-weight: bold;
        background: none;
    }
`


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


function TableAddress({ address }) {
    const [category, setCategory] = useState(["external", "internal", "erc20", "erc721", "erc1155"])
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 20,
        page: 1,
        sortField: null,
        sortOrder: 'asc',
        search: null,
        pagination: true,
        infiniteScroll: false,
        input: false,
        draggable: false
    });
    const [pageKeys, setPageKeys] = useState([]);
    const [pageKey, setPageKey] = useState(null);
    const [data, setData] = useState([]);

    const loadMoreData = async () => {
        try {
            const response = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: address,
                category: category,
                order: lazyState.sortOrder ? lazyState.sortOrder : undefined,
                maxCount: lazyState.rows,
                pageKey: pageKeys[lazyState.page - 1],
            });
            setData(response.transfers);
            setPageKeys((prevKeys) => {
                const newKeys = [...prevKeys];
                newKeys[lazyState.page] = response.pageKey;
                return newKeys;
            });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        loadMoreData();
    }, [lazyState.page]);

    useEffect(() => {
        if (lazyState.sortField) {
            setData(prevData => {
                return [...prevData].sort((a, b) => {
                    const valueA = a[lazyState.sortField];
                    const valueB = b[lazyState.sortField];
                    return lazyState.sortOrder === 'asc'
                        ? (valueA < valueB ? -1 : 1)
                        : (valueA > valueB ? -1 : 1);
                });
            });
        }
    }, [lazyState.sortField, lazyState.sortOrder]);

    const Columns = React.useMemo(
        () => [
            { header: "Asset", accessor: "asset", sortable: true },
            { header: "Block", accessor: "blockNum", sortable: true },
            { header: "From", accessor: "from", sortable: true },
            { header: "To", accessor: "to", sortable: true },
            { header: "Hash", accessor: "hash", sortable: true },
            { header: "Category", accessor: "category", sortable: true },
            { header: "Unique ID", accessor: "uniqueId", sortable: true },
            { header: "Value", accessor: "value", sortable: true }
        ]
    )

    const onPage = (event) => {
        const { first, page } = event;
        setlazyState((prevState) => ({
            ...prevState,
            first: first,
            page: page
        }));
    };

    const onSort = (event) => {
        const { sortField, sortOrder } = event;
        if (lazyState.infiniteScroll) {
            setlazyState((prevState) => ({
                ...prevState,
                sortField: sortField,
                sortOrder: sortOrder,
                page: 1,
                first: 0
            }));
        }
        else {
            setlazyState((prevState) => ({
                ...prevState,
                sortField: sortField,
                sortOrder: sortOrder
            }));
        }
    };

    return (
        <Styles>
            <Table first={lazyState.first} draggables={lazyState.draggable} onSort={onSort} page={lazyState.page} onPage={onPage} lazy={true} Columns={Columns} Data={data} rows={lazyState.rows} pagination={lazyState.pagination} infiniteScroll={lazyState.infiniteScroll} />
        </Styles>
    )
}

export default TableAddress