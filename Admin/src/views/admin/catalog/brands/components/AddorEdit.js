import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea, CPUpload, CPInputNumber, CPEditor
} from "components/CP";
import GenrateLinkUploader from "components/GenrateLinkUploader";

// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { brandServices } from "services/catalog/brandServices";
import { removeEmptyValueObject } from "utils/helpers";

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


  const onFinish = (values) => {

    let data = removeEmptyValueObject(values);

    let bodyFormData = new FormData();

    for (let index = 0; index < data.file?.fileList?.length; index++) {
      const element = data.file?.fileList[index];
      bodyFormData.append("file", element.originFileObj);
    }
    bodyFormData.append("title", data.title);
    bodyFormData.append("isActive", data.isActive);
    bodyFormData.append("description", data.description);
    bodyFormData.append("id", currentData.id);
    bodyFormData.append("sortOrder", data.sortOrder ? data.sortOrder : 0);
    bodyFormData.append("enTitle", data.enTitle);

    let newFormData = new FormData();
    for (var [name, value] of bodyFormData) {
      if (value !== "undefined") {
        newFormData.append(name, value);
      }
    }
    if (typeAction === "edit") {
      onSubmit(newFormData);
    } else {
      onSubmit(newFormData);
    }
  };

  const GetData = async () => {
    setLoading(true);
    const result = await brandServices.getById(currentData.id);
    if (result.isSuccess) {

      result.data.status = result.data.isActive;
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
    if (typeAction === "edit") {
      GetData();
    }
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
                <CPInput
                  hasValidation
                  name={"enTitle"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "enTitle" })}:`}
                  placeholder={intl.formatMessage({ id: "enTitle" })}
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

              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  name={"sortOrder"}
                  type={"number"}
                  min={0}
                  label={`${intl.formatMessage({ id: "sortOrder" })}:`}
                  placeholder={intl.formatMessage({ id: "sortOrder" })}
                // rules={[
                //   {
                //     required: true,
                //     message: <FormattedMessage id="requiredMessage" />,
                //   },
                // ]}
                />
              </Col>

            </Row>
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
                // rules={[
                //   {
                //     required: true,
                //     message: <FormattedMessage id="requiredMessage" />,
                //   },
                // ]}
              />
            </Col>


            <Row style={{marginTop:"2%"}}>

              <Col xs={8} sm={8} md={8}>
                <CPUpload
                  hasValidation
                  showUploadList={false}
                  label={intl.formatMessage({
                    id: "selectFile",
                  })}
                  name={"file"}
                  size={15}
                 accept={".png,.jpg,.webp,.jpeg,.svg"}
                  multiple={false}
                  maxCount={1}
                  sizeType="mb"
                  placeholder={intl.formatMessage({
                    id: "selectFile",
                  })}
                />
              </Col>
              {
                data?.file?.length > 0 ?
                  <Col xs={14} sm={14} md={14} style={{ margin: '0 1%' }}>


                    <GenrateLinkUploader
                      items={
                        data.file
                      }
                      label={intl.formatMessage({
                        id: "uploadedFiles",
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
