import React from 'react';

import materialColorGenerator from '../../../utils/materialColorGenerator';

const color = materialColorGenerator();

const StoryCover = ({ imgSrc }) => (
    <div className="post-cover in-widget" style={{
        background: `url(${imgSrc}) center center / cover no-repeat`,
        backgroundColor: color,
        transition: 'opacity .25s linear',
    }} />
);

export default StoryCover;
