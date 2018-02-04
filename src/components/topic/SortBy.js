import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const SortBy = ({ selectedValue, handleSortChange }) => (
    <div className="pull-right">
        <Select value={selectedValue}
                className="text-link-color"
                dropdownClassName="text-link-color"
                style={{ width: 120 }}
                onChange={handleSortChange}>
            <Option value="date">
                <span>Sort by Date</span>
            </Option>
            <Option value="trending"> <span>Sort By Trending</span></Option>
        </Select>
    </div>
);

export default SortBy;