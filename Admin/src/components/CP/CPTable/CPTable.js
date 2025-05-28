import React from 'react'
import { Table } from 'antd'

// type PropTypes = {
//   bordered?  ,
//   children?: Node,
//   className?  ,
//   columns  <{}>,
//   data  <{}>,
//   expandedRowRender?  ,
//   loading?   | boolean,
//   locale?  ,
//   onRowClick?  ,
//   pagination?  ,
//   rowExpandable?  ,
//   rowKey?   | Function,
//   scroll?  ,
//   size?  ,
//   style?  ,
//   title?  ,
//   expandable?  ,
//   components  ,
//   onChange
// };

const CPTable = ({
  bordered,
  children,
  className,
  columns,
  data,
  expandedRowRender,
  loading,
  locale,
  onRowClick,
  pagination = false,
  rowExpandable = false,
  expandable,
  rowKey,
  scroll,
  size,
  style,
  title,
  components,
  onChange,
  rowClassName,
  rowSelection

}) => {
  return (
    <Table
      rowSelection={rowSelection}
      title={() => title}
      scroll={scroll}
      columns={columns}
      dataSource={data}
      loading={loading}
      bordered={bordered}
      size={size}
      rowKey={rowKey}
      onRowClick={onRowClick}
      className={className}
      style={style}
      locale={locale}
      expandable={expandable}
      expandedRowRender={expandedRowRender}
      components={components}
      pagination={pagination}
      onChange={onChange}
      rowClassName={rowClassName}
    >
      {children}
    </Table>
  )
}

export default CPTable
