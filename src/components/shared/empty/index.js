import React from 'react';

import './index.scss';

const Empty = ({ message }) => (
    <div className="error text-center base-sec">
        <svg width={70} height={70} viewBox="0 0 24 24">
            <path fill="#bdc3c7" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,4H6V20H11L18,20V11H11V4Z" />
        </svg>
        <h2 style={{ color: '#bdc3c7' }}>{message }</h2>
    </div>
);
Empty.defualtProps = {
  message: '',
};
export default Empty;
