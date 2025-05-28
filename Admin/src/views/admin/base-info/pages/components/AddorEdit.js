import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPTreeSelect,
  CPTextArea, CPUpload, CPSelect, CPEditor, CPDatePicker
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
//Helpers

import { pageServices } from "services/base-Info/pageServices";
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
  const [data, setData] = useState({});
  const [positionPlaceCombo, setpositionPlace] = useState([]);
  const [pagesLinkTypesCombo, setPagesLinkTypesCombo] = useState([]);

  const [loading, setLoading] = useState(false);

  const onFinish = (data) => {

    if (typeAction === "edit") {
      data.id = currentData.id;
      onSubmit(data);
    } else {
      onSubmit(data);
    }
  };

  const GetPagesLinkTypes = async () => {
    const res = await comboServices.getPagesLinkTypes();
    setPagesLinkTypesCombo(res);
  }

  const GetData = async () => {
    setLoading(true);

    const result = await pageServices.getById(currentData.id);
    if (result.isSuccess) {

      result.data.pagesLinkType= result.data.pagesLinkType==0 ? null : result.data.pagesLinkType ;
      form.setFieldsValue({
        ...result.data,
      });
      setData(result.data);
      setLoading(false);
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
    GetPagesLinkTypes();
  }, []);

  const styleTextArea = {
    direction: "ltr"
  }

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]} className="mb-20">

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
                <CPInput
                  hasValidation
                  name={"sortOrder"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "sortOrder" })}:`}
                  placeholder={intl.formatMessage({ id: "sortOrder" })}
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
                  name={"pagesLinkType"}
                  label={`${intl.formatMessage({ id: "pagesLinkType" })}:`}
                  placeholder={intl.formatMessage({ id: "pagesLinkType" })}
                  dataSource={pagesLinkTypesCombo}
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
              <Col xs={8} sm={8} md={8}>
                <CPTextArea
                  hasValidation
                  name={"link"}
                  rows={1}
                  style={styleTextArea}
                  label={`${intl.formatMessage({ id: "link" })}:`}
                  placeholder={intl.formatMessage({ id: "link" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
            </Row>

            <Row gutter={[8, 8]} className="mb-20">
              <Col xs={24} sm={24} md={24}>
                <CPEditor
                  label={`${intl.formatMessage({
                    id: "remark",
                  })}:`}
                  rows={10}
                  name={"description"}
                  placeholder={intl.formatMessage({
                    id: "remark",
                  })}
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
