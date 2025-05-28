import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { cityServices } from "services/base-Info/cityServices";
import { comboServices } from "services/comboService";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  currentData,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState([]);


  const onFinish = (data) => {
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };


  const GetProvince = async () => {
    const result = await comboServices.getProvince();
    if (result.isSuccess) {
      setProvince(result.data)
    }
    else {
      message.error(result.message);
    }
  };
  const GetData = async () => {
    setLoading(true);
    const result = await cityServices.getById(currentData.id);
    if (result.isSuccess) {

      result.data.status = result.data.isActive;
      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeAction === "edit") {
      GetData();
    }
    GetProvince();

  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"title"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "title" })}:`}
                  placeholder={intl.formatMessage({ id: "title" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"status"}
                  label={`${intl.formatMessage({ id: "status" })}:`}
                  placeholder={intl.formatMessage({ id: "status" })}
                  dataSource={[
                    { value: true, text: intl.formatMessage({ id: "active" }) },
                    { value: false, text: intl.formatMessage({ id: "deactivate" }) },
                  ]}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  label={`${intl.formatMessage({ id: "province" })}:`}
                  hasValidation
                  name={"provinceId"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "province",
                  })}
                  dataSource={province}
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
                    <CPButton
                      type="primary"
                      htmlType="submit"
                      loading={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="addInformation" />
                      </span>
                    </CPButton>
                    <CPButton onClick={onCloseModal} disabled={parentLoading}>
                      <FormattedMessage id="close" />
                    </CPButton>
                  </Space>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default Add;
