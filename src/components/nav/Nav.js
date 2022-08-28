import React, { useState, useEffect } from 'react';
import "./nav.css";
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../img/logo.png"
import metamask from "../../img/metamask.png";
import keplr from "../../img/keplr.png";



export default function Nav(props) {





    const callmodal = () => {
       props.setModal(true);
    }












  return (
    <div className='nav-container'> 

        <div className='first-div'>

          <img src={logo} alt='logo' className='first-divchildren' />
          <div className='first-divchildren' >Bridge</div>
          <div className='first-divchildren' >Bridge</div>

        </div>



        <div className='second-div'>

          <button className='wallet-connect' onClick={callmodal}> 
    
            <div className='containcontain'>

              { props.kep && props.metamaskl ?

              <div className='containlogoconnect'>
                <img className='logoimg' src={metamask} />  
                <img className='logoimg' src={keplr} /> 
              </div>

              : !props.kep && props.metamaskl ?

              <div className='containlogoconnect'>
                <img className='logoimg' src={metamask} />
                Add extra 
              </div>

              : props.kep && !props.metamaskl ?

              <div className='containlogoconnect'>
                <img className='logoimg' src={keplr} />
                Add extra 
              </div>

              : 

               "connect wallet" 

              }

            </div>

             <PersonIcon className='wallet-connectIcon' /> 
          </button>

        </div>

    </div>
  )
}
