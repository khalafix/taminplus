import React, { useEffect, useState } from "react";
// UI
import { Col, Form, Row, Space, Spin , message } from "antd";
import { CPButton, CPDivider, CPInput, CPSelect } from "components/CP";
// initial
import { statusRole } from "../initial/treeInit";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// Api
import { userService } from "services/userService";
//API
import { comboServices } from "services/comboService";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  currentData,
  parentLoading,
  onSubmit,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);


  const onSubmitData = (data) => {
    data.organizationLevel =3;
    if (typeAction === "add") {
      data.parentId = currentData?.key;
    }
    onSubmit(data);
  };



  const GetRoleData = async () => {
    setLoading(true);
    const result = await userService.getRoleById(currentData?.key);
    if (result.isSuccess) {
      setLoading(false);
      form.setFieldsValue({
        ...result.data,
      });
    }
    else{
      message.error(result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeAction === "edit") {
      GetRoleData();
    }
  }, []);

  return (
    <div>
      <Form
        form={form}
        name="addrole"
        onFinish={onSubmitData}
        layout="vertical"
      >
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]} style={{ flexDirection: "column" }}>
              {/* category Type */}
              <Col xs={24} sm={12} md={24}>
                <span>{intl.formatMessage({ id: "selectedRole" })}: </span>
                <strong className="selectedRole"> {currentData?.title} </strong>
              </Col>
              <Col xs={24} className="hidden">
                <CPInput hasValidation name={"id"} type={"text"} />
                <CPInput hasValidation name={"parentId"} type={"text"} />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CPInput
                  label={`${intl.formatMessage({ id: "code" })}:`}
                  hasValidation
                  name={"code"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "code" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CPInput
                  label={`${intl.formatMessage({ id: "originalTitle" })}:`}
                  hasValidation
                  name={"roleName"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "originalTitle" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CPInput
                  label={`${intl.formatMessage({ id: "shortTitle" })}:`}
                  hasValidation
                  name={"title"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "shortTitle" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24}>
                <CPSelect
                  hasValidation
                  name={"isActive"}
                  label={`${intl.formatMessage({ id: "status" })}:`}
                  placeholder={intl.formatMessage({ id: "status" })}
                  dataSource={statusRole}
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
                <Col span={24}>
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
