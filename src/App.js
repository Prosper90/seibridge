import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Maincontent from './components/maincomponent/Maincontent';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';

function App() {

  const [address, setAddress] = useState("");
  const [seiaddress, setSeiAddress] = useState("");
  const [provider, setProvider] = useState({});
  const [modal, setModal] = useState(false);
  const [metamaskl, setmetamaskl] = useState(false);
  const [kep, setKwp] = useState(false);


  useEffect(() => {

  }, [modal]);

  return (
    <div className="background">


          <Nav 
          address={address} 
          setAddress={setAddress}  
          provider={provider} 
          setProvider={setProvider} 
          modal={modal}  
          setModal={setModal}
          metamaskl={metamaskl}
          kep={kep}
          />
          <Maincontent address={address} setAddress={setAddress}  provider={provider} setProvider={setProvider} seiaddress={seiaddress} />
          <Footer />

          { modal && <Modal 
          address={address} 
          setAddress={setAddress}  
          provider={provider} 
          setProvider={setProvider} 
          modal={modal}  
          setModal={setModal}
          setmetamaskl={setmetamaskl}
          setKwp={setKwp}
          setSeiAddress={setSeiAddress}
           />}
       


    </div>
  );
}

export default App;
