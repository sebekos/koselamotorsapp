import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/layout/Header";
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Services from './components/services/Services';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

import './App.css';

const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Alert />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/gallery' component={Gallery} />
          <Route exact path='/login' component={Login} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  </Provider>


export default App;
