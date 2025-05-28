import React from "react";
import { useState } from 'react';

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space, Dropdown, Menu, Button, Checkbox } from "antd";

// Icon
import { RiInformationFill, RiMoreFill } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const { Item } = Menu;

const TableInit = ({showMoreData  }) => {
  return [
    {
      title: <FormattedMessage id="companyName" />,
      dataIndex: "companyName",

      ellipsis: {
        showTitle: true,
      },
      key: "companyName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="hematCode" />,
      dataIndex: "hematCode",

      ellipsis: {
        showTitle: true,
      },
      key: "hematCode",
      sorter: false,
    },
    {
      title: <FormattedMessage id="companyShortName" />,
      dataIndex: "exName",
      key: "exName",
      sorter: false,
    },

    {
      title: <FormattedMessage id="companyRegisteredDate" />,
      dataIndex: "companyRegistered",
      key: "companyRegistered",
      sorter: false,
    },

    {
      title: <FormattedMessage id="registeringBy" />,
      dataIndex: "registerBy",
      key: "registerBy",
      sorter: false,
    },


    {
      title: <FormattedMessage id="phone" />,
      dataIndex: "phone",
      key: "phone",
      sorter: false,
    },
    {
      title: <FormattedMessage id="website" />,
      dataIndex: "website",
      key: "website",
      sorter: false,
    },

    {
      title: <FormattedMessage id="email" />,
      dataIndex: "email",
      key: "email",
      sorter: false,
    },


    {


      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (

        <Space>

          <CPTooltip title={<FormattedMessage id="details" />} key="3">
            <span>
              <CPButton
                shape="circle"
                icon={
                  <span className="icon-box">
                    <RiInformationFill />
                  </span>
                }
                onClick={() => showMoreData(row.companyId)}
              />
            </span>
          </CPTooltip>


        </Space>
      ),
    },
  ];

  
  


};
export default TableInit;
