import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const SortBy = ({ selectedValue }) => (
    <div className="pull-right">
        <Select value={selectedValue}
                className="text-link-color"
                dropdownClassName="text-link-color"
                style={{ width: 120 }}
                onChange={(value) => this.props.handleSortChange(value)}>
            <Option value="date">
                <span>Sort by Date</span>
            </Option>
            <Option value="trending"> <span>Sort By Trending</span></Option>
        </Select>
    </div>
);

export default SortBy;