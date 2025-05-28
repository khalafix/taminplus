import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, deleteFeature, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="fullName" />,
      dataIndex: "fullName",

      key: "fullName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="mobile" />,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: false,
    },

    {
      title: <FormattedMessage id="codeSent" />,
      dataIndex: "code",
      key: "code",
      sorter: false,
    },

    {
      title: <FormattedMessage id="smsType" />,
      dataIndex: "type",
      key: "type",
      sorter: false,
    },

    {
      title: <FormattedMessage id="status" />,
      dataIndex: "status",
      key: "status",
      sorter: false,
    },
    {
      title: <FormattedMessage id="createDate" />,
      dataIndex: "actionTime",
      key: "actionTime",
      sorter: false,
    },

  ];
};
export default TableInit;
