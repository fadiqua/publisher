import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import UserResponseBox from './UserResponseBox';

import { fetchProfileResponses, initResponses } from '../../actions/actionTypes';

class UserResponses extends Component {

    componentDidMount(){
        let { params: {username} } = this.props.match;
        this.props.initResponses();
        this.props.fetchProfileResponses({ page:1, type: null, username })
    }

    renderResponses = () => {
        const { responses, auth:{currentUser}} = this.props;
        let responsesJSX = [];
        responses.docs.forEach((response, key) => {
            const currentComment = (
                <Col key={response._id} offset={3} xs={18} sm={18} md={18} lg={18}>
                    <UserResponseBox item={response} edit={false}
                                     owner={currentUser._id}/>
                </Col>
            );
            responsesJSX.push(currentComment)

        });
        return responsesJSX;
    };

    render(){
        return (
            <div className="user-responses">
                <Row type="flex" gutter={16}>
                    { this.renderResponses() }
                </Row>
            </div>
        )
    }
}
const mapStateToProps = ({auth, profile, responses}) => ({auth, profile, responses});

export default connect(mapStateToProps, { fetchProfileResponses,initResponses })(UserResponses);