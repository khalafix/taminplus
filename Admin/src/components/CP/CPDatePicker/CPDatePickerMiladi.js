import React from "react";

import { Form } from "antd";

import { DatePicker, Space } from 'antd';

const { Item } = Form;

const CPDatePickerMiladi = ({
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
  defaultPickerValue,
}) => {
  if (hasValidation) {
    return (
      <Item
        dependencies={dependencies}
        hasFeedback={hasFeedback}
        help={help}
        label={label}
        name={name}
        rules={rules}
        tooltip={tooltip}
        validateStatus={validateStatus}
        initialValue={initialValue}
        defaultPickerValue={defaultPickerValue}
        value={value}
      >
        <DatePicker 
          direction="ltr"
          style={{ width: "100%" }}
          disabled={disabled}
          placeholder={placeholder}
          disabledDate={disabledDate}
          showToday={showToday}
          defaultPickerValue={defaultPickerValue}
        />
      </Item>
    );
  } else {
    return null;
    <DatePicker direction="rtl" />;
  }
};

export default CPDatePickerMiladi;
