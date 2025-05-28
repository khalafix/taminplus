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
import { videoServices } from "services/media/videoServices";

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
  const [videoSource, setVideoSource] = useState([]);

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
    bodyFormData.append("title", values.title);
    bodyFormData.append("videoCategoryId", values.videoCategoryId);
    bodyFormData.append("remark", values.remark);
    bodyFormData.append("sortOrder", values.sortOrder);
    bodyFormData.append("isActive", values.isActive);
    bodyFormData.append("videoLink", values.videoLink);
    bodyFormData.append("videoSource", values.videoSource);
    bodyFormData.append("seoDescription", values.seoDescription ? values.seoDescription  : "");
    bodyFormData.append("seoTitle", values.seoTitle ? values.seoTitle : "");
    bodyFormData.append("shortDescription", values.shortDescription);

    for (let index = 0; index < values.file?.fileList?.length; index++) {
      const element = values.file?.fileList[index];
      bodyFormData.append("file", element.originFileObj);
    }

    for (let index = 0; index < values.coverFile?.fileList?.length; index++) {
      const element = values.coverFile?.fileList[index];
      bodyFormData.append("coverFile", element.originFileObj);
    }


    return bodyFormData;
  };




  const GetCategoryData = async () => {
    const result = await comboServices.getVideoCategory();
    setCategory(result);

  };
  const GetVideoSource = async () => {
    const result = await comboServices.getVideoSource();
    setVideoSource(result);

  };



  const GetData = async () => {
    setLoading(true);

    const result = await videoServices.getById(currentData.id);
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
    GetVideoSource();
    if (typeAction === "edit") {
      GetData();
    }
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
                <CPSelect
                  label={`${intl.formatMessage({ id: "videoCategory" })}:`}
                  hasValidation
                  name={"videoCategoryId"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "videoCategory",
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

            </Row>

            <Row gutter={[8, 8]} className="mb-20">

              <Col xs={24} sm={12} md={8}>
                <CPInput
                  hasValidation
                  min={0}
                  name={"sortOrder"}
                  type={"number"}
                  label={`${intl.formatMessage({ id: "sortOrder" })}:`}
                  placeholder={intl.formatMessage({ id: "sortOrder" })}

                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  label={`${intl.formatMessage({ id: "videoSource" })}:`}
                  hasValidation
                  name={"videoSource"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "videoSource",
                  })}
                  dataSource={videoSource}
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
              <Col xs={24} sm={24} md={24}>
                <CPTextArea
                  hasValidation
                  name={"shortDescription"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "shortDescription" })}:`}
                  placeholder={intl.formatMessage({ id: "shortDescription" })}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={24} md={24}>
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
                  name={"remark"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "remark" })}:`}
                  placeholder={intl.formatMessage({ id: "remark" })}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={24} md={24}>
                <CPTextArea
                  hasValidation
                  name={"videoLink"}
                  rows={1}
                  style={styleTextArea}
                  label={`${intl.formatMessage({ id: "videoLink" })}:`}
                  placeholder={intl.formatMessage({ id: "videoLink" })}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>



            </Row>

            <Row gutter={[8, 8]} style={{ marginTop: "2%" }}>

              <Col xs={12} sm={12} md={12} >
                <Col xs={24} sm={24} md={24}>
                  <CPUpload
                    hasValidation
                    showUploadList={false}
                    label={intl.formatMessage({
                      id: "selectCover",
                    })}
                    name={"coverFile"}
                    size={100}
                   accept={".png,.jpg,.webp,.jpeg,.svg"}
                    multiple={false}
                    maxCount={1}
                    sizeType="mb"
                    placeholder={intl.formatMessage({
                      id: "selectCover",
                    })}
                  />
                  {
                    data?.coverAttachment?.length > 0 ?
                      <Col xs={24} sm={24} md={24} style={{ margin: '3% 0' }}>


                        <GenrateLinkUploader
                          items={
                            data.coverAttachment
                          }
                          label={intl.formatMessage({
                            id: "coverFileUploded",
                          })}
                        />

                      </Col>
                      : null
                  }
                </Col>


              </Col>
              <Col xs={12} sm={12} md={12} >



                <Col xs={24} sm={24} md={24}>
                  <CPUpload
                    hasValidation
                    showUploadList={false}
                    label={intl.formatMessage({
                      id: "selectFile",
                    })}
                    name={"file"}
                    size={100}
                    accept={",.ogg,.mpa,.m4a,.mp4"}
                    multiple={false}
                    maxCount={1}
                    sizeType="mb"
                    placeholder={intl.formatMessage({
                      id: "selectFile",
                    })}
                  />
                  {
                    data?.fileAttachment?.length > 0 ?
                      <Col xs={24} sm={24} md={24} style={{ margin: '3% 0' }}>


                        <GenrateLinkUploader
                          items={
                            data.fileAttachment
                          }
                          label={intl.formatMessage({
                            id: "uploadedFiles",
                          })}
                        />

                      </Col>
                      : null
                  }


                </Col>

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
