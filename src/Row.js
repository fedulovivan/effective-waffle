import humanizeDuration from 'humanize-duration';
import React, { PureComponent } from 'react';
import { TableCell, TableRow } from 'material-ui/Table';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input from 'material-ui/Input';
import classNames from 'classnames';

import { parseDuration } from './utils';
import None from './None';
import Delete from './Delete';
import * as constants from './constants';

export default class Row extends PureComponent {

    static defaultProps = {
        description: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            estimateRaw: humanizeDuration(this.props.task.estimate, constants.HUMANISER_OPTS),
        };
    }

    handleSubtaskFieldChange = (name, value) => {
        this.props.updSubtask(this.props.task.id, { [name]: value });
    }

    handleLabelChange = e => this.handleSubtaskFieldChange('label', e.target.value);
    handleSummaryChange = e => this.handleSubtaskFieldChange('summary', e.target.value);
    handleDescriptionChange = e => this.handleSubtaskFieldChange('description', e.target.value);
    handleEstimateChange = e => {
        const estimateRaw = e.target.value;
        this.setState({
            ...this.state,
            estimateRaw,
        });
        this.handleSubtaskFieldChange('estimate', parseDuration(estimateRaw));
    };
    handleEstimateBlur = e => {
        this.setState({
            ...this.state,
            estimateRaw: humanizeDuration(this.props.task.estimate, constants.HUMANISER_OPTS),
        });
    };

    render() {
        const {
            task,
            labels,
            delSubtask,
            statuses,
        } = this.props;
        const {
            label,
            summary,
            key,
            dirty,
            description,
            status,
            focused,
            valid,
            errors,
        } = task;

        const statusDictElement = statuses[status];

        return (
            <TableRow
                className={classNames({ verynew: !key && !dirty, dirty: dirty && valid, invalid: dirty && !valid })}
                title={errors && errors.length ? errors.map(e => `- ${e}`).join('\n') : null}
            >
                <TableCell className="cell category" >
                    <Select
                        style={{ width: '90px', backgroundColor: constants.LABEL_TO_COLOR[label], padding: "3px" }}
                        value={label}
                        onChange={this.handleLabelChange}
                    >
                        {labels.map(value => <MenuItem style={{ backgroundColor: constants.LABEL_TO_COLOR[value] }} value={value} key={value}>{value}</MenuItem>)}
                    </Select>
                </TableCell>
                <TableCell className="cell summary-and-description" >
                    <Input
                        autoFocus={focused}
                        className="summary"
                        value={summary}
                        onChange={this.handleSummaryChange}
                        placeholder="Summary"
                    />
                    <Input
                        multiline
                        rowsMax={3}
                        className="description"
                        value={description}
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                    />
                </TableCell>
                <TableCell className="cell original-estimate" >
                    <Input
                        value={this.state.estimateRaw}
                        onChange={this.handleEstimateChange}
                        onBlur={this.handleEstimateBlur}
                    />
                </TableCell>
                <TableCell className="cell jira-item" >
                    {
                        key
                        ? <a title="Open item in new tab in Jira" target="_blank" rel="noopener noreferrer" href={`https://jira.danateq.net/browse/${key}`}>{key}</a>
                        : <None />
                    }
                </TableCell>
                <TableCell
                    className="cell row-status"
                >
                    {[
                        valid && dirty && key ? <span key="1">To be updated in Jira</span> : null,
                        valid && !key ? <span key="2">Not created in Jira</span> : null,
                        !dirty && key ? <span key="3" className="gray">Clean</span> : null,
                        dirty && !valid ? <span key="4">Invalid</span> : null,
                    ]}
                </TableCell>
                <TableCell className="cell jira-status" >
                    {
                        key && statusDictElement
                        ? <span>{statusDictElement.name}</span>
                        : <None />
                    }
                </TableCell>
                <TableCell className="cell actions" >
                    {!key && (
                        <Delete title="Delete local item" task={task} delSubtask={delSubtask} />
                    )}
                </TableCell>
            </TableRow>
        );
    }
}
