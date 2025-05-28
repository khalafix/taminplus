import React, { useState, useEffect, memo } from "react";
import { CPTable, CPPagination } from "components/CP";
import Filters from "../Filters";
import Toolbar from "../Toolbar";
import { Row, Col, Table , Alert } from "antd";
import { removeEmptyValueObject } from "utils/helpers";
import { useIntl } from "react-intl";

const AdvanceTable = ({
  isExpandRowGrid = false,
  expandRowColumns = [],
  expandRowData = [],
  filters,
  columnsTable,
  expandedRowRender,
  rowClassName=(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark',
  islocalData = false,
  gridData = null,
  apiBuilder = () => null,
  toolbar,
  rowKey = "id",
  rowKeyChildren = "id",
  hidePagination,
  setParentLoading = () => null,
  hasFirstFetch = true,
  setAgainFetch = () => null,
  againFetch = false,
  initialFilters,
  setOutPutData = () => null,
  sizeTable = 24,
  hasValidationFiltersDates = false,
  openAdvanceFilters = true,
  rowSelection,
  hasAlert = false,
  isScroll=false,
  title
}) => {
  const init = useIntl();
  const [filterValues, setFilterValues] = useState({
    page: 1,
  });
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const intl = useIntl();

  useEffect(() => {
    if (!loading) {
      getData({ ...filterValues, size, ...initialFilters });
    }
  }, [filterValues, size]);

  useEffect(() => {
    if (againFetch) {
      getData({ size: 10, ...filterValues, ...initialFilters });
    }
  }, [againFetch]);


  useEffect(() => {
    if (islocalData) {
      setData(gridData);
      setLoading(false);
      setParentLoading(false);
      setAgainFetch(false);
      setLoading(false);
    }

  }, [gridData]);

  useEffect(() => {
    if (!islocalData) {
      if (hasFirstFetch) {
        getData({ size: 10, page: filterValues.page, ...initialFilters });
      } else {
        setLoading(false);
        setParentLoading(false);
      }
    } else {
      setData(gridData);
      setLoading(false);
      setParentLoading(false);
    }

  }, []);

  const getData = async (data) => {
    setLoading(true);
    setParentLoading(true);
    const result = await apiBuilder(data);

    if (result?.isSuccess) {
      successGetData(result);
    } else {
      errorGetData(result);
    }
  };
  const successGetData = (res) => {
    setData([]);
    const { data, total, size } = res;
    if (data) {
      setData(data);
    }
    setSize(size);
    setTotal(total);
    setAgainFetch(false);
    setLoading(false);
    setParentLoading(false);
  };
  const errorGetData = (err) => {
    setLoading(false);
    setParentLoading(false);
    setError(err);
    setAgainFetch(false);
  };

  const handleOnShowSizeChange = (current, size) => {
    setSize(size);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter?.order) {
      getData({
        ...filterValues,
        size,
        ...initialFilters,
        sorted: [
          {
            column: sorter?.field,
            desc: sorter?.order === "descend" ? true : false,
          },
        ],
      });
    } else {
      getData({ ...filterValues, size, ...initialFilters });
    }
  };



  return (
    <Row gutter={10}>
      <Col span={sizeTable}>
        <Col xs={24} className="mb-10">
          <Filters
            filters={filters}
            onChange={(data) => {
              setFilterValues({ page: 1, filtered: data });
            }}
            hasValidationFiltersDates={hasValidationFiltersDates}
            openAdvanceFilters={openAdvanceFilters}
          />
        </Col>
        <Col xs={24} className="mb-10">
          <Toolbar items={toolbar} />
        </Col>
        <Col xs={24}>
          <CPPagination
            hideOnSinglePage={hidePagination}
            showSizeChanger
            current={filterValues?.page}
            onChange={(page) =>
              setFilterValues({ ...filterValues, page: page })
            }
            showTotal={(total, range) => `
          ${range[0]}
          ${init.formatMessage({ id: "from" })}
          ${range[1]}
          ${init.formatMessage({ id: "of" })}
          ${total.toLocaleString()}
          ${init.formatMessage({ id: "items" })}`}
            onShowSizeChange={handleOnShowSizeChange}
            total={total}
          />
        </Col>
        <Col xs={24} className="mb-10">
          {
            !isExpandRowGrid ?
              <CPTable
                locale={{ emptyText: init.formatMessage({ id: "noData" }) }}
                rowKey={rowKey}
                data={data}
                // bordered
                size="small"
                title={title}
                columns={columnsTable}
                //expandedRowRender={expandedRowRender}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={rowClassName}
                expandedRowRender={expandedRowRender}
                rowSelection={rowSelection}
                scroll={isScroll==true ?{
                  y: 500,
                }:null}
              />
              :
              <CPTable
                locale={{ emptyText: init.formatMessage({ id: "noData" }) }}
                rowKey={rowKey}
                data={data}
                // bordered
                size="small"
                title={title}
                scroll={isScroll==true ?{
                  y: 500,
                }:null}
                columns={columnsTable}
                //expandedRowRender={expandedRowRender}
                loading={loading}
                onChange={handleTableChange}
                rowClassName={rowClassName}
                expandedRowRender={record => (
                  hasAlert == false ?
                    <CPTable rowKey={rowKeyChildren} columns={expandRowColumns} data={record.items} />
                    :
                    <>
                      <div style={{ marginBottom: "1%" }}>
                        <p style={{ margin: 0 }}>{
                          record.isAccept == false ?
                            <Alert showIcon message={intl.formatMessage({ id: "rejectRemark" }) + " : "
                              + record.remark} type="error" />
                            : record.isAccept == true ?
                              <Alert showIcon message={intl.formatMessage({ id: "acceptRemark" }) + " : "
                                + record.remark} type="success" />
                              :
                              <Alert showIcon message={`${intl.formatMessage({ id: "noMessage", })}`} type="warning" />
                        }</p></div>
                      <CPTable rowKey={rowKeyChildren} columns={expandRowColumns} data={record.items} />

                    </>

                )}

                rowSelection={rowSelection}

              />
          }
        </Col>
      </Col>
    </Row>
  );
};

export default memo(AdvanceTable);
