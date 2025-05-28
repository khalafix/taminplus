import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea, CPUpload, CPInputNumber, CPEditor, CPCard , CPTooltip
} from "components/CP";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { PlusOutlined , InfoCircleOutlined } from "@ant-design/icons";

// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { comboServices } from "services/comboService";
import { removeEmptyValueObject } from "utils/helpers";
import { orderServices } from "services/catalog/orderServices";

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
  const [data, setdata] = useState({});
  const [orderStatusCombo, setOrderStatusCombo] = useState([]);

  const getPanelTitle = (title) => {

    return title;
  };



  const onFinish = (values) => {

    onSubmit(values);

  };

  const GetOrderStatus = async () => {
    const result = await comboServices.getOrderStatus();
    setOrderStatusCombo(result.data)
  }

  const GetData = async () => {
    setLoading(true);
    const result = await orderServices.getById(currentData.id.toString());
    if (result.isSuccess) {

      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
      setdata(result.data)
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
    GetOrderStatus();
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
                  name={"orderStatus"}
                  label={`${intl.formatMessage({ id: "status" })}:`}
                  placeholder={intl.formatMessage({ id: "status" })}
                  dataSource={orderStatusCombo}

                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={16}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  rows={1}
                  label={`${intl.formatMessage({ id: "remark" })}:`}
                  placeholder={intl.formatMessage({ id: "remark" })}
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
            <Form.List name="items">
              {(fields, { add, remove }) => {
                return (
                  <CPCard bordered >
                    <Row gutter={[8, 8]} className="mb-10">
                      {fields.map((field, index) => (
                        <>
                          <Col xs={24} sm={24} md={24}>

                            <CPPanel
                              header={
                                <>
                                  <Col xs={5} sm={5} md={5} >
                                    {
                                      getPanelTitle(
                                        data && data.items[field.key]?.productName
                                      )
                                    }
                                  </Col>

                                  <Col xs={17} sm={17} md={17} >
                                    <CPInput
                                      name={[index, "id"]}
                                      hasValidation
                                      style={{ display: "none" }}
                                    />
                                  </Col>
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>

                                    <CPTooltip
                                      title={<FormattedMessage id="delete" />}
                                      key={field.name}
                                    >
                                      <span >
                                        <CPButton
                                          shape="circle"
                                          type="primary"
                                          
                                          onClick={() => remove(field.name)}
                                          icon={
                                            <span className="icon-box">
                                              <InfoCircleOutlined />
                                            </span>
                                          }
                                        />
                                      </span>
                                    </CPTooltip>
                                  </div>

                                </>


                              }
                              bordered
                              bodyStyle={{ backgroundColor: "#FAFBFC" }}
                            >
                              <Row
                                key={field.key}
                                gutter={[8, 8]}
                                className="mb-10"
                                style={{ width: "100%" }}
                              >


                                <Col xs={8} sm={8} md={8}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "productName"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "productName" })}:`}
                                    placeholder={intl.formatMessage({ id: "productName" })}
                                    disabled={true}
                                  />
                                </Col>

                                <Col xs={8} sm={8} md={8}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "price"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "price" })}:`}
                                    placeholder={intl.formatMessage({ id: "price" })}
                                    disabled={true}
                                  />
                                </Col>
                                <Col xs={8} sm={8} md={8}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "discountedPrice"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "discountedPrice" })}:`}
                                    placeholder={intl.formatMessage({ id: "discountedPrice" })}
                                    disabled={true}
                                  />
                                </Col>

                                <Col xs={8} sm={8} md={8}>
                                  <CPInput
                                    hasValidation
                                    name={[index, "itemCount"]}
                                    type={"text"}
                                    label={`${intl.formatMessage({ id: "itemCount" })}:`}
                                    placeholder={intl.formatMessage({ id: "itemCount" })}
                                    disabled={true}
                                  />
                                </Col>

                              </Row>
                            </CPPanel>
                          </Col>
                        </>
                      ))}


                    </Row>

                  </CPCard >

                );
              }}
            </Form.List>




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
