import React from 'react';

const ReadMoreButton = (props) => {
    const moreOrLess = !props.readMore ? 'More' : 'Less';
    return (
        <div className="read-more-btn">
            <button className="icon-btn" onClick={() => props.onClick()}>Read {moreOrLess}...</button>
        </div>
    );
};

export default ReadMoreButton;
