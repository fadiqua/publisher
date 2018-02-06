import React from 'react';
import LoadingSegmant from '../shared/LoadingSegmant';

const StoryLoading = () => (
    <div className="topic-loading base-sec clearfix">
        <div style={{ width: '100%' }} className="clearfix">
            <LoadingSegmant style={{
                width: '50px',
height: '50px',
                borderRadius: '50%',
float: 'left',
}} />
            <div style={{ width: '60%', float: 'left', marginTop: '5px' }}>
                <LoadingSegmant style={{ height: '10px', width: '100px' }} />
                <br/>
                <LoadingSegmant style={{ height: '10px', width: '150px' }} />
            </div>

        </div>
        <div>
            <br/>
            <LoadingSegmant style={{ width: '80%' }}/>
            <LoadingSegmant style={{ width: '50%' }}/>
        </div>
    </div>
);

export default StoryLoading;
