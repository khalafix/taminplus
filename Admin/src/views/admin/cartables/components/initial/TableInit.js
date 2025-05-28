import React from "react";

// UI
import { CPSwitch, CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space, Dropdown, Menu, Button } from "antd";

// Icon
import {
  RiDeleteBinLine,
  RiEditLine,
  RiInformationFill,
  RiLockPasswordLine,
  RiUser2Fill,
  RiMoreFill
} from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";
const { Item } = Menu;

const TableInit = ({
  show, getColumnSearchProps
}) => {
  const intl = useIntl();
  return [
    {
      title: <FormattedMessage id="title" />,
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
      sorter: false,
    },
    {
      title: <FormattedMessage id="senderUser" />,
      dataIndex: "senderUser",
      key: "senderUser",
      ...getColumnSearchProps('senderUser'),
      sorter: false,
    },
    {
      title: <FormattedMessage id="visited" />,
      dataIndex: "visitedTitle",
      key: "visitedTitle",
      ...getColumnSearchProps('visitedTitle'),
      sorter: false,
    },
    {
      title: <FormattedMessage id="visitedDate" />,
      dataIndex: "visitedDate",
      key: "visitedDate",
      ...getColumnSearchProps('visitedDate'),
      sorter: false,
    },

    {
      title: <FormattedMessage id="action" />,
      key: "details",
      align: "details",
      render: (row) => (
        <Space>
          <CPTooltip title={<FormattedMessage id="details" />} key="2">
            <span>
              <CPButton
                shape="circle"
                icon={<span className="icon-box">{iconMap["AiOutlineInfo"]}</span>}
                onClick={() => show(row)}
              />
            </span>
          </CPTooltip>
        </Space>
      )
    }
  ];

};
export default TableInit;
