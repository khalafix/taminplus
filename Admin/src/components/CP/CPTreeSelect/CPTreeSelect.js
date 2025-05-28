import React from 'react'
import { TreeSelect, Form } from 'antd'

const { Item } = Form

// type PropTypes = {
//   allowClear?  ,
//   autoClearSearchValue?  ,

//   dataSource?  <Object>,
//   defaultValue?   | string[],
//   disabled?  ,
//   dropdownClassName?  ,
//   dropdownRender?  ,
//   dropdownStyle?  ,
//   filterTreeNode?   | Function,
//   getPopupContainer?  ,
//   hasValidation?  ,
//   labelInValue?  ,
//   label?   | Node,
//   listHeight?   ,
//   loadData?  ,
//   maxTagCount?   ,
//   multiple?  ,
//   name?  ,
//   onChange?  ,
//   onSearch?  ,
//   onSelect?  ,
//   onTreeExpand?  ,
//   placeholder?  ,
//   searchValue?  ,
//   showArrow?  ,
//   showSearch?  ,
//   size?: "large" | "middle" | "small",
//   suffixIcon?: Node,
//   switcherIcon?: Node,
//   treeCheckable?  ,
//   treeCheckStrictly?  ,
//   treeData?  <{
//     checkable?  ,
//     children  <Object>,
//     disableCheckbox?  ,
//     disabled?  ,
//     selectable?  ,
//     title  ,
//     value
//   }>,
//   treeDataSimpleMode?   | { id  , pId  , rootPId   },
//   treeDefaultExpandAll?  ,
//   treeDefaultExpandedKeys?  [],
//   treeExpandedKeys?  [],
//   treeIcon?  ,
//   treeNodeFilterProp?  ,
//   treeNodeLabelProp?  ,
//   value?   | string[],
//   virtual?  ,
//   hasFeedback?  ,
//   rules?  ,
//   dependencies?  ,
//   initialValue?  ,
//   tooltip?: Node,
//   help?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating"
// };

const CPTreeSelect = ({
  allowClear,
  autoClearSearchValue,
  help,
  dataSource,
  defaultValue,
  disabled,
  dropdownClassName,
  dropdownRender,
  dropdownStyle,
  filterTreeNode,
  getPopupContainer,
  hasValidation,
  labelInValue,
  label,
  listHeight,
  loadData,
  maxTagCount,
  multiple,
  name,
  onChange,
  onSearch,
  onSelect,
  onTreeExpand,
  placeholder,
  searchValue,
  showArrow,
  showSearch,
  size,
  suffixIcon,
  switcherIcon,
  treeCheckable,
  treeCheckStrictly,
  treeData,
  treeDataSimpleMode,
  treeDefaultExpandAll,
  treeExpandedKeys,
  treeIcon,
  treeNodeFilterProp,
  treeNodeLabelProp,
  value,
  virtual,
  hasFeedback,
  rules,
  tooltip,
  dependencies,
  initialValue,
  validateStatus,
  loading
}) => {
  if (hasValidation) {
    return (
      <Item
        dependencies={dependencies}
        hasFeedback={hasFeedback}
        help={help}
        initialValue={initialValue}
        label={label}
        name={name}
        rules={rules}
        tooltip={tooltip}
        validateStatus={validateStatus}
      >
        <TreeSelect
          loading={loading}
          allowClear={allowClear}
          autoClearSearchValue={autoClearSearchValue}
          dataSource={dataSource}
          disabled={disabled}
          dropdownClassName={dropdownClassName}
          dropdownRender={dropdownRender}
          dropdownStyle={dropdownStyle}
          //filterTreeNode={filterTreeNode}
          filterTreeNode={(search, item) => {
            return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
          }}
          getPopupContainer={getPopupContainer}
          hasValidation={hasValidation}
          labelInValue={labelInValue}
          listHeight={listHeight}
          loadData={loadData}
          maxTagCount={maxTagCount}
          multiple={multiple}
          onChange={onChange}
          onSearch={onSearch}
          onSelect={onSelect}
          onTreeExpand={onTreeExpand}
          placeholder={placeholder}
          searchValue={searchValue}
          showArrow={showArrow}
          showSearch={showSearch}
          size={size}
          style={{ width: '100%' }}
          suffixIcon={suffixIcon}
          switcherIcon={switcherIcon}
          treeCheckable={treeCheckable}
          treeCheckStrictly={treeCheckStrictly}
          treeData={treeData}
          treeDataSimpleMode={treeDataSimpleMode}
          treeDefaultExpandAll={treeDefaultExpandAll}
          treeExpandedKeys={treeExpandedKeys}
          treeIcon={treeIcon}
          treeNodeFilterProp={treeNodeFilterProp}
          treeNodeLabelProp={treeNodeLabelProp}
          virtual={virtual}
        />
      </Item>
    )
  } else {
    return (
      <TreeSelect
        loading={loading}
        allowClear={allowClear}
        autoClearSearchValue={autoClearSearchValue}
        dataSource={dataSource}
        defaultValue={defaultValue}
        disabled={disabled}
        dropdownClassName={dropdownClassName}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        //filterTreeNode={filterTreeNode}
        filterTreeNode={(search, item) => {
          return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        }}
        getPopupContainer={getPopupContainer}
        hasValidation={hasValidation}
        labelInValue={labelInValue}
        listHeight={listHeight}
        loadData={loadData}
        maxTagCount={maxTagCount}
        multiple={multiple}
        onChange={onChange}
        onSearch={onSearch}
        onSelect={onSelect}
        onTreeExpand={onTreeExpand}
        placeholder={placeholder}
        searchValue={searchValue}
        showArrow={showArrow}
        showSearch={showSearch}
        size={size}
        style={{ width: '100%' }}
        suffixIcon={suffixIcon}
        switcherIcon={switcherIcon}
        treeCheckable={treeCheckable}
        treeCheckStrictly={treeCheckStrictly}
        treeData={treeData}
        treeDataSimpleMode={treeDataSimpleMode}
        treeDefaultExpandAll={treeDefaultExpandAll}
        treeExpandedKeys={treeExpandedKeys}
        treeIcon={treeIcon}
        treeNodeFilterProp={treeNodeFilterProp}
        treeNodeLabelProp={treeNodeLabelProp}
        value={value}
        virtual={virtual}
      />
    )
  }
}

export default CPTreeSelect
