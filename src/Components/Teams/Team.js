import React, { Fragment } from 'react';
import {
    Typography, Avatar, ListItem, ListItemAvatar, ListItemText,
    Grid
} from '@material-ui/core';
import { Folder } from "@material-ui/icons";

export default ({ team: { id, name, squad }, players }) =>
    <Fragment>
        {id ?
            <Fragment>
                <Avatar style={{ width: 120, height: 120 }}>
                    <Folder />
                </Avatar>
                <Typography>{name}</Typography>
                <Typography>{id}</Typography>
                <Typography>{squad}</Typography>
                {players.map(({ id, name, position }) => {
                    return <ListItem button key={id}>
                        <ListItemAvatar>
                            <Avatar src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={name}
                            secondary={position}
                        />
                    </ListItem>
                })}
            </Fragment>
            : <Grid container alignItems="center" justify="center">
                <Grid item>
                    <Typography variant="display1">Nenhum time selecionado</Typography>
                </Grid>
            </Grid>}
    </Fragment>