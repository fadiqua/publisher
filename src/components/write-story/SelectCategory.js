import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';

const Option = Select.Option;

class SelectCategory extends Component {

    renderTopics(){
        return this.props.items.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
    }

    render(){
        return (
            <div className={`${this.props.className || ''}`}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    className="topics-list"
                    placeholder="Choose Topic"
                    optionFilterProp="children"
                    onChange={ this.props.onChange }
                    size="large"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {this.renderTopics()}
                </Select>
            </div>
        )
    }
}

const mapStateToProps = ({topics:{items}}) => ({items});
export default connect(mapStateToProps, null)(SelectCategory);