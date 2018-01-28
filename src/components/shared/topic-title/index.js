// npm packages
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
// project files
import './index.scss'

export const TopicTitle = ({link, title}) => (
    <div className="topic-title">
        <Link to={link} >
            <span className="text-capitalize">{title}</span>
            <span className="left-arrow">
                <Icon type="right" />
            </span>
        </Link>
    </div>
);

export default TopicTitle;