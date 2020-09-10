import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./redux/actions/auth";
import { getText } from "./redux/actions/text";
import { getPhotos } from "./redux/actions/photo";
import setAuthToken from "./redux/utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import Gallery from "./components/gallery/Gallery";
import About from "./components/about/About";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditModal from "./components/modal/EditModal";
import AddPhotos from "./components/gallery/AddPhotos";
import DeletePhotos from "./components/gallery/DeletePhotos";
import PhotoSortable from "./components/reorder/PhotoSortable";
import GalleryOverview from "./components/gallery/GalleryOverview";
import EditInfo from "./components/edit/EditInfo";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(getText());
        store.dispatch(getPhotos());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <EditModal />
                    <Header />
                    <div className="alert-container">
                        <Alert />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/services" component={Services} />
                        <Route exact path="/gallery" component={GalleryOverview} />
                        <Route exact path="/gallery/:id" component={Gallery} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/reset" component={Reset} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/addphotos/:id" component={AddPhotos} />
                        <PrivateRoute exact path="/deletephotos/:id" component={DeletePhotos} />
                        <PrivateRoute exact path="/sortphotos/:id" component={PhotoSortable} />
                        <PrivateRoute exact path="/editinfo/:id" component={EditInfo} />
                    </Switch>
                    <Footer />
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
