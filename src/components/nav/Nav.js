import React, { useState, useEffect } from 'react';
import "./nav.css";
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../img/logo.png"
import {
  contractABI,
  contractAddress,
  chainID,
} from "../utils/constants";
import { ethers } from "ethers";
import { shortenAddress } from "../utils/trauncate";



export default function Nav(props) {


  const [checkchain, setcheckchain] = useState(false);
  const { ethereum } = window;



  useEffect(() => {


    if (window.ethereum) {

      setProviderWindow();

    } 

  }, [props.address]);






   //set provider with both mobile and window.ethereum

 const setProviderWindow = async () => {
  const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
  props.setProvider(temporalProvider);
}





       //check for correct chain
      const updateAccount = async () => {
       

        console.log("in here");

            console.log("called");

            const chainId = await props.provider.getNetwork();
            console.log(chainId.chainId);
            if (chainId.chainId !== chainID) {

              console.log("still trying");

              try {
                //switch chain
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [
                    {
                      chainId: `0x${Number(3).toString(16)}`,
                    }],
                });
    
                setcheckchain(true);
              } catch (error) {
                if (error === 4902) {
                  //add the token or currency to metamask
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: `0x${Number(3).toString(16)}`,
                        rpcUrls: [
                          " https://data-seed-prebsc-1-s1.binance.org:8545",
                        ],
                        chainName: "BSC testnet",
                        nativeCurrency: {
                          name: "BSC",
                          symbol: "BNB",
                          decimals: 18,
                        },
                        blockExplorerUrls: [
                          "https://explorer.binance.org/smart-testnet",
                        ],
                      },
                    ],
                  });
    
                  setcheckchain(true);
                }
              }
            } else if (chainId.chainId === chainID) {
              setcheckchain(true);
            }
    
    
      };
  



    const login = async () => {

      if(props.provider){


        if(!props.address) {
          console.log("run");
          await ethereum.request({ method: "eth_requestAccounts" });
        } 



        console.log(props.provider);
        const chainId = await props.provider.getSigner().getChainId();
        console.log(chainId);
        if (chainId === chainID) {
          //console.log("called twice");
          const signer = await props.provider.getSigner();
          const accounts = await signer.getAddress();
          console.log(accounts);

          props.setAddress(accounts);
          //setloginStat(true);


        } else {
          // alert("Wrong Chain Switch");
          updateAccount();
        }




    }

    }


    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log("change called")
      props.setAddress(accounts[0]);
    });










  return (
    <div className='nav-container'> 

        <div className='first-div'>

          <img src={logo} alt='logo' className='first-divchildren' />
          <div className='first-divchildren' >Bridge</div>
          <div className='first-divchildren' >Bridge</div>

        </div>



        <div className='second-div'>
          <button className='wallet-connect' onClick={login}> <div> { props.address ? shortenAddress(props.address) : "connect wallet" }  </div> <PersonIcon className='wallet-connectIcon' /> </button>
        </div>

    </div>
  )
}
