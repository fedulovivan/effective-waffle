import { map/* , size */ } from 'lodash/collection';
import { connect } from 'react-redux';
import React, { Component, PureComponent } from 'react';
import { PieChart, Pie, /* Sector, */ Cell, Tooltip } from 'recharts';
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
        // subtasks: selectors.getSubtasks(state),
        // jiraItem: selectors.getJiraItem(state),
        // rndDevName: selectors.getRndDevName(state),
        // error: selectors.getError(state),
        // totalEstimate: selectors.getTotalEstimate(state),
        // dirtyTotalEstimate: selectors.getDirtyTotalEstimate(state),
        // isDirty: selectors.isDirty(state),
        // valid: selectors.valid(state),
        // isPending: selectors.isPending(state),
        // syncWithJiraStats: selectors.getSyncWithJiraStats(state),
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
    //onClickCell = (a, b, c) => console.log(/* { a, b, c } */a.target, a.currentTarget);

    // constructor(props) {
    //     super();
    // }

    //     // console.log(props);
    // //     //props.fill = constants.LABEL_TO_COLOR[props.name];
    //     super(/* props */);

    // //     // const {
    // //     //     name
    // //     // } = this.props;
    // }
    // render() {
    //     const {
    //         name
    //     } = this.props;
    //     // return null;
    //     // return (
    //     //     // <Cell
    //     //     //     // key={name}
    //     //     //
    //     //     //     onClick={this.onClickCell}
    //     //     // />
    //     // );
    // }
    // render() {
        // const { props } = this;
        // // const { name } = this.props;
        // // const props = {
        // //     fill: constants.LABEL_TO_COLOR[name]
        // // };
        // console.log(props);
        // return <Cell {...props} />;
        // return null;
    // }
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
