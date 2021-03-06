// npm pacakges
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';
// project files
import Story from '../shared/story-widget';
import PaginateLoading from '../shared/paginate-loading';
import { advancedSearch } from '../../routes';

class StoriesTab extends Component {
    state = {
      loading: true,
      data: {
        page: '1',
        docs: [],
        total: 1,
      },
    };

    loadMore = () => this.searchAPI(this.props.searchURL, parseInt(this.state.data.page, 10) + 1);

    _renderItems() {
      const { data, loading } = this.state;
      if (!loading) {
        return data.docs.map(item => <Col xs={24} sm={12} md={8} lg={8} key={`col_${item._id}`}>
                <Story item={item} />
            </Col>);
      }
      return <Col lg={24} />;
    }

    async searchAPI(searchURL, page) {
      const result = await advancedSearch(searchURL, page);
      const docs = page == 1 ? result.data.docs : [...this.state.data.docs, ...result.data.docs];
      this.setState({ loading: false, data: { ...result.data, docs } });
    }

    componentDidMount() {
      this.searchAPI(this.props.searchURL, 1);
    }

    componentWillReceiveProps({ searchURL }) {
      if (searchURL != this.props.searchURL) {
        this.searchAPI(searchURL, 1);
      }
    }

    render() {
      const { loading, data } = this.state;
      // if(data.total == 0 && !loading && this.props.value.length>0){
      //     return <NoResult type="story" value={this.props.value}/>
      // }

      return (
            <InfiniteScroll style={{ overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px' }}
                            next={this.loadMore}
                            hasMore={data.page != data.pages}
                            loader={<PaginateLoading key="pl" loading={loading} canPaginate={data.page != data.pages} />}>
                <div className="stories-tab">
                    <Row type="flex" gutter={16}>
                        { this._renderItems() }
                    </Row>
                </div>
            </InfiniteScroll>
      );
    }
}

export default StoriesTab;
