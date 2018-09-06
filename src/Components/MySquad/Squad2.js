import React, { Component, Fragment } from 'react'
import {
    Table, TableBody,
    TableRow, TableCell, Avatar,
    Button
} from '@material-ui/core';

export default ({ squad }) =>
    <Fragment>
        <Table>
            <TableBody>
                {squad.map(player => {
                    return (player.id === undefined)
                        ?
                        <TableRow key={player.id}>
                            <TableCell component="th" scope="row">
                                Sem Jogador
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary">
                                    Comprar
                                </Button>
                            </TableCell>
                        </TableRow>
                        :
                        <TableRow key={player.id}>
                            <TableCell component="th" scope="row">
                                {player.name}
                            </TableCell>
                            <TableCell><Avatar src="https://ssl.gstatic.com/images/branding/product/2x/avatar_circle_blue_512dp.png" /></TableCell>
                            <TableCell numeric>0.0</TableCell>
                            <TableCell numeric>{player.price}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary">
                                    Comprar
                                </Button>
                            </TableCell>
                        </TableRow>
                })}
            </TableBody>
        </Table>
    </Fragment>