import React from 'react';
import {
    withStyles, Typography, Card,
    CardContent, Button, Grid, Avatar
} from '@material-ui/core';

const styles = {
    card: {
        minWidth: 275,
        marginBottom: 12,
        paddingBottom: 1,
        marginLeft: '-12px',
        marginRight: '-12px'
    },
    cardContent: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 16,
        '&:last-child': {
            paddingBottom: 16
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
        maxWidth: '90%'
    },
    actionButton: {
        width: '80%',
        float: 'right',
        fontWight: 'bold'
    }
}

export default withStyles(styles)(({ player, classes, handleSell, handleBuy }) =>
    <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Grid container justify="center" alignItems="center">
                <Grid item sm={3} xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <Avatar className={classes.playerAvatar} src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_48dp.png" />
                        </Grid>
                        <Grid item sm={7} xs={8}>
                            <Typography variant="title" component="h3">
                                {player.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {player.team}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="subheading" component="h2">
                                17.50
                            </Typography>
                            <Typography color="textSecondary">
                                Última (pts)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subheading" component="h2">
                                15.32
                            </Typography>
                            <Typography color="textSecondary">
                                Média (pts)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="title" component="h2">
                                {player.position}
                            </Typography>
                            <Typography color="textSecondary">
                                Posição
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subheading" component="h2">
                                23.74
                            </Typography>
                            <Typography color="textSecondary">
                                Preço ($)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subheading" component="h2">
                                + 2.03
                            </Typography>
                            <Typography color="textSecondary">
                                Valorização ($)
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xs={6}>
                    <Grid container alignItems="flex-end">
                        <Grid item sm={5} xs={4}>
                            <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="headline" component="h2" style={{ textAlign: 'center' }}>
                                X
                            </Typography>
                        </Grid>
                        <Grid item sm={5} xs={4}>
                            <Avatar className={classes.teamAvatar} src="https://ssl.gstatic.com/images/branding/product/1x/contribute_36dp.png" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xs={6}>
                    {(player.isOnSquad)
                        ?
                        <Button className={classes.actionButton} onClick={() => handleSell(player.id)} variant="contained" color="secondary">
                            Vender
                        </Button>
                        :
                        <Button className={classes.actionButton} onClick={() => handleBuy(player.id)} variant="contained" color="primary">
                            Comprar
                        </Button>
                    }
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);