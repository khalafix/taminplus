import React from "react";
import { InputNumber, Form } from "antd";
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
//   min?  ,
//   max?  ,
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

const CPInputNumber = ({
  addonAfter,
  addonBefore,
  allowClear,
  bordered,
  className,
  defaultValue,
  dependencies,
  disabled,
  hasFeedback,
  hasValidation,
  help,
  id,
  initialValue,
  maxLength,
  name,
  min,
  max,
  onBlur,
  onChange,
  onPressEnter,
  placeholder,
  prefix,
  rules,
  label,
  size,
  suffix,
  tooltip,
  type,
  validateStatus,
  value,
  formatter,
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
        value={value}
        validateStatus={validateStatus}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder={placeholder}
          id={id}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          formatter={formatter}
          disabled={disabled}
          min={min}
          max={max}
          className={className}
          onPressEnter={onPressEnter}
          onChange={onChange}
          onBlur={onBlur}
          size={size}
        />
      </Item>
    );
  } else {
    return (
      <InputNumber
        style={{ width: "100%" }}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        defaultValue={defaultValue}
        disabled={disabled}
        formatter={formatter}
        id={id}
        maxLength={maxLength}
        name={name}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
        prefix={prefix}
        size={size}
        suffix={suffix}
        type={type}
        value={value}
      />
    );
  }
};

export default CPInputNumber;
