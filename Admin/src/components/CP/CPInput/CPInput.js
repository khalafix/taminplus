import React from "react";
import { Input, Form } from "antd";
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

const CPInput = ({
  addonAfter,
  lableType = false,
  addonBefore,
  allowClear = true,
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
  max,
  min,
  name,
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
  style,
  ref,
}) => {
  if (hasValidation) {
    if (lableType == true) {
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
          <Input
            allowClear={allowClear}
            placeholder={placeholder}
            id={id}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            disabled={disabled}
            className={className}
            onPressEnter={onPressEnter}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            type={type}
            max={max}
            min={min}
            ref={ref}
            style={{ border: "none", backgroundColor: "white", fontWeight: "bold" }}
            name={name}
          />
        </Item>


      );
    }
    else {
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

          <Input
            allowClear={allowClear}
            placeholder={placeholder}
            id={id}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            disabled={disabled}
            className={className}
            onPressEnter={onPressEnter}
            onChange={onChange}
            onBlur={onBlur}
            size={size}
            type={type}
            max={max}
            min={min}
            ref={ref}
            style={style}
            name={name}
          />
        </Item>


      );
    }

  } else {
    return (
      <Input
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        allowClear={allowClear}
        bordered={bordered}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        ref={ref}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
        prefix={prefix}
        size={size}
        suffix={suffix}
        type={type}
        value={value}
        max={max}
        min={min}
        style={style}
      />
    );
  }
};

export default CPInput;
