// npm packages
import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const BrowsableTaps = ({ user, selectedTap }) => (
    <Menu
        selectedKeys={[selectedTap]}
        mode="horizontal"
        className="browsable-taps">
        <Menu.Item key="stories">
            <NavLink to={`/profile/${user}`}>
                Stories
            </NavLink>
        </Menu.Item>
        <Menu.Item key="responses" >
            <NavLink to={`/profile/${user}/responses`}>
                Responses
            </NavLink>
        </Menu.Item>
        <Menu.Item key="favorite">
            <NavLink to={`/profile/${user}/favorite`}>
                Favorite
            </NavLink>
        </Menu.Item>
    </Menu>
);

export default BrowsableTaps;
