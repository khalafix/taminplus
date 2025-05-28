import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, message } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPInputPassword,
  CPTreeSelect,
  CPTextArea,
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
import { goldiranServices } from "services/gold-iran/goldiranService";

// Api
import { userService } from "services/userService";
import { comboServices } from "services/comboService";
import { customerService } from "services/customer/customerService";
const { useForm } = Form;

const Add = ({ onCloseModal, loading, onSubmit, currentData, typeAction }) => {
  const intl = useIntl();
  const [form] = useForm();
  const [rolesList, setRolesList] = useState([]);
  const [province, setProvince] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [citySelected, setCitySelected] = useState(0);
  const [data, setData] = useState({});

  const GetRoles = async () => {
    const result = await userService.getRoles();
    if (result.isSuccess) {
      setRolesList(result.data);
    }
  };


  // const GetUserTypes = async () => {
  //   const result = await comboServices.getUserTypes();

  //   setUserTypes(result);
  // };


  const GetUserData = async () => {
    const result = await customerService.getbyId(currentData.id);

    if (result.isSuccess) {

      if (result.data.goldIranProvinceId) {
        await ChangeProvinceWithParam(result.data.goldIranProvinceId);
      }
      if (result.data.goldIranCityId) {
        await ChangeCityWithParam(result.data.goldIranCityId);
      }
      if (result.data.goldIranCityId && result.data.regionId) {
        await ChangeRegionWithParam(result.data.goldIranCityId , result.data.regionId);
      }

      form.setFieldsValue({
        ...result.data,
      });

      
      setData(result.data)
    }
  };

  const GetProvince = async () => {
    const result = await goldiranServices.getProvince();
    if (result.isSuccess) {
      setProvince(result.data)
    }

  };

  const ChangeProvince = async (el) => {

    const result = await goldiranServices.getCities(el);
    form.setFieldsValue({
      goldIranCityId: "",
      parishId: "",
      regionId: "",
    });
    if (result.isSuccess) {
      // form.setFieldsValue({
      //   goldIranCityId: el,
      // });
      setCityData(result.data)
    }

  };

  const ChangeProvinceWithParam = async (el) => {

    const result = await goldiranServices.getCities(el);

    if (result.isSuccess) {
      // form.setFieldsValue({
      //   goldIranCityId: el,
      // });
      setCityData(result.data)
    }

  };





  const onFinish = (data) => {
    data.userType = 1;
    if (typeAction === "edit") {
      onSubmit({ ...data, id: currentData.id });
    } else {
      onSubmit(data);
    }
  };




  const ChangeCity = async (el) => {
    setRegions([])
    form.setFieldsValue({
      regionId: "",
      parishId:""
    });
    const result = await goldiranServices.getRegions(el);
    if (result.isSuccess) {
      setRegions(result.data);
      setCitySelected(el)

    }
    else {
      message.error(result.message)
    }
  };


  const ChangeCityWithParam = async (el) => {
    setRegions([])

    const result = await goldiranServices.getRegions(el);
    if (result.isSuccess) {
      setRegions(result.data);
      setCitySelected(el)

    }
    else {
      message.error(result.message)
    }
  };

  // const ChangeRegionWithCityId = async (cityId,el) => {
  //   setParishes([])
  //   form.setFieldsValue({
  //     parishId: "",
  //   });
  //   const result = await goldiranServices.getParishes(cityId, el , "");
  //   if (result.isSuccess) {
  //     setParishes(result.data);
  //   }
  //   else {
  //     message.error(result.message)
  //   }
  // };

  const ChangeRegion = async (el) => {
    setParishes([])
    form.setFieldsValue({
      parishId: "",
    });
    const result = await goldiranServices.getParishes(citySelected, el , "");
    if (result.isSuccess) {
      setParishes(result.data);
    }
    else {
      message.error(result.message)
    }
  };


  const ChangeRegionWithParam = async (cityId,el) => {
    setParishes([])
    const result = await goldiranServices.getParishes(cityId, el , "");
    if (result.isSuccess) {
      setParishes(result.data);
    }
    else {
      message.error(result.message)
    }
  };










  useEffect(() => {
    GetRoles();
    // GetUserTypes();
    // getComboDataSet();
    GetProvince();
    if (typeAction === "edit") {
      GetUserData();
    }
  }, []);

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={8}>
            <CPInput
              hasValidation
              name={"userName"}
              label={`${intl.formatMessage({ id: "mobile" })}  :`}
              placeholder={intl.formatMessage({ id: "userName" })}
              disabled={true}
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
              name={"firstName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "firstName" })}:`}
              placeholder={intl.formatMessage({ id: "firstName" })}
              rules={[
                // {
                //   pattern: /^([^<>%\-@+$|='"]*$)$/,
                //   message: (
                //     <FormattedMessage id="errorMessageNotValidUserName" />
                //   ),
                // },
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
              name={"lastName"}
              type={"text"}
              label={`${intl.formatMessage({ id: "lastName" })}:`}
              placeholder={intl.formatMessage({ id: "lastName" })}
              rules={[
                // {
                //   pattern: /^([^<>%\-@+$|='"]*$)$/,
                //   message: (
                //     <FormattedMessage id="errorMessageNotValidUserName" />
                //   ),
                // },
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
              name={"natinalCode"}
              type={"text"}
              label={`${intl.formatMessage({ id: "natinalCode" })}:`}
              placeholder={intl.formatMessage({ id: "natinalCode" })}
              rules={[
                // {
                //   pattern: /^([^<>%\-@+$|='"]*$)$/,
                //   message: (
                //     <FormattedMessage id="errorMessageNotValidUserName" />
                //   ),
                // },
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
              name={"phoneNumber"}
              type={"text"}
              label={`${intl.formatMessage({ id: "mobile" })}:`}
              placeholder={intl.formatMessage({ id: "mobile" })}
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col> */}
          <Col xs={24} sm={12} md={8}>
            <CPInput
              hasValidation
              name={"email"}
              type={"email"}
              label={`${intl.formatMessage({ id: "email" })}:`}
              placeholder={intl.formatMessage({ id: "email" })}
              rules={[
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: <FormattedMessage id="errorMessageNotValidEmail" />,
                },
                {
                  required: false,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <CPSelect
              hasValidation
              name={"sex"}
              label={`${intl.formatMessage({ id: "sex" })}:`}
              placeholder={intl.formatMessage({ id: "sex" })}
              dataSource={[
                { value: 1, text: "مرد" },
                { value: 2, text: "زن" },
              ]}
              rules={[
                {
                  required: false,
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
              initialValue={true}
              dataSource={[
                { value: true, text: <FormattedMessage id="active" /> },
                { value: false, text: <FormattedMessage id="deactivate" /> },
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
              name={"postCode"}
              type={"text"}
              label={`${intl.formatMessage({ id: "postCode" })}:`}
              placeholder={intl.formatMessage({ id: "postCode" })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>

          {typeAction === "add" && (
            <>
              <Col xs={24} sm={12} md={8}>
                <CPInputPassword
                  hasValidation
                  name={"password"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "password" })}:`}
                  placeholder={intl.formatMessage({ id: "password" })}
                  rules={[
                    {
                      pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
                      message: (
                        <FormattedMessage id="errorMessageNotComplexPassword" />
                      ),
                    },
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPInputPassword
                  hasValidation
                  dependencies={["password"]}
                  hasFeedback
                  name={"confirmPassword"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "confirmPassword" })}:`}
                  placeholder={intl.formatMessage({ id: "confirmPassword" })}
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
            </>
          )}

          <Col xs={24} sm={12} md={8}>
            <CPSelect
              hasValidation
              name={"goldIranProvinceId"}
              label={`${intl.formatMessage({ id: "province" })}:`}
              placeholder={intl.formatMessage({ id: "province" })}
              dataSource={province}
              onChange={(e) => ChangeProvince(e)}
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
              name={"goldIranCityId"}
              label={`${intl.formatMessage({ id: "city" })}:`}
              placeholder={intl.formatMessage({ id: "city" })}
              dataSource={cityData}
              onChange={(e) => ChangeCity(e)}

              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="requiredMessage" />,
                },
              ]}
            />
          </Col>
          {
            regions.length > 0 &&
            <Col xs={24} sm={12} md={8}>
              <CPSelect
                hasValidation
                name={"regionId"}
                label={`${intl.formatMessage({ id: "region" })}:`}
                placeholder={intl.formatMessage({ id: "region" })}
                dataSource={regions}
                onChange={(e) => ChangeRegion(e)}

                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="requiredMessage" />,
                  },
                ]}
              />
            </Col>
          }
          {
            parishes.length > 0 &&
            <Col xs={24} sm={12} md={8}>
              <CPSelect
                hasValidation
                name={"parishId"}
                label={`${intl.formatMessage({ id: "parish" })}:`}
                placeholder={intl.formatMessage({ id: "parish" })}
                dataSource={parishes}

                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="requiredMessage" />,
                  },
                ]}
              />
            </Col>
          }


          <Col xs={24} sm={24} md={24}>
            <CPTextArea
              hasValidation
              name={"address"}
              rows={5}
              label={`${intl.formatMessage({ id: "address" })}:`}
              placeholder={intl.formatMessage({ id: "address" })}
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
              name={"deliveryAddress"}
              rows={5}
              label={`${intl.formatMessage({ id: "deliveryAddress" })}:`}
              placeholder={intl.formatMessage({ id: "deliveryAddress" })}
              rules={[
                {
                  required: false,
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
                <CPButton type="primary" htmlType="submit" loading={loading}>
                  <span>
                    <FormattedMessage id="addInformation" />
                  </span>
                </CPButton>
                <CPButton onClick={onCloseModal} disabled={loading}>
                  <FormattedMessage id="close" />
                </CPButton>
              </Space>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default Add;
