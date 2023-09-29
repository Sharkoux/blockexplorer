import styled from "styled-components"
import { Link } from 'react-router-dom'

const Cards = styled(Link)`
    display: flex;
    height: 10%;
    background-color: rgb(255,255,255, 0.3);
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    color: white;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    list-style: none;
    img {
        height: 35px;
        width: 35px;
        margin-right: 10px;
        color: white;
        border-right: 3px solid white;
        padding-right: 15px;
    }
    
`


function Card({ type, data }) {



    return (
        <Cards to={type === "Blocks" ? `/block/${data.number}` : <></>}>
            {
                type === "Blocks" ?
                    <>
                        <img src="/blocs.png"></img>
                        <p>Number Block: {data?.number}</p>
                        <p>Number Transactions in Block: {data?.transactions?.length} txns</p>
                    </>
                    :
                    <img src="/transaction.png"></img>

            }

        </Cards>
    )
}

export default Card