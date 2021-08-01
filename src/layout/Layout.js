import React, { Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import {Container} from "@material-ui/core";
import Home from "../pages/Home";
import About from "../pages/About"

function Layout() {
  const allTabs = ['/', '/about'];

  return (
    <Container fixed>
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs  centered value={location.pathname} indicatorColor="primary" textColor="primary">
                <Tab label="Home" value="/" component={Link} to={allTabs[0]} />
                <Tab label="About" value="/about" component={Link} to={allTabs[1]} />
              </Tabs>
              <SwipeableRoutes>
                <Route key={'home'} path={allTabs[0]} render={() => <Home/>} />
                <Route key={'about'} path={allTabs[1]} render={() => <About/>} />
              </SwipeableRoutes>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
    </Container>
  );
}

export default Layout;
