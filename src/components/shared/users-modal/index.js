import React, {Component} from "react"
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal, Button } from 'antd';
import PaginateLoading from '../../shared/paginate-loading';
import UserWidget from '../../search/UserWidget';
import './index.scss';

class UsersModal extends Component {
    state = {
        visible: false, loading: false,
        data:{
            page: "1",
            docs: [],
            pages: 1
        }
    };
    openModal = async () => {
        this.setState({visible: true, loading: true,data:{ page: "1",  docs: [], pages:1 }});
        const result = await this.props.api(this.props.data.id);
        this.setState({
            loading: false,
            data: result.data
        });
    };
    closeModal = () => {
        this.setState({ visible: false})
    };
    loadMore = async () => {
        const { id } = this.props.data;
        const nextPage = parseInt(this.state.data.page) + 1;
        this.setState({loading: true});
        const result = (await this.props.api(id,nextPage )).data;
        this.setState({
            loading: false,
            data: {...result.data, docs: [...this.state.data.docs, ...result.docs]}
        });
    };
    renderUsers = () => {
        const { data } = this.state;
        return data.docs.map(obj => <li key={obj._id} >
            <UserWidget item={obj._followed} followCallback={this.props.followCallback} /></li>)
    };
    renderLoadMoreButton = () => {
        const { loading, data } = this.state;
        if(data.page== data.pages) {
            return;
        }
        return <li>
            <Button onClick={this.loadMore} loading={loading && data.docs.length > 0} className="load-more" size="large">load more</Button>
        </li>
    }
    render() {
        const { visible, loading, data } = this.state;
        const { title } = this.props;
        return (
            <div className="users-modal-box">
                <span onClick={this.openModal}>{this.props.children}</span>
                {visible && <Modal title={title} visible={visible}
                                   width={450} footer={null}
                                   wrapClassName="users-modal"
                                   onCancel={this.closeModal}>
                    <Scrollbars autoHeight autoHide
                                autoHeightMin={50}
                                autoHeightMax={400}
                                autoHideTimeout={500}
                                autoHideDuration={200}
                                ref={ node => this.scrollbars = node }>
                        <ul className="users-list">
                            { this.renderUsers() }
                            { this.renderLoadMoreButton() }
                        </ul>
                        <PaginateLoading loading={loading && data.docs.length === 0} canPaginate={false}/>
                    </Scrollbars>

                </Modal>}

            </div>
        )
    }
}

export default UsersModal;