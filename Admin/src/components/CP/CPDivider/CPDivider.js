import React from 'react'
import { Divider } from 'antd'

// type PropTypes = {
//   children?: Node,
//   dashed?  ,
//   className?  ,
//   type?  ,
//   orientation?
// };

const CPDivider = ({
  children,
  dashed = false,
  className,
  type = 'horizontal',
  orientation = 'center'
}) => {
  return (
    <Divider
      dashed={dashed}
      className={className}
      type={type}
      orientation={orientation === 'center' ? undefined : orientation}
    >
      {children}
    </Divider>
  )
}

export default CPDivider
