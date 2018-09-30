import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText, Paper, Grid,
    Avatar, ListItemAvatar, Typography, Hidden
} from '@material-ui/core';
import { Folder } from "@material-ui/icons";
import Team from './Team';
import MobileDialog from '../Layout/MobileDialog';

const styles = theme => ({
    Paper: {
        padding: 20,
        marginTop: 5,
        height: 480,
        overflowY: 'auto'
    },
    FormControl: {
        width: 250,
    },
    Avatar: {
        margin: 10,
        left: 0
    },
});

class Teams extends Component {
    state = {
        team: {},
        players: [],
        teams: [],
        openMobileDialog: false
    }

    handleSelect = id => {
        const { teams } = this.state;
        this.setState({
            team: teams.find(p => p.id === id),
            openMobileDialog: true
        })
    }

    handleClickOpen = () => {
        this.setState({ openMobileDialog: true });
    };

    handleClose = () => {
        this.setState({ openMobileDialog: false });
    };

    componentDidMount() {
        fetch('https://store-tcc.herokuapp.com/players')
            .then(res => {
                var x = res.json();
                return x;
            })
            .then(players => this.setState({ players }))
        fetch('https://store-tcc.herokuapp.com/teams')
            .then(res => res.json())
            .then(teams => this.setState({ teams }))
    }

    render() {
        const { team, openMobileDialog, players, teams } = this.state;
        const { classes } = this.props;

        return (
            <Fragment>
                <Typography variant="headline" component="h4">Time</Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.Paper}>
                            <List component="nav">
                                {teams.map(team => {
                                    return <ListItem button key={team.id} onClick={() => this.handleSelect(team.id)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Folder />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={team.name}
                                            secondary={team.squad}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Hidden smDown>
                        <Grid item sm={6}>
                            <Paper className={classes.Paper}>
                                <Team team={team} players={players.filter(p => p.team === team.name)} />
                            </Paper>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <MobileDialog openMobileDialog={openMobileDialog} handleClose={this.handleClose}>
                            <Team team={team} players={players.filter(p => p.team === team.name)} />
                        </MobileDialog>
                    </Hidden>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Teams);