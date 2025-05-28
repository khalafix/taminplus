import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="title" />,
      dataIndex: "title",
      key: "title",
      sorter: false,
    },
    {
      title: <FormattedMessage id="status" />,
      dataIndex: "status",
      key: "status",
      sorter: false,
    },
    {
      title: <FormattedMessage id="userOpinionType" />,
      dataIndex: "userOpinionTypeTitle",
      key: "userOpinionTypeTitle",
      sorter: false,
    },
    {
      title: <FormattedMessage id="registerUser" />,
      dataIndex: "senderUser",
      key: "senderUser",
      sorter: false,
    },

    {
      title: <FormattedMessage id="registerDate" />,
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

        </Space>
      ),
    },
  ];
};
export default TableInit;
