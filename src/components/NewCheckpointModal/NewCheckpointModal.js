import React, {Component} from 'react';

class NewCheckpointModal extends Component{
    render(){
        const showHideClassName = this.props.showModal ? "modal display-block" : "modal display-none";
        return(
                <div className={showHideClassName}>
                <section className="modal-main">
                    <input name="checkpointName" placeholder="name" onChange={this.props.handleModalChange}/>
                    <input name="checkpointDescription" placeholder="description" onChange={this.props.handleModalChange}/>
                    <button name="cancel" onClick={this.props.handleModalClick}>Cancel</button>
                    <button name="save" onClick={this.props.handleModalClick}>Save</button>
                </section>
                </div>
        )
    }
};

export default NewCheckpointModal;