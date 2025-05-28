import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CPDatePickerMiladi from "components/CP/CPDatePicker/CPDatePickerMiladi";

// API
import { companyServices } from "services/companyServices";
import { comboServices } from "services/comboService";
import { productCategoryServices } from "services/catalog/productCategoryServices";

// UI Components
import {
  CPButton,
  CPInput,
  CPSelect,
  CPPagination,
  CPTreeSelect,
} from "components/CP";
import CPPanel from "components/CP/CPPanel/CPPanel";

// Message
import { useIntl, FormattedMessage } from "react-intl";

import {
  clearCompanySearch,
  saveCompanySearch,
} from "redux/reducers/companySearch";
import { useDispatch, useSelector } from "react-redux";

// Handle Error
import PageContainer from "components/PageContainer/PageContainer";
import { Col, message, Row, Spin, Form, Pagination, Space } from "antd";
import iconMap from "utils/iconMap";
import { Card } from "antd";
import dayjs from "dayjs";
import TableInit from "./TableInit";
import CompanyInfo from "components/Company/CompanyInfo";
import Features from "views/admin/mr/company-products-details/components/features/Features";
import AdvanceTable from "components/AdvanceTable";
const { useForm } = Form;

const Feature = () => {
  const intl = useIntl();

  const { page, filters } = useSelector((state) => state.companySearch);
  const [form, featureForm] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    handleSearch({ page, ...filters });
  }, []);

  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyStatusData, setCompanyStatusData] = useState([]);
  const [companyTypeData, setCompanyTypeData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalList, setTotalList] = useState([]);
  const [pages, setPages] = useState([]);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [dataFeatures, setDataFeatures] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [registerBys, setRegisterBys] = useState([]);
  dayjs.calendar("");


  const convertToMoment = (date) => {
    return date !== "" ? dayjs(date, { jalali: false }) : "";
  }

  const handleSearch = async (value) => {
    value = { ...value, page: value.page, limit: size };
    setLoading(true);
    const result = await companyServices.getSearchCompany(value);
    if (result.isSuccess) {
      setData(result.data);
      setTotal(result.total);
      setPages(Math.ceil(result.total / size));
      setTotalList(result.data);
      setLoading(false);
      // if(value.categoryId)
      // {
      //    getCategoryFeatures(value.categoryId);
      // }
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setData([]);
    setTotal(0);
    setPages(0);
    setCategoryId(0);
    dispatch(clearCompanySearch());
    form.resetFields();
  };

  const clearFeatureSearch = () => {
    featureForm.resetFields();
  };

  const handleChangeCategory = async (categoryId) => {
    if (categoryId) {
      setCategoryId(categoryId);
      await getCategoryFeatures(categoryId);
    }
  };

  const getCategoryFeatures = async (categoryId) => {
    //setLoading(true);
    const result = await productCategoryServices.getFeaturesForFilter(
      categoryId
    );
    if (result.isSuccess) {
      setDataFeatures(result.data);
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const getCategoryData = async () => {
    setLoading(true);
    const result = await productCategoryServices.getTree();
    if (result.isSuccess) {
      setCategory(result.data);
      setLoading(false);
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const submitSeachForm = async (value) => {
    value = {
      ...value,
      fromRegisterDate: "",
      toRegisterDate: ""
    }
    dispatch(saveCompanySearch({ page: 1, filters: value }));
    value = { ...value, page: 1 };
    await handleSearch(value);
  };

  const handleChangeAction = (item) => {
    history.push({
      pathname: "/admin/company/company-details",
      state: {
        id: item.companyId,
        typeAction: "edit",
      },
    });
  };
  useEffect(() => {
    getCompanyStatus();
    getCompanyType();
    getCategoryData();
    getOrigins();
    getRegisterByCombo();
  }, []);

  const getCompanyStatus = async () => {
    let result = await comboServices.getCompanyStatus();
    setCompanyStatusData(result);
  };

  const getOrigins = async () => {
    let result = await comboServices.getOrigins();
    setOrigins(result);
  };

  const getRegisterByCombo = async () => {
    let result = await comboServices.getRegisterByCombo();
    setRegisterBys(result);
  };

  const getCompanyType = async () => {
    let result = await comboServices.getCompanyType();
    setCompanyTypeData(result);
  };

  const changePagination = async (current, pages, dataList) => {
    dispatch(saveCompanySearch({ page: current, filters: filters }));
    const value = { page: current, ...filters };
    await handleSearch(value);
  };

  const searchMatrialFeatures = async (params) => {
    let list = [];
    let model = {};
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        let item = {};
        if (key.includes("featureHasValue") && params[key]) {
          let featureId = key.replace("featureHasValue", "");
          list.push({
            featureId: parseInt(featureId),
            value: params[key],
            title: "switch",
            controlType: 103,
          });
        }
        if (key.includes("featureValue") && params[key]) {
          let featureId = key.replace("featureValue", "");
          list.push({
            featureId: parseInt(featureId),
            value: params[key],
            title: "text",
            controlType: 101,
          });
        }
        if (key.includes("featureOption") && params[key]) {
          let featureId = key.replace("featureOption", "");
          list.push({
            featureId: parseInt(featureId),
            value: params[key],
            title: "tag",
            controlType: 104,
          });
        }
        if (key.includes("featureFrom") && params[key]) {
          let featureId = key.replace("featureFrom", "");
          list.push({
            featureId: parseInt(featureId),
            value: params[key],
            title: "from",
            controlType: 102,
          });
        }
        if (key.includes("featureTo") && params[key]) {
          let featureId = key.replace("featureTo", "");
          list.push({
            featureId: parseInt(featureId),
            value: params[key],
            title: "to",
            controlType: 102,
          });
        }
      }
    }

    model.list = list;
    model.categoryId = categoryId;
    model.limit = size;
    model.page = page;

    if (list.length > 0) {
      const result = await productCategoryServices.searchFeaturesForCompany(
        model
      );
      if (result.isSuccess) {
        setData(result.data);
        setTotal(result.total);
        setPages(Math.ceil(result.total / size));
        setTotalList(result.data);
        setLoading(false);
      } else {
        message.error(result.message);
      }
    } else {
      setData([]);
    }
  };

  const renderSearchPanelForMatrialFeatures = (items) => {
    if (items?.length > 0) {
      return (
        <Col xs={24} sm={24} md={24} className="mb-20 mt-20">
          <strong>
            <FormattedMessage id="features" />:
          </strong>
          <Features
            readonly={false}
            // fieldIndex={1}
            isSearchPanel={true}
            productFeatureValues={items}
          />
        </Col>
      );
    }
  };

  const getMoreInformationData = (compnayId) => {
    history.push({
      pathname: "/admin/company/company-details",
      state: {
        id: compnayId,
      },
    }
    )

  }

  const expandedRowRender = (record) => {
    return (<CompanyInfo
      info={record}
      hasView={true}
      showCard={true}
    />)
  }

  return (
    <PageContainer title={`${intl.formatMessage({ id: "listCompany" })}`}>
      <Card>
        <Row gutter={[8, 8]} className="mb-10 mt-20 ">
          <Col xs={24} sm={24} md={24}>
            <CPPanel
              defaultActiveKey={1}
              header={intl.formatMessage({ id: "search" })}
              bordered
            >
              <Form
                form={form}
                name="search"
                onFinish={submitSeachForm}
                layout="vertical"
                initialValues={filters}
              >
                <Row gutter={[8, 8]} className="mb-10 mt-20 ">
                  <Col xs={24} sm={12} md={4}>
                    <CPInput
                      hasValidation
                      name={"text"}
                      type={"text"}
                      placeholder={"CompanyName , ExName, Email, NationalCode"}
                    />
                  </Col>

                  <Col xs={24} sm={12} md={4}>
                    <CPSelect
                      hasValidation
                      name={"companyStatus"}
                      placeholder={intl.formatMessage({ id: "companyStatus" })}
                      dataSource={companyStatusData}
                      showSearch={false}
                    />
                  </Col>

                  <Col xs={24} sm={12} md={4}>
                    <CPSelect
                      hasValidation
                      name={"companyType"}
                      placeholder={intl.formatMessage({ id: "companyType" })}
                      dataSource={companyTypeData}
                      showSearch={false}
                    />
                  </Col>

                  <Col xs={24} sm={12} md={4}>
                    <CPSelect
                      hasValidation
                      name={"originId"}
                      placeholder={intl.formatMessage({ id: "origin" })}
                      dataSource={origins}
                      showSearch={false}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={4}>
                    <CPSelect
                      hasValidation
                      name={"registerBy"}
                      placeholder={intl.formatMessage({ id: "registerBy" })}
                      dataSource={registerBys}
                      showSearch={false}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={4}>
                    <CPTreeSelect
                      hasValidation
                      name={"categoryId"}
                      allowClear={true}
                      multiple={false}
                      showSearch={true}
                      placeholder={intl.formatMessage({
                        id: "categoryType",
                      })}
                      onChange={async (value) =>
                        await handleChangeCategory(value)
                      }
                      treeDefaultExpandAll={false}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      treeData={category}
                      // disabled={true}
                      rules={[
                        {
                          required: false,
                          message: <FormattedMessage id="requiredMessage" />,
                        },
                      ]}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={4}>
                    <CPDatePickerMiladi
                      key="fromRegisterDate"
                      placeholder={`${intl.formatMessage({ id: "fromRegisterDate" })}`}
                      hasValidation
                      showToday={false}
                      name={"fromRegisterDate"}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={4}>
                    <CPDatePickerMiladi
                      key="fromRegisterDate"
                      placeholder={`${intl.formatMessage({ id: "toRegisterDate" })}`}
                      hasValidation
                      showToday={false}
                      name={"toRegisterDate"}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={4}>
                    <Space>
                      <CPButton
                        htmlType="submit"
                        type="primary"
                        disabled={loading}
                      >
                        <span className="btn-icon">{iconMap["BsSearch"]}</span>
                        {<FormattedMessage id="search" />}
                      </CPButton>
                      <CPButton htmlType="button" onClick={() => clearSearch()}>
                        <span className="btn-icon">
                          {iconMap["AiOutlineRest"]}
                        </span>
                        {<FormattedMessage id="resetSearch" />}
                      </CPButton>
                    </Space>
                  </Col>
                </Row>
              </Form>
            </CPPanel>
          </Col>
        </Row>
        <Row gutter={[8, 8]} className="mb-10 mt-20 ">
          <Col sm={24} md={24} xs={24}>
            {dataFeatures?.length > 0 ? (
              <CPPanel
                header={intl.formatMessage({
                  id: "advanceSearchForMatrialFeatures",
                })}
                bordered
              >
                <Form
                  form={featureForm}
                  name="searchMatrialFeatures"
                  onFinish={searchMatrialFeatures}
                  layout="vertical"
                >
                  <Row gutter={[8, 8]}>
                    {renderSearchPanelForMatrialFeatures(dataFeatures)}

                    <Space>
                      <CPButton
                        htmlType="submit"
                        type="primary"
                      // onClick={handleSearch}
                      >
                        <span className="btn-icon">{iconMap["BsSearch"]}</span>
                        {<FormattedMessage id="search" />}
                      </CPButton>
                    </Space>
                  </Row>
                </Form>
              </CPPanel>
            ) : null}
          </Col>
        </Row>
        {loading ? (
          <Spin className="spin-custom" />
        ) : (
          <>
            {/* <Row gutter={[8, 8]} className="mb-10 mt-20 justify-center">
              <img   src={Iconcompany} />

            </Row> */}
            <Row>
              <Col md={24}>
                {data?.length > 0 ? (
                  <CPPagination
                    current={page}
                    onChange={async (e) => await changePagination(e, pages)}
                    pageSize={size}
                    showSizeChanger={false}
                    total={total}
                    showTotal={(total, range) => `
                  ${range[0].toLocaleString()}
                  ${intl.formatMessage({ id: "from" })}
                  ${range[1].toLocaleString()}
                  ${intl.formatMessage({ id: "of" })}
                  ${total.toLocaleString()}
                  ${intl.formatMessage({ id: "items" })}`}
                  />
                ) : null}
              </Col>
            </Row>
            <Row gutter={[8, 8]} className="mb-10">
              {/* {data?.map((item, index) => {
                return (
                  <>
                    <Col key={index} xs={24} sm={12} md={24}>
                      <CompanyInfo
                        info={item}
                        handleChangeAction={handleChangeAction}
                        hasView={true}
                        index={index}
                      />
                    </Col>
                  </>
                );
              })} */}


              <AdvanceTable
                rowKey={"companyName"}
                
                hidePagination={true}
                columnsTable={TableInit({ showMoreData: getMoreInformationData })}
                islocalData={true}
                gridData={data}
                expandedRowRender={record => expandedRowRender(record)}
              />

            </Row>
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default Feature;
