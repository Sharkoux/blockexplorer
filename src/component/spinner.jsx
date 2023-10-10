import React from "react";
import styled from "styled-components";


const SpinnerContainer = styled.div`
position: absolute;
background: rgb(34, 114, 255, 0.7);
z-index: 1000;
width: 100%;
height: 100%;
border-radius: 20px;
#loading {
    margin: 25.75rem auto;
    width: 100px;
    height: 100px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
    `

/* Loading Spinner */
export default function LoadingSpinner() {



    return (
        <SpinnerContainer>
            <div id="loading">
            </div>
        </SpinnerContainer>
    );
}