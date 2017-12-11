import DeleteIcon from 'material-ui-icons/Delete';
import React, { Component, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';


export default class Delete extends PureComponent {
    handleIconClick = () => this.props.delSubtask(this.props.task.id);
    render() {
        return (
            <IconButton aria-label="Delete">
                <DeleteIcon onClick={this.handleIconClick} />
            </IconButton>
        );
    }
}
