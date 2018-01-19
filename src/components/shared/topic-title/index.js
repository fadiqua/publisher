import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss'

export const TopicTitle = ({link, title}) => (
    <div className="topic-title">
        <Link to={link} >
            <span className="text-capitalize">{title}</span>
            <span className="left-arrow">
                <i className="material-icons">keyboard_arrow_right</i>
            </span>
        </Link>
    </div>
);
export default TopicTitle;