import React, {useEffect} from "react";

import { Row, Col, Space, Form, message } from "antd";
import { CPButton, CPInput, CPEditor } from "components/CP";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { userService } from "services/userService";

// Helpers

const { useForm } = Form;

const Index = ({ loading, onSubmit, onCloseModal }) => {
  const intl = useIntl();
  const [form] = useForm();

  const onFinish = async (data) => {
    onSubmit(data);
  };

  useEffect(() => {
       getUserEmailSinuature();
  }, [])

  const getUserEmailSinuature = async() => {

     const result = await userService.getEmailSignuature();
     if(result.isSuccess){
      form.setFieldsValue({emailSignuature:result.data});
     } else {
      message.error(result.message);
     }
  }

  return (
    <div>
      <Form form={form} name="addGroups" onFinish={onFinish} layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24}>
            <CPEditor
              hasValidation
              rows={30}
              name={"emailSignuature"}
              label={`${intl.formatMessage({ id: "emailSignuature" })}:`}
              placeholder={intl.formatMessage({ id: "emailSignuature" })}
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
