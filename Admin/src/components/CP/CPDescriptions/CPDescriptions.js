import React from 'react'
import { Descriptions } from 'antd'

// type PropTypes = {
//   className?  ,
//   bordered?  ,
//   colon?  ,
//   column?   ,
//   extra?: Node,
//   layout?: "horizontal" | "vertical",
//   size?: "default" | "middle" | "small",
//   title?: Node,
//   DescriptionsItem?  <ItemTypes>
// };
// type ItemTypes = { label?: Node, span?   , value: Node };

const CPDescriptions = ({
  className,
  bordered,
  colon,
  column,
  extra,
  layout,
  size,
  title,
  DescriptionsItem
}) => {
  return (
    <Descriptions
      className={className}
      bordered={bordered}
      title={title}
      size={size}
      layout={layout}
      column={column}
      extra={extra}
      colon={colon}

    >
      {DescriptionsItem?.map(({ label, span, value }, index) => (
        <Descriptions.Item        style={{fontWeight:"bold"}} key={index} label={label} span={span}>
          {value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  )
}

export default CPDescriptions
