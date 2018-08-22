import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';

class NewCheckpointModal extends Component{
    myAlert = (e) => {
        console.log('fire');
        console.log(e.target);
    }

    render(){
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return(
                <div className={showHideClassName}>
                <div className="modal-main">
                        <TextField
                            onClick={this.myAlert}
                            className="modal-input"
                            label="Name"
                            value={this.props.checkpointName} 
                            name="checkpointName" 
                            // placeholder="name" 
                            onChange={this.props.handleModalChange}
                        />
                        <TextField 
                            className="modal-input"
                            label="Description"
                            value={this.props.checkpointDescription} 
                            name="checkpointDescription" 
                            // placeholder="description" 
                            onChange={this.props.handleModalChange}
                        />
                    <Button name="cancel" onClick={this.props.handleModalClick}>Cancel</Button>
                    <Button name="save" onClick={this.props.handleModalClick}>Save</Button>
                </div>
                </div>
        )
    }
};

export default NewCheckpointModal;