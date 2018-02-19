import React from 'react';
import {Spin} from 'antd';

const PaginateLoading = (props) => {
  const {loading, canPaginate} = props;
  if (loading) {
    return (
      <div className="text-center" style={{padding: '8px 0'}}>
        <Spin/>
      </div>
    );
  } else if (canPaginate) {
    return <div style={{height: '35px'}} key="loading-noti"/>;
  }
  return null;
};

export default PaginateLoading;
