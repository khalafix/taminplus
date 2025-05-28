import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, message, Spin, Alert, Button, Popconfirm, Space, Input, Form, Descriptions, Tag, Card } from "antd";
import {
  CPButton,
  CPInput,
  CPDivider,
  CPSelect,
  CPTextArea, CPUpload, CPInputNumber, CPEditor, CPCard, CPTooltip
} from "components/CP";
import GenrateLinkUploader from "components/GenrateLinkUploader";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { PlusOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import AdvanceTable from "components/AdvanceTable";
import TableInit from './initial/TableInit'
// Message
import { FormattedMessage, useIntl } from "react-intl";

// Api
import { comboServices } from "services/comboService";
import { removeEmptyValueObject } from "utils/helpers";
import { orderServices } from "services/catalog/orderServices";
import { OrderStatus } from "utils/orderStatus";

const { useForm } = Form;
const OrderDetails = ({
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({});
  const [orderStatusCombo, setOrderStatusCombo] = useState([]);
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [parentLoading, setParentLoading] = useState(false);
  const history = useHistory();


  const onFinish = async (values) => {
    setParentLoading(true);
    values.id = location?.state?.id.toString();
    values.orderStatusRemark = values.orderStatusRemark;
    debugger
    const result = await orderServices.update(values);
    if (result.isSuccess) {
      message.success(result.message);
      setParentLoading(false);
      await GetData();
    }
    else {
      message.error(result.message);
      setParentLoading(false);
    }
  };

  const GetOrderStatus = async () => {
    const result = await comboServices.getOrderStatus();
    setOrderStatusCombo(result.data)
  }

  const GetData = async () => {
    setLoading(true);
    const result = await orderServices.getById(location?.state?.id.toString());
    if (result.isSuccess) {

      form.setFieldsValue({
        ...result.data,
      });
      setLoading(false);
      setdata(result.data)
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
    GetOrderStatus();
  }, []);



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (selectedKeys, confirm, dataIndex, clearFilters) => {
    clearFilters();
    setSearchText('');
    handleSearch(selectedKeys, confirm, dataIndex)

  };


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`جستجو ...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(selectedKeys, confirm, dataIndex, clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            پاک کردن
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? 'red' : 'red',
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <spn>{text}</spn>
      ) : (
        text
      ),
  });


  return (
    <div>
      <CPCard>

        <Form form={form} name="addoredit" onFinish={onFinish} layout="vertical">
          {loading ? (
            <Spin className="spin-custom" />
          ) : (
            <>
              {
                data.orderStatus == OrderStatus.ReturnByCustomer &&
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24}>
                      <Alert type="error " message={"  علت مرجوع کردن درخواست"} description={
                        <>
                          <p>
                            {data.orderReturnDate}
                          </p>
                          <p>{data.orderReturnRemark}</p>
                        </>

                      }
                      />
                    </Col>
                  </Row>
                  // :
                  // <Row gutter={[8, 8]}>
                  //   <Col xs={24} sm={24} md={24}>
                  //     <Alert type="info" message={
                  //       <>
                  //         <p>
                  //           {data.orderStatusRemark}
                  //         </p>

                  //       </>

                  //     }
                  //     />
                  //   </Col>


                  // </Row>
              }

              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12} md={8}>
                  <CPSelect
                    hasValidation
                    name={"orderStatus"}
                    label={`${intl.formatMessage({ id: "status" })}:`}
                    placeholder={intl.formatMessage({ id: "status" })}
                    dataSource={orderStatusCombo}

                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="requiredMessage" />,
                      },
                    ]}
                  />
                </Col>

                <Col xs={24} sm={12} md={16}>
                  <CPTextArea
                    hasValidation
                    name={"orderStatusRemark"}
                    rows={1}
                    label={`${intl.formatMessage({ id: "remark" })}:`}
                    placeholder={intl.formatMessage({ id: "remark" })}
                    rules={[
                      {
                        required: true,
                        message: <FormattedMessage id="requiredMessage" />,
                      },
                    ]}
                  />
                </Col>

              </Row>

              <Col style={{ marginTop: "2%" }} xs={24} sm={24} md={24}>
                <CPDivider />

                <Descriptions bordered layout="horizontal" className="mb-24" size={'small'} title={`${intl.formatMessage({ id: "orderNumber" })} :` + ' ' + `${data.orderNumber}`}>
                  {/* <Descriptions.Item label={`${intl.formatMessage({ id: "orderNumber" })}`}>{data.orderNumber}</Descriptions.Item> */}
                  <Descriptions.Item label={`${intl.formatMessage({ id: "lastStatus" })}`}>{data.orderStatusTitle}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "createDate" })}`}>{data.createDate}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "koponTitle" })}`}>{data.koponTitle ? data.koponTitle : "---"}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "koponPercent" })}`}>{data.koponPercent}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "koponAmount" })}`}>{data.koponAmount?.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "finalAmount" })}`}>{data.finalAmount?.toLocaleString()}</Descriptions.Item>

                </Descriptions>
              </Col>
              <Col style={{ marginTop: "2%" }} xs={24} sm={24} md={24}>

                <CPDivider />
                <Descriptions bordered layout="horizontal" className="mb-24" size={'small'} title={`${intl.formatMessage({ id: "customerInfo" })} :`}>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "customerName" })}`}>{data.customerName}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "mobile" })}`}>{data.phoneNumber}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "postCode" })}`}>{data.postCode}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "province" })}`}>{data.provinceTitle}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "customerCity" })}`}>{data.cityTitle}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "region" })}`}>{data.regionTitle}</Descriptions.Item>
                  <Descriptions.Item label={`${intl.formatMessage({ id: "parish" })}`}>{data.parishTitle}</Descriptions.Item>
                  <Descriptions.Item span={3} label={`${intl.formatMessage({ id: "deliveryAddress" })}`}>{data.deliveryAddress}</Descriptions.Item>
                  <Descriptions.Item span={3} label={`${intl.formatMessage({ id: "address" })}`}>{data.address}</Descriptions.Item>

                </Descriptions>
              </Col>

              <CPDivider />

              <AdvanceTable
                // expandedRowRender={record => <div>
                //   <p style={{ margin: 0 }}>{

                //     record.remark ? <Alert showIcon message={`${intl.formatMessage({ id: "remark", })}` + " : " + record.remark} type="info" />
                //       : <Alert showIcon message={`${intl.formatMessage({ id: "noMessage", })}`} type="warning" />
                //   }</p></div>}
                rowKey="id"
                columnsTable={TableInit({ getColumnSearchProps })}
                islocalData={true}
                gridData={data.items}
                isScroll={true}
              />



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
                      {/* <CPButton onClick={() => history.goBack()}>
                        <FormattedMessage id="backward" />
                      </CPButton> */}
                    </Space>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Form>
      </CPCard>

    </div>
  );
};


export default OrderDetails
