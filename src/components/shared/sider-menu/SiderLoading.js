import React from 'react';
import LoadingSegmant from '../LoadingSegmant';

const SiderSegment = () => (
    <div className="clearfix">
        <LoadingSegmant style={{ width: '30px', float: 'left', marginRight: '4px' }}/>
        <LoadingSegmant style={{ width: '50%', float: 'left', marginRight: '4px' }}/>
    </div>
)
export default () => (
    <div className="topic-loading clearfix" style={{ width: '100%', padding: '20px'}}>
        <LoadingSegmant style={{ width: '30%' }}/>
        <br/>
        <SiderSegment />
        <br/>
        <SiderSegment />
        <br/>
        <SiderSegment />
        <br/>
        <SiderSegment />
        <br/>
        <br/>
        {/*<LoadingSegmant style={{ width: '30%' }}/>*/}
        {/*<br/>*/}
        {/*<SiderSegment />*/}
        {/*<br/>*/}
        {/*<SiderSegment />*/}
        {/*<br/>*/}
        {/*<SiderSegment />*/}

    </div>
)