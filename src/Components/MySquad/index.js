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

    orderByPosition = (a, b) => {
        if(a.position === "Goleiro") return -1;
        if(a.position === b.position) return 0;
        return 1;
    }

    process = squad => {
        if (squad.length === 5) return squad;

        for(let x=squad.length; x<5; x++) {
            squad.push({});
        }

        return squad.sort(this.orderByPosition);
    }

    render() {
        const { squad } = this.props;

        return (
            <Fragment>
                <Grid container spacing={8}>
                    <Grid item sm={8} xs={12}>
                        <Squad squad={this.process(squad)} />
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