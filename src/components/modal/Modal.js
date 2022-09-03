import React, { useState, useEffect } from 'react';
import "./modal.css";
import metamask from "../../img/metamask.png";
import keplr from "../../img/keplr.png";
import {
    chainID,
  } from "../utils/constants";
import { ethers } from "ethers";
  



export default function Modal(props) {

    const [checkchain, setcheckchain] = useState(false);
    const { ethereum } = window;
  
  
    const chainName = "SEI Testnet";
    const chainIds = "atlantic-1";
    const lcdURL = "https://sei-chain-incentivized.com/sei-chain-app"
    const tendermintURL = "https://sei-chain-incentivized.com/sei-chain-tm/";
  
  
  
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
                  loginmetamask();
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
                    loginmetamask();
                  }
                }
              } else if (chainId.chainId === chainID) {
                setcheckchain(true);
              }
      
      
        };
    
  
  
  
      const loginmetamask = async () => {
  
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
            props.setModal(false);
            props.setmetamaskl(true);
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
  
  
  
  
  
      const connectKeplr = async (
  
        chainIdInput = chainIds,
        chainNameInput = chainName,
        restUrl = lcdURL,
        rpcUrl = tendermintURL
  
      ) => {
        if (!window.getOfflineSigner || !window.keplr) {
          alert("Keplr Wallet not detected, please install extension");
          return {
            accounts: null,
          };
        }
        if (!window.keplr.experimentalSuggestChain) {
          alert(
            "Please use latest version of the Keplr extension to access experimental features"
          );
        }
      
        const prefix = "sei";
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: chainIdInput,
            chainName: chainNameInput,
            rpc: rpcUrl,
            rest: restUrl,
            bip44: {
              coinType: 118,
            },
            bech32Config: {
              bech32PrefixAccAddr: prefix,
              bech32PrefixAccPub: `${prefix}pub`,
              bech32PrefixValAddr: `${prefix}valoper`,
              bech32PrefixValPub: `${prefix}valoperpub`,
              bech32PrefixConsAddr: `${prefix}valcons`,
              bech32PrefixConsPub: `${prefix}valconspub`,
            },
            currencies: [
              {
                coinDenom: "SEI",
                coinMinimalDenom: "usei",
                coinDecimals: 6,
              },
              {
                coinDenom: "USDC",
                coinMinimalDenom: "uusdc",
                coinDecimals: 6,
                coinGeckoId: "usd-coin",
              },
              {
                coinDenom: "ATOM",
                coinMinimalDenom: "uatom",
                coinDecimals: 6,
                coinGeckoId: "cosmos",
              },
              {
                coinDenom: "WETH",
                coinMinimalDenom:
                  "ibc/C2A89D98873BB55B62CE86700DFACA646EC80352E8D03CC6CF34DD44E46DC75D",
                coinDecimals: 18,
                coinGeckoId: "weth",
              },
              {
                coinDenom: "WBTC",
                coinMinimalDenom:
                  "ibc/42BCC21A2B784E813F8878739FD32B4AA2D0A68CAD94F4C88B9EA98609AB0CCD",
                coinDecimals: 8,
                coinGeckoId: "bitcoin",
              },
              {
                coinDenom: "aUSDC",
                coinMinimalDenom:
                  "ibc/6D45A5CD1AADE4B527E459025AC1A5AEF41AE99091EF3069F3FEAACAFCECCD21",
                coinDecimals: 6,
                coinGeckoId: "usd-coin",
              },
            ],
            feeCurrencies: [
              {
                coinDenom: "SEI",
                coinMinimalDenom: "usei",
                coinDecimals: 6,
              },
            ],
            stakeCurrency: {
              coinDenom: "SEI",
              coinMinimalDenom: "usei",
              coinDecimals: 6,
            },
            coinType: 118,
            features: ["stargate", "ibc-transfer", "cosmwasm"],
          });
        } catch {
          alert("Failed to suggest the chain");
        }
      
        await window.keplr.enable(chainIds);
        console.log("in");
      
        const sendingSigner = await window.keplr.getOfflineSigner(chainIds);
        if (!sendingSigner)
          throw new Error(`Failed to get sendingSigner for ${chainIds}`);
      
        const accounts = await sendingSigner.getAccounts();
        console.log(accounts);
        console.log(accounts[0].address);
        props.setSeiAddress(accounts[0].address);
        props.setModal(false);
        props.setKwp(true);
        props.setmetamaskl(true);
        return { accounts, signer: sendingSigner };
      };
  
  
  

    const cancelmodal = () => {
      props.setModal(false);
    }


  return (
    <div className='modal-container'>

       <div className='main-contain'>
             
             <div className='metamask' onClick={loginmetamask} ><img src={metamask} /></div>
             <div className='kepler' onClick={connectKeplr} ><img src={keplr} /></div>
             <div className='cancel' onClick={cancelmodal} >X</div>

       </div>

    </div>
  )
}
