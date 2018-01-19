import React, { Component } from 'react';
import { Menu, Dropdown, Tooltip, Icon } from 'antd';

class CtrlDropdown extends Component{
    constructor(props){
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }
    handleMenuClick(e) {
        const { id } = this.props;
        this.props.onItemClick(e.key, id)

    }
    render(){
        const menu = (
            <Menu  onClick={this.handleMenuClick}>
                <Menu.Item key="edit">
                    <i className="material-icons md-icon">mode_edit</i> Edit
                </Menu.Item>
                <Menu.Item key="delete">
                    <i className="material-icons md-icon">delete</i>Delete
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} trigger={['click']} overlayClassName='story-ctrl'>
                <Tooltip placement="top" title='Edit or delete this'>
                    <a className="ant-dropdown-link story-ctrl-drop" href="#">
                        <Icon type="down" />
                    </a>
                </Tooltip>

            </Dropdown>
        )
    }
}
export default CtrlDropdown;