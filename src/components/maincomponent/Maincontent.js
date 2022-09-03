import React, {useState, useEffect} from 'react';
import "./maincontent.css";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ethers } from 'ethers';
import {EthereumGateway, contractABI, aUSDCaddress, gateABI, attachContract} from "../utils/constants";
import Notification from "../notification/Notification";




export default function Maincontent(props) {

  const [notificationMessage, setNotificationMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);

  

  const bridge = async (e) => {

    e.preventDefault();
    const sendamount = e.target.transfer.value;

    if(sendamount === "") {
      setOpen(true);
      setSeverity("warning");
      setNotificationMessage("invalid amount");
    }



    console.log(sendamount);
    console.log(EthereumGateway);
    console.log(attachContract);
    console.log(String(props.seiaddress));
    const seiadd = props.seiaddress.toString();
    console.log(seiadd);


    const signer = props.provider.getSigner();

    const Tokeninstance = new ethers.Contract(
      aUSDCaddress,
      contractABI,
      signer
    );


    const Gatewayinstance = new ethers.Contract(
      EthereumGateway,
      gateABI,
      signer
    );

    //const callsend = await Gatewayinstance.attach(attachContract);


    await Tokeninstance.approve(EthereumGateway, ethers.utils.parseEther(sendamount));



   console.log("not this one here");
 



    setTimeout( async function () {

      await Gatewayinstance.sendToken( "SEI", String(props.seiaddress), "aUSDC", ethers.utils.parseEther(sendamount), {
        gasLimit: 300000,
        nonce: 100 || undefined,
      } ) ;

      console.log(Gatewayinstance.hash);
      console.log("We Don Reach oooo");

      console.log("success");
      setOpen(true);
      setSeverity("success");
      setNotificationMessage("Token Sent");


  },45000);







  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };





  return (
    <form className='maincontent-container' onSubmit={bridge}> 

      <h6 className='header'>Bridge</h6>

      <div className='from'>

            <div className='top-layer'>from : ETH</div>
            <div className="inputform" >
                 <input name="transfer"  className="input" placeholder="0.0"  />ETH
            </div>
        
      </div>

      <SwapVertIcon className='icon-swap' />

      <div className='from'>

          <div className='top-layer' >To : SEI</div>
          <div className="inputform" >
              <input name="recieve"  className="input" placeholder="0.0"  />SEI
          </div>

      </div>


      <div className='third-div'>
          <button className='bridge-connect' type='submit'> Bridge token </button>
       </div>


   
       <Notification open={open} handleClose={handleClose} severity={severity} notificationMessage={notificationMessage} />

    </form>
  )
}
