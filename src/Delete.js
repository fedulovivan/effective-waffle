import DeleteIcon from 'material-ui-icons/Delete';
import React, { PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';


export default class Delete extends PureComponent {
    handleIconClick = () => this.props.delSubtask(this.props.task.id);
    render() {
        return (
            <IconButton title={this.props.title} aria-label="Delete">
                <DeleteIcon onClick={this.handleIconClick} />
            </IconButton>
        );
    }
}
