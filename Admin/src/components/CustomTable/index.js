import React, { useState, useEffect, memo } from "react";
import { CPTable, CPPagination } from "components/CP";
import Filters from "../Filters";
import Toolbar from "../Toolbar";
import { Row, Col } from "antd";
import { removeEmptyValueObject } from "utils/helpers";
import { useIntl } from "react-intl";

const CustomTable = ({
  filters,
  columnsTable,
  expandedRowRender,
  apiBuilder = () => null,
  toolbar,
  rowKey = "id",
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
  dataList=[],
  rowClassName=(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark',
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
    if (hasFirstFetch) {
      getData({ size: 10, page: filterValues.page, ...initialFilters });
    } else {
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
        <Col xs={24} className="mb-10">
          <CPTable
            locale={{ emptyText: init.formatMessage({ id: "noData" }) }}
            rowKey={rowKey}
            data={data?.length > 0 ? data : dataList }
            // bordered
            size="small"
            columns={columnsTable}
            expandedRowRender={expandedRowRender}
            loading={dataList?.length > 0 ? false : loading}
            onChange={handleTableChange}
            rowClassName={rowClassName}
          />
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
          ${total}
          ${init.formatMessage({ id: "items" })}`}
            onShowSizeChange={handleOnShowSizeChange}
            total={total}
          />
        </Col>
      </Col>
    </Row>
  );
};

export default memo(CustomTable);
