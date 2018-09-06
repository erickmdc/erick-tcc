import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText, Paper, Grid, Avatar, ListItemAvatar, Typography,
    InputLabel, Select, MenuItem, FormControl, Input, Hidden
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import Player from './Player';
import MobileDialog from '../Layout/MobileDialog';

const styles = theme => ({
    Paper: {
        padding: 20,
        marginTop: 5,
        height: 480,
        overflowY: 'auto'
    },
    formControl: {
        minWidth: 215,
        maxWidth: 300,
        width: '100%'
    },
    Avatar: {
        margin: 10,
        left: 0
    },
});

class Players extends Component {
    state = {
        team: '',
        player: {},
        openMobileDialog: false
    }

    filterPlayers = players => {
        const { team } = this.state;
        return (!team) ? players : players.filter(player => player.team === team);
    }

    handleTeamSelect = event => {
        this.setState({
            team: event.target.value
        });
    };

    handlePlayerSelect = id => {
        const { players } = this.props;
        this.setState({
            player: players.find(p => p.id === id),
            openMobileDialog: true
        })
    }

    handleClickOpen = () => {
        this.setState({ openMobileDialog: true });
    };

    handleClose = () => {
        this.setState({ openMobileDialog: false });
    };

    render() {
        const { team, player, openMobileDialog } = this.state;
        const { classes, players, teams } = this.props;

        return (
            <Fragment>
                <Typography variant="headline" component="h4">Jogador</Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.Paper}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Filtrar por time</InputLabel>
                                <Select
                                    value={team}
                                    onChange={this.handleTeamSelect}
                                    input={<Input className={classes.Input} />}
                                >
                                    <MenuItem value="">
                                        <em>Nenhum</em>
                                    </MenuItem>
                                    {teams.map(team => {
                                        return <MenuItem key={team.id} value={team.name}>
                                            {team.name}
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <List component="nav">
                                {this.filterPlayers(players).map(player => {
                                    return <ListItem button key={player.id} onClick={() => this.handlePlayerSelect(player.id)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Folder />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={player.name}
                                            secondary={player.team}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Hidden smDown>
                        <Grid item sm={6} style={{margin:0}}>
                            <Paper className={classes.Paper}>
                                <Player player={player} />
                            </Paper>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <MobileDialog openMobileDialog={openMobileDialog} handleClose={this.handleClose}>
                            <Player player={player} />
                        </MobileDialog>
                    </Hidden>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Players);