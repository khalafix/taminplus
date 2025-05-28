import React, { useState, useEffect , useRef } from "react";
import { Row, Col, message, Spin, Alert, Button, Popconfirm, Space,Input, Form, Descriptions, Tag, Card } from "antd";
import { CPButton, CPInput, CPDivider, CPTextArea } from "components/CP";
import CPPanel from "components/CP/CPPanel/CPPanel";
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';

import { bidderInterestService } from "services/purchase/bidder-interest/bidderInterestService";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import AdvanceTable from "components/AdvanceTable";
import TableInit from './initial/TableInit'
import GenrateLinkUploader from "components/GenrateLinkUploader";

const { useForm } = Form;

export const BiddInterest = ({
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

    let result = await bidderInterestService.getBidderInterestForCompany(companyId);
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



  const expandedRowRender = (record) => {

    return (
      <>
        <Row>
          <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
            <Alert showIcon message={`${intl.formatMessage({ id: "bidderInterestRemark", })}` + " : " + record?.remark} type="info" />
          </Col>
          {
            record?.interestConfirmRemark ?
              <Col xs={24} sm={12} md={24} className="mb-20 mt-20">
                <Alert showIcon message={`${intl.formatMessage({ id: "interestConfirmRemark", })}` + " : " + record?.interestConfirmRemark} type="info" />
              </Col>
              :
              null
          }
        </Row>
        <Row>
          <Col xs={11} sm={11} md={11} style={{ margin: '0 1%' }}>
            <GenrateLinkUploader
              items={
                record?.files
              }
              title={intl.formatMessage({
                id: "files",
              })}
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
export default BiddInterest;
