import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Checkbox, Popconfirm, Space } from "antd";

// Icon
import { RiDeleteBinLine, RiEditLine, RiEye2Fill, RiEyeFill } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteItem, loading }) => {
  const intl = useIntl();

  return [


    {
      title: <FormattedMessage id="mobile" />,
      dataIndex: "mobile",

      key: "mobile",
    },

    {
      title: <FormattedMessage id="fullName" />,
      dataIndex: "fullName",

      key: "fullName",
    },


    {
      title: <FormattedMessage id="productName" />,
      dataIndex: "productName",

      key: "productName",
    },

    


    {
      title: <FormattedMessage id="createDate" />,
      dataIndex: "createDate",

      key: "createDate",
    },


  ];
};
export default TableInit;
