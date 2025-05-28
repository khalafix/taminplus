import React from 'react'
import { Card } from 'antd'

// type PropTypes = {
//   actions?  <Node>,
//   activeTabKey?  ,
//   headStyle?  ,
//   bodyStyle?  ,
//   bordered?  ,
//   cover?: Node,
//   defaultActiveTabKey?  ,
//   extra?   | Node,
//   hoverable?  ,
//   loading?  ,
//   tabList?  <{ key  , tab: Node }>,
//   tabBarExtraContent?: Node,
//   size?  ,
//   title?   | Node,
//   type?  ,
//   onTabChange?: () => void,
//   children?: Node,
//   className?: className
// };

const CPCard = ({
  actions,
  activeTabKey,
  headStyle,
  bodyStyle,
  bordered = false,
  cover,
  defaultActiveTabKey,
  extra,
  hoverable,
  loading,
  tabList,
  tabBarExtraContent,
  size,
  title,
  type,
  onTabChange,
  children,
  className
}) => {
  return (
    <Card
      actions={actions}
      activeTabKey={activeTabKey}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      bordered={bordered}
      cover={cover}
      defaultActiveTabKey={defaultActiveTabKey}
      extra={extra}
      hoverable={hoverable}
      loading={loading}
      tabList={tabList}
      tabBarExtraContent={tabBarExtraContent}
      size={size}
      title={title}
      type={type}
      onTabChange={onTabChange}
      className={className}
    >
      {children}
    </Card>
  )
}

export default CPCard
