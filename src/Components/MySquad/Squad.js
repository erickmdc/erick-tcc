import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    withStyles, Typography, Card,
    CardContent, Button, Grid, Avatar
} from '@material-ui/core';

const styles = {
    card: {
        marginBottom: 12,
        paddingBottom: 1,
    },
    cardUnknown: {
        marginBottom: 12,
        paddingBottom: 1,
        backgroundColor: '#FAFAFA'
    },
    cardContent: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        '&:last-child': {
            paddingBottom: 8
        }
    },
    teamAvatar: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%'
    },
    playerAvatar: {
        width: 'auto',
        height: 'auto',
        maxWidth: '70%'
    },
    actionButton: {
        width: '80%',
        float: 'right',
        fontWight: 'bold'
    }
}

class Squad extends Component {

    testFetch() {
        fetch('https://store-tcc.herokuapp.com/players')
            .then(res => res.json())
            .then(p => {
                let x = p;
                return x;
            })
    }

    render() {
        const { squad, classes, handleSell } = this.props;

        return (
            <Fragment>
                {squad.map((player, index) => {
                    return (player.id !== undefined) ?
                        <Card className={classes.card} key={index}>
                            <CardContent className={classes.cardContent}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item sm={5} xs={8}>
                                        <Grid container alignItems="center">
                                            <Grid item sm={2} xs={2}>
                                                <Typography variant="body2" noWrap>
                                                    {player.position}
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.playerAvatar} src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_48dp.png" />
                                            </Grid>
                                            <Grid item sm={6} xs={6}>
                                                <Typography variant="subheading">
                                                    {player.name}
                                                </Typography>
                                                <Typography className={classes.pos} color="textSecondary">
                                                    {player.team}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={3} xs={4}>
                                        <Grid container justify="center" alignItems="center">
                                            <Grid item xs={7}>
                                                <Typography variant="body2">
                                                    17.50
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    (pts)
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography variant="body2">
                                                    23.74
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    ($)
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={2} xs={6}>
                                        <Grid container alignItems="flex-end" justify="center">
                                            <Grid item sm={1}></Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="title" style={{ textAlign: 'center' }}>
                                                    X
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                                            </Grid>
                                            <Grid item sm={1}></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={2} xs={6}>
                                        <Button className={classes.actionButton} onClick={() => handleSell(player.id)} variant="contained" color="secondary">
                                            Vender
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        :
                        <Card className={classes.cardUnknown} key={index}>
                            <CardContent className={classes.cardContent}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item sm={5} xs={8}>
                                        <Grid container alignItems="center">
                                            <Grid item sm={2} xs={2}>
                                                <Typography variant="body2" noWrap>
                                                    Posição
                                            </Typography>
                                            </Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.playerAvatar} src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_48dp.png" />
                                            </Grid>
                                            <Grid item sm={6} xs={6}>
                                                <Typography variant="subheading">
                                                    Jogador
                                            </Typography>
                                                <Typography className={classes.pos} color="textSecondary">
                                                    Time
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={3} xs={4}>
                                        <Grid container justify="center" alignItems="center">
                                            <Grid item xs={7}>
                                                <Typography variant="body2">
                                                    -
                                            </Typography>
                                                <Typography color="textSecondary">
                                                    (pts)
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography variant="body2">
                                                    -
                                            </Typography>
                                                <Typography color="textSecondary">
                                                    ($)
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={2} xs={6}>
                                        <Grid container alignItems="flex-end" justify="center">
                                            <Grid item sm={1}></Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="title" style={{ textAlign: 'center' }}>
                                                    X
                                                </Typography>
                                            </Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                                            </Grid>
                                            <Grid item sm={1}></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={2} xs={6}>
                                        <Link to="/Market">
                                            <Button className={classes.actionButton} variant="contained" color="primary">  
                                                    Comprar
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                })}
            </Fragment>
        );
    }

};

export default withStyles(styles)(Squad)