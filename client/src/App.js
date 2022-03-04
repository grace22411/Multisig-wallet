import React, {useEffect, useState} from "react"
import Header from "./components/Header";
import {getWeb3, getWallet} from "./utils"

function App() {
    const [web3, setWeb3] = useState(undefined);

    //array of addresses generated in local development
    const [accounts, setAccounts] = useState(undefined);

    //contract instance to wallet
    const [wallet, setWallet] = useState(undefined);

    const [approvers, setApprovers] = useState([]);
    const [quorum, setQuorum] = useState(0);


    useEffect(() => {
      const init = async () => {
        const web3 = getWeb3();
        const accounts = await web3.eth.getAccount();
        const wallet = await getWallet(web3);

        const approvers = await wallet.methods.getApprovers().call();
        const quorum = await wallet.methods.quorum().call();

        setWeb3(web3);
        setAccounts(accounts);
        setWallet(wallet);
        setApprovers(approvers);
        setQuorum(quorum)


      };
      init();
    },[])


    if(web3 === 'undefined' || wallet === 'undefined' || accounts === 'undefined' || approvers.length === 0 ) {
      return <div>Loading....</div>
    }
  return (
    <div>
      <h1>Multisig Wallet</h1>
      <Header />
    </div>
  );
}

export default App;
