import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./redux/actions/auth";
import { ToastContainer, Slide } from "react-toastify";

import setAuthToken from "./redux/utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AddPhotos from "./components/addphotos/AddPhotos";
import DeletePhotos from "./components/deletephotos/DeletePhotos";
import PhotoSortable from "./components/reorder/PhotoSortable";
import Inventory from "./components/inventory/Inventory";
import InventorySingle from "./components/inventory/InventorySingle";
import EditInfo from "./components/editinfo/EditInfo";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import ScrollToTop from "./utils/scrollToTop";

// css
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";

// redux
import { Provider } from "react-redux";
import store from "./redux/store/store";

import "./App.css";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <ToastContainer hideProgressBar pauseOnHover={false} transition={Slide} />
                <ScrollToTop />
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/services" component={Services} />
                    <Route exact path="/inventory" component={Inventory} />
                    <Route exact path="/inventory/:id" component={InventorySingle} />
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
            </Router>
        </Provider>
    );
};

export default App;
