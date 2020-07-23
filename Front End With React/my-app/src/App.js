import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/"> Namaste </NavbarBrand>
        </div>
      </Navbar>
      <Message />
    </div>
  );
}

export default App;
