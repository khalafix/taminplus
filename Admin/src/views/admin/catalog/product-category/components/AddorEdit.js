import React, { useEffect, useState } from "react";
// UI
import { Col, Form, Row, Space, Spin, message, Checkbox, Button } from "antd";
import {
  CPButton,
  CPDivider,
  CPInput,
  CPSelect,
  CPTreeSelect,
  CPUpload, CPEditor
} from "components/CP";
// initial
import { statusRole } from "../initial/treeInit";

// Message
import { FormattedMessage, useIntl } from "react-intl";
// API
import { productCategoryServices } from "services/catalog/productCategoryServices";
import { comboServices } from "services/comboService";
import { featureServices } from "services/catalog/featureServices";
import { ConvertFeatureToDataSelect } from "utils/helpers";
import GenrateLinkUploader from "components/GenrateLinkUploader";

const { useForm } = Form;

const Add = ({
  onCloseModal,
  currentData,
  parentLoading,
  onSubmit,
  typeAction,
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [featuresData, setFeaturesData] = useState([]);
  const [category, setCategory] = useState([]);
  const [featureCategory, setFeatureCategory] = useState([]);
  const [defalutfeatureOption, setDefalutfeatureOption] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState({});

  const onSubmitData = (data) => {

    if (typeAction == "edit") {
      let tempFeature = [];
      let finalyFeature = [];
      let selectedFeature = selectedItems.filter(f => f.selected == true);
      for (let index = 0; index < selectedFeature.length; index++) {
        const element = selectedFeature[index];
        // tempFeature=[...tempFeature, { id: element.id, title: element.title, sortOrder:1}];
        tempFeature.push(element.id)
      }
      if (data.featuresList?.length > 0 && tempFeature.length > 0) {
        finalyFeature = data.featuresList.concat(tempFeature);
      }
      else if (data?.featuresList?.length > 0 && tempFeature?.length == 0) {
        finalyFeature = data?.featuresList;
      }
      else {
        finalyFeature = tempFeature;
      }

      data.features = finalyFeature;
      data.featureCount = finalyFeature.length;
    }

    const bodyFormData = new FormData();

    bodyFormData.append("enName", data.enName? data.enName : "");
    bodyFormData.append("categoryName", data.categoryName);
    bodyFormData.append("code", data.code);
    bodyFormData.append("isActive", data.isActive);
    bodyFormData.append("parentId", data.parentId ? data.parentId : 0);
    bodyFormData.append("id", data.id ? data.id : 0);
    bodyFormData.append("sortOrder", data.sortOrder ? data.sortOrder : 0);
    bodyFormData.append("remark", data.remark ? data.remark : "");

    // for (let f = 0; f < data?.mainFeatures?.length; f++) {
    //   const element = data.mainFeatures[f];
    //   bodyFormData.append(`mainFeatures[${f}]`, element);
    // }

    bodyFormData.append(`mainFeatureId`, data.mainFeatureId ? data.mainFeatureId : 0);

    for (let f = 0; f < data.mainFeatureFile?.fileList?.length; f++) {
      const element = data.mainFeatureFile?.fileList[f];
      bodyFormData.append("mainFeatureFile", element.originFileObj);
    }

    for (let y = 0; y < data.file?.fileList?.length; y++) {
      const element = data.file?.fileList[y];
      bodyFormData.append("file", element.originFileObj);
    }

    for (let index = 0; index < data.features?.length; index++) {
      const element = data.features[index];
      bodyFormData.append(`features[${index}].id`, element);
      bodyFormData.append(`features[${index}].sortOrder`, 1);

    }



    if (data?.features?.length > 0 && data.mainFeatureId) {
      if (data.features.filter(f => f == data.mainFeatureId)?.length == 0) {
        message.error("ویژگی اصلی را از ویژگی های ثبت شده انتخاب کنید")
        return 0;
      }

    }

    onSubmit(bodyFormData);
  };


  const GetFeatureCategoryData = async () => {
    const result = await comboServices.getFeatureCategory();

    setFeatureCategory(result);
    setLoading(false);

  };


  const GetCategoryData = async () => {
    setLoading(true);

    const result = await productCategoryServices.getTree();
    if (result.isSuccess) {

      setCategory(result.data)

    }
    else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const GetProductCategoryData = async () => {
    setLoading(true);

    const result = await productCategoryServices.getById(currentData?.key);
    if (result.isSuccess) {
      let featuresTemp = [];
      setData(result.data)
      for (let y = 0; y < result.data?.features.length; y++) {
        const el = result.data.features[y];
        featuresTemp = [...featuresTemp, { id: el.id, title: el.title, selected: true, sortOrder: 1 }];
      }

      setSelectedItems([...featuresTemp]);
      setDefalutfeatureOption([...featuresTemp]);
      setLoading(false);
      result.data.mainFeatureId = result.data.mainFeatureId ? result.data.mainFeatureId : null;
      form.setFieldsValue({
        ...result.data
      });
    }
  };
  const GetFeatureCategory = async () => {

    const result = await featureServices.getByFeaturesCategoryId();
    if (result.isSuccess) {
      let data = ConvertFeatureToDataSelect(result.data);

      if (typeAction === "edit") {
        // GetProductCategoryData();
        setFeaturesData(data);
      }
      else {
        setFeaturesData(data);
      }
      // if (typeAction === "edit") {
      //   GetProductCategoryData();
      // }
    }
    else {
      message.error(result.message);
    }
  };

  // const GetFeatureData = async () => {
  //   const result = await featureServices.getAll({});
  //   if (result.isSuccess) {
  //     let data = ConvertFeatureToDataSelect(result.data);
  //     setFeaturesData(data);
  //   }
  //   else {
  //     message.error(result.message);
  //   }
  // };

  useEffect(() => {
    // GetFeatureData();
    GetFeatureCategory();
    GetCategoryData();
    GetFeatureCategoryData();
    if (typeAction === "edit") {
      GetProductCategoryData();
      // GetFeatureData();
    }
  }, []);

  const changeItems = (checked, id) => {

    if (checked) {
      setSelectedItems([...selectedItems.filter(f => f.id != id), { id: id, selected: true }]);

    } else {
      setSelectedItems([...selectedItems.filter(f => f.id != id), { id: id, selected: false }]);

    }
  }
  return (
    <div>
      <Form
        form={form}
        name="addrole"
        onFinish={onSubmitData}
        layout="vertical"
      >
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            <Row gutter={[8, 8]} >
              {/* category Type */}


              <Col xs={24} className="hidden">
                <CPInput hasValidation name={"id"} type={"text"} />
                <CPInput hasValidation name={"parentId"} type={"text"} />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <CPInput
                  label={`${intl.formatMessage({ id: "code" })}:`}
                  hasValidation
                  name={"code"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "code" })}
                // rules={[
                //   {
                //     required: true,
                //     message: <FormattedMessage id="requiredMessage" />,
                //   },
                // ]}
                />
              </Col>


              <Col xs={24} sm={12} md={8}>
                <CPInput
                  label={`${intl.formatMessage({ id: "title" })}:`}
                  hasValidation
                  name={"categoryName"}
                  type={"text"}
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
                <CPInput
                  label={`${intl.formatMessage({ id: "enTitle" })}:`}
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
                  label={`${intl.formatMessage({ id: "categoryParent" })}:`}
                  hasValidation
                  name={"parentId"}
                  allowClear={true}
                  multiple={false}
                  showSearch={true}
                  placeholder={intl.formatMessage({
                    id: "categoryParent",
                  })}
                  treeDefaultExpandAll={false} dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={category}
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
                  label={`${intl.formatMessage({ id: "sortOrder" })}:`}
                  hasValidation
                  name={"sortOrder"}
                  type={"text"}
                  placeholder={intl.formatMessage({ id: "sortOrder" })}
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
                  dataSource={statusRole}
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col>


              {/* <Col xs={24} sm={12} md={24}>
                <CPSelect
                  hasValidation
                  name={"featuresCategory"}
                  label={`${intl.formatMessage({
                    id: "featuresCategory",
                  })}:`}
                  placeholder={intl.formatMessage({
                    id: "featuresCategory",
                  })}
                  dataSource={featureCategory}
                  onChange={(e) => ChangeFeatureCategory(e)}
                  showSearch
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />
              </Col> */}


              <Col xs={24} sm={12} md={16}>
                {
                  // featuresData?.length > 0 ?
                  typeAction == "add" ?
                    <CPSelect
                      hasValidation
                      name={"features"}
                      label={`${intl.formatMessage({
                        id: "features",
                      })}:`}
                      placeholder={intl.formatMessage({
                        id: "features",
                      })}
                      dataSource={featuresData}
                      mode="multiple"
                      showSearch
                      rules={[
                        {
                          required: false,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                    : typeAction == "edit" ?
                      <CPSelect
                        hasValidation
                        name={"featuresList"}
                        label={`${intl.formatMessage({
                          id: "features",
                        })}:`}
                        placeholder={intl.formatMessage({
                          id: "features",
                        })}
                        dataSource={featuresData}
                        mode="multiple"
                        showSearch
                        rules={[
                          {
                            required: false,
                            message: <FormattedMessage id="requiredMessage" />,
                          },
                        ]}
                      /> : null
                }

              </Col>


            </Row>
            <Row gutter={[8, 8]} style={{ marginTop: "1%" }}>

              {
                typeAction == "edit" && defalutfeatureOption?.map((item) =>
                  <>

                    <Col xs={6} sm={6} md={6} >
                      <label>

                        <Checkbox checked={selectedItems?.find(i => i.id == item.id && i.selected == true)} onChange={(e) => changeItems(e.target.checked, item.id)} />

                        &nbsp;&nbsp;<span >{item.title}</span>
                      </label>
                    </Col>

                  </>
                )}

            </Row>


            <Row gutter={[8, 8]} style={{ marginTop: "2%" }}>
              <Col xs={8} sm={8} md={8}>

                <CPSelect
                  hasValidation
                  // name={"mainFeatures"}
                  name={"mainFeatureId"}

                  label={`${intl.formatMessage({
                    id: "mainFeature",
                  })}:`}
                  placeholder={intl.formatMessage({
                    id: "mainFeature",
                  })}
                  dataSource={featuresData}
                  //  mode="multiple"
                  showSearch
                  rules={[
                    {
                      required: false,
                      message: <FormattedMessage id="requiredMessage" />,
                    },
                  ]}
                />

              </Col>

              <Col xs={8} sm={8} md={8}>
                <CPUpload
                  hasValidation
                  showUploadList={false}
                  label={intl.formatMessage({
                    id: "selectFileMainFeatureFile",
                  })}
                  name={"mainFeatureFile"}
                  size={100}
                  accept={".png,.jpg,.webp,.jpeg,.svg"}
                  multiple={false}
                  maxCount={1}
                  sizeType="mb"
                  placeholder={intl.formatMessage({
                    id: "selectFileMainFeatureFile",
                  })}
                />

              </Col>


              <Col xs={8} sm={8} md={8}>

                {
                  data?.mainFeatureFileAttachment?.length > 0 ?
                    <Col xs={24} sm={24} md={24} style={{ margin: '3% 0' }}>


                      <GenrateLinkUploader
                        items={
                          data.mainFeatureFileAttachment
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




            <Row gutter={[8, 8]} style={{ marginTop: "1%" }}>
              <Col xs={24} sm={24} md={24}>

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
            </Row>


            <Row gutter={[8, 8]} style={{ marginTop: "2%" }}>

              <Col xs={12} sm={12} md={12}>
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
                <Col span={24}>
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
