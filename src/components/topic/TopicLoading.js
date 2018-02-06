import React from 'react';
import LoadingSegmant from '../shared/LoadingSegmant';

const TopicLoading = () => (
    <div className="topic-loading base-sec clearfix" style={{ width: '100%' }}>
        <LoadingSegmant style={{
            width: '50%',
            height: '200px',
            float: 'left',
        }} />
        <div style={{ width: '38%', float: 'left' }}>
            <LoadingSegmant style={{ width: '100%' }}/>
            <LoadingSegmant style={{ width: '100%' }} />
            <LoadingSegmant style={{ width: '100%' }} />
            <br/><br/>
            <div style={{ width: '60%' }}>
                <LoadingSegmant style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    float: 'left',
                }} />
                <div style={{ width: '60%', float: 'left', marginTop: '5px' }}>
                    <LoadingSegmant style={{ height: '10px', width: '100%' }} />
                    <LoadingSegmant style={{ height: '10px', width: '100%' }} />
                </div>
            </div>
        </div>
    </div>
);

export default TopicLoading;
