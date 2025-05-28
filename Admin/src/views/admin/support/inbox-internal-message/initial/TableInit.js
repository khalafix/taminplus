import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Space } from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, deleteFeature, loading }) => {
  const intl = useIntl();
  
  return [
    {
      title: <FormattedMessage id="subject" />,
      dataIndex: "subject",

      ellipsis: {
        showTitle: true,
      },
      key: "subject",
      sorter: true,
    },
    {
      title: <FormattedMessage id="messageType" />,
      dataIndex: "userMessageTypeTitle",

      ellipsis: {
        showTitle: true,
      },
      key: "userMessageTypeTitle",
      sorter: true,
    },
    {
      title: <FormattedMessage id="senderUser" />,
      dataIndex: "senderUserName",

      ellipsis: {
        showTitle: true,
      },
      key: "senderUserName",
      sorter: true,
    },
    {
      title: <FormattedMessage id="company" />,
      dataIndex: "companyName",

      ellipsis: {
        showTitle: true,
      },
      key: "companyName",
      sorter: true,
    },
    {
      title: <FormattedMessage id="sendDate" />,
      dataIndex: "sendDateString",

      ellipsis: {
        showTitle: true,
      },
      key: "sendDateString",
      sorter: true,
    },
    {
      title: <FormattedMessage id="visitedDate" />,
      dataIndex: "visitedFromAppDateString",

      ellipsis: {
        showTitle: true,
      },
      key: "visitedFromAppDateString",
      sorter: true,
    },
    {
      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (
        <Space>
          <CPTooltip title={<FormattedMessage id="show" />} key="1">
            <span>
              <CPButton
                shape="circle"
                disabled={loading}
                icon={<span className="icon-box">{iconMap["AiOutlineMail"]}</span>}
                onClick={() => onChangeAction("show", row)}
              />
            </span>
          </CPTooltip>
        </Space>
      ),
    },
  ];
};
export default TableInit;
