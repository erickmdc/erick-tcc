import React, { Component, Fragment } from 'react'
import {
    withStyles, Grid
} from '@material-ui/core';
import Squad from "./Squad";
import Resume from './Resume';

const styles = {
    card: {
        minWidth: 275,
        justifyContent: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    CardContent: {
        justifyContent: 'center'
    }
};

class MySquad extends Component {
    constructor() {
        super();
        this.state = {
            squad: []
        }
        this.handleSell = this.handleSell.bind(this);
    }
    

    orderByPosition = (a, b) => {
        if (a.position === "Goleiro") return -1;
        if (a.position === b.position) return 0;
        return 1;
    }

    process = squad => {
        if (squad.length === 5) return squad;

        for (let x = squad.length; x < 5; x++) {
            squad.push({});
        }

        return squad.sort(this.orderByPosition);
    }

    handleSell(id) {
        fetch(`https://store-tcc.herokuapp.com/mySquad/1`)
            .then(res => res.json())
            .then(oldSquad => {
                console.log(oldSquad);
                const newSquad = oldSquad.players.filter(p => p.id !== id);
                return fetch('https://store-tcc.herokuapp.com/mySquad/1', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ id: "1", players: newSquad })
                });
            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({ squad: result.players })
            });
    }

    componentDidMount() {
        fetch('https://store-tcc.herokuapp.com/mySquad/1')
            .then(res => res.json())
            .then(squad => {
                this.setState({ squad: squad.players })
            })
    }

    render() {
        const { squad } = this.state;

        return (
            <Fragment>
                <Grid container spacing={8}>
                    <Grid item sm={8} xs={12}>
                        <Squad squad={this.process(squad)} handleSell={this.handleSell}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Resume />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(styles)(MySquad)