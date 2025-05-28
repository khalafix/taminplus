import React, { useState, useEffect } from "react";

import { Form } from "antd";
import jalaliday from 'jalali-plugin-dayjs'

import { DatePicker } from "zaman";
import dayjs from "dayjs";


const { Item } = Form;
// 

dayjs.extend(jalaliday)
dayjs.calendar('jalali')

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
        <Converter disabled={disabled} showToday={showToday} placeholder={placeholder}/>
      </Item>
    );
  } else {
    return null;
    // <DatePickerJalali direction="rtl" />;
  }
};


const Converter = ({value, onChange , disabled , showToday , placeholder}) => {
    const [showDate, setShowDate] = useState(false);
  
  return (
    <DatePicker
    show={true}
    defaultValue={value ==null ? undefined :value}
  
    onChange={(e)=>{
      
      setShowDate(prev=>!prev)
      onChange(dayjs(e.value , { jalali: true }))
    }}
    
    accentColor="#1890ff"
    direction="rtl"
    disabled={disabled}
    // show={showToday}
    inputAttributes={{
      disabled: disabled, placeholder: placeholder,
      style: { width: "100%" },
      
      onSelect:()=>{
        
        setShowDate(true)

      }
    }}
    inputClass={"ant-input ant-input-rtl"}
    className={ ` zaman-date-picker ${showDate ==false && "d-none" }` }
  // showToday={showToday}

  />
  )
}


export default CPDatePicker;
