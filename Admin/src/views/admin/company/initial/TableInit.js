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
const { Item } = Menu;

const TableInit = ({
  onChangeAction,
  changeStatusUser,
  deleteItem,
  loading,
  isFilter,
  show,
  setCompanyOwner
}) => {
  const intl = useIntl();

  const onClickMenu = (e, row) => {
    switch (e.key) {
      case "History":
        break;

      default:
        break;
    }
  };



  const menuItems = (row) => {
    return (
      <Menu onClick={(e) => onClickMenu(e, row)}>


        <Item key="edit" onClick={() => onChangeAction("edit", row)} >
          <FormattedMessage id="edit" />&nbsp;
          <RiEditLine />

        </Item>

        <Item
          key="delete"
        >
          <>

            <CPTooltip title={<FormattedMessage id="delete" />} key="1">
              <span>
                <Popconfirm
                  key={row.id}
                  title={`${intl.formatMessage({ id: "deleteMessage" })}`}
                  trigger="click"
                  okText={`${intl.formatMessage({ id: "yes" })}`}
                  cancelText={`${intl.formatMessage({ id: "no" })}`}
                  placement="bottom"
                  onConfirm={() => deleteItem(row.id)}
                >
                  <FormattedMessage id="delete" />&nbsp;
                  <RiDeleteBinLine />

                </Popconfirm>
              </span>
            </CPTooltip>
          </>
        </Item>

        <Item key="setCompanyOwner" onClick={() => setCompanyOwner(row)}>
          <FormattedMessage id="setCompanyOwner" />
        </Item>


      </Menu>
    );
  };

  if (isFilter == 1) {
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

    ];
  }
  else {
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

            <CPTooltip title={<FormattedMessage id="details" />} key="3">
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

            {
              <Dropdown
                key={row.requestId}
                overlay={menuItems(row)}
                trigger={["click"]}
              >
                <Button>
                  <Space>
                    <RiMoreFill />
                  </Space>
                </Button>
              </Dropdown>
            }





          </Space>
        ),
      },

    ];
  }

};
export default TableInit;
