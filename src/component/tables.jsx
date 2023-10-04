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
    .button_Container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
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
        max-width: 200px;
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
        padding: 10px!important;
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


function Tables({ address, id, category, setCategory, Columns, buttons, type, blocks, setSpinner}) {
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
    const [data, setData] = useState([]);


    const loadMoreData = async () => {
        if (!type) {
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
        }
    }
    const getBlocks = async (startBlock, endBlock) => {
        if(type !== 'blocks') return
        const fetchedBlocks = [];

        // Assurez-vous que startBlock est toujours supérieur à endBlock
        for (let i = startBlock; i >= endBlock; i--) {
            try {
                const blockData = await alchemy.core.getBlock(i);
                if (blockData) {
                    fetchedBlocks.push(blockData);
                }
            } catch (error) {
                console.error(`Error fetching block:`, error);
            }
        }

        setData(fetchedBlocks);
    }


    useEffect(() => {
        loadMoreData();
        getBlocks()
    }, [lazyState.page, category, id]);

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


    const onPage = (event) => {
        const { first, page } = event;
        setlazyState((prevState) => ({
            ...prevState,
            first: first,
            page: page
        }));

        if (type === 'blocks') {
            const newStartBlock = (blocks - 1) - (page - 1) * lazyState.rows;
            const newEndBlock = newStartBlock - lazyState.rows + 1;

            getBlocks(newStartBlock, newEndBlock);
        }
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


    const getCategory = async (categorys) => {
        setlazyState((prevState) => ({
            ...prevState,
            page: 1,
            first: 0
        }));
        setCategory(categorys)

    }

    useEffect(() => {
        if(data.length) {
            setSpinner(false)
        }
    }, [data])

    return (
        <Styles>
            {buttons(getCategory)}
            <Table first={lazyState.first} draggables={lazyState.draggable} onSort={onSort} page={lazyState.page} onPage={onPage} lazy={true} Columns={Columns} Data={data} rows={lazyState.rows} pagination={lazyState.pagination} infiniteScroll={lazyState.infiniteScroll} />
        </Styles>
    )
}

export default Tables