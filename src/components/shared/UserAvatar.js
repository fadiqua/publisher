import React from 'react';
import { defaultUserImg } from '../../utils/constants';


const UserAvatar = (props) => {
    const {
        type, width, height, imgSrc, prefix, className,
    } = props;
    const src = imgSrc ? `${prefix}${imgSrc}` : defaultUserImg;
    return (
        <div className={`user-avatar img-${type} ${className || ''}`} style={{ width, height }}>
            <img className="img-responsive" src={src} alt="thumbnail" />
        </div>
    );
};

export default UserAvatar;
