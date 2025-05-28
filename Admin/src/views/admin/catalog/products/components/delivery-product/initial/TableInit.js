import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Col, Popconfirm, Row, Space } from "antd";

// Icon
import { RiBook2Fill, RiDeleteBinLine, RiEditLine, RiFile2Fill, RiMoneyCnyBoxLine, RiMoneyDollarCircleFill, RiMoneyPoundCircleLine, RiProductHuntLine, RiVideoAddFill } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const TableInit = ({ onChangeAction, deleteDeliveryProduct , loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="province" />,
      dataIndex: "provinceTitle",

      ellipsis: {
        showTitle: true,
      },
      key: "provinceTitle",
    },

    {
      title: <FormattedMessage id="cost" />,
      dataIndex: "cost",
      key: "cost",
      render: (row) => (
        <>{row.toLocaleString()}</>
      ),
      sorter: false,
    },

    {
      title: <FormattedMessage id="deliveryType" />,
      dataIndex: "deliveryTypeTitle",
      key: "deliveryTypeTitle",

      sorter: false,
    },
 


    {
      title: <FormattedMessage id="action" />,
      key: "action",
      align: "center",

      render: (row) => (
        <Space>



          <CPTooltip title={<FormattedMessage id="edit" />} key="1">
            <span>
              <CPButton
                shape="circle"
                disabled={loading}
                icon={
                  <span className="icon-box">
                    <RiEditLine />
                  </span>
                }
                onClick={() => onChangeAction("edit", row)}
              />
            </span>
          </CPTooltip>


          <CPTooltip title={<FormattedMessage id="delete" />} key="2">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => deleteDeliveryProduct(row.id)}
              >
                <CPButton
                  shape="circle"
                  type="primary"
                  danger
                  disabled={loading}
                  icon={
                    <span className="icon-box">
                      <RiDeleteBinLine />
                    </span>
                  }
                />
              </Popconfirm>
            </span>
          </CPTooltip>
        </Space>
      ),
    },
  ];
};
export default TableInit;
