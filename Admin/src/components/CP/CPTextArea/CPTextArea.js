import React from "react";
import { Input, Form } from "antd";
// import type { Control } from "react-hook-form";

const { Item } = Form;
const { TextArea } = Input;

// type PropTypes = {
//   addonAfter?   | Node,
//   addonBefore?   | Node,
//   allowClear?  ,
//   autoSize?    ,
//   bordered?  ,
//   className?  ,
//   control?: Control,
//   defaultValue?  ,
//   disabled?  ,
//   hasFeedback?  ,
//   hasValidation?  ,
//   id?  ,
//   label?  ,
//   maxLength?   ,
//   name?  ,
//   onChange?  ,
//   onPressEnter?  ,
//   onResize?  ,
//   placeholder?  ,
//   prefix?   | Node,
//   rules?  ,
//   rows?  ,
//   showCount  ,
//   size?  ,
//   suffix?   | Node,
//   type?  ,
//   value?  ,
//   tooltip?: Node,
//   hasFeedback?  ,
//   initialValue?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   hasFeedback?  ,
//   dependencies?  ,
//   help?
// };

const CPTextArea = ({
  addonAfter,
  // lableType = false,
  addonBefore,
  allowClear,
  autoSize,
  bordered,
  className,
  control,
  defaultValue,
  disabled,
  errorMessage,
  errors,
  hasFeedback,
  hasValidation=true,
  id,
  label,
  maxLength,
  name,
  onChange,
  onPressEnter,
  onResize,
  placeholder,
  prefix,
  rules,
  rows = 1,
  showCount,
  size,
  suffix,
  type,
  value,
  tooltip,
  dependencies,
  initialValue,
  validateStatus,
  help,
  style
}) => {
  if (hasValidation) {
    return (
      <Item
        dependencies={dependencies}
        hasFeedback={hasFeedback}
        help={help}
        initialValue={initialValue}
        label={label}
        name={name}
        rules={rules}
        tooltip={tooltip}
        validateStatus={validateStatus}
      >
        <TextArea
          rows={rows}
          size={size}
          onChange={onChange}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          style={style}

          // style={{ border: "none", backgroundColor: "white", fontWeight: "bold" }}
        />
      </Item>
    );
  } else {
    return (
      <TextArea
        rows={rows}
        placeholder={placeholder}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        prefix={prefix}
        size={size}
        suffix={suffix}
        type={type}
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        allowClear={allowClear}
        bordered={bordered}
        className={className}
        label={label}
        style={style}
      />
    );
  }
};

export default CPTextArea;
