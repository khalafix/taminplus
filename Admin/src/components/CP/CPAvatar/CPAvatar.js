import React from 'react'
import { Avatar } from 'antd'

// type PropTypes = {
//   children?: Node,
//   icon?  ,
//   shape?  ,
//   size?  ,
//   src?  ,
//   badge?  ,
//   style?
// };

const CPAvatar = ({
  children,
  icon,
  shape = 'circle',
  size = 'default',
  src = '/images/avatar.png',
  style
}) => {
  return (
    <Avatar icon={icon} shape={shape} size={size} src={src} style={style}>
      {children}
    </Avatar>
  )
}

export default CPAvatar
