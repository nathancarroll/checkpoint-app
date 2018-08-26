import React, { Component } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@material-ui/core';

class CheckinDialog extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"CHECK-IN STATUS"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.feedback}
                </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary" autoFocus>
                            Close
                </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

export default CheckinDialog;