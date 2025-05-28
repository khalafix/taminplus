import React from "react";
import { Switch, Form } from "antd";
const { Item } = Form;
// type PropTypes = {
//   checked?  ,
//   checkedChildren?   | Node,
//   defaultChecked?  ,
//   disabled?  ,
//   loading?  ,
//   size?  ,
//   unCheckedChildren?   | Node,
//   onChange?  ,
//   onClick?  ,
//   className?  ,
//   placeholder?  ,
//   hasFeedback?  ,
//   rules?  ,
//   initialValue?  ,
//   tooltip?: Node,
//   help?  ,
//   label?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating",
//   hasValidation?  ,
//   name?
// };

const CPSwitch = ({
  checked,
  checkedChildren,
  defaultChecked,
  disabled,
  loading,
  size,
  unCheckedChildren,
  hasValidation,
  onChange,
  onClick,
  className,
  placeholder,
  label,
  hasFeedback,
  help,
  rules,
  tooltip,
  initialValue,
  validateStatus,
  name,
}) => {
  if (hasValidation) {
    return (
      <Item
        hasFeedback={hasFeedback}
        help={help}
        initialValue={initialValue}
        label={label}
        name={name}
        rules={rules}
        tooltip={tooltip}
        validateStatus={validateStatus}
        valuePropName="checked"
      >
        <Switch
          placeholder={placeholder}
          checked={checked}
          checkedChildren={checkedChildren}
          defaultChecked={defaultChecked}
          disabled={disabled}
          loading={loading}
          name={name}
          size={size}
          unCheckedChildren={unCheckedChildren}
          onChange={onChange}
          onClick={onClick}
          className={className}
        />
      </Item>
    );
  } else {
    return (
      <Switch
        checked={checked}
        checkedChildren={checkedChildren}
        defaultChecked={defaultChecked}
        disabled={disabled}
        loading={loading}
        size={size}
        unCheckedChildren={unCheckedChildren}
        onChange={onChange}
        onClick={onClick}
        className={className}
      />
    );
  }
};

export default CPSwitch;
