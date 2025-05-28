import React from "react";
import { Tooltip } from "antd";

// type PropTypes = {
//   title?   | Node,
//   // arrowPointAtCenter?  ,
//   // autoAdjustOverflow?  ,
//   // defaultVisible?  ,
//   // color?  ,
//   // getPopupContainer?  ,
//   // mouseEnterDelay?   ,
//   // mouseLeaveDelay?   ,
//   // overlayClassName?  ,
//   // overlayStyle?  ,
//   // placement?  ,
//   trigger?  ,
//   // visible?  ,
//   // onVisibleChange?  ,
//   // align?  ,
//   // destroyTooltipOnHide?  ,
//   className?  ,
//   children?: Node,
//   key   | number
// };

const CPTooltip = ({
  title,
  className,
  key,
  // arrowPointAtCenter,
  // autoAdjustOverflow,
  // defaultVisible,
  // color,
  // getPopupContainer,
  // mouseEnterDelay,
  // mouseLeaveDelay,
  // overlayClassName,
  // overlayStyle,
  // placement,
  trigger,
  // visible,
  // onVisibleChange,
  // align,
  // destroyTooltipOnHide,
  children,
  placement,
}) => {
  return (
    <Tooltip
      title={title}
      className={className}
      placement={placement}
      key={key}
      // arrowPointAtCenter={arrowPointAtCenter}
      // autoAdjustOverflow={autoAdjustOverflow}
      // defaultVisible={defaultVisible}
      // color={color}
      // getPopupContainer={getPopupContainer}
      // mouseEnterDelay={mouseEnterDelay}
      // mouseLeaveDelay={mouseLeaveDelay}
      // overlayClassName={overlayClassName}
      // overlayStyle={overlayStyle}
      // placement={placement}
      trigger={trigger}
      // visible={visible}
      // onVisibleChange={onVisibleChange}
      // align={align}
      // destroyTooltipOnHide={destroyTooltipOnHide}
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
    >
      {children}
    </Tooltip>
  );
};

export default CPTooltip;
