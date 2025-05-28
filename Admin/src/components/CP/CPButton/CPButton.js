import React from "react";

// UI
import { Button } from "antd";

// Type

// type PropTypes = {
//   children?: Node,
//   disabled?  ,
//   danger?  ,
//   onClick?  ,
//   icon?: Node,
//   type?  ,
//   size?  ,
//   shape?  ,
//   className?  ,
//   htmlType?: Node,
//   loading?  ,
//   style?
// };

const CPButton = ({
  children,
  disabled = false,
  danger = false,
  onClick = () => {},
  icon,
  type = "default",
  size = "default",
  className = "default",
  shape,
  htmlType = "button",
  loading = false,
  block=false,
  style,
}) => {
  return (
    <Button
      style={style}
      type={type}
      className={`${className} button`}
      onClick={onClick}
      icon={icon && <span className="btn-icon">{icon}</span>}
      disabled={disabled}
      danger={danger}
      size={size}
      shape={shape}
      htmlType={htmlType}
      loading={loading}
      block={block}
    >
      {children}
    </Button>
  );
};

export default CPButton;
