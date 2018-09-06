import React from 'react'
import {
    withStyles, Grid, Card, CardContent, Typography
} from '@material-ui/core';

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

export default withStyles(styles)(({ classes }) =>

    <Card className={classes.card}>
        <CardContent className={classes.CardContent}>
            <Grid container spacing={32}>
                <Grid item xs={4}>
                    <Typography variant="display1" align="center">
                        60.3
                        </Typography>
                    <Typography variant="subheading" color="textSecondary" align="center">
                        Pontuação
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="headline" color="textSecondary" align="center">
                        52.87
                    </Typography>
                    <Typography variant="subheading" color="textSecondary" align="center">
                        Média
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="headline" color="textSecondary" align="center">
                        495.13
                    </Typography>
                    <Typography variant="subheading" color="textSecondary" align="center">
                        Total
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="headline" component="h2" align="center">
                        1.23 / 149.54 $
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" align="center">
                        Patrimônio
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="p">
                        6º na liga com 232 times
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);