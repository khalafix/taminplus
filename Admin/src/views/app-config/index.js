import React, { useState, useEffect } from "react";

// UI
import { message, Form, Row, Col, Space, Image } from "antd";
import { CPCard, CPInput, CPUploadImage, CPButton } from "components/CP";
import PageContainer from "components/PageContainer/PageContainer";
// Api
import { applicationService } from "services/applicationService";

// Message
import { useIntl, FormattedMessage } from "react-intl";
// Util

// Helper
import { CheckResolutionImage } from "utils/helpers";
const { useForm } = Form;
const Index = () => {
  const intl = useIntl();
  const [form] = useForm();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getConfig = async () => {
    setLoading(true);
    const result = await applicationService.get();
    if (result.isSuccess) {
      setData(result.data);
      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
    }
    else{
      message.error(result.message);
      setLoading(false);
    }
  };

  const UpdateConfig = async (data) => {
    setLoading(true);
    const result = await applicationService.update(data);
    if (result.isSuccess) {
      message.success(result.message);
      setLoading(false);
      getConfig();
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const onFinish = async (data) => {
    const { sidebarLogo, mainLogo } = data;
    const bodyFormData = new FormData();

    bodyFormData.append(
      "applicationTitle",
      JSON.stringify(data.applicationTitle)
    );
    bodyFormData.append("footer", JSON.stringify(data.footer));
    bodyFormData.append(
      "sidebarLogo",
      sidebarLogo && sidebarLogo?.fileList[0]?.originFileObj
    );
    bodyFormData.append(
      "mainLogo",
      mainLogo && mainLogo?.fileList[0]?.originFileObj
    );
    if (
      typeof sidebarLogo !== "undefined" &&
      sidebarLogo?.fileList.length > 0
    ) {
      if (
        !(await CheckResolutionImage(90, 90, sidebarLogo.file.originFileObj))
      ) {
        message.error(`${intl.formatMessage({ id: "resolutionSidebarLogo" })}`);
      }
    }

    if (typeof mainLogo !== "undefined" && mainLogo?.fileList.length > 0) {
      if (
        !(await CheckResolutionImage(220, 100, mainLogo.file.originFileObj))
      ) {
        message.error(`${intl.formatMessage({ id: "resolutionMainLogo" })}`);
      }
    }

    UpdateConfig(bodyFormData);
  };

  useEffect(() => {
    getConfig();
  }, []);
  return (
    <PageContainer title={`${intl.formatMessage({ id: "appConfig" })}`}>
      <CPCard>
        <Form
          form={form}
          name="addoredit"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[8, 8]} className="mb-20">
            <Col xs={24} sm={12} md={8}>
              <CPInput
                hasValidation
                name={"applicationTitle"}
                type={"text"}
                label={`${intl.formatMessage({ id: "applicationTitle" })}:`}
                placeholder={intl.formatMessage({ id: "applicationTitle" })}
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
                name={"footer"}
                type={"text"}
                label={`${intl.formatMessage({ id: "footerTitle" })}:`}
                placeholder={intl.formatMessage({ id: "footerTitle" })}
                rules={[
                  {
                    required: false,
                    message: <FormattedMessage id="requiredMessage" />,
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className="mb-20">
            <Col xs={24} sm={12} md={8}>
              <CPUploadImage
                label={`${intl.formatMessage({
                  id: "selectSidebarLogoCover",
                })}:`}
                isOneUpload
                hasValidation
                showUploadList={false}
                accept=".png"
                name={`sidebarLogo`}
                // resolution="90x90"
                size={20}
                placeholder={intl.formatMessage({ id: "placeholderCover" })}
                rules={[
                  {
                    required: false,
                    message: <FormattedMessage id="requiredMessage" />,
                  },
                ]}
              />
              {/* <span className="resolution-info">
                {intl.formatMessage({ id: "resolutionSidebarLogo" })}
              </span> */}
            </Col>
            <Col xs={24} sm={12} md={8} className="pt-30">
              <Image
                width={50}
                src={`data:images/png;base64,${data?.sidebarLogoBase64}`}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className="mb-20">
            <Col xs={24} sm={12} md={8}>
              <CPUploadImage
                label={`${intl.formatMessage({ id: "selectMainLogoCover" })}:`}
                isOneUpload
                hasValidation
                showUploadList={false}
                accept=".png"
                size={50}
                name={`mainLogo`}
                // resolution="220x100"
                placeholder={intl.formatMessage({ id: "placeholderCover" })}
                rules={[
                  {
                    required: false,
                    message: <FormattedMessage id="requiredMessage" />,
                  },
                ]}
              />
              {/* <span className="resolution-info">
                {intl.formatMessage({ id: "resolutionMainLogo" })}
              </span> */}
            </Col>
            <Col xs={24} sm={12} md={8} className="pt-30">
              <Image
                width={100}
                src={`data:images/png;base64,${data?.mainLogoBase64}`}
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} className="mb-20">
            <Col span={12}>
              <Space>
                <CPButton type="primary" htmlType="submit" loading={loading}>
                  <span>
                    <FormattedMessage id="addInformation" />
                  </span>
                </CPButton>
              </Space>
            </Col>
          </Row>
        </Form>
      </CPCard>
    </PageContainer>
  );
};

export default React.memo(Index);
