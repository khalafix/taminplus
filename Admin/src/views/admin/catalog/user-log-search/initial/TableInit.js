import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({  loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="productName" />,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <FormattedMessage id="brand" />,
      dataIndex: "brandName",
      key: "brandName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="categoryName" />,
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="categoryParent" />,
      dataIndex: "subCategoryName",
      key: "subCategoryName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="createDate" />,
      dataIndex: "createDate",
      key: "createDate",
      sorter: false,
    },
  ];
};
export default TableInit;
