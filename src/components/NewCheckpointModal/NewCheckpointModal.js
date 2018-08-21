import React, {Component} from 'react';
import {TextField, Button} from '@material-ui/core';

class NewCheckpointModal extends Component{
    render(){
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return(
                <div className={showHideClassName}>
                <div className="modal-main">
                    <div>
                        <TextField
                            autoFocus
                            label="Name"
                            value={this.props.checkpointName} 
                            name="checkpointName" 
                            placeholder="name" 
                            onChange={this.props.handleModalChange}
                        />
                    </div>
                    <div>
                        <TextField 
                            label="Description"
                            value={this.props.checkpointDescription} 
                            name="checkpointDescription" 
                            placeholder="description" 
                            onChange={this.props.handleModalChange}
                            style={{fontsize:'25px'}}
                        />
                    </div>
                    <Button name="cancel" onClick={this.props.handleModalClick}>Cancel</Button>
                    <Button name="save" onClick={this.props.handleModalClick}>Save</Button>
                </div>
                </div>
        )
    }
};

export default NewCheckpointModal;