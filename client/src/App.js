import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './Redux/actions/auth';
import { getText } from './Redux/actions/text';
import setAuthToken from './Redux/utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Header from "./components/layout/Header";
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import Services from './components/services/Services';
import Gallery from './components/gallery/Gallery';
import About from './components/about/About';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditModal from './components/modal/EditModal';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

import './App.css';
import AddPhotos from './components/gallery/AddPhotos';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getText());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <EditModal />
          <Header />
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/services' component={Services} />
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/addphotos' component={AddPhotos} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}



export default App;
