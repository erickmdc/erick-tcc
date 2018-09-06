import React, { Fragment } from 'react'
import {
    withStyles, MenuItem, FormControl,
    InputLabel, Select, Input, TextField,
    Grid
} from "@material-ui/core";

const styles = {
    formControl: {
        minWidth: 170,
        marginLeft:'5%'
    }
}

export default withStyles(styles)(({
    positions, teams, sorts, position, team, orderBy,
    onNameInput, onPriceInput, onTeamSelect, onPositionSelect, onSortSelect,
    classes
}) =>
    <Fragment>
        <Grid container>
            <Grid item sm={5} xs={12}>
                <TextField
                    id="search"
                    label="Jogador"
                    type="search"
                    className={classes.formControl}
                    onChange={({ target: { value } }) => onNameInput(value)}
                />
                <TextField
                    id="price"
                    label="Preço (máx)"
                    type="number"
                    className={classes.formControl}
                    onChange={({ target: { value } }) => onPriceInput(value)}
                />
            </Grid>
            <Grid item sm={7} xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Time</InputLabel>
                    <Select
                        value={team}
                        onChange={(event) => onTeamSelect(event)}
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
                <FormControl className={classes.formControl}>
                    <InputLabel>Posição</InputLabel>
                    <Select
                        value={position}
                        onChange={(event) => onPositionSelect(event)}
                        input={<Input className={classes.Input} />}
                    >
                        <MenuItem value="">
                            <em>Nenhuma</em>
                        </MenuItem>
                        {positions.map(({ id, description }) => {
                            return <MenuItem key={id} value={description}>
                                {description}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        value={orderBy}
                        onChange={() => onSortSelect()}
                        input={<Input className={classes.Input} />}
                    >
                        <MenuItem value="">
                            <em>Nenhuma</em>
                        </MenuItem>
                        {sorts.map(ob => {
                            return <MenuItem key={ob.id} value={ob.id}>
                                {ob.description}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    </Fragment>
);