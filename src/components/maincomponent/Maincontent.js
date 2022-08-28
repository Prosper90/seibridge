import React from 'react'
import "./maincontent.css";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ethers } from 'ethers';



export default function Maincontent(props) {






  /*

  const bridge = async () => {


    const Gateway = require('../../artifacts/@axelar-network/axelar-cgp-solidity/contracts/interfaces/IAxelarGateway.sol/IAxelarGateway.json');
    const IERC20 = require('../../artifacts/@axelar-network/axelar-cgp-solidity/contracts/interfaces/IERC20.sol/IERC20.json');

    const args = options.args || [];
    const source = chains.find((chain) => chain.name == (args[0] || 'Avalanche'));
    const destination = chains.find((chain) => chain.name == (args[1] || 'Fantom'));
    const amount = args[2] || 10e6;
    const destinationAddress = args[3] || wallet.address;
    const symbol = 'aUSDC';





    const provider = getDefaultProvider(chain.rpc);
    chain.wallet = wallet.connect(provider);
    chain.contract = new Contract(chain.gateway, Gateway.abi, chain.wallet);
    const tokenAddress = await chain.contract.tokenAddresses(symbol);
    chain.token = new Contract(tokenAddress, IERC20.abi, chain.wallet);






    const balance = await destination.token.balanceOf(destinationAddress);
    console.log('--- Initially ---');
    await print();

    await (await source.token.approve(source.gateway, amount)).wait();

    await (await source.contract.sendToken(destination.name, destinationAddress, symbol, amount)).wait();
    while (true) {
        const newBalance = await destination.token.balanceOf(destinationAddress);
        if (BigInt(balance) != BigInt(newBalance)) break;
        await sleep(2000);
    }

    console.log('--- After ---');
    await print();


  }

*/




  return (
    <form className='maincontent-container' > 

      <h6 className='header'>Bridge</h6>

      <div className='from'>

            <div className='top-layer'>from : ETH</div>
            <div className="inputform" >
                 <input  className="input" placeholder="0.0"  />ETH
            </div>
        
      </div>

      <SwapVertIcon className='icon-swap' />

      <div className='from'>

          <div className='top-layer' >To : SEI</div>
          <div className="inputform" >
              <input  className="input" placeholder="0.0"  />SEI
          </div>

      </div>


      <div className='third-div'>
          <button className='bridge-connect' type='submit'> Bridge token </button>
       </div>



    </form>
  )
}
