import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPInputPassword,
  CPTreeSelect,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { userService } from "services/userService";
import { comboServices } from "services/comboService";
const { useForm } = Form;

const Add = ({ onCloseModal, loading, onSubmit, currentData, typeAction }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [rolesList, setRolesList] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const GetRoles = async () => {
    const result = await userService.getRoles();
    if (result.isSuccess) {
      setRolesList(result.data);
    }
  };


  // const GetUserTypes = async () => {
  //   const result = await comboServices.getUserTypes();

  //   setUserTypes(result);
  // };


  const GetUserData = async () => {
    const result = await userService.getuserbyId(currentData.id);

    if (result.isSuccess) {
      form.setFieldsValue({
        ...result.data,
      });
    }
  };

  
  const onFinish = (data) => {
    data.userType=2;
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };

  useEffect(() => {
    GetRoles();
    // GetUserTypes();
    // getComboDataSet();
    if (typeAction === "edit") {
      GetUserData();
    }
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={12}>
            <CPInput
              hasValidation
              name={"userName"}
              type={"email"}
              label={`${intl.formatMessage({ id: "emailUserName" })}:`}
              placeholder={intl.formatMessage({ id: "userName" })}
              rules={[
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: <FormattedMessage id="errorMessageNotValidEmail" />,
                },
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"firstName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "firstName" })}:`}
              placeholder={intl.formatMessage({ id: "firstName" })}
              rules={[
                {
                  pattern: /^([^<>%\-@+$|='"0-9]*$)$/,
                  message: (
                    <FormattedMessage id="errorMessageNotValidUserName" />
                  ),
                },
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"lastName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "lastName" })}:`}
              placeholder={intl.formatMessage({ id: "lastName" })}
              rules={[
                {
                  pattern: /^([^<>%\-@+$|='"0-9]*$)$/,
                  message: (
                    <FormattedMessage id="errorMessageNotValidUserName" />
                  ),
                },
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>

          {/* <Col xs={24} sm={12} md={8}>
            <CPInput
              hasValidation
              name={"phoneNumber"}
              type={"text"}
              label={`${intl.formatMessage({ id: "mobile" })}:`}
              placeholder={intl.formatMessage({ id: "mobile" })}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col> */}
          <Col xs={24} sm={12} md={8}>
            <CPSelect
              hasValidation
              name={"sex"}
              label={`${intl.formatMessage({ id: "sex" })}:`}
              placeholder={intl.formatMessage({ id: "sex" })}
              dataSource={[
                { value: 1, text: <FormattedMessage id="male" /> },
                { value: 2, text: <FormattedMessage id="female" /> },
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
              hasValidation
              name={"isActive"}
              label={`${intl.formatMessage({ id: "status" })}:`}
              placeholder={intl.formatMessage({ id: "status" })}
              initialValue={true}
              dataSource={[
                { value: true, text: <FormattedMessage id="active" /> },
                { value: false, text: <FormattedMessage id="deactivate" /> },
              ]}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
          {/* <Col xs={24} sm={12} md={8}>
            <CPSelect
              hasValidation
              name={"userType"}
              label={`${intl.formatMessage({ id: "userType" })}:`}
              placeholder={intl.formatMessage({ id: "userType" })}
              dataSource={userTypes}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col> */}
          {typeAction === "add" && (
            <>
              <Col xs={24} sm={12} md={8}>
                <CPInputPassword
                  hasValidation
                  name={"password"}
                  type={"text"}
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
              <Col xs={24} sm={12} md={8}>
                <CPInputPassword
                  hasValidation
                  dependencies={["password"]}
                  hasFeedback
                  name={"confirmPassword"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "confirmPassword" })}:`}
                  placeholder={intl.formatMessage({ id: "confirmPassword" })}
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
                          intl.formatMessage({
                            id: "errorMessageNotMatchPassword",
                          })
                        );
                      },
                    }),
                  ]}
                />
              </Col>
            </>
          )}
          <Col xs={24} sm={24} md={24}>
            <CPTreeSelect
              label={`${intl.formatMessage({ id: "roles" })}:`}
              hasValidation
              name={"roles"}
              placeholder={intl.formatMessage({ id: "roles" })}
              allowClear
              showSearch
              optionFilterProp="children"
              // treeDefaultExpandAll
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={rolesList}
              multiple={true}
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

export default Add;
