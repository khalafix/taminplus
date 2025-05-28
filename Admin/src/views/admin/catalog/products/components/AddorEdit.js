import React, { useState, useEffect } from "react";
import { Row, Col, Space, Form, Spin, message, Checkbox, Card, Button } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPTreeSelect,
  CPTextArea, CPUpload, CPSelect, CPEditor, CPSwitch, CPInputNumber, CPTab
} from "components/CP";
// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { productServices } from "services/catalog/productServices";
import { productCategoryServices } from "services/catalog/productCategoryServices";
import { featureServices } from "services/featureServices";
import { comboServices } from "services/comboService";

//Helpers
import { ConvertFeatureToDataSelect } from "utils/helpers";
import FeatureFields from "./usages-features-fields/FeatureFields";
import SeoProduct from "./seo/SeoProduct";
import UsagesFields from "./usages-features-fields/UsagesFields";

//Component


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
  const [brandComboDataSet, setBrandComboDataSet] = useState([]);
  const [saleStatusComboDataSet, setSaleStatusComboDataSet] = useState([]);
  const [category, setCategory] = useState([]);
  const [featureValues, setFeatureValues] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("1");

  const handleTab = (value) => setTab(value);

  const GetSaleStatus = async () => {
    const result = await comboServices.getSaleStatus();

    setSaleStatusComboDataSet(result.data);
  };

  const GetBrandData = async () => {
    const result = await comboServices.getBrands();

    setBrandComboDataSet(result);
  };

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
    bodyFormData.append("productName", values.productName);
    bodyFormData.append("categoryId", values.categoryId);
    bodyFormData.append("remark", values.remark ? values.remark : "");
    bodyFormData.append("brandId", values.brandId);
    bodyFormData.append("isActive", values.isActive);
    bodyFormData.append("inventory", values.inventory ? values.inventory : 0);
    bodyFormData.append("getInventoryFromApi", values.getInventoryFromApi ? values.getInventoryFromApi : false);
    bodyFormData.append("seoTitle", values.seoTitle ? values.seoTitle : "");
    bodyFormData.append("seoDescription", values.seoDescription ? values.seoDescription : "");
    bodyFormData.append("saleStatus", values.saleStatus);
    bodyFormData.append("isTopSale", values.isTopSale ? values.isTopSale : false);
    bodyFormData.append("isTopNew", values.isTopNew ? values.isTopNew : false);
    bodyFormData.append("isTopVisited", values.isTopVisited ? values.isTopVisited : false);
    bodyFormData.append("isShowAlert", values.isShowAlert ? values.isShowAlert : false);

    bodyFormData.append("isSpecialOffer", values.isSpecialOffer ? values.isSpecialOffer : false);
    bodyFormData.append("shortDescription", values.shortDescription ? values.shortDescription : "");
    bodyFormData.append("enName", values.enName ? values.enName : "");
    bodyFormData.append("weight", values.weight);

    values?.productFeatureValues?.forEach((item, index) => {

      let productCategoryFeatureId = item.id;
      let controlType = item.controlType;

      bodyFormData.append(
        `productFeatureValues[${index}].productCategoryFeatureId`,
        productCategoryFeatureId
      );
      if (controlType == 102) {
        bodyFormData.append(`productFeatureValues[${index}].featureValueNumber`, item.featureValueNumber ? item.featureValueNumber : 0);
        bodyFormData.append(`productFeatureValues[${index}].featureValue`, "");
      }
      else {
        bodyFormData.append(`productFeatureValues[${index}].featureValue`, item.featureValue ? item.featureValue : "");
        bodyFormData.append(`productFeatureValues[${index}].featureValueNumber`, "");

      }
    });

    values?.productUsages?.forEach((item, index) => {
      bodyFormData.append(`productUsages[${index}].title`, item.title);
    });

    // for (let index = 0; index < values.file?.fileList?.length; index++) {
    //   const element = values.file?.fileList[index];
    //   bodyFormData.append("file", element.originFileObj);
    // }


    return bodyFormData;
  };

  const handleChangeCategory = (value) => {
    GetProductCategoryFeatureData(value);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let newName = name?.split(",")[1];

    let newFeatureValues = featureValues[index];
    if (
      featureValues.find(
        (x) =>
          x.productCategoryFeatureId === newFeatureValues?.id ||
          newFeatureValues.productCategoryFeatureId
      )
    ) {
      let objIndex = featureValues.findIndex(
        (obj) =>
          obj.productCategoryFeatureId === newFeatureValues?.id ||
          newFeatureValues?.productCategoryFeatureId
      );
      featureValues[objIndex][newName] = value;
    } else {
      featureValues.push({
        productCategoryFeatureId:
          newFeatureValues?.id || newFeatureValues?.productCategoryFeatureId,
        [newName]: value,
      });
    }
  };

  const GetCategoryData = async () => {
    setLoading(true);
    const result = await productCategoryServices.getTree();
    if (result.isSuccess) {
      setCategory(result.data);
      typeAction === "add" && setLoading(false);
      if (typeAction === "edit") {
        GetProductData();
      }
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const GetProductCategoryFeatureData = async (id) => {
    setLoading(true);

    const result = await productCategoryServices.getProductCategoryFeatures(id);
    if (result.isSuccess) {
      setLoading(false);

      form.setFieldsValue({
        productFeatureValues: result.data,
      });
      setFeatureValues(result.data);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };



  const GetProductCategoryFeature = async (id) => {
    setLoading(true);

    const result = await productCategoryServices.getProductCategoryFeatures(id);
    if (result.isSuccess) {
      return result.data
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const getUniqueListBy = (arr, key) => {
    let templist = [...new Map(arr.map(item => [item[key], item])).values()];
    return templist
  }


  const GetProductData = async () => {
    setLoading(true);
    let result = await productServices.getById(currentData.id);
    if (result.isSuccess) {


      let temp = await GetProductCategoryFeature(result?.data.categoryId);
      setData(result.data);

      temp = temp.concat(result?.data?.productFeatureValues);
      temp = getUniqueListBy(temp, 'id')

      setFeatureValues(temp);

      form.setFieldsValue({
        ...result.data,
        productFeatureValues: temp
      });
      setLoading(false);
    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetCategoryData();
    GetBrandData();
    GetSaleStatus();
  }, []);



  const renderTabs = () => {
    const tabs = [];
    tabs.push(

      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "remark",
              })}
            </span>
          </>
        ),
        key: 1,
        children: (
          <Card bordered>
            <Col xs={24} sm={12} md={24}>
              <CPEditor
                label={`${intl.formatMessage({
                  id: "remark",
                })}:`}
                rows={20}
                name={"remark"}
                placeholder={intl.formatMessage({
                  id: "remark",
                })}

              />
            </Col>
          </Card>
        ),
      },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "seo",
              })}
            </span>
          </>
        ),
        key: 2,
        children: (
          <SeoProduct
          />
        ),
      },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "features",
              })}
            </span> <span style={{ color: "red" }}>({featureValues?.length})</span>
          </>
        ),
        key: 3,
        children: (
          <FeatureFields
            data={data}
            featureValues={featureValues}
            handleChange={handleChange}
          />
        ),
      },
      {
        tab: (
          <>
            <span>
              {intl.formatMessage({
                id: "productUsages",
              })}
            </span>
            <span style={{ color: "red" }}>({data.productUsages?.length})</span>
          </>
        ),
        key: 4,
        children: (
          <UsagesFields productUsages={data.productUsages} />
        ),
      },


    );


    return tabs;
  };


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
                  name={"code"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "code" })}:`}
                  placeholder={intl.formatMessage({ id: "code" })}
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
                  name={"productName"}
                  type={"text"}
                  label={`${intl.formatMessage({ id: "productName" })}:`}
                  placeholder={intl.formatMessage({ id: "productName" })}
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
                  label={`${intl.formatMessage({ id: "enTitleProduct" })}:`}
                  hasValidation
                  name={"enName"}
                  type={"text"}
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
                <CPTreeSelect
                  label={`${intl.formatMessage({ id: "categoryType" })}:`}
                  hasValidation
                  name={"categoryId"}
                  allowClear={true}
                  multiple={false}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "categoryType",
                  })}
                  onChange={handleChangeCategory}
                  treeDefaultExpandAll={false} dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={category}
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
                  label={`${intl.formatMessage({ id: "brand" })}:`}
                  hasValidation
                  name={"brandId"}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "brand",
                  })}
                  dataSource={brandComboDataSet}
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
                  min={0}
                  hasValidation
                  name={"weight"}
                  type={"number"}
                  label={`${intl.formatMessage({ id: "weight" })}:`}
                  placeholder={intl.formatMessage({ id: "weight" })}

                  rules={[
                    {
                      pattern: /^(?:\d*)$/,
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>

              {
                data?.getInventoryFromApi == true &&
                <>
                  <Col xs={24} sm={12} md={8}>
                    <CPInput
                      label={`${intl.formatMessage({ id: "aPIQuantity" })}:`}
                      hasValidation
                      name={"apiQuantity"}
                      type={"text"}
                      placeholder={intl.formatMessage({ id: "aPIQuantity" })}
                      disabled={true}
                      rules={[
                        {
                          required: false,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <CPInput
                      label={`${intl.formatMessage({ id: "aPIAmount" })}:`}
                      hasValidation
                      name={"apiAmount"}
                      type={"text"}
                      placeholder={intl.formatMessage({ id: "aPIAmount" })}
                      disabled={true}
                      rules={[
                        {
                          required: false,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>
                </>

              }





              <Col xs={24} sm={12} md={8}>
                <CPSelect
                  hasValidation
                  name={"saleStatus"}
                  label={`${intl.formatMessage({ id: "saleStatus" })}:`}
                  placeholder={intl.formatMessage({ id: "saleStatus" })}
                  dataSource={saleStatusComboDataSet}
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
                  <Col xs={14} sm={14} md={14}>
                    <CPInput
                      min={0}
                      hasValidation
                      name={"inventory"}
                      type={"number"}
                      label={`${intl.formatMessage({ id: "inventory" })}:`}
                      placeholder={intl.formatMessage({ id: "inventory" })}

                    />
                  </Col>
                  <Col xs={10} sm={10} md={10} >
                    <CPSwitch
                      key={10}
                      hasValidation
                      name={"getInventoryFromApi"}
                      label={`${intl.formatMessage({ id: "getInventoryFromApi" })}`}  ></CPSwitch>
                  </Col>


                </Row>

              </Col>
              <Col xs={16} sm={16} md={16}>
                <Row gutter={[8, 8]} >
                  <Col xs={6} sm={6} md={6}>
                    <CPSwitch
                      key={20}
                      hasValidation
                      name={"isTopVisited"}
                      label={`${intl.formatMessage({ id: "isTopVisited" })}`}  ></CPSwitch>
                  </Col>


                  <Col xs={6} sm={6} md={6}>
                    <CPSwitch
                      key={30}
                      hasValidation
                      name={"isTopNew"}
                      label={`${intl.formatMessage({ id: "isTopNew" })}`}  ></CPSwitch>
                  </Col>
                  <Col xs={6} sm={6} md={6}>
                    <CPSwitch
                      key={40}
                      hasValidation
                      name={"isTopSale"}
                      label={`${intl.formatMessage({ id: "isTopSale" })}`}  ></CPSwitch>
                  </Col>
                  <Col xs={6} sm={6} md={6}>
                    <CPSwitch
                      key={50}
                      hasValidation
                      name={"isSpecialOffer"}
                      label={`${intl.formatMessage({ id: "isSpecialOffer" })}`}  ></CPSwitch>
                  </Col>

                  
                  <Col xs={6} sm={6} md={6}>
                    <CPSwitch
                      key={80}
                      hasValidation
                      name={"isShowAlert"}
                      label={`${intl.formatMessage({ id: "isShowAlert" })}`}  ></CPSwitch>
                  </Col>
                </Row>


              </Col>

              <Col xs={24} sm={12} md={24}>
                <CPTextArea
                  hasValidation
                  name={"shortDescription"}
                  rows={3}
                  label={`${intl.formatMessage({ id: "shortDescription" })}:`}
                  placeholder={intl.formatMessage({ id: "shortDescription" })}

                />
              </Col>
            </Row>



            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={24}>
                <CPTab
                  tabPane={renderTabs()}
                  activeKey={tab}
                  type="card"
                  onTabClick={handleTab}
                  forceRender={true}
                />
              </Col>
            </Row>






            {/* <Row gutter={[8, 8]} className="mb-20">
              <Col xs={24} sm={12} md={24}>
                <strong>
                  <FormattedMessage id="productUsages" />:
                </strong>
                <UsagesFields productUsages={data.productUsages} />
              </Col>
            </Row>

            {
              featureValues.length > 0 ?
                <Row gutter={[8, 8]} className="mb-20">
                  <Col xs={24} sm={12} md={24}>
                    <strong>
                      <FormattedMessage id="features" />:
                    </strong>
                    <FeatureFields
                      featureValues={featureValues}
                      handleChange={handleChange}
                    />
                  </Col>
                </Row>
                : null
            } */}


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
