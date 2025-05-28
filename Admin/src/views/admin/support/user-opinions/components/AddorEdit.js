import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea,
  CPCard,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { userOpinionsServices } from "services/support/userOpinionsServices";
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
  const [showStatus, setShowStatus] = useState([]);

  const [data, setData] = useState({});

  const onFinish = (data) => {
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };



  const GetShowStatus = async () => {
    const result = await comboServices.getShowStatus();

    setShowStatus(result.data)
  };

  const GetData = async () => {
    setLoading(true);
    const result = await userOpinionsServices.getById(currentData.id);
    if (result.isSuccess) {

      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
      setData(result.data)
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (typeAction === "edit") {
      GetData();
    }
    GetShowStatus();
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
                <CPSelect
                  hasValidation
                  name={"showStatus"}
                  label={`${intl.formatMessage({ id: "status" })}:`}
                  placeholder={intl.formatMessage({ id: "status" })}
                  dataSource={showStatus}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"senderUser"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "senderUser" })}:`}
                  placeholder={intl.formatMessage({ id: "senderUser" })}
                  disabled={true}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"shamsiCreateDate"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "createDate" })}:`}
                  placeholder={intl.formatMessage({ id: "createDate" })}
                  disabled={true}
                />
              </Col>

              <Col xs={24} sm={24} md={24}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  type={"text"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "remark" })}:`}
                  placeholder={intl.formatMessage({ id: "remark" })}
                  disabled={true}
                />
              </Col>




            </Row>

            {
              data?.positiveOpinions?.length > 0 ?
                <>
                  <CPCard headStyle={{ backgroundColor: "rgb(184 241 123)" }} title={`${intl.formatMessage({ id: "positiveOpinions" })}`} bordered className={"mb-20 mt-10"}>
                    <Form.List name="positiveOpinions">
                      {(fields, { add, remove }) => {
                        return (
                          <Row gutter={[8, 8]} className="mb-10">
                            {fields.map((field, index) => (
                              <Row
                                key={field.key}
                                gutter={[8, 8]}
                                className="mb-10"
                                style={{ width: "100%" }}
                              >
                                <Col xs={23} sm={23} md={23}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "text"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "title" })}:`}
                                    placeholder={intl.formatMessage({ id: "title" })}
                                    disabled={true}
                                  />
                                </Col>

                              </Row>
                            ))}

                          </Row>
                        );
                      }}
                    </Form.List>
                  </CPCard>

                </> : null
            }

            {
              data?.negativeOpinions?.length > 0 ?
                <>

                  <CPCard headStyle={{ backgroundColor: "rgb(255 76 93)" }} title={`${intl.formatMessage({ id: "negativeOpinions" })}`} bordered className={"mb-20 mt-10"}>
                    <Form.List name="negativeOpinions">
                      {(fields, { add, remove }) => {
                        return (
                          <Row gutter={[8, 8]} className="mb-10">
                            {fields.map((field, index) => (
                              <Row
                                key={field.key}
                                gutter={[8, 8]}
                                className="mb-10"
                                style={{ width: "100%" }}
                              >
                                <Col xs={23} sm={23} md={23}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "text"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "title" })}:`}
                                    placeholder={intl.formatMessage({ id: "title" })}
                                    disabled={true}
                                  />
                                </Col>

                              </Row>
                            ))}

                          </Row>
                        );
                      }}
                    </Form.List>
                  </CPCard>
                </>
                : null}



            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={parentLoading}
                      disabled={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="addInformation" />
                      </span>
                    </Button>
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
