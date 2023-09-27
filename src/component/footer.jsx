import styled from "styled-components"


const Footers = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    p {
        margin: 5px;
    }
`


function Footer() {


    return (
        <Footers>
            <img src="/ether.png" className="logo_img"></img>
            <h3>Contact us: </h3>
            <p>test@gmail.com</p>
            <p>Project from Sharcoux, 2023</p>
        </Footers>
    )
}

export default Footer