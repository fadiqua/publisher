// npm packages
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Input} from 'antd';
import DocumentTitle from 'react-document-title';
// project files
import UsersTab from './UsersTab';
import StoriesTab from './StoriesTab';
import {getUrlQuery} from '../../utils/functions';
import './index.scss';

const SearchInput = Input.Search;

class Search extends Component {
  state = {value: ''};


  componentDidMount() {
    window.scrollTo(0, 0);
    this.setSearchValue(this.props.location.search);
  }

  componentWillReceiveProps({location}) {
    if (location.search !== this.props.location.search) {
      this.setSearchValue(location.search);
    }
  }

  onInputChange = e => this.setState({value: e.target.value});

  setSearchValue(search = '') {
    this.setState({value: getUrlQuery(search).q});
  }

  /**
   * Change route when the search value change
   * @param value: search value
   */
  handleSearch = (value) => {
    const query = getUrlQuery(this.props.location.search);
    this.props.history.push(`/search/?q=${this.state.value}&${Object.keys(query)[1] || ''}`);
  };

  render() {
    const {location} = this.props;
    const searchQ = getUrlQuery(location.search).q || '';
    const selectedKey = location.search.indexOf('users') === -1 ? 'stories' : 'users';
    const SelectedTab = location.search.indexOf('users') === -1 ? StoriesTab : UsersTab;
    return (
      <DocumentTitle title="Publisher - Search">
        <div className="base-sec">
          <div className="search-field">
            <SearchInput value={this.state.value} onChange={this.onInputChange}
                         size="large" placeholder="Search here..."
                         onSearch={this.handleSearch}/>
          </div>
          <Menu
            selectedKeys={[selectedKey]}
            mode="horizontal"
            className="browsable-taps">
            <Menu.Item key="stories">
              <NavLink to={`/search/?q=${searchQ}`}>
                Stories
              </NavLink>
            </Menu.Item>
            <Menu.Item key="users">
              <NavLink to={`/search/?q=${searchQ}&users`}>
                Users
              </NavLink>
            </Menu.Item>
          </Menu>
          <SelectedTab searchURL={location.search} value={this.state.value}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default Search;
