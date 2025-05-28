import React from "react";
import { CPDatePicker, CPButton, CPDivider } from "components/CP";
//UI
import { Form, Row, Col, Space } from "antd";
// Message
import { useIntl, FormattedMessage } from "react-intl";
const { useForm } = Form;
const DurationDatePicker = ({ onSubmit, onCloseModal }) => {
  const intl = useIntl();
  const [form] = useForm();

  const onSubmitData = (data) => {
    onSubmit(data);
  };
  return (
    <div>
      <Form
        form={form}
        name="selectDate"
        onFinish={onSubmitData}
        layout="vertical"
      >
        <Row gutter={[8, 8]} className="mb-10">
          <Col xs={24} sm={12} md={24}>
            <CPDatePicker
              hasValidation
              showToday={true}
              name={"time"}
              rules={[
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
                <CPButton type="primary" htmlType="submit">
                  <span>
                    <FormattedMessage id="view" />
                  </span>
                </CPButton>
                <CPButton onClick={onCloseModal} type={"default"}>
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

export default DurationDatePicker;
