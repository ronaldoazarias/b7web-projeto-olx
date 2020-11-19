import React from 'react';
import { connect } from 'react-redux'; // redux
import { BrowserRouter } from 'react-router-dom'; // Router

import './App.css';

import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import Routes from './Routes';

const Page = (props) => { // redux
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>    
  );
}

const mapStateToProps = (state) => { // redux
  return {
    user:state.user
  };
}

const mapDispatchToProps = (dispatch) => { // redux
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page); // redux