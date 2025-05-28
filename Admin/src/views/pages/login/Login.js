import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//UI
import { Row, Col, Form, message, Spin, Typography } from "antd";
import { CPButton, CPDivider, CPInput, CPInputPassword, CPCaptcha  } from "components/CP";

//API
import { authenticationServices } from "services/authenticationServices";
import { applicationService } from "services/applicationService";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import PageContainer from "components/PageContainer/PageContainer";
import { removeAllTag } from "redux/reducers/tagView";
import { resetBreadcrumb } from "redux/reducers/breadcrumbDashboard";
import { useLocale } from "components/IntelProvider/IntelProvider";
import backgroundImage from "assets/images/login-bg.jpg";

const { Title } = Typography;
const { useForm } = Form;

const Login = () => {
  const { setLocale, locale } = useLocale();
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [appConfigData, setAppConfigData] = useState({});
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [captchaKey, setCaptchaKey] = useState("login-captcha");


  const intl = useIntl();
  const [form] = useForm();
  const dispatch = useDispatch();

  let history = useHistory();

  const onSubmitData = async (data) => {
    setLoading(true);
    let result = await authenticationServices.login(data);

    if (result.isSuccess) {
      dispatch({
        type: "login",
        payload: {
          isCompany: result.data.isCompany,
          isLogin: true,
        },
      });
      if (result.data.isCompany) {
        history.push("/user-dashboard");
      } else {
        history.push("/");
      }
    } else {
      message.error(result.message);
      setLoading(false);
      resetCaptcha();
    }
  };

  const logoutUser = async () => {
    await authenticationServices.logout();
  };

  const getConfig = async () => {
    // setLoadingConfig(true);
    const result = await applicationService.getAppConfig();
    if (result) {
      setAppConfigData(result);
      setLoadingConfig(false);
      localStorage.removeItem("persist:root");
    }
  };

  useEffect(() => {
    setCaptchaUrl(applicationService.getCaptchaUrl(captchaKey));
    logoutUser();
    dispatch(removeAllTag());
    dispatch(resetBreadcrumb());
    getConfig();
  }, []);

  const resetCaptcha = () =>{
    var randomKey = Math.floor(Math.random() * (9999 -1) + 1).toString();
    setCaptchaKey(randomKey);
    setCaptchaUrl(applicationService.getCaptchaUrl(randomKey));
    form.setFields([{name:["captchaKey"], value: randomKey }]);
  }

  return (
    <>
      <Row justify="center" style={{ height: "100vh" }}>
        <Col
          span={12}
          xs={24}
          sm={24}
          md={12}
          align="center"
          className="login-form"
        >
          <PageContainer
            title={`${intl.formatMessage({
              id: "systemTitle",
            })}`}
          >
            <>
              <img
                alt="logo"
                width="120"
                src={`data:images/png;base64,${appConfigData?.mainLogoBase64}`}
              />
              <Title level={2}>{appConfigData?.applicationTitle}</Title>
              {loadingConfig ? (
                <Spin className="spin-custom" />
              ) : (
                <Form
                  form={form}
                  name="login"
                  onFinish={onSubmitData}
                  layout="vertical"
                >
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24}>
                      <CPInput
                        label={`${intl.formatMessage({ id: "email" })}:`}
                        hasValidation
                        maxLength={64}
                        name={"username"}
                        type={"text"}
                        className={"login-input"}
                        placeholder={intl.formatMessage({ id: "userName" })}
                        rules={[
                          {
                            required: true,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                          {
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: (
                              <FormattedMessage id="errorMessageNotValidEmail" />
                            ),
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <CPInputPassword
                        label={`${intl.formatMessage({ id: "password" })}:`}
                        hasValidation
                        maxLength={32}
                        name={"password"}
                        type={"password"}
                        className={"login-input"}
                        placeholder={intl.formatMessage({ id: "password" })}
                        rules={[
                          {
                            required: true,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <CPCaptcha 
                          captchaKeyValue={captchaKey}
                          captchaUrl ={captchaUrl}
                          resetCaptcha = {resetCaptcha}
                          label={`${intl.formatMessage({ id: "captcha" })}:`}
                          hasValidation
                          maxLength={4}
                          name={"captcha"}
                          type={"text"}
                          className={"login-input"}
                          placeholder={intl.formatMessage({
                            id: "enterCaptcha",
                          })}
                          rules={[
                            {
                              required: true,
                              message: (
                                <FormattedMessage id="requiredMessage" />
                              ),
                            },
                          ]}
                      />
                      {/* <Row>
                        <Col>
                          <CPInput
                            label={`${intl.formatMessage({ id: "captcha" })}:`}
                            hasValidation
                            maxLength={4}
                            name={"captcha"}
                            type={"text"}
                            className={"login-input"}
                            placeholder={intl.formatMessage({
                              id: "enterCaptcha",
                            })}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage id="requiredMessage" />
                                ),
                              },
                            ]}
                          />
                        </Col>
                        <Col>
                          <img
                            style={{ paddingTop: "30px" }}
                            src={captchaUrl}
                            width="100"
                          />
                          <CPInput
                            style={{ display: "none" }}
                            hasValidation
                            name={"captchaKey"}
                            value={captchaKey}
                            defaultValue={captchaKey}
                            type="hidden"
                          />
                        </Col>
                        <Col>
                          <span onClick={resetCaptcha} className="captcha-refresh-icon">
                            {iconMap["refresh"]}
                          </span>
                        </Col>
                      </Row> */}
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <CPButton
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block={true}
                        size={"large"}
                        className="login-button"
                      >
                        <FormattedMessage id="login" />
                      </CPButton>
                      {/* <CPButton
                        type="link"
                        onClick={() => history.push("/forgot-password")}
                      >
                        <FormattedMessage id="forgetPassword" />
                      </CPButton> */}
                    </Col>
                  </Row>
                </Form>
              )}
            </>
          </PageContainer>
        </Col>
        <Col
          span={12}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="login-bg"
        ></Col>
      </Row>
    </>
  );
  return <></>;
};

export default Login;
