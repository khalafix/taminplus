import React from "react";
import { Row, Col, Input, Form } from "antd";
import iconMap from "utils/iconMap";

const { Item } = Form;

const CPCaptcha = ({
  captchaUrl,
  captchaKeyName = "captchaKey",
  captchaKeyValue,
  resetCaptcha,
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
  return (
    <Row>
      <Col>
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
            style={{
              border: "none",
              backgroundColor: "white",
              fontWeight: "bold",
            }}
            name={name}
          />
        </Item>
      </Col>
      <Col>
        <img style={{ paddingTop: "30px" }} src={captchaUrl} width="100" />
        <Item
          initialValue={captchaKeyValue}
          name={captchaKeyName}
          value={captchaKeyValue}
        >
          <Input
            style={{ display: "none" }}
            hasValidation
            name={captchaKeyName}
            value={captchaKeyValue}
            defaultValue={captchaKeyValue}
            type="hidden"
          />
        </Item>
      </Col>
      <Col>
        <span onClick={resetCaptcha} className="captcha-refresh-icon">
          {iconMap["refresh"]}
        </span>
      </Col>
    </Row>
  );
};

export default CPCaptcha;
