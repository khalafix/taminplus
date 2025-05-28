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
// API
import { comboServices } from "services/comboService";

//Helpers
import { ConvertFeatureToDataSelect } from "utils/helpers";
import dayjs from "dayjs";


import GenrateLinkUploader from "components/GenrateLinkUploader";
import { bannerServices } from "services/media/bannerServices";
dayjs.calendar("jalali");
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
  const convertToMoment = (date) => {
    return date !== "" ? dayjs(date, { jalali: true }) : "";
  }

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
    bodyFormData.append("title", values.title);
    bodyFormData.append("toDate", values.toDate?.format("YYYY-MM-DD"));
    bodyFormData.append("remark", values.remark? values.remark : "");
    bodyFormData.append("sortOrder", values.sortOrder ? values.sortOrder : 1 );
    bodyFormData.append("isActive", values.isActive);
    bodyFormData.append("link", values.link ? values.link : "");
    bodyFormData.append("positionPlace", values.positionPlace);
    bodyFormData.append("seoTitle", values.seoTitle);
    bodyFormData.append("fromDate", values.fromDate?.format("YYYY-MM-DD"));

    for (let index = 0; index < values.files?.fileList?.length; index++) {
      const element = values.files?.fileList[index];
      bodyFormData.append("files", element.originFileObj);
    }

    let newFormData = new FormData();
    for (var [name, value] of bodyFormData) {
      if (value !== "undefined") {
        newFormData.append(name, value);
      }
    }

    return newFormData;

  };






  const GetData = async () => {
    setLoading(true);

    const result = await bannerServices.getById(currentData.id);
    if (result.isSuccess) {

      result.data.fromDate = result?.data?.fromDate ? convertToMoment(result?.data?.fromDate) : null;
      result.data.toDate = result?.data?.toDate ? convertToMoment(result?.data?.toDate) : null;
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

  const GetPositionPlace = async () => {
    let result = await comboServices.getPositionPlace();
    setpositionPlace(result.data)
  }


  useEffect(() => {
    GetPositionPlace();

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
              {/* <Col xs={24} sm={12} md={8}>
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
              </Col> */}
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



              {/* <Col xs={24} sm={12} md={8}>
                <CPDatePicker
                  placeholder={`${intl.formatMessage({ id: "fromDate" })}`}
                  hasValidation
                  showToday={false}
                  name={"fromDate"}
                  label={`${intl.formatMessage({ id: "fromDate" })}:`}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPDatePicker
                  placeholder={`${intl.formatMessage({ id: "toDate" })}`}
                  hasValidation
                  showToday={false}
                  name={"toDate"}
                  label={`${intl.formatMessage({ id: "toDate" })}:`}
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col> */}
            </Row>
            <Row gutter={[8, 8]} className="mb-20">
              <Col xs={24} sm={16} md={16}>
                <CPSelect
                  label={`${intl.formatMessage({ id: "positionPlace" })}:`}
                  hasValidation
                  name={"positionPlace"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "positionPlace",
                  })}
                  dataSource={positionPlaceCombo}
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
                  name={"link"}
                  rows={1}
                  style={styleTextArea}
                  label={`${intl.formatMessage({ id: "link" })}:`}
                  placeholder={intl.formatMessage({ id: "link" })}
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

              <Col xs={12} sm={12} md={12}>
                <CPUpload
                  hasValidation
                  showUploadList={false}
                  label={intl.formatMessage({
                    id: "selectCover",
                  })}
                  name={"files"}
                  size={100}
                  accept={".png,.jpg,.webp,.jpeg,.svg"}
                  multiple={false}
                  maxCount={1}
                  sizeType="mb"
                  placeholder={intl.formatMessage({
                    id: "selectCover",
                  })}
                />

              </Col>


              <Col xs={12} sm={12} md={12}>

                {
                  data?.fileAttachment?.length > 0 ?
                    <Col xs={24} sm={24} md={24} style={{ margin: '3% 0' }}>


                      <GenrateLinkUploader
                        items={
                          data.fileAttachment
                        }
                        label={intl.formatMessage({
                          id: "fileUploded",
                        })}
                      />

                    </Col>
                    : null
                }
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
