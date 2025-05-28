import React from "react";
import { Input, Form } from "antd";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const { Item } = Form;

// type PropsTypes = {
//   placeholder?  ,
//   addonAfter?   | Node,
//   addonBefore?   | Node,
//   defaultValue?  ,
//   disabled?  ,
//   id?  ,
//   maxLength?   ,
//   prefix?   | Node,
//   size?  ,
//   suffix?   | Node,
//   type?  ,
//   value?  ,
//   onChange?  ,
//   onPressEnter?  ,
//   allowClear?  ,
//   bordered?  ,
//   className?  ,
//   hasValidation?  ,
//   name?  ,
//   rules?  ,
//   label?  ,
//   tooltip?: Node,
//   hasFeedback?  ,
//   initialValue?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   hasFeedback?  ,
//   dependencies?  ,
//   help?
// };

const CPInputPassword = ({
  placeholder,
  addonAfter,
  addonBefore,
  defaultValue,
  disabled,
  id,
  maxLength,
  prefix,
  size,
  suffix,
  type,
  value,
  onChange,
  onPressEnter,
  allowClear,
  bordered,
  className,
  hasValidation,
  name,
  rules,
  label,
  hasFeedback,
  tooltip,
  dependencies,
  initialValue,
  validateStatus,
  help,
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
        <Input.Password
          placeholder={placeholder}
          id={id}
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          className={className}
          iconRender={(visible) => (visible ? <RiEyeLine /> : <RiEyeOffLine />)}
          size={size}
          autoComplete="new-password"
        />
      </Item>
    );
  } else {
    return (
      <Input.Password
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
        autoComplete="new-password"
        iconRender={(visible) =>
          visible ? " <RiEyeLine /> " : "<RiEyeOffLine />"
        }
      />
    );
  }
};

export default CPInputPassword;
