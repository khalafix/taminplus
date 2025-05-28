import React from 'react'
import { Popover } from 'antd'

// type PropTypes = {
//   children?: Node,
//   placement?  ,
//   title?  ,
//   content?: node | string,
//   trigger?  ,
//   overlayClassName?  ,
//   visible?  ,
//   onVisibleChange?
// };

const CPPopover = ({
  children,
  content,
  placement,
  title,
  trigger = 'click',
  overlayClassName,
  visible,
  onVisibleChange
}) => {
  return (
    <Popover
      content={content}
      trigger={trigger}
      placement={placement}
      title={title}
      overlayClassName={overlayClassName}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Popover>
  )
}

export default CPPopover
