import React, { Fragment } from 'react';
import {
    Typography, Avatar, List, ListItem, ListItemText,
    Divider, Grid, withStyles
} from '@material-ui/core';
import { MonetizationOn, Group, Pets, Person } from "@material-ui/icons";

const styles = theme => ({
    ListItemText: {
        right: 10,
        textAlign: 'right'
    },
    AvatarListItem: {
        margin: 'auto',
        width: '50%'
    },
    AvatarElement: {
        margin: 'auto',
        width: '50%',
        height: '50%'
    }
});

export default withStyles(styles)(({ player: { id, name, price, team, position }, classes }) =>
    <Fragment>
        {id ?
            <Fragment>
                <List>
                    <Grid container>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <ListItem>
                                <Avatar className={classes.AvatarElement} src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png" />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Divider />
                            <ListItem>
                                <Avatar>
                                    <Person />
                                </Avatar>
                                <ListItemText className={classes.ListItemText} primary={name} secondary="Nome" />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Divider />
                            <ListItem>
                                <Avatar>
                                    <Group />
                                </Avatar>
                                <ListItemText className={classes.ListItemText} primary={team} secondary="Time" />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Divider />
                            <ListItem>
                                <Avatar>
                                    <Pets />
                                </Avatar>
                                <ListItemText className={classes.ListItemText} primary={position} secondary="Posição" />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <Divider />
                            <ListItem>
                                <Avatar>
                                    <MonetizationOn />
                                </Avatar>
                                <ListItemText className={classes.ListItemText} primary={price} secondary="Preço" />
                            </ListItem>
                        </Grid>
                    </Grid>
                </List>
            </Fragment>
            : <Grid container alignItems="center" justify="center">
                <Grid item>
                    <Typography variant="display1">Nenhum jogador selecionado</Typography>
                </Grid>
            </Grid>}
    </Fragment>
)