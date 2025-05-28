import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Popconfirm } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea,
  CPEditor
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { emailTemplateService } from "services/base-Info/emailTemplateService";
import { comboServices } from "services/comboService";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  parentLoading,
  onSubmit,
  currentData,
  typeAction,
  duplicateEmailRow,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [templateType, setTemplateType] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hasDuplicateRow, setHasDuplicateRow] = useState(false);

  const getTemplateTypes = async () => {
    const result = await emailTemplateService.getTemplateTypes();
    setTemplateType(result);
  };

  const getProjects = async () => {
    const result = await comboServices.getProjects();
    setProjects(result);
  };


  const onFinish = (data) => {
    if(hasDuplicateRow){
      duplicateEmailRow(data);
    } else {
      if (typeAction === "edit") {
        onSubmit({ ...data, id: currentData.id });
      } else {
        onSubmit(data);
      }
    }
  };

  const getData = async () => {
    setLoading(true);
    const result = await emailTemplateService.getById(currentData.id);
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
    getTemplateTypes();
    getProjects();
    if (typeAction === "edit") {
      getData();
    }
  }, []);

  const duplicateRow = () => {
    setHasDuplicateRow(true);
    form.submit();
  }


  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24}>
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
            </Row>
            <Row>
              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"emailTemplateType"}
                  label={`${intl.formatMessage({ id: "emailTemplateType" })}:`}
                  placeholder={intl.formatMessage({ id: "emailTemplateType" })}
                  dataSource={templateType}
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
                  name={"projectId"}
                  label={`${intl.formatMessage({ id: "project" })}:`}
                  placeholder={intl.formatMessage({ id: "project" })}
                  dataSource={projects}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"isActive"}
                  label={`${intl.formatMessage({ id: "isActive" })}:`}
                  placeholder={intl.formatMessage({ id: "isActive" })}
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
            </Row>
            <Row>
            <Col xs={24} sm={12} md={24}>
                <CPTextArea
                  hasValidation
                  name={"emailCC"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "emailCC" })}:`}
                  placeholder={"test@gmail.com,test2@gmail.com"}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="emailCC" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CPEditor
                  hasValidation
                  rows={30}
                  name={"template"}
                  label={`${intl.formatMessage({ id: "template" })}:`}
                  placeholder={intl.formatMessage({ id: "template" })}
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
                    <Popconfirm
                key={currentData.id}
                title={`${intl.formatMessage({ id: "duplicateMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => duplicateRow()}
              >
                    <CPButton
                      danger
                      htmlType="button"
                      loading={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="duplicate" />
                      </span>
                    </CPButton>
                    </Popconfirm>
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
