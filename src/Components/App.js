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
  state = {
    players: [],
    teams: [],
    mySquad: []
  }

  componentDidMount() {
    fetch('http://localhost:3002/players')
      .then(res => res.json())
      .then(players => this.setState({ players }))
    fetch('http://localhost:3002/teams')
      .then(res => res.json())
      .then(teams => this.setState({ teams }))
    fetch('http://localhost:3002/mySquad')
      .then(res => res.json())
      .then(mySquad => this.setState({ mySquad }))
  }

  render() {
    const { players, teams, mySquad } = this.state;

    return (

      <div className="App">
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <div>Home</div>} />
              <Route path="/players" render={props => <Players {...props} players={players} teams={teams} />} />
              <Route path="/teams" render={props => <Teams {...props} teams={teams} players={players} />} />
              <Route path="/mySquad" render={props => <MySquad {...props} squad={mySquad} />} />
              <Route path="/market" render={props => <Market {...props} players={players} teams={teams} />} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
