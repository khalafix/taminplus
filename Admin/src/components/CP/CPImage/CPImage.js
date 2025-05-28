import React from "react";
import { Image, Form  } from "antd";
const { Item } = Form;

// type PropTypes = {
//   addonAfter?   | Node,
//   addonBefore?   | Node,
//   allowClear?  ,
//   bordered?  ,
//   className?  ,
//   control?: Control,
//   defaultValue?  ,
//   dependencies?  ,
//   disabled?  ,
//   hasFeedback?  ,
//   hasValidation?  ,
//   help  ,
//   id?  ,
//   initialValue?  ,
//   maxLength?   ,
//   name?  ,
//   onChange?  ,
//   onBlur?  ,
//   onPressEnter?  ,
//   placeholder?  ,
//   prefix?   | Node,
//   rules?  ,
//   size?  ,
//   label?  ,
//   suffix?   | Node,
//   tooltip?: Node,
//   type?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   value?
// };

const CPImage = ({
  addonAfter,
  addonBefore,
  allowClear = true,
  bordered,
  className,
  defaultValue,
  dependencies,
  disabled,
  hasFeedback,
  hasValidation,
  id,
  initialValue,
  name,
  validateStatus,
  value,
  style,
  preview,
  src,
  height,
  width
}) => {
  
  if (hasValidation) {
    return (
      <Item
        dependencies={dependencies}
        hasFeedback={hasFeedback}
        initialValue={initialValue}
        name={name}
        src={value}
        validateStatus={validateStatus}
        preview={preview}
        // src={src}
        height={height}
        width={width}
      >
        <Image
          allowClear={allowClear}
          id={id}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          disabled={disabled}
          className={className}
          style={style}
          name={name}
          src={src}
          preview={preview}
          height={height}
          width={width}
        />
      </Item>
    );
  } else {
    return (
      <Image
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        src={src}
        style={style}
        preview={preview}
        height={height}
        width={width}
      />
    );
  }
};

export default CPImage;
