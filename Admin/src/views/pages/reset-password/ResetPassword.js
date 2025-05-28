import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

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
const {Title} = Typography;

const ResetPassword = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  let { code } = useParams();
  let history = useHistory();
  const { setLocale, locale } = useLocale();
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});
  const [messageData, setMessageData] = useState("");
  const [form] = useForm();

  const onSubmitData = async (data) => {
    setLoading(true);
    data = { ...data, resetCode: code };
    let result = await authenticationServices.changePassword(data);

    if (result.isSuccess) {
      setMessageData(result.message);
      setLoading(false);
      isConfirm(true);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const getConfirmation = async () => {
    setLoading(true);

    const result = await authenticationServices.getResetPasswordConfirmation(
      code
    );
    if (result.isSuccess) {
      setLoading(false);
    } else {
      if (result.message) message.error(result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getConfirmation();
    localStorage.removeItem("persist:root");
  }, []);

  return (
    <PageContainer
      title={`${intl.formatMessage({
        id: "systemTitle",
      })}`}
    >
      <div className="register">
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
          {!isConfirm ? (
            <Form
              form={form}
              name="login"
              onFinish={onSubmitData}
              layout="vertical"
            >
              <Row gutter={[8, 8]} className="mb-20">
                <Col xs={24} sm={12} md={24}>
                  <h4 style={{ color: "cadetblue" }}>{messageData}</h4>
                </Col>
              </Row>
              <Row gutter={[8, 8]} className="mb-20">
                <Col xs={24} sm={12} md={24} className="text-left mb-10">
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
                </Col>
                <Col xs={24} sm={12} md={24}>
                  <CPInput
                    hasValidation
                    name={"userName"}
                    type={"text"}
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

                <Col xs={24} sm={12} md={24}>
                  <CPInputPassword
                    label={`${intl.formatMessage({ id: "password" })}:`}
                    hasValidation
                    name={"password"}
                    type={"password"}
                    placeholder={intl.formatMessage({ id: "password" })}
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="requiredMessage" />,
                      },
                    ]}
                  />
                </Col>
                <Col xs={24} sm={12} md={24}>
                  <CPInputPassword
                    hasValidation
                    dependencies={["password"]}
                    hasFeedback
                    name={"confirmPassword"}
                    type={"text"}
                    label={`${intl.formatMessage({
                      id: "confirmPassword",
                    })}:`}
                    placeholder={intl.formatMessage({
                      id: "confirmPassword",
                    })}
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="requiredMessage" />,
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            intl.formatMessage({
                              id: "errorMessageNotMatchPassword",
                            })
                          );
                        },
                      }),
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={24}>
                  <CPButton
                    block={true}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    <FormattedMessage id="resetPassword" />
                  </CPButton>
                </Col>
                <Col xs={24} sm={24} md={24} className="register-button">
                  <CPButton type="link" onClick={() => history.push("/login")}>
                    <FormattedMessage id="login" />
                  </CPButton>
                </Col>
              </Row>
            </Form>
          ) : (
            <Col xs={24} sm={24} md={24}>
              <Title level={4}>
                <FormattedMessage id="resetPaswordSuccess" />
              </Title>
              <CPButton type="default" onClick={() => history.push("/login")}>
                <FormattedMessage id="login" />
              </CPButton>
            </Col>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ResetPassword;
