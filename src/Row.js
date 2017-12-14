import React, { /* Component, */ PureComponent } from 'react';
import /* Table, */ { /* TableBody, , TableHead, */TableCell, TableRow } from 'material-ui/Table';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input/* , { InputLabel } */ from 'material-ui/Input';
import { compact } from 'lodash/array';
// import DeleteIcon from 'material-ui-icons/Delete';
import None from './None';
import Delete from './Delete';

export default class Row extends PureComponent {

    static defaultProps = {
        description: ""
    };

    handleSubtaskFieldChange = (name, value) => {
        this.props.updSubtask(this.props.task.id, { [name]: value });
    }

    handleLabelChange = e => this.handleSubtaskFieldChange('label', e.target.value);
    handleSummaryChange = e => this.handleSubtaskFieldChange('summary', e.target.value);
    handleDescriptionChange = e => this.handleSubtaskFieldChange('description', e.target.value);
    handleEstimateChange = e => this.handleSubtaskFieldChange('estimate', e.target.value);

    render() {
        const {
            task,
            labels,
            delSubtask,
        } = this.props;
        const {
            // id,
            label,
            summary,
            estimate,
            key,
            dirty,
            description,
        } = task;
        return (
            <TableRow>
                <TableCell>
                    <Select
                        value={label}
                        onChange={this.handleLabelChange}
                    >
                        {labels.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}
                    </Select>
                </TableCell>
                <TableCell>
                    <Input
                        autoFocus
                        className="summary"
                        value={summary}
                        onChange={this.handleSummaryChange}
                        placeholder="Summary"
                    />
                    <Input
                        className="description"
                        value={description}
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                    />
                </TableCell>
                <TableCell>
                    <Input
                        value={estimate}
                        onChange={this.handleEstimateChange}
                    />
                </TableCell>
                <TableCell>
                    {key ? (
                        <a title="Open item in new tab in Jira" target="_blank" rel="noopener noreferrer" href={`https://jira.danateq.net/browse/${key}`}>{key}</a>
                    ) : <None />}
                </TableCell>
                <TableCell
                    // style={{width: '100px'}}
                >
                    {/* compact( */[
                        dirty && key ? 'To be updated in Jira' : null,
                        !key ? 'Not created in Jira' : null,
                        !dirty && key ? <span className="gray">Clean</span> : null,
                    ]/* ).join(' & ') */}
                </TableCell>
                <TableCell>
                    {!key && (
                        <Delete title="Delete local item" task={task} delSubtask={delSubtask} />
                    )}
                </TableCell>
            </TableRow>
        );
    }
}
