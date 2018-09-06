import React, { Component } from 'react';
import { Dialog, DialogContent, DialogActions, Slide, IconButton, withMobileDialog, Button, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ResponsiveDialog extends Component {

    render() {
        const { openMobileDialog, handleClose, children } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen
                    TransitionComponent={Transition}
                    keepMounted
                    open={openMobileDialog}
                    onClose={() => handleClose()}
                    aria-labelledby="responsive-dialog-title"
                >
                    <IconButton color="inherit" onClick={() => handleClose()} aria-label="Close">
                        <Close />
                    </IconButton>
                    <DialogContent>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        <Typography>O filtro atualiza automaticamente ;) </Typography>
                        <Button onClick={() => handleClose()} color="primary">
                            Voltar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog()(ResponsiveDialog);