import React from 'react';
import { Icon } from 'antd';

const NoResult = props => (
    <div className="text-center no-result">
        <div> <Icon type="search"/> </div>
        <p>We couldn’t find any {props.type} matching
            <strong>{props.value} </strong> <Icon type="frown-o" />
        </p>
    </div>
);

export default NoResult;
