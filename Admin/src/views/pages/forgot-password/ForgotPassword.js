import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//UI
import { Row, Col, Form, message, Spin, Typography } from "antd";
import { CPButton, CPInput, CPInputPassword } from "components/CP";

//API
import { authenticationServices } from "services/authenticationServices";
import { applicationService } from "services/applicationService";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import PageContainer from "components/PageContainer/PageContainer";
import { useLocale } from "components/IntelProvider/IntelProvider";

const { useForm } = Form;
const { Title } = Typography;

const ForgotPassword = () => {
  const { setLocale, locale } = useLocale();
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});
  const [messageData, setMessageData] = useState("");
  const [isSendRequest, setIsSendRequest] = useState(false);
  const intl = useIntl();
  const [form] = useForm();

  let history = useHistory();

  const onSubmitData = async (data) => {
    setLoading(true);
    let result = await authenticationServices.sendPasswordResetLink(data);

    if (result.isSuccess) {
      setMessageData(result.message);
      setIsSendRequest(true);
    } else {
      message.error(result.message);
      setLoading(false);
      setMessageData("");
      setIsSendRequest(false);
    }
  };

  const getConfig = async () => {
    setLoadingConfig(true);
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    getConfig();
    localStorage.removeItem("persist:root");
  }, []);
  return (
    <PageContainer
      title={`${intl.formatMessage({
        id: "systemTitle",
      })}`}
    >
      <div className="register">
        {loadingConfig ? (
          <Spin className="spin-custom" />
        ) : (
          <div className="form">
            <div className="logo">
              <img
                alt="logo"
                src={`data:images/png;base64,${appConfigData?.mainLogoBase64}`}
              />
            </div>
            <div className="title">
              <h2>
                <strong>{appConfigData?.applicationTitle}</strong>
              </h2>
            </div>
            <Form
              form={form}
              name="login"
              onFinish={onSubmitData}
              layout="vertical"
            >
              {isSendRequest ? (
                <Row gutter={[8, 8]} className="mb-20">
                  <Col xs={24} sm={12} md={24}>
                    <h4 style={{ color: "cadetblue" }}>{messageData}</h4>
                  </Col>
                </Row>
              ) : (
                <Row gutter={[8, 8]} className="mb-20">
                  {/* <Col xs={24} sm={12} md={24} className="text-left mb-10">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setLocale("en")}
                    >
                      {locale === "en" ? (
                        <span style={{ color: "#54c5d0" }}>En</span>
                      ) : (
                        "En"
                      )}
                    </span>
                    <span>/</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setLocale("fa")}
                    >
                      {locale === "fa" ? (
                        <span style={{ color: "#54c5d0" }}>Fa</span>
                      ) : (
                        "Fa"
                      )}
                    </span>
                  </Col> */}
                  <Col xs={24} sm={12} md={24}>
                    <CPInput
                      hasValidation
                      name={"userName"}
                      type={"email"}
                      label={`${intl.formatMessage({ id: "email" })}:`}
                      placeholder={intl.formatMessage({ id: "email" })}
                      rules={[
                        {
                          // eslint-disable-next-line  no-useless-escape
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: (
                            <FormattedMessage id="errorMessageNotValidEmail" />
                          ),
                        },
                        {
                          required: true,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>
                </Row>
              )}

              <Row gutter={[8, 8]}>
                {!isSendRequest ? (
                  <Col xs={24} sm={24} md={24}>
                    <CPButton
                      block={true}
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      <FormattedMessage id="sendResetPasswordLink" />
                    </CPButton>
                  </Col>
                ) : null}
                {isSendRequest ? (
                  <>
                    <Col xs={24} sm={24} md={24}>
                      <Title level={4}>
                        <FormattedMessage id="sendResetPasswordLinkMessage" />
                      </Title>
                    </Col>
                  </>
                ) : null}
                <Col xs={24} sm={24} md={24}>
                  <CPButton type="default" onClick={() => history.push("/login")}>
                    <FormattedMessage id="login" />
                  </CPButton>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ForgotPassword;
