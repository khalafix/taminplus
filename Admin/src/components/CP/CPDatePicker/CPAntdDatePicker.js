import React from "react";

import { Form } from "antd";

import { DatePicker as DatePickerJalali } from "antd-jalali";

const { Item } = Form;

const CPDatePicker = ({
  label,
  disabled,
  hasValidation,
  isGregorian,
  name,
  onChange,
  disabledDate,
  placeholder,
  rules,
  showToday = true,
  showToggleButton,
  timePicker,
  value = null,
  hasFeedback,
  tooltip,
  help,
  dependencies,
  initialValue,
  validateStatus,
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
        <DatePickerJalali
          direction="rtl"
          style={{ width: "100%" }}
          disabled={disabled}
          placeholder={placeholder}
          disabledDate={disabledDate}
          showToday={showToday}
        />
      </Item>
    );
  } else {
    return null;
    <DatePickerJalali direction="rtl" />;
  }
};

export default CPDatePicker;
