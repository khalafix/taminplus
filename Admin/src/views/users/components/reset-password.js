import React from "react";
import { Row, Col, Space, Form } from "antd";
import { CPButton, CPInput, CPDivider, CPInputPassword } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const { useForm } = Form;

const ResetPassword = ({ onCloseModal, loading, onSubmit, currentData }) => {
  const intl = useIntl();
  const [form] = useForm();

  const onFinish = (data) => {
    const { password } = data;
    onSubmit({ userId: currentData.id, password });
  };

  return (
    <div>
      <Form form={form} name="addUser" onFinish={onFinish} layout="vertical">
        <Row>
          <Col xs={24} sm={12} md={24}>
            <CPInput
              hasValidation
              name={"username"}
              type={"text"}
              label={`${intl.formatMessage({ id: "userName" })}:`}
              placeholder={intl.formatMessage({ id: "userName" })}
              initialValue={currentData.userName}
              disabled
            />
          </Col>

          <Col xs={24} sm={12} md={24}>
            <CPInputPassword
              hasValidation
              name={"password"}
              type={"text"}
              allowClear={true}
              label={`${intl.formatMessage({ id: "password" })}:`}
              placeholder={intl.formatMessage({ id: "password" })}
              rules={[
                {
                  pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
                  message: (
                    <FormattedMessage id="errorMessageNotComplexPassword" />
                  ),
                },
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
        </Row>
        <CPDivider />
        <div className="footer-modal">
          <Row>
            <Col span={12}>
              <Space>
                <CPButton type="primary" htmlType="submit" loading={loading}>
                  <span>
                    <FormattedMessage id="addInformation" />
                  </span>
                </CPButton>
                <CPButton onClick={onCloseModal} disabled={loading}>
                  <FormattedMessage id="close" />
                </CPButton>
              </Space>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
