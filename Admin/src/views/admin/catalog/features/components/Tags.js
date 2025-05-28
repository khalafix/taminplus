import React, { useState, useEffect, useRef,Component } from "react";
import { Row, Col, Space, Form, Spin, Tag, Input,Tooltip } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

import { PlusOutlined } from '@ant-design/icons';
export default class Tags extends Component {
constructor(props){
super(props)
}

  state = {
    tags: this.props.defalutOption.length > 0 ?  this.props.defalutOption : [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };
  
  handleClose = removedTag => {
    
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags:tags });
    this.props.tags(tags)

  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  // let tags = this.state.tags.filter(f => f !== (this.state.editInputValue));

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    
    this.props.tags(tags)
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      this.props.tags(newTags)

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
      
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };


   preventDefault=(e)=> {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;

    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="large"
                className="tag-input"
                value={editInputValue}
                // onChange={this.preventDefault}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable
           
              onClose={() => this.handleClose(tag)}
            >
              <span style={{ display: 'inline' }}
                // onDoubleClick={e => {
                //   if (index !== 0) {
                //     this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                //       this.editInput.focus();
                //     });
                //     e.preventDefault();
                //   }
                // }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="large"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag  className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> <FormattedMessage id="addNewItems" />
          </Tag>
        )}
      </>
    );
  }
}
