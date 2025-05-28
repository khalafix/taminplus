import React from "react";

// UI
import { CPSwitch, CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import {
  RiDeleteBinLine,
  RiEditLine,
  RiInformationFill,
  RiLockPasswordLine,
} from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInitForFilter = ({show}) => {
  const intl = useIntl();
  
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
        title: <FormattedMessage id="companyNationalCode" />,
        dataIndex: "companyNationalCode",
        key: "companyNationalCode",
        sorter: false,
      },
      {
        title: <FormattedMessage id="companyRegisteredNumber" />,
        dataIndex: "companyRegisteredNumber",
        key: "companyRegisteredNumber",
        sorter: false,
      },

      {
        title: <FormattedMessage id="companyRegisteredDate" />,
        dataIndex: "shamsiCompanyRegisteredDate",
        key: "shamsiCompanyRegisteredDate",
        sorter: false,
      },

      {
        title: <FormattedMessage id="registeringBy" />,
        dataIndex: "registerBy",
        key: "registerBy",
        sorter: false,
      },
      {
        title: <FormattedMessage id="registeringUser" />,
        dataIndex: "registeringUser",
        key: "registeringUser",
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


        title: <FormattedMessage id="action" />,
        key: "action",
        align: "center",

        render: (row) => (
          <Space>
            <CPTooltip title={<FormattedMessage id="details" />} key="1">
              <span>
                <CPButton
                  shape="circle"
                  icon={
                    <span className="icon-box">
                      <RiInformationFill />
                    </span>
                  }
                  onClick={() => show(row.id)}
                />
              </span>
            </CPTooltip>

          </Space>
        ),
      },
    ];


};
export default TableInitForFilter;
