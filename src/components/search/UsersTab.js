// project files
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';
// npm packages
import UserWidget from './UserWidget';
import PaginateLoading from '../shared/paginate-loading';
import NoResult from './NoResult';
import { advancedSearch } from '../../routes';

class UsersTab extends Component {
    state = {
      loading: true,
      data: {
        docs: [],
        page: '1',
        total: 1,
      },
    };

    loadMore = () => this.searchAPI(this.props.searchURL, parseInt(this.state.data.page, 10) + 1);

    renderItems = () => {
      const { data, loading } = this.state;
      if (!loading) {
        return data.docs.map(item => <Col xs={24} sm={12} md={8} lg={8} key={`col_users_${item._id}`}>
                <UserWidget item={item} />
            </Col>);
      }
    };

    searchAPI = async (searchURL, page) => {
      const result = await advancedSearch(searchURL, page);
      const docs = parseInt(page, 10) === 1 ? result.data.docs : [...this.state.data.docs, ...result.data.docs];
      this.setState({ loading: false, data: { ...result.data, docs } });
    };

    componentDidMount() {
      this.searchAPI(this.props.searchURL);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.searchURL !== this.props.searchURL) {
        this.searchAPI(nextProps.searchURL, 1);
      }
    }

    render() {
      const { loading, data } = this.state;
      if (data.total === 0 && !loading && this.props.value.length > 0) {
        return <NoResult type="user" value={this.props.value}/>;
      }
      const hasMore = parseInt(data.page, 10) !== parseInt(data.pages, 10);
      return (
            <InfiniteScroll style={{ overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px' }}
                             next={this.loadMore}
                             hasMore={hasMore}
                             loader={<PaginateLoading loading={loading}
                                                      canPaginate={hasMore}
                             />}>
                <div className="stories-tab">
                    <Row type="flex" gutter={16}>
                        { this.renderItems() }
                    </Row>
                </div>
            </InfiniteScroll>
      );
    }
}

export default UsersTab;
