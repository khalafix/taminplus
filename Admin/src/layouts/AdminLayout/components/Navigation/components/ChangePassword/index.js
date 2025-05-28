import React from "react";

import { Row, Col, Space, Form } from "antd";
import { CPButton, CPInput, CPInputPassword } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";

// Helpers

const { useForm } = Form;

const Index = ({ loading, onSubmit, onCloseModal }) => {
  const intl = useIntl();
  const [form] = useForm();

  const onFinish = async (data) => {
    onSubmit(data);
  };

  return (
    <div>
      <Form form={form} name="addGroups" onFinish={onFinish} layout="vertical">
        <Row>
          {/*  <Col xs={24} sm={12} md={16}>
            <CPInput
              hasValidation
              name={'username'}
              type={'text'}
              label={`${intl.formatMessage({ id: 'userName' })}:`}
              placeholder={intl.formatMessage({ id: 'userName' })}
              disabled
              initialValue={username}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />
                }
              ]}
            />
          </Col> */}

          <Col xs={24} sm={12} md={24}>
            <CPInputPassword
              hasValidation
              name={"oldPassword"}
              type={"text"}
              label={`${intl.formatMessage({ id: "oldPassword" })}:`}
              placeholder={intl.formatMessage({ id: "oldPassword" })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={24}>
            <CPInputPassword
              hasValidation
              name={"password"}
              type={"text"}
              label={`${intl.formatMessage({ id: "newPassword" })}:`}
              placeholder={intl.formatMessage({ id: "newPassword" })}
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

          <Col xs={24} sm={12} md={24}>
            <CPInputPassword
              hasValidation
              dependencies={["password"]}
              hasFeedback
              name={"confirmPassword"}
              type={"text"}
              label={`${intl.formatMessage({ id: "newConfirmPassword" })}:`}
              placeholder={intl.formatMessage({ id: "newConfirmPassword" })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      intl.formatMessage({ id: "errorMessageNotMatchPassword" })
                    );
                  },
                }),
              ]}
            />
          </Col>
        </Row>
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

export default Index;
