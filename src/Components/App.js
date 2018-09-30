import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import DB from '../db';
import { NotFound } from "./Errors";
import Layout from "./Layout";
import Players from "./Players";
import Teams from './Teams';
import MySquad from './MySquad';
import Market from './Market';
import { CssBaseline } from '@material-ui/core';

class App extends Component {

  render() {

    return (

      <div className="App">
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <div>Home</div>} />
              <Route path="/players" render={() => <Players/>} />
              <Route path="/teams" render={() => <Teams />} />
              <Route path="/mySquad" render={() => <MySquad />} />
              <Route path="/market" render={() => <Market />} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
