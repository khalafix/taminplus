import React from 'react'
import { Tag } from 'antd'

// type PropTypes = {
//   closable?  ,
//   color?  ,
//   closeIcon?: Node,
//   onClose?: () => void,
//   visible?  ,
//   icon?: Node,
//   children?: Node
// };

const CPTag = ({ closable, color, closeIcon, onClose, visible = true, icon, children }) => {
  return (
    <Tag
      closable={closable}
      color={color}
      closeIcon={closeIcon}
      onClose={onClose}
      visible={visible}
      icon={icon}
    >
      {children}
    </Tag>
  )
}

export default CPTag
