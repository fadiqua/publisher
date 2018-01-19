import React from 'react';
import { NavLink } from 'react-router-dom';
import './TagList.scss';

export const TagLink = ({codename, tag}) =>(
    <NavLink to={`/tag/${codename}`}>
        <span className="tag-link text-capitalize">{tag}</span>
    </NavLink>
);

const TagList = ({tags}) => (
    <ul className="list-unstyled tag-list">
        {tags && tags.map(tag => <li key={tag}><TagLink codename={tag} tag={tag} /></li>)}
    </ul>
);

export default TagList;