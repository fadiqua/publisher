import React, { Component } from 'react';
import { Spin } from 'antd';

class PaginateLoading extends Component {

    render() {
        const { loading, canPaginate} = this.props;
        if(loading){
            return (
                <div className="text-center" style={{padding: '8px 0'}}>
                    <Spin/>
                </div>
            )
        } else if(canPaginate) {
            return <div style={{ height:  "35px" }} key="loading-noti"></div>;
        }
        return null;
    }
}

export default PaginateLoading;