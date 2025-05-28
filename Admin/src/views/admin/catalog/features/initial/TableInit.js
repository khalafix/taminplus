import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Checkbox, Popconfirm, Space } from "antd";

// Icon
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteFeature, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="title" />,
      dataIndex: "title",

      ellipsis: {
        showTitle: true,
      },
      key: "title",
      sorter: true,
    },
    {
      title: <FormattedMessage id="symbol" />,
      dataIndex: "symbolTitle",
      key: "symbolTitle",
      sorter: false,
    },
    {
      title: <FormattedMessage id="controlType" />,
      dataIndex: "controlTypeTitle",
      key: "controlTypeTitle",
      sorter: false,
    },

    {
      title: <FormattedMessage id="isShowInFilter" />,
      dataIndex: "showInFilter",

      ellipsis: {
          showTitle: true,
      },
      key: "showInFilter",
      sorter: false,
      render(value, record) {
          return {
              props: {
              },
              children:
                  record?.showInFilter == true ?
                      <Checkbox checked={record?.showInFilter} disabled={true}><span style={{ color: "red" }}><FormattedMessage id="isShowInFilter" /></span></Checkbox>
                      :
                      <Checkbox disabled={true}><span style={{ color: "black" }}><FormattedMessage id="isShowInFilter" /></span></Checkbox>
          };
      }

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
                onConfirm={() => deleteFeature(row.id)}
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
