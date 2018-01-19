import React, {Component} from 'react'
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {Form, ul, Dropdown, Popover, Input, Select, Icon, Spin} from 'antd';
import {search} from '../../../routes/api';
import throttle from '../../../utils/throttle';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

class SearchInput extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                stories: [], users: [],
            },
            value: '', fetching: false,
            expanedSearch: false,
            visible: false
        };
        this.delayedSearch = debounce(this.delayedSearch, 800);
    }
    static contextTypes = {
        router: PropTypes.object
    };
    onVisibleChange = (visible) => {
        if(visible) {
            setTimeout(() => {
                this.setState({ visible})
            }, 200)
        } else {
            this.setState({ visible})
        }
    }
    expandSearchInput = () => {
        this.expandSearch = true;
        const {expanedSearch} = this.state;
        if (!expanedSearch) this.setState({expanedSearch: true});
    };
    normalSearchInput = () => {
        if (!this.expandSearch && this.state.expanedSearch) this.setState({expanedSearch: false});
        this.expandSearch = false;
    };
    delayedSearch =  async (e) => {
        try {
            this.setState({fetching: true});
            const result = e.target.value.trim().length > 1 ?
                (await search(e.target.value)).data : {};
            this.setState({
                fetching: false, data: { stories: result.stories || [], users: result.users || [] }
            });
        } catch (e) { console.log('error ', e) }
    }
    handleChange = (e) =>{
        e.persist();
        if(e.target.value.length < 1) {

        }
        this.setState({value: e.target.value});
        this.delayedSearch(e);
    };
    renderFetching = () => {
        const {fetching, value, data, stories, users} = this.state;
        const searchItemsJSX = [];

        try {
            if(value.length>0){
                searchItemsJSX.push(<li key="see-all">
                    <div className="see-all-results" onClick={() => this.onSubmitSearch(value)}>
                        <span><Icon type="search"/>View All results for </span><strong title={value}>{value}</strong>
                    </div>
                </li>);
            }

            if (data.stories.length > 0) {
                searchItemsJSX.push(<li key="stories" value="disabled" disabled>Stories</li>);
                data.stories.map(d => searchItemsJSX.push(
                    <li key={d.slug}>
                        <NavLink className="search-item" to={`/topics/${d._topic.name}/story/${d.slug}`}
                                 onClick={() => this.onVisibleChange(false)}
                                 title={d.title}>
                            <img src={`/media/${d.cover}`} alt=""/>
                            <div className="item-info">
                                <h4>{d.title}</h4>
                                <span className="text-capitalize">{d._creator.displayName}</span>
                            </div>
                        </NavLink>
                    </li>
                ));
            }
            if (data.users.length > 0) {
                searchItemsJSX.push(<li key="users" value="disabled" disabled>Users</li>);
                data.users.map(d => searchItemsJSX.push(
                    <li key={d._id}>
                        <NavLink className="search-item" to={`/profile/${d._id}`} title={d.displayName}
                                 onClick={() => this.onVisibleChange(false)}>
                            <img className="circle" src={`/media/thumbs/${d.thumbnail}`} alt=""/>
                            <div className="item-info">
                                <h4 className="text-capitalize">{d.displayName}</h4>
                                <span>{d.bio || '' }</span>
                            </div>
                        </NavLink>
                    </li>
                ));
            }
        } catch (e) {
        }
        if (fetching) {
            searchItemsJSX.push( <li value="disabled" key={'not-found'}>
                <div className="text-center">
                    <Spin size="small"/>
                </div>
            </li>)
            // return (
            //     <li value="disabled" key={'not-found'}>
            //         <div className="text-center">
            //             <Spin size="small"/>
            //         </div>
            //     </li>
            // )
        }
        return searchItemsJSX;
    };

    componentDidMount() {
        document.addEventListener('click', this.normalSearchInput);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.normalSearchInput);
    }
    onSubmitSearch = (value) => {
        this.context.router.history.push(`/search/?q=${value || this.state.value}`);
        this.setState({visible: false})
    }
    render() {
        const {expanedSearch, visible, value} = this.state;
        return (
            <span style={{position: 'relative'}}>
              <div id="search-input">

                  <Popover overlayClassName={`search-result ${value.length < 1? 'empty':''} `}
                            content={<ul>{this.renderFetching()}</ul>}
                            trigger={['click']} visible={visible}
                            onVisibleChange={this.onVisibleChange}
                            getPopupContainer={node => document.getElementById('search-input')}>
                      <Search ref={node => this.searchRef = node}
                              placeholder="Search here..."
                              onChange={this.handleChange}
                              onClick={this.expandSearchInput}
                              size="large"
                              className={classNames(' search-input', {'expanded': expanedSearch})}
                              onSearch={this.onSubmitSearch} />
                  </Popover>
              </div>
            </span>
        )
    }
}

export default SearchInput;