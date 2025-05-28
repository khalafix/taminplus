import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, deleteItem, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="orderNumber" />,
      dataIndex: "orderNumber",

      key: "orderNumber",
    },
    {
      title: <FormattedMessage id="customerName" />,
      dataIndex: "customerName",

      key: "customerName",
    },
    {
      title: <FormattedMessage id="mobile" />,
      dataIndex: "phoneNumber",

      key: "phoneNumber",
    },
    {
      title: <FormattedMessage id="province" />,
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      sorter: false,
    },
    {
      title: <FormattedMessage id="city" />,
      dataIndex: "city",
      key: "city",
      sorter: false,
    },
    {
      title: <FormattedMessage id="koponAmount" />,
      dataIndex: "koponAmount",
      key: "koponAmount",
      sorter: false,
      render: (row) => (
        <span>{row.toLocaleString()}</span>
      )
    },
    {
      title: <FormattedMessage id="finalAmount" />,
      dataIndex: "finalAmount",
      key: "finalAmount",
      sorter: false,
      render: (row) => (
        <span>{row.toLocaleString()}</span>
      )

    },

    {
      title: <FormattedMessage id="status" />,
      dataIndex: "orderStatusTitle",
      key: "orderStatusTitle",
      sorter: false,
    },
    {
      title: <FormattedMessage id="createDate" />,
      dataIndex: "createDate",
      key: "createDate",
      sorter: false,
    },
    {
      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (
        <Space>
          <CPTooltip title={<FormattedMessage id="edit" />} key="1">
            <span>
              <CPButton
                shape="circle"
                disabled={loading}
                icon={<span className="icon-box">{iconMap["editIcon"]}</span>}
                onClick={() => onChangeAction("edit", row)}
              />
            </span>
          </CPTooltip>
{/* 
          <CPTooltip title={<FormattedMessage id="delete" />} key="2">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => deleteItem(row.id)}
              >
                <CPButton
                  shape="circle"
                  type="primary"
                  danger
                  disabled={loading}
                  icon={
                    <span className="icon-box">{iconMap["deleteIcon"]}</span>
                  }
                />
              </Popconfirm>
            </span>
          </CPTooltip> */}
        </Space>
      ),
    },
  ];
};
export default TableInit;
