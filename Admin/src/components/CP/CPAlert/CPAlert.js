import React from 'react'
import { Alert } from 'antd'

// type PropTypes = {
//   afterClose?: () => void,
//   banner?  ,
//   closable?  ,
//   closeText?   | Node,
//   description?   | Node,
//   icon?: Node,
//   message?   | Node,
//   showIcon?  ,
//   type?  ,
//   onClose?
// };

const CPAlert = ({
  afterClose,
  banner,
  closable = true,
  closeText,
  description,
  icon,
  message,
  showIcon,
  type,
  onClose
}) => {
  return (
    <Alert
      className="alert"
      afterClose={afterClose}
      banner={banner}
      closable={closable}
      closeText={closeText}
      description={description}
      icon={icon}
      message={message}
      showIcon={showIcon}
      type={type}
      onClose={onClose}
    />
  )
}

export default CPAlert
