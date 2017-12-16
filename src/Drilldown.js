import { map } from 'lodash/collection';
import { connect } from 'react-redux';
import React, { Component, PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import humanizeDuration from 'humanize-duration';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import CancelIcon from 'material-ui-icons/Cancel';
import IconButton from 'material-ui/IconButton';

import * as constants from './constants';
import * as selectors from './selectors';
import * as actions from './actions';

const reduxConnector = connect(
    state => ({
        totalEstimateByLabel: selectors.getTotalEstimateByLabel(state),
        labelFilter: selectors.getLabelFilter(state),
    }),
    dispatch => ({
        updLabelFilter: value => dispatch(actions.updLabelFilter(value)),
        clearLabelFilter: () => dispatch(actions.clearLabelFilter()),
    })
);

class CustomTooltip extends PureComponent {
    render() {
        const {
            payload,
        } = this.props;
        return payload && payload[0] ? (
            <div>
                {payload[0].name}: {humanizeDuration(payload[0].value, constants.HUMANISER_OPTS)}
            </div>
        ) : null;
    }
}

class ActionCell extends Cell {

}

class Drilldown extends Component {

    handleLabelFilterChange = e => {
        this.props.updLabelFilter(e.target.value);
    }

    render() {
        const {
            totalEstimateByLabel,
            labelFilter,
            clearLabelFilter,
        } = this.props;
        const chartData = map(totalEstimateByLabel, (value, name) => {
            return { name, value };
        });
        return (
            <div className="pie-chart-container">
                {chartData.length ? (
                    <div>
                    <PieChart width={200} height={200}>
                        <Pie dataKey="value" data={chartData} animationDuration={600}>
                            {
                                chartData.map(({ name }) => {
                                    let fill = constants.LABEL_TO_COLOR[name];
                                    if (labelFilter !== 'all' && name !== labelFilter) {
                                        fill = '#dddddd';
                                    }
                                    return <ActionCell key={name} name={name} fill={fill} />;
                                })
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                    <div className="label-filter">
                        <Select
                            style={{ backgroundColor: constants.LABEL_TO_COLOR[labelFilter], padding: "3px" }}
                            value={labelFilter}
                            onChange={this.handleLabelFilterChange}
                        >
                            <MenuItem key="all-cats" value="all">All categories</MenuItem>
                            {chartData.map(({ name: value }) => <MenuItem style={{ backgroundColor: constants.LABEL_TO_COLOR[value] }} value={value} key={value}>{value}</MenuItem>)}
                        </Select>
                        <IconButton disabled={labelFilter === 'all'}>
                            <CancelIcon onClick={clearLabelFilter} />
                        </IconButton>
                    </div>
                    </div>
                ) : <p className="gray">Add subtasks to see drilldown chart</p>}
            </div>
        );
    }
}

export default reduxConnector(Drilldown);
