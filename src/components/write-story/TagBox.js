import React, { Component } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

class TagBox extends Component {
    state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
      canAdd: true,
    };

    componentDidMount() {
      const { tags } = this.props;
      this.setState({ tags, canAdd: tags.length < (this.props.limit || 5) });
    }
    handleClose = (removedTag) => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags, canAdd: tags.length < (this.props.limit || 5) });
    };

    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
      this.setState({ inputValue: e.target.value });
    }
    handleInputConfirm = () => {
      const state = this.state;
      const inputValue = state.inputValue;
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
        canAdd: tags.length < (this.props.limit || 5),
      });

      this.props.onChange(tags);
    };

    saveInputRef = (input) => { this.input = input; };

    render() {
      const {
        tags, inputVisible, inputValue, canAdd,
      } = this.state;

      return (
            <div>
                <span style={{ marginRight: '20px', fontSize: '1.2em' }}>Insert tags:</span>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {canAdd && !inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
      );
    }
}

export default TagBox;
