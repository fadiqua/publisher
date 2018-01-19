import React from 'react';
import timeSince from '../../utils/timeSince';

const UserInfo = ({ className, user }) => (
    <div className={`user-info ${className || ''}`}>
        <h1 className="text-capitalize">{ user.displayName }</h1>
        <p>
            { user.bio || `Member since ${timeSince(new Date(user.createdAt), false)}`}
        </p>
    </div>
);

export default UserInfo;