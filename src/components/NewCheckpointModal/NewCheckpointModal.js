import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';

class NewCheckpointModal extends Component{
    focusMe = (e) => {
        e.target.focus();
    }

    render(){
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return(
                <div className={showHideClassName}>
                <div className="modal-main">
                        <TextField
                            onClick={this.focusMe}
                            className="modal-input"
                            label="Name"
                            value={this.props.checkpointName} 
                            name="checkpointName" 
                            onChange={this.props.handleModalChange}
                        />
                        <TextField 
                            onClick={this.focusMe}
                            className="modal-input"
                            label="Description"
                            value={this.props.checkpointDescription} 
                            name="checkpointDescription" 
                            onChange={this.props.handleModalChange}
                        />
                    <Button name="cancel" onClick={this.props.handleModalClick}>{this.props.editing ? 'Delete' : 'Cancel'}</Button>
                    <Button name="save" onClick={this.props.handleModalClick}>Save</Button>
                </div>
                </div>
        )
    }
};

export default NewCheckpointModal;