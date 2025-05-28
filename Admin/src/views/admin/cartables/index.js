import React, { useState, useEffect } from "react";
import PageContainer from "components/PageContainer/PageContainer";
import { message, Alert, Col, Row, Spin , Space , Form} from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import {
    CPCard, CPTab, CPButton,
    CPInput,
    CPSelect,
    CPPagination,
    CPTreeSelect,
} from "components/CP";
import CPPanel from "components/CP/CPPanel/CPPanel";
import CPDatePickerMiladi from "components/CP/CPDatePicker/CPDatePickerMiladi";

// API
import { cartableRecordService } from "services/cartables/cartableRecordService";
import CarTablesData from "./components/CarTablesData";
import iconMap from "utils/iconMap";

import {
    clearCompanySearch,
    saveCompanySearch,
} from "redux/reducers/companySearch";
import { useDispatch, useSelector } from "react-redux";

const { useForm } = Form;

const Cartables = () => {
    const intl = useIntl();
    const [tab, setTab] = useState("1");
    const [tabList, setTabList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [origins, setOrigins] = useState([]);
    const [registerBys, setRegisterBys] = useState([]);
    const [form, featureForm] = useForm();
    const { page, filters } = useSelector((state) => state.companySearch);
    const [companyStatusData, setCompanyStatusData] = useState([]);
    const [companyTypeData, setCompanyTypeData] = useState([]);
    const dispatch = useDispatch();

    const handleTab = (value) => setTab(value);
    useEffect(() => {

        getData();
    }, [])

    const getData = async () => {
        setLoading(true)
        let result = await cartableRecordService.getList();
        if (result.isSuccess) {
            setTabList(result.data)
        }
        setLoading(false)

    }


    const submitSeachForm = async (value) => {
        debugger;
        value = {
          ...value,
          fromRegisterDate: "",
          toRegisterDate: ""
        }
        dispatch(saveCompanySearch({ page: 1, filters: value }));
        value = { ...value, page: 1 };
        await handleSearch(value);
      };

      const handleChangeCategory = async (categoryId) => {
        // if (categoryId) {
        //   setCategoryId(categoryId);
        // //   await getCategoryFeatures(categoryId);
        // }
      };


      const clearSearch = () => {
        // setData([]);
        // setTotal(0);
        // setPages(0);
        // setCategoryId(0);
        // dispatch(clearCompanySearch());
        // form.resetFields();
      };


      const handleSearch = async (value) => {
        // value = { ...value, page: value.page, limit: size };
        // setLoading(true);
        // const result = await companyServices.getSearchCompany(value);
        // if (result.isSuccess) {
        //   setData(result.data);
        //   setTotal(result.total);
        //   setPages(Math.ceil(result.total / size));
        //   setTotalList(result.data);
        //   setLoading(false);
        //   // if(value.categoryId)
        //   // {
        //   //    getCategoryFeatures(value.categoryId);
        //   // }
        // } else {
        //   message.error(result.message);
        //   setLoading(false);
        // }
      };
    


    const renderTabs = () => {
        let tabs = [];

        for (let index = 0; index < tabList?.length; index++) {
            const el = tabList[index];

            tabs.push(
                {
                    tab: (
                        <>
                            <span>
                                {/* {intl.formatMessage({
                                    id: "companyInfo",
                                })} */}
                                {<>

                                    <span >{el?.enTitle}</span> <span style={{ color: "red" }}>
                                        ({intl.formatMessage({ id: "new" })} {el.cartableRecords.filter(f => f.visitedDate == "" || f.visitedDate == null)?.length}) </span> </>}
                            </span>
                        </>
                    ),
                    key: el.cartableId,
                    children: (
                        <CarTablesData countNewItem={el.cartableRecords.filter(f => f.visitedDate == "" || f.visitedDate == null)?.length} data={el.cartableRecords} />
                    ),
                },

            );
        }


        return tabs;
    };
    return (
        <PageContainer title={`${intl.formatMessage({ id: "cartables" })}`}>
            <CPCard bodyStyle={{ padding: 10 }}>
                {loading ? (
                    <Spin className="spin-custom" />
                ) :
                    <>
                        {/* <Row gutter={[8, 8]} className="mb-10 mt-20 ">
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
                        </Row> */}




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
                    </>
                }
            </CPCard>


        </PageContainer>
    )
}

export default Cartables
