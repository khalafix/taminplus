import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Checkbox, Popconfirm, Space } from "antd";

// Icon
import { RiDeleteBinLine, RiEditLine, RiEyeFill } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteItem, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="fullName" />,
      dataIndex: "fullName",

      key: "fullName",
    },
    {
      title: <FormattedMessage id="jobOpportunity" />,
      dataIndex: "jobOpportunityTitle",

      key: "jobOpportunityTitle",
    },


    {
      title: <FormattedMessage id="email" />,
      dataIndex: "email",

      key: "email",
    },

    {
      title: <FormattedMessage id="phoneNumber" />,
      dataIndex: "phoneNumber",

      key: "phoneNumber",
    },

  
    {
      title: <FormattedMessage id="createDate" />,
      dataIndex: "createDate",

      key: "createDate",
    },

    {
      title: <FormattedMessage id="status" />,
      dataIndex: "isVisited",

      key: "isVisited",
      render(value, record) {
        return {
            props: {
            },
            children:
                record?.isVisited == true ?
                    <Checkbox checked={record?.isVisited} disabled={true}><span style={{ color: "red" }}><FormattedMessage id="visited" /></span></Checkbox>
                    :
                    <Checkbox disabled={true}><span style={{ color: "black" }}><FormattedMessage id="notVisited" /></span></Checkbox>
        };
    }
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
                icon={
                  <span className="icon-box">
                    <RiEyeFill />
                  </span>
                }
                onClick={() => onChangeAction( row)}
              />
            </span>
          </CPTooltip>

        </Space>
      ),
    },
  ];
};
export default TableInit;
