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
import { socialMediaServices } from "services/base-Info/socialMediaServices";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import { removeEmptyValueObject } from "utils/helpers";
import { cooperationFormServices } from "services/support/cooperationFormServices";
import { contactFormServices } from "services/support/contactFormServices";
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

  const [loading, setLoading] = useState(false);



  const GetData = async () => {
    setLoading(true);

    const result = await contactFormServices.getById(currentData.id);
    if (result.isSuccess) {


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

      GetData();
  
  }, []);

  const styleTextArea = {
    direction: "ltr"
  }

  return (
    <div>
      <Form form={form} name="addoredit" layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]} className="mb-20">

              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  disabled={true}
                  name={"fullName"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "fullName" })}:`}
                  placeholder={intl.formatMessage({ id: "fullName" })}
                  rules={[
                    {
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>


              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  disabled={true}

                  name={"phoneNumber"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "phoneNumber" })}:`}
                  placeholder={intl.formatMessage({ id: "phoneNumber" })}
                  rules={[
                    {
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  disabled={true}

                  name={"email"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "email" })}:`}
                  placeholder={intl.formatMessage({ id: "email" })}
                  rules={[
                    {
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"subject"}
                  type={"text"}
                  disabled={true}

                  label={`${intl.formatMessage({ id: "subject" })}:`}
                  placeholder={intl.formatMessage({ id: "subject" })}
                  rules={[
                    {
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>


              <Col xs={24} sm={12} md={16}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  type={"text"}
                  disabled={true}

                  rows={3}
                  label={`${intl.formatMessage({ id: "remark" })}:`}
                  placeholder={intl.formatMessage({ id: "remark" })}
                  rules={[
                    {
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              {
                data?.file?.length > 0 ?
                <Col xs={24} sm={12} md={8}>
    


                    <GenrateLinkUploader
                      items={
                        data.file
                      }
                      label={intl.formatMessage({
                        id: "fileUploded",
                      })}
                    />

                  </Col>
                  : null
              }
            </Row>







            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>

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
