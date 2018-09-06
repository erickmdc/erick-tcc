import React, { Component, Fragment } from 'react'
import {
    withStyles, Typography, Button,
    Paper, CircularProgress, Hidden
} from '@material-ui/core';
import { Sort } from '@material-ui/icons';
import Filter from './Filter';
import MobileDialog from '../Layout/MobileDialog';
import PlayerCard from './PlayerCard';

const styles = {
    paper: {
        marginBottom: '5%',
        padding: '2%',
        marginLeft: '-12px',
        marginRight: '-12px',
        backgroundColor: '#FAFAFA'
    },
    progress: {
        marginTop: '10%',
        marginLeft: '50%'
    },
    fab: {
        position: 'fixed',
        bottom: 5,
        right: 5,
        zIndex: 1
    },
};

class Market extends Component {
    state = {
        loading: false,
        openMobileDialog: false,
        orderBy: 'price',
        filters: {
            team: '',
            name: '',
            position: '',
            price: ''
        },
        positions: [
            { id: 'goalkeeper', description: 'Goleiro' },
            { id: 'fixed', description: 'Fixo' },
            { id: 'wing', description: 'Ala' },
            { id: 'pivot', description: 'Pivô' }
        ],
        sorts: [
            { id: 'highPrice', description: 'Mais caro' },
            { id: 'lowPrice', description: 'Mais barato' },
            { id: 'average', description: 'Média' },
            { id: 'evaluation', description: 'Valorização' },
            { id: 'name', description: 'Nome' }
        ]
    };

    handleClick = () => {
        this.setState({ openMobileDialog: true });
    };

    handleClose = () => {
        this.setState({ openMobileDialog: false });
    };

    handleNameInput = value => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                name: value
            }
        }))
    }

    handlePriceInput = value => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                price: value
            }
        }))
    }

    handleTeamSelect = event => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                team: event.target.value
            }
        }));
    }

    handlePositionSelect = event => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                position: event.target.value
            }
        }))
    }
    handleSortSelect = orderBy => {
        return;
    }

    filterByTeam = player => {
        const { filters: { team } } = this.state;
        return (!team) ? player : player.team === team;
    }

    filterByName = player => {
        const { filters: { name } } = this.state;
        return (!name) ? player : player.name.toLowerCase().includes(name.toLowerCase());
    }

    filterByPosition = player => {
        const { filters: { position } } = this.state;
        return (!position) ? player : player.position === position;
    }

    refine = players => {
        return players.filter(this.filterByTeam)
               .filter(this.filterByName)
               .filter(this.filterByPosition);
    }

    render() {
        const { filters, positions, sorts, orderBy, loading, openMobileDialog } = this.state;
        const { classes, teams, players } = this.props;

        return (
            <Fragment>
                <Typography variant="headline" component="h4">Mercadão</Typography>
                <Hidden smDown>
                    <Paper className={classes.paper}>
                        <Filter positions={positions} teams={teams} sorts={sorts}
                            team={filters.team} position={filters.position} orderBy={orderBy}
                            onNameInput={this.handleNameInput} onPriceInput={this.handlePriceInput}
                            onTeamSelect={this.handleTeamSelect} onPositionSelect={this.handlePositionSelect}
                            onSortSelect={this.handleSortSelect}
                        />
                    </Paper>
                </Hidden>
                <Hidden mdUp>
                    <Button variant="fab" className={classes.fab} onClick={this.handleClick}>
                        <Sort />
                    </Button>
                    <MobileDialog openMobileDialog={openMobileDialog} handleClose={this.handleClose}>
                        <Filter positions={positions} teams={teams} sorts={sorts}
                            team={filters.team} position={filters.position} orderBy={orderBy}
                            onNameInput={this.handleNameInput} onPriceInput={this.handlePriceInput}
                            onTeamSelect={this.handleTeamSelect} onPositionSelect={this.handlePositionSelect}
                            onSortSelect={this.handleSortSelect}
                        />
                    </MobileDialog>
                </Hidden>
                {loading ? (<CircularProgress className={classes.progress} />) : this.refine(players).map(player => {
                    return <PlayerCard player={player} key={player.id}/>
                })}
            </Fragment>
        );
    }
}

export default withStyles(styles)(Market);