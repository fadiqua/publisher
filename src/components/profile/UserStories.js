import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';
import PaginateLoading from '../shared/paginate-loading';
import Story from "../shared/story-widget";
import { fetchProfileStories } from '../../actions/actionTypes';

class UserStories extends Component {

    // load more stories with infinite scroll
    loadMoreStories = (e) => {
        let { params: {username} } = this.props.match;
        let { loading, stories} = this.props.profile;
        if(stories.page != stories.pages) {
            this.props.fetchProfileStories({
                username,
                page: parseInt(stories.page) + 1,
                type: 'paginate'
            });
        }
    };

    renderStories = () => {
        const { stories } = this.props.profile;
        return stories.docs.map(item => <Col key={`story-${item._id}`} lg={{span: 8}}
                                             sm={{span: 12}} xs={{span: 24}}>
            <Story item={item} first={false} />
        </Col>)
    };

    componentDidMount(){
        let { params: {username} } = this.props.match;
        this.props.fetchProfileStories({username, page: 1});
    }

    render(){
        const { stories} = this.props.profile;

        return (
            <InfiniteScroll
                style={{ overflowY: 'auto',overflowX: 'hidden', paddingTop:'10px'}}
                next={this.loadMoreStories}
                hasMore={stories.page != stories.pages}
                loader={<PaginateLoading loading={true} canPaginate={true} />}>
                <div className="user-stories">
                    <Row type='flex' gutter={20}>
                        { this.renderStories() }
                    </Row>
                </div>
            </InfiniteScroll>
        );
    }
}
const mapStateToProps = ({auth: { currentUser }, profile  }) => ({ currentUser, profile });

export default connect(mapStateToProps, { fetchProfileStories })(UserStories);