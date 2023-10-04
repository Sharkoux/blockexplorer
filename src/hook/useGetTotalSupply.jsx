import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

export default function useGetTotalSupply() {
    const [totalSupply, setTotalSupply] = useState(null);

    const getERC20TotalSupply = async (tokenAddress) => {
        // Initialiser un fournisseur en utilisant Alchemy
        const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

        // ABI pour la fonction totalSupply d'un contrat ERC-20 standard
        const minABI = [
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{ "name": "", "type": "uint256" }],
                "type": "function"
            }
        ];

        // Créer une nouvelle instance du contrat
        const contract = new ethers.Contract(tokenAddress, minABI, provider);

        // Appeler la fonction totalSupply
        try {
            const totalSupply = await contract.totalSupply();
            setTotalSupply(totalSupply.toString());
        } catch (error) {
            console.error("An error occurred: ", error);
            return null;
        }
    };

    return { getERC20TotalSupply, totalSupply };
}