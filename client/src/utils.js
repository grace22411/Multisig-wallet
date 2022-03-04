import Web3 from "web3"
import Wallet from "./contracts/Wallet.json"


//connect to ethereum blockchain
const getWeb3 = () => {
    return new Web3('http://localhost:9545');
}

//create contract instance
const getWallet = async web3 => {
    //get network Id
    const networkId = await web3.eth.net.getId();

    //store all data of smart contract deployment
    const contractDeployment = Wallet.networks[networkId];

    return web3.eth.Contract(
        Wallet.abi,
        contractDeployment && contractDeployment.address
    );


};

export{getWeb3, getWallet}