// npm packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';
// project files
import PaginateLoading from '../shared/paginate-loading';
import Story from '../shared/story-widget';
import { fetchProfileStories } from '../../actions/actionTypes';

class UserStories extends Component {
    componentDidMount() {
        const { params: { username } } = this.props.match;
        this.props.fetchProfileStories({ username, page: 1 });
    }
    // load more stories with infinite scroll
    loadMoreStories = (e) => {
        const { params: { username } } = this.props.match;
        const { loading, stories } = this.props.profile;
        if (stories.page !== stories.pages) {
            this.props.fetchProfileStories({
                username,
                page: parseInt(stories.page, 10) + 1,
                type: 'paginate',
            });
        }
    };
    renderStories = () => {
      const { stories } = this.props.profile;
      return stories.docs.map(item => <Col key={`story-${item._id}`} lg={{ span: 8 }}
                                             sm={{ span: 12 }} xs={{ span: 24 }}>
            <Story item={item} first={false} />
        </Col>);
    };

    render() {
      const { stories } = this.props.profile;

      return (
            <InfiniteScroll
                style={{ overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px' }}
                next={this.loadMoreStories}
                hasMore={parseInt(stories.page, 10) !== stories.pages}
                loader={<PaginateLoading loading canPaginate />}>
                <div className="user-stories">
                    <Row type="flex" gutter={20}>
                        { this.renderStories() }
                    </Row>
                </div>
            </InfiniteScroll>
      );
    }
}
const mapStateToProps = ({ auth: { currentUser }, profile }) => ({ currentUser, profile });

export default connect(mapStateToProps, { fetchProfileStories })(UserStories);
