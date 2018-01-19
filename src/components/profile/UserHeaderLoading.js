import React from 'react';
import LoadingSegmant from '../shared/LoadingSegmant';

const UserHeaderLoading = () => (
    <div className="user-header-loading">
        <LoadingSegmant style={{ width: '100px', height:'100px', borderRadius: '50%' }} />
        <br/>
        <LoadingSegmant style={{ width: '150px'}} />
        <br/>
        <LoadingSegmant style={{ width: '60%'}} />
        <br/>
        <LoadingSegmant style={{ width: '100px'}} />
        <LoadingSegmant style={{ width: '100px'}} />
    </div>
);

export default UserHeaderLoading;