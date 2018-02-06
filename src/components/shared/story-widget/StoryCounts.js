import React from 'react';

const StoryCounts = ({ likesCount, commentsCount }) => (
    <div className="story-counts">
        <div className="with-no">
            <svg width={16} height={16} viewBox="0 0 24 24">
                <path fill="#ffffff" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
            </svg>
            <span className="c-number">{likesCount}</span>

        </div>
        <div className="with-no">
            <svg width={16} height={16} viewBox="0 0 24 24">
                <path fill="#ffffff" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
            </svg>
            <span className="c-number">{commentsCount}</span>
        </div>
    </div>
);

export default StoryCounts;
