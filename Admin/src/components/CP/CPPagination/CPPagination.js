import React from 'react'
import { Pagination } from 'antd'

/* type PropTypes = {
  showSizeChanger?  ,
  showQuickJumper?  ,
  size?  ,
  total?   ,
  pageSize?   ,
  current?   ,
  onChange?  ,
  showTotal?  ,
  onShowSizeChange?  ,
  className?  ,
  hideOnSinglePage
}; */

const CPPagination = ({
  showSizeChanger,
  showQuickJumper,
  size,
  showTotal,
  pageSize,
  total,
  current,
  onChange,
  onShowSizeChange,
  className,
  hideOnSinglePage,
  defaultPageSize
}) => {
  if (total) {
    return (
      <Pagination
        size={size}
        total={total}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        current={current}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        showTotal={showTotal}
        className={className}
        hideOnSinglePage={hideOnSinglePage}
        defaultPageSize={defaultPageSize}
      />
    )
  }

  return null
}

export default CPPagination
