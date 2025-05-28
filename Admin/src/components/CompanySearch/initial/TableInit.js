import React from "react";
import { useState } from 'react';

// Icon
import { RiEditLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import iconMap from "utils/iconMap";

const TableInit = ({ }) => {

  return [

    {
      title: <FormattedMessage id="companyName" />,
      dataIndex: "companyName",

      key: "companyName",
      sorter: false,

    },

    {
      title: <FormattedMessage id="companyType" />,
      dataIndex: "companyTypeTitle",
      render(value, record) {
        return {
          props: {
          },
          children:
            record?.hasVendor == true && record?.hasVendor == true ?
              <>
                <FormattedMessage id="vendor" /> - <FormattedMessage id="supplier" />
              </>
              : record?.hasVendor == true ? <FormattedMessage id="vendor" /> : <FormattedMessage id="supplier" />

        };
      }
    },
    // {
    //   title: <FormattedMessage id="registerBy" />,
    //   dataIndex: "registerBy",
    //   key: "registerBy",
    //   sorter: false,
    // },
    {
      title: <FormattedMessage id="hematCode" />,
      dataIndex: "hematCode",

      key: "hematCode",
      sorter: false,
    },

    {
      title: <FormattedMessage id="email" />,
      dataIndex: "email",
      key: "email",
      sorter: false,
    },




  ];

};
export default TableInit;
