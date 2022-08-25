import React from 'react'
import "./maincontent.css";
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function Maincontent() {
  return (
    <div className='maincontent-container'> 

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
          <button className='bridge-connect'> Bridge token </button>
       </div>



    </div>
  )
}
