import React from "react";
import { Table, Typography } from "antd";

const { Text } = Typography;

const Index = ({ data, handleClick }) => {
  const column = [
    { key: "Title", title: "عنوان", dataIndex: "Title" },
    ...(data?.columns?.map((q) => ({
      key: q.dataIndex,
      title: q.title,
      dataIndex: q.columnName,
      sorter: (a, b) => a[q.columnName] - b[q.columnName],
    })) ?? []),
  ];

  return (
    <div className="p-20">
      <Table
        columns={column}
        bordered
        dataSource={data?.data}
        pagination={false}
        size="middle"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleClick(record);
            }, // click row
            /*  onDoubleClick: (event) => {
              handleClick(record);
            }, // double click row */
          };
        }}

        /* summary={(pageData) => {
          let totalBorrow = 0;
          let totalRepayment = 0;

          pageData.forEach(({ borrow, repayment }) => {
            totalBorrow += borrow;
            totalRepayment += repayment;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>
                  <Text type="danger">{totalBorrow}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">{totalRepayment}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }} */
      />
    </div>
  );
};

export default Index;
