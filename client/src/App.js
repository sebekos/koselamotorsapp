import React, { Fragment } from 'react';
import Header from "./components/layout/Header";
import Showcase from "./components/layout/Showcase";
import Boxes from './components/layout/Boxes';
import './App.css';

const App = () =>
  <Fragment className="App">
    <Header />
    <Showcase />
    <Boxes />
  </Fragment>

export default App;
