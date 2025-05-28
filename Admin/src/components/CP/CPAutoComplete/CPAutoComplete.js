import React from 'react'
import { AutoComplete, Form } from 'antd'

const { Item } = Form
const { Option } = AutoComplete
// type PropTypes = {
//   allowClear?  ,
//   backfill?  ,
//   defaultActiveFirstOption?  ,
//   defaultOpen?  ,
//   defaultValue?  ,
//   disabled?  ,
//   dropdownClassName?  ,
//   dropdownMatchSelectWidth?   | number,
//   filterOption?  ,
//   hasValidation?  ,
//   notFoundContent?  ,
//   onBlur?  ,
//   onChange?  ,
//   onDropdownVisibleChange?  ,
//   onFocus?  ,
//   onSearch?  ,
//   open?  ,
//   options?  <OptionTypes>,
//   placeholder?  ,
//   value?  ,
//   label?   | Node,
//   name?  ,
//   rules?  ,
//   hasFeedback?  ,
//   dependencies?  ,
//   initialValue?  ,
//   tooltip?: Node,
//   help?  ,
//   validateStatus?: "success" | "warning" | "error" | "validating"
// };
// type OptionTypes = { value  , label   };

const CPAutoComplete = ({
  allowClear,
  backfill,
  defaultActiveFirstOption,
  defaultOpen,
  defaultValue,
  disabled,
  dropdownClassName,
  dropdownMatchSelectWidth,
  filterOption,
  hasValidation,
  notFoundContent,
  onBlur,
  onChange,
  onDropdownVisibleChange,
  onFocus,
  onSearch,
  open,
  options,
  placeholder,
  value,
  label,
  name,
  rules,
  hasFeedback,
  dependencies,
  initialValue,
  tooltip,
  help,
  validateStatus
}) => {
  const children = options?.map((option) => {
    return (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    )
  })

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
        <AutoComplete
          allowClear={allowClear}
          backfill={backfill}
          defaultActiveFirstOption={defaultActiveFirstOption}
          defaultOpen={defaultOpen}
          defaultValue={defaultValue}
          disabled={disabled}
          dropdownClassName={dropdownClassName}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          filterOption={filterOption}
          hasValidation={hasValidation}
          notFoundContent={notFoundContent}
          onBlur={onBlur}
          onDropdownVisibleChange={onDropdownVisibleChange}
          onFocus={onFocus}
          onSearch={onSearch}
          open={open}
          onChange={onChange}
          placeholder={placeholder}
        >
          {children}
        </AutoComplete>
      </Item>
    )
  } else {
    return (
      <AutoComplete
        onChange={onChange}
        allowClear={allowClear}
        backfill={backfill}
        defaultActiveFirstOption={defaultActiveFirstOption}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={disabled}
        dropdownClassName={dropdownClassName}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        filterOption={filterOption}
        hasValidation={hasValidation}
        notFoundContent={notFoundContent}
        onBlur={onBlur}
        onDropdownVisibleChange={onDropdownVisibleChange}
        onFocus={onFocus}
        onSearch={onSearch}
        open={open}
        placeholder={placeholder}
      >
        {children}
      </AutoComplete>
    )
  }
}

export default CPAutoComplete
