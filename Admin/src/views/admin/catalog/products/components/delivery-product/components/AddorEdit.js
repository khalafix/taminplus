import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Checkbox, Descriptions } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPTreeSelect,
  CPTextArea, CPUpload, CPSelect, CPEditor, CPSwitch, CPInputNumber
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { productServices } from "services/catalog/productServices";
import { comboServices } from "services/comboService";

//Helpers
import { ConvertFeatureToDataSelect } from "utils/helpers";
import { useHistory, useLocation } from "react-router-dom";


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
  const [deliveryType, setDeliveryType] = useState([]);
  const [province, setProvince] = useState([]);
  const [countType, setCountType] = useState([]);
  const [countTypeState, setCountTypeState] = useState();
  const [productDetail, setProductDetail] = useState({});

  const [featureValues, setFeatureValues] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const onFinish = (data) => {

    if (typeAction === "edit") {
      data.id = currentData.id;
      onSubmit(data);
    } else {
      onSubmit(data);
    }
  };



  const GetProductDetails = async () => {

    const result = await productServices.getById(location?.state?.productId);
    if (result.isSuccess) {
      setProductDetail(result.data)
    }
    else {
      message.error(result.message);
    }
  };




  const GetProvince = async () => {
    const result = await comboServices.getProvince();
    if (result.isSuccess) {
      setProvince(result.data)
    }
    else {
      message.error(result.message);
    }
  };


  const GetCountType = async () => {
    const result = await comboServices.getCountType();
    if (result.isSuccess) {
      setCountType(result.data)
    }
    else {
      message.error(result.message);
    }
  };

  const GetDeliveryType = async () => {
    const result = await comboServices.getDeliveryType();
    if (result.isSuccess) {
      setDeliveryType(result.data)
    }
    else {
      message.error(result.message);
    }
  };

  const GetData = async () => {
    setLoading(true);
    const result = await productServices.getDeliveryProductById(currentData.id);
    if (result.isSuccess) {
      setCountTypeState(result.data.countType)
      form.setFieldsValue({
        ...result.data,
      });
      // await GetProductCategoryFeatureData(result?.data.categoryId);
      setData(result.data);
      setLoading(false);
    }
    else {
      message.error(result.message);
      setLoading(false);

    }
  };
  useEffect(() => {
    GetProductDetails();
    GetCountType();
    GetDeliveryType();
    GetProvince();
    if (typeAction == "edit") {
      GetData();
    }
  }, []);


  const ChangeCountType = (e) => {

    setCountTypeState(e);
  }

  return (
    <div>
      <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row>
              {productDetail &&
                <>
                  <Descriptions bordered layout="horizontal" className="mb-24" size={'small'} title={`${intl.formatMessage({ id: "productName" })} :` + ' ' + `${productDetail.productName}`}>
                    <Descriptions.Item label={`${intl.formatMessage({ id: "categoryName" })}`}>{productDetail.categoryName}</Descriptions.Item>
                    <Descriptions.Item label={`${intl.formatMessage({ id: "brand" })}`}>{productDetail.brandName}</Descriptions.Item>
                    <Descriptions.Item label={`${intl.formatMessage({ id: "weight" })}`}>{productDetail.weight}</Descriptions.Item>
                  </Descriptions>
                </>
              }
            </Row>
            <Row gutter={[8, 8]} className="mb-20">
              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  label={`${intl.formatMessage({ id: "province" })}:`}
                  hasValidation
                  name={"province"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "province",
                  })}
                  dataSource={province}
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
                  label={`${intl.formatMessage({ id: "deliveryType" })}:`}
                  hasValidation
                  name={"deliveryType"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "deliveryType",
                  })}
                  dataSource={deliveryType}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Row gutter={[8, 8]}>
                  <Col xs={16} sm={16} md={16}>
                    <CPInput
                      min={0}
                      hasValidation
                      name={"cost"}
                      type={"number"}
                      label={`${intl.formatMessage({ id: "cost" })}:`}
                      placeholder={intl.formatMessage({ id: "cost" })}
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>
                  <Col xs={8} sm={8} md={8} >
                    <CPSwitch
                      hasValidation
                      name={"needToCall"}
                      label={`${intl.formatMessage({ id: "needToCall" })}`}  ></CPSwitch>
                  </Col>
                </Row>

              </Col>


              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  label={`${intl.formatMessage({ id: "countType" })}:`}
                  hasValidation
                  name={"countType"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "countType",
                  })}
                  dataSource={countType}
                  onChange={(e) => ChangeCountType(e)}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              {
                countTypeState == 1 ?
                  <Col xs={24} sm={12} md={8}>
                    <CPInput
                      min={0}
                      hasValidation
                      name={"count"}
                      type={"number"}
                      label={`${intl.formatMessage({ id: "count" })}:`}
                      placeholder={intl.formatMessage({ id: "count" })}

                    />
                  </Col>
                  : null
              }


              {
                countTypeState == 2 ?
                  <>


                    <Col xs={24} sm={12} md={8}>
                      <CPInput
                        min={0}
                        hasValidation
                        name={"greaterEqual"}
                        type={"number"}
                        label={`${intl.formatMessage({ id: "greaterEqual" })}:`}
                        placeholder={intl.formatMessage({ id: "greaterEqual" })}

                      />
                    </Col>
                    <Col xs={24} sm={12} md={8}>

                      <CPInput
                        min={0}
                        hasValidation
                        name={"smallerEqual"}
                        type={"number"}
                        label={`${intl.formatMessage({ id: "smallerEqual" })}:`}
                        placeholder={intl.formatMessage({ id: "smallerEqual" })}

                      />
                    </Col>
                  </>
                  : null
              }

              <Col xs={24} sm={12} md={24}>
                <CPTextArea
                  hasValidation
                  name={"remark"}
                  rows={5}
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
            </Row>

            <CPDivider />
            <div className="footer-modal">
              <Row>
                <Col span={12}>
                  <Space>
                    <CPButton
                      type="primary"
                      htmlType="submit"
                      loading={parentLoading}
                      disabled={parentLoading}
                    >
                      <span>
                        <FormattedMessage id="addInformation" />
                      </span>
                    </CPButton>
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
