import React, { Component } from 'react';
import throttle from '../../utils/throttle';

class InfiniteScroll extends Component {
  constructor() {
    super();
    this.throttledOnScrollListener = throttle(this.onScrollListener, 150).bind(this);
  }

    onScrollListener = (e) => {
      const { offsetHeight, scrollTop, scrollHeight } = document.querySelector('body');
      if (offsetHeight + scrollTop === scrollHeight) {
        this.props.loadMore();
      }
    };

    componentDidMount() {
      window.addEventListener('scroll', this.throttledOnScrollListener);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.throttledOnScrollListener);
    }

    render() {
      return <div> { this.props.children } </div>;
    }
}

export default InfiniteScroll;
