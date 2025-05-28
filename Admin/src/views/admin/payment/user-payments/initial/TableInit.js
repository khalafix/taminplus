import React, { useState } from "react";

// UI
import { CPButton, CPInput, CPTooltip, CPTextArea } from "components/CP";
import { Popconfirm, Space, Input, Button, Dropdown, Menu } from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { Color } from "utils/color";

import iconMap from "utils/iconMap";

import { RiCheckFill } from "react-icons/ri";

const TableInit = ({ onShowDetails }) => {
  const intl = useIntl();


  return [
    {
      title: <FormattedMessage id="firstName" />,
      key: "firstName",
      sorter: false,
      dataIndex: "firstName",
    },

    {
      title: <FormattedMessage id="lastName" />,
      key: "lastName",
      sorter: false,
      dataIndex: "lastName",
    },

    {
      title: <FormattedMessage id="mobile" />,
      key: "mobile",
      sorter: false,
      dataIndex: "mobile",
    },

    {
      title: <FormattedMessage id="trackingCode" />,
      dataIndex: "token",

      key: "token",
      sorter: false,
    },
    {
      title: <FormattedMessage id="amount" />,
      dataIndex: "amount",

      key: "amount",
      sorter: false,

      render: (row) => (

        <span>{row?.toLocaleString()}</span>
      ),
    },
    {
      title: <FormattedMessage id="status" />,
      key: "status",
      sorter: false,
      dataIndex: "status",

    },
    {
      title: <FormattedMessage id="paymentDate" />,
      dataIndex: "orderDate",

      key: "orderDate",
      sorter: false,
    },



    // {
    //   title: <FormattedMessage id="personDetails" />,
    //   key: "action",
    //   align: "center",

    //   render: (row) => {
    //     return {
    //       props: {
    //         // style: { background: row?.isActive == false ? Color.red : Color.white }

    //       }, children:
    //         <Space>

    //           {
    //             <CPTooltip title={<FormattedMessage id="personDetails" />} key="8">
    //               <span>
    //                 <CPButton
    //                   shape="circle"
    //                   icon={<span style={{ padding: "4px" }} className="icon-box">{iconMap["AiOutlineInfo"]}</span>}
    //                   type="primary"
    //                   onClick={() => onShowDetails(row)}
    //                 >
    //                   &nbsp;
    //                   {/* <FormattedMessage id="show" /> */}
    //                 </CPButton>
    //               </span>
    //             </CPTooltip>
    //           }



    //         </Space >
    //     };
    //   }
    // },

  ];
};
export default TableInit;
