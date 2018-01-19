import React from 'react';
import LoadingSegmant from '../shared/LoadingSegmant';

const NotificationsLoading = () => (
    <div className="notifications-loading clearfix">
        <LoadingSegmant style={{
            width: '40px', height: '40px',
            float:'left', borderRadius: '20px' }} />
        <div style={{width: '90%', maxWidth: '300' ,float:'left'}}>
            <LoadingSegmant style={{ width: '100%' }}/>
            <LoadingSegmant style={{ width: '100px' }} />
        </div>
    </div>
)

export default NotificationsLoading;