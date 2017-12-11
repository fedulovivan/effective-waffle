import React, { Component, PureComponent } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { compact } from 'lodash/array';
import DeleteIcon from 'material-ui-icons/Delete';
import None from './None';
import Delete from './Delete';

export default class Row extends PureComponent {

    handleSubtaskFieldChange = (name, value) => {
        this.props.updSubtask(this.props.task.id, { [name]: value });
    }

    handleLabelChange = e => this.handleSubtaskFieldChange('label', e.target.value);
    handleSummaryChange = e => this.handleSubtaskFieldChange('summary', e.target.value);
    handleEstimateChange = e => this.handleSubtaskFieldChange('estimate', e.target.value);

    render() {
        const {
            task,
            labels,
            delSubtask,
        } = this.props;
        const {
            id,
            label,
            summary,
            estimate,
            key,
            dirty,
        } = task;
        return (
            <TableRow>
                <TableCell>
                    <Select
                        // style={{width: "100px"}}
                        value={label}
                        onChange={this.handleLabelChange}
                    >
                        {labels.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}
                    </Select>
                </TableCell>
                <TableCell>
                    <Input
                        // style={{width: "450px"}}
                        value={summary}
                        onChange={this.handleSummaryChange}
                    />
                </TableCell>
                <TableCell>
                    <Input
                        // style={{width: "100px"}}
                        value={estimate}
                        onChange={this.handleEstimateChange}
                    />
                </TableCell>
                <TableCell>
                    {key ? (
                        <a target="_blank" rel="noopener noreferrer" href={`https://jira.danateq.net/browse/${key}`}>{key}</a>
                    ) : <None />}
                </TableCell>
                <TableCell 
                    // style={{width: '100px'}}
                >
                    {compact([
                        dirty ? 'Need save' : null,
                        key ? null : 'Not created',
                        key && !dirty ? 'Clean': null,
                    ]).join(' & ')}
                </TableCell>
                <TableCell>
                    {!key && (
                        <Delete task={task} delSubtask={delSubtask} />
                    )}
                </TableCell>
            </TableRow>
        );
    }
}
