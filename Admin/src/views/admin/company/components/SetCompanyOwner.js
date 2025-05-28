import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form } from "antd";
import { CPButton, CPInput, CPDivider, CPInputPassword, CPSelect, CPTextArea } from "components/CP";
import { companyServices } from "services/companyServices";
import { userService } from "services/userService";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const { useForm } = Form;

const SetCompanyOwner = ({ onCloseModal, loading, onSubmit, currentData }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [comboData, setComboData] = useState([]);
  const [userData, setUserData] = useState({});

  const onFinish = (data) => {

    onSubmit({ userId: data.userId, companyId: currentData.id });

  };


  useEffect(() => {

    (async () => {
      await getUsers();
      await changeUser(currentData.ownerUserId);
    })();
  }, []);
  const getUsers = async () => {
    const result = await userService.getUsersInfoForCombo();
    setComboData(result);

  };
  const changeUser = async (el) => {
    
    let user = comboData?.find(f => f.value == el);
    if (user) {

      form.setFieldsValue({
        ...user,
      });
    }
    else {
      const result = await userService.getUsersInfoForCombo();
      let user = result?.find(f => f.value == el);
      user.userId = el;
      form.setFieldsValue({
        ...user,
      });
    }

  };

  return (
    <div>
      <Form form={form} name="SetCompanyOwner" onFinish={onFinish} layout="vertical">
        <Row>
          <Col xs={24} sm={12} md={24}>
            <CPSelect
              hasValidation
              name={"userId"}
              label={`${intl.formatMessage({ id: "listUsers" })}:`}
              placeholder={intl.formatMessage({ id: "listUsers" })}
              dataSource={
                comboData
              }
              onChange={(el) => changeUser(el)}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>

        </Row>

        <Row gutter={[8, 8]} style={{ marginTop: "2%" }}>

          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"userName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "userName" })}:`}
              placeholder={intl.formatMessage({ id: "userName" })}
              disabled={true}

            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"firstName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "firstName" })}:`}
              placeholder={intl.formatMessage({ id: "firstName" })}
              disabled={true}

            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"lastName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "lastName" })}:`}
              placeholder={intl.formatMessage({ id: "lastName" })}
              disabled={true}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"isActiveTitle"}
              type={"text"}
              label={`${intl.formatMessage({ id: "status" })}:`}
              placeholder={intl.formatMessage({ id: "status" })}
              disabled={true}
            />

          </Col>


          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"email"}
              type={"text"}
              label={`${intl.formatMessage({ id: "email" })}:`}
              placeholder={intl.formatMessage({ id: "email" })}
              disabled={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"sexTitle"}
              type={"text"}
              label={`${intl.formatMessage({ id: "sex" })}:`}
              placeholder={intl.formatMessage({ id: "sex" })}
              disabled={true}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"phoneNumber"}
              type={"text"}
              label={`${intl.formatMessage({ id: "phoneNumber" })}:`}
              placeholder={intl.formatMessage({ id: "phoneNumber" })}
              disabled={true}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <CPInput
              hasValidation
              name={"userTypeTitle"}
              type={"text"}
              label={`${intl.formatMessage({ id: "userType" })}:`}
              placeholder={intl.formatMessage({ id: "userType" })}
              disabled={true}
            />

          </Col>
          <Col xs={24} sm={12} md={24}>
            <CPTextArea
              rows={5}
              hasValidation
              name={"rolesName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "disciplines" })}:`}
              placeholder={intl.formatMessage({ id: "disciplines" })}
              disabled={true}
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

export default SetCompanyOwner;
