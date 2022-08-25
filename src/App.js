import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Maincontent from './components/maincomponent/Maincontent';
import Footer from './components/footer/Footer';

function App() {

  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState({});

  return (
    <div className="background">
       <Nav address={address} setAddress={setAddress}  provider={provider} setProvider={setProvider} />
       <Maincontent address={address} setAddress={setAddress}  provider={provider} setProvider={setProvider} />
       <Footer />
    </div>
  );
}

export default App;
