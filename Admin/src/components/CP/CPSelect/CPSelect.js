import React from "react";
import { Select, Form } from "antd";

export const CPOption = Select.Option;
const { Item } = Form;
// type PropTypes = {
//   dataSource?  <{ value  , text   }>,
//   onChange?  ,
//   onSearch?  ,
//   onBlur?  ,
//   showSearch?  ,
//   value?: Node,
//   disabled?  ,
//   hasValidation?  ,
//   initialValue  ,
//   label?: Node | string,
//   inline?  ,
//   placeholder?  ,
//   optionFilterProp?  ,
//   title?  ,
//   className?  ,
//   name?  ,
//   size?  ,
//   mode?  ,
//   dropdownStyle?  ,
//   dropdownClassName?  ,
//   rules  ,
//   help?  ,
//   hasFeedback?  ,
//   loading?  ,
//   filterOption?   | Function,
//   dependencies?  ,
//   tooltip?: Node,
//   validateStatus?: "success" | "warning" | "error" | "validating"
// };

const CPSelect = ({
  dataSource,
  onChange,
  onSearch,
  onFocus,
  onMouseLeave,
  onBlur,
  showSearch = true,
  value,
  disabled = false,
  placeholder,
  name,
  labelInValue,
  hasValidation,
  optionLabelProp,
  label,
  size = "default",
  mode = "default",
  dropdownStyle,
  dropdownClassName,
  rules,
  errors,
  errorMessage,
  optionFilterProp,
  onPopupScroll,
  filterOption,
  loading,
  hasFeedback,
  dependencies,
  tooltip,
  validateStatus,
  help,
  initialValue,
  options,
  style,
  defaultValue,
  allowClear,
}) => {
  const children = dataSource?.map((option) => (
    <CPOption key={option.value} value={option.value} label={option.text}>
      {option.text}
    </CPOption>
  ));
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
        <Select
          style={{ width: "100%" }}
          showSearch={showSearch}
          onChange={onChange}
          disabled={disabled}
          name={name}
          optionLabelProp={optionLabelProp}
          onSearch={onSearch}
          onFocus={onFocus}
          options={options}
          allowClear={allowClear}
          labelInValue={labelInValue}
          onMouseLeave={onMouseLeave}
          optionFilterProp={optionFilterProp}
          onPopupScroll={onPopupScroll}
          onBlur={onBlur}
          placeholder={placeholder}
          size={size}
          mode={mode}
          filterOption={(input, option) => option.children.toLowerCase()?.includes(input?.toLowerCase())}
          loading={loading}
          dropdownStyle={dropdownStyle}
          dropdownClassName={dropdownClassName}
        >
          {children}
        </Select>
      </Item>
    );
  } else {
    return (
      <Select
        style={{ width: "100%" }}
        showSearch={showSearch}
        onChange={onChange}
        onSearch={onSearch}
        optionLabelProp={optionLabelProp}
        onFocus={onFocus}
        options={options}
        allowClear={allowClear}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        name={name}
        labelInValue={labelInValue}
        onBlur={onBlur}
        value={value || null}
        placeholder={placeholder}
        size={size}
        mode={mode}
        dropdownStyle={dropdownStyle}
        optionFilterProp={optionFilterProp}
        filterOption={(input, option) => option.children.toLowerCase()?.includes(input?.toLowerCase())}
        loading={loading}
        dropdownClassName={dropdownClassName}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    );
  }
};

export default CPSelect;
