import React from 'react'
import { Empty } from 'antd'

// type PropTypes = {
//   className?  ,
//   description?: Node,
//   imagestyle?  ,
//   image?: Node
// };

const CPEmpty = ({ className, description, imagestyle, image }) => {
  return (
    <Empty description={description} imagestyle={imagestyle} image={image} className={className} />
  )
}

export default CPEmpty
