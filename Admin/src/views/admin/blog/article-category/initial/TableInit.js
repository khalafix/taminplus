import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, deletItem, loading }) => {
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
      title: <FormattedMessage id="status" />,
      dataIndex: "isActiveTitle",
      key: "isActiveTitle",
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

          <CPTooltip title={<FormattedMessage id="delete" />} key="2">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => deletItem(row.id)}
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
          </CPTooltip>
        </Space>
      ),
    },
  ];
};
export default TableInit;
