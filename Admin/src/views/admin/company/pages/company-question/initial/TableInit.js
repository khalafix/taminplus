import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space, Tag } from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import { Color } from "utils/color";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, deleteItem, loading }) => {
  const intl = useIntl();
  const status = {
    1: {
      color: Color.blue,
      text: "NotVisited",
    },
    2: {
      color: Color.yellow,
      text: "Visited",
    },
    3: {
      color: Color.green,
      text: "Answered",
    },
  };

  return [
    {
      title: <FormattedMessage id="question" />,
      dataIndex: "title",

      ellipsis: {
        showTitle: true,
      },
      key: "question",
      sorter: false,
    },
    {
      title: <FormattedMessage id="companyName" />,//question
      dataIndex: "companyName",


      key: "companyName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="userName" />,//question
      dataIndex: "userName",


      key: "userName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="status" />,
      key: "companyQuestionStatus",
      sorter: false,
      dataIndex: "companyQuestionStatusTitle",

      // render: (row) => (
      //   <Tag color={status[row.companyQuestionStatus].color}>
      //     {row.companyQuestionStatusTitle}
      //   </Tag>
      // ),
    },
    {
      title: <FormattedMessage id="sendDate" />,//question
      dataIndex: "createDateStr",


      key: "createDateStr",
      sorter: false,
    },
    {
      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (
        <Space>
          <CPTooltip title={<FormattedMessage id="answer" />} key="1">
            <span>
              <CPButton onClick={() => onChangeAction("edit", row)} type="primary">{intl.formatMessage({ id: "show" })}</CPButton>
            </span>
          </CPTooltip>
        </Space>
      ),
    },
  ];
};
export default TableInit;
