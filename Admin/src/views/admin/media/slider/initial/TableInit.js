import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteSlider, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="title" />,
      dataIndex: "title",

      ellipsis: {
        showTitle: true,
      },
      key: "title",
    },

    // {
    //   title: <FormattedMessage id="seoTitle" />,
    //   dataIndex: "seoTitle",
    //   key: "seoTitle",
    //   sorter: false,
    // },
  
    {
      title: <FormattedMessage id="status" />,
      dataIndex: "isActiveTitle",
      key: "isActiveTitle",
      sorter: false,
    },
    {
      title: <FormattedMessage id="fromDate" />,
      dataIndex: "fromDate",
      key: "fromDate",
      sorter: false,
    },

    {
      title: <FormattedMessage id="toDate" />,
      dataIndex: "toDate",
      key: "toDate",
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
                icon={
                  <span className="icon-box">
                    <RiEditLine />
                  </span>
                }
                onClick={() => onChangeAction("edit", row)}
              />
            </span>
          </CPTooltip>

          <CPTooltip title={<FormattedMessage id="delete" />} key="2">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => deleteSlider(row.id)}
              >
                <CPButton
                  shape="circle"
                  type="primary"
                  danger
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiDeleteBinLine />
                    </span>
                  }
                />
              </Popconfirm>
            </span>
          </CPTooltip>
        </Space>
      ),
    },
  ];
};
export default TableInit;
