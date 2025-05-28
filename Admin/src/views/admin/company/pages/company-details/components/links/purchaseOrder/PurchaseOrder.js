import React, { useState, useEffect, useRef } from "react";
import { Row, Col, message, Spin, Alert, Button, Popconfirm, Space, Input, Form, Descriptions, Tag, Card } from "antd";
import { CPButton, CPInput, CPDivider, CPTextArea, CPTable } from "components/CP";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';

import { purchaseOrderService } from "services/purchase/purchaseOrderService";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import AdvanceTable from "components/AdvanceTable";
import TableInit from './initial/TableInit'
import GenrateLinkUploader from "components/GenrateLinkUploader";

const { useForm } = Form;

export const PurchaseOrder = ({
  onCloseModal,
  parentLoading,
  currentData,
  companyId
}) => {
  const intl = useIntl();
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {

    getData();

  }, []);


  const getData = async () => {
    setLoading(true)

    let result = await purchaseOrderService.gePurchaseOrdersForCompany(companyId);
    if (result.isSuccess) {
      setLoading(false)
      setData(result.data)
    }
    else {
      setLoading(false)
    }
  };


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
          placeholder={`Search ${dataIndex}`}
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
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(selectedKeys, confirm, dataIndex, clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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

  const ammendColumns = [
    {
      title: intl.formatMessage({ id: "amendNO" }),
      dataIndex: "amendNO",
      key: "amendNO",
    },
    {
      title: intl.formatMessage({ id: "amendDate" }),
      dataIndex: "amendDate",
      key: "amendDate",
    },
    {
      title: intl.formatMessage({ id: "currency" }),
      dataIndex: "currencyName",
      key: "currencyName",
    },
    {
      title: intl.formatMessage({ id: "value" }),
      dataIndex: "value",
      key: "value",
    },
    {
      title: intl.formatMessage({ id: "amendDiscription" }),
      dataIndex: "amendDiscription",
      key: "amendDiscription",
    },
  ];

  const mtoColumns = () => {
    return [
      {
        title: intl.formatMessage({ id: "mrCode" }),
        dataIndex: "mrCode",
        key: "mrCode",
      },
      {
        title: intl.formatMessage({ id: "mrDescription" }),
        dataIndex: "mrDescription",
        key: "mrDescription",
      },
      {
        title: intl.formatMessage({ id: "materialElement" }),
        dataIndex: "categoryName",
        key: "materialElement",
      },
      {
        title: <FormattedMessage id="files" />,
        key: "fileAttachment",
        align: "fileAttachment",

        render: (event, row) => (
          <GenrateLinkUploader items={row?.fileAttachment} />
        ),
      },
    ];
  };


  const currencyColumns = [
    {
      title: intl.formatMessage({ id: "currency" }),
      dataIndex: "currencyName",
      key: "currencyName",
    },
    {
      title: intl.formatMessage({ id: "frieghtValue" }),
      dataIndex: "frieghtValue",
      key: "frieghtValue",
    },
    {
      title: intl.formatMessage({ id: "value" }),
      dataIndex: "value",
      key: "value",
    }
  ];

  const costAddersColumns = [
    {
      title: intl.formatMessage({ id: "costAdderTitle" }),
      dataIndex: "costAdderTitle",
      key: "costAdderTitle",
    },
    {
      title: intl.formatMessage({ id: "costAdderType" }),
      dataIndex: "costAdderTypeId",
      key: "costAdderTypeId",
    },
    {
      title: intl.formatMessage({ id: "value" }),
      dataIndex: "value",
      key: "value",
    },
    {
      title: intl.formatMessage({ id: "currency" }),
      dataIndex: "currencyName",
      key: "currency",
    },
    {
      title: intl.formatMessage({ id: "CurrencyValue" }),
      dataIndex: "CurrencyValue",
      key: "CurrencyValue",
    },
    {
      title: intl.formatMessage({ id: "remark" }),
      dataIndex: "remark",
      key: "remark",
    }
  ];



  const expandedRowRender = (record) => {

    return (
      <>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
            <Alert showIcon message={`${intl.formatMessage({ id: "remark", })}` + " : " + record?.remark} type="info" />
          </Col>

        </Row>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">

            <CPTable
              data={record.mto}
              columns={mtoColumns()}
              title={`${intl.formatMessage({ id: "mto" })}`}
            />
          </Col>

        </Row>


        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">

            <CPTable
              data={record.currencies}
              columns={currencyColumns}
              title={`${intl.formatMessage({ id: "currency" })}`}
            />
          </Col>

        </Row>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">

            <CPTable
              data={record.amends}
              columns={ammendColumns}
              title={`${intl.formatMessage({ id: "amends" })}`}
            />
          </Col>

        </Row>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">

            <CPTable
              data={record.costAdders}
              columns={costAddersColumns}
              title={`${intl.formatMessage({ id: "costAdders" })}`}
            />
          </Col>

        </Row>

      </>
    )


  };


  return (
    <div>
      <AdvanceTable
        rowKey="id"
        expandedRowRender={expandedRowRender}
        columnsTable={TableInit({ getColumnSearchProps })}
        islocalData={true}
        gridData={data}
        isScroll={true}
      />
    </div >
  );
};
export default PurchaseOrder;
