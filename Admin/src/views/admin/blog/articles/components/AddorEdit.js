import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPTreeSelect,
  CPTextArea, CPUpload, CPSelect, CPEditor
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { comboServices } from "services/comboService";

//Helpers
import { ConvertFeatureToDataSelect } from "utils/helpers";


import GenrateLinkUploader from "components/GenrateLinkUploader";
import { articleServices } from "services/blog/articleServices";

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
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const onFinish = (data) => {

    let dataForm = ConvertData(data);

    if (typeAction === "edit") {
      onSubmit(dataForm);
    } else {
      onSubmit(dataForm);
    }
  };


  const ConvertData = (values) => {


    const bodyFormData = new FormData();
    
    typeAction === "edit" && bodyFormData.append("id", currentData.id);
    bodyFormData.append("code", values.code);
    bodyFormData.append("title", values.title);
    bodyFormData.append("articleCategoryId", values.articleCategoryId);
    bodyFormData.append("remark", values.remark);
    bodyFormData.append("shortDescription", values.shortDescription ? values.shortDescription  : "");
    bodyFormData.append("isActive", values.isActive);
    bodyFormData.append("seoDescription", values.seoDescription ? values.seoDescription : "");
    bodyFormData.append("seoTitle", values.seoTitle ? values.seoTitle : "");

    for (let index = 0; index < values.file?.fileList?.length; index++) {
      const element = values.file?.fileList[index];
      bodyFormData.append("file", element.originFileObj);
    }


    return bodyFormData;
  };




  const GetCategoryData = async () => {
    const result = await comboServices.getArticleCategory();
    setCategory(result);

  };



  const GetData = async () => {
    setLoading(true);

    const result = await articleServices.getById(currentData.id);
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
    GetCategoryData();
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
                <CPSelect
                  label={`${intl.formatMessage({ id: "articleCategory" })}:`}
                  hasValidation
                  name={"articleCategoryId"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "articleCategory",
                  })}
                  dataSource={category}
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
                  name={"seoTitle"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "seoTitle" })}:`}
                  placeholder={intl.formatMessage({ id: "seoTitle" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={16} sm={16} md={16}>
                <CPTextArea
                  hasValidation
                  name={"seoDescription"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "seoDescription" })}:`}
                  placeholder={intl.formatMessage({ id: "seoDescription" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={24}>
                <CPTextArea
                  hasValidation
                  name={"shortDescription"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "shortDescription" })}:`}
                  placeholder={intl.formatMessage({ id: "shortDescription" })}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={24}>


                <CPEditor
                  label={`${intl.formatMessage({
                    id: "remark",
                  })}:`}
                  rows={10}
                  name={"remark"}
                  placeholder={intl.formatMessage({
                    id: "remark",
                  })}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
            </Row>

   

            <Row style={{ marginTop: "2%" }}>

              <Col xs={10} sm={10} md={10}>
                <CPUpload
                  hasValidation
                  showUploadList={false}
                  label={intl.formatMessage({
                    id: "selectFile",
                  })}
                  name={"file"}
                  size={100}
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
                data?.articleAttachments?.length > 0 ?
                  <Col xs={12} sm={12} md={12} style={{ margin: '0 1%' }}>


                    <GenrateLinkUploader
                      items={
                        data.articleAttachments
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
