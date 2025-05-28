import React, { useState, useEffect } from "react";
import { Row, Col, Space, Tooltip, Form } from "antd";
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
import { organizationUnitService } from "services/organizationUnitService";
import { comboServices } from "services/comboService";
// Helpers

const { useForm } = Form;

const Add = ({ onCloseModal, loading, onSubmit, currentData, typeAction }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [rolesList, setRolesList] = useState([]);
  const [comboDataSet, setComboDataSet] = useState({});
  const [loadingRole, setLoadingRole] = useState(false);

  const getComboDataSet = async () => {
    const result = await comboServices.getIndexTemplateCombo();
    setComboDataSet(result);
  };

  const GetProjectData = async () => {
    setLoadingRole(true);
    const result = await organizationUnitService.get(currentData.id);
    if (result.isSuccess) {
      form.setFieldsValue({
        ...result.data,
      });
      setLoadingRole(false);
    }
  };

  const onFinish = (data) => {
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };

  useEffect(() => {
    getComboDataSet();
    if (typeAction === "edit") {
      GetProjectData();
    }
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <CPInput
              hasValidation
              name={"code"}
              type={"text"}
              label={`${intl.formatMessage({ id: "code" })}:`}
              placeholder={intl.formatMessage({ id: "code" })}
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
              name={"disciplines"}
              tokenSeparators={[","]}
              /* onPopupScroll={onPopupScroll} */
              showSearch
              mode="tags"
              label={`${intl.formatMessage({ id: "sections" })}:`}
              placeholder={intl.formatMessage({ id: "sections" })}
              dataSource={comboDataSet.discpilines}
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

          <Col xs={24} sm={12} md={16}>
            <CPTextArea
              label={`${intl.formatMessage({ id: "description" })}:`}
              hasValidation
              initialValue={""}
              name={"description"}
              placeholder={intl.formatMessage({ id: "description" })}
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
