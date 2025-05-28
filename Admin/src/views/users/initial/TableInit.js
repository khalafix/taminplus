import React from "react";

// UI
import { CPSwitch, CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Icon
import { RiLockPasswordLine } from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";
import CheckPermissions from "utils/checkPermissions";
import iconMap from "utils/iconMap";

const TableInit = ({
  onChangeAction,
  changeStatusUser,
  deleteItem,
  loading,
}) => {
  const intl = useIntl();
  return [
    // {
    //   title: <FormattedMessage id="code" />,
    //   dataIndex: "code",

    //   ellipsis: {
    //     showTitle: true,
    //   },
    //   key: "code",
    //   sorter: true,
    // },
    {
      title: <FormattedMessage id="emailUserName" />,
      dataIndex: "userName",
      key: "userName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="firstName" />,
      dataIndex: "firstName",
      key: "firstName",
      sorter: false,
    },
    {
      title: <FormattedMessage id="lastName" />,
      dataIndex: "lastName",
      key: "lastName",
      sorter: false,
    },
    // {
    //   title: <FormattedMessage id="userType" />,
    //   dataIndex: "userTypeTitle",
    //   key: "userTypeTitle",
    //   sorter: false,
    // },
    {
      title: <FormattedMessage id="roles" />,
      dataIndex: "rolesName",

      ellipsis: {
        showTitle: false,
      },
      key: "rolesName",
      render: (item) => (
        <CPTooltip title={<span>{` ${item}`}</span>} placement={"topRight"}>
          <span>{` ${item}`}</span>
        </CPTooltip>
      ),
    },
    {
      title: <FormattedMessage id="status" />,
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      sorter: false,

      // eslint-disable-next-line react/display-name
      render: (item) => (
        /*   <CPSwitch
          checked={status}
          onChange={(value) =>
            changeStatusUser(row.id, {
              isActive: value,
            })
          }
        /> */
        <>
          {item ? (
            <FormattedMessage id="active" />
          ) : (
            <FormattedMessage id="deactivate" />
          )}
        </>
      ),
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
                icon={<span className="icon-box">{iconMap["editIcon"]}</span>}
                onClick={() => onChangeAction("edit", row)}
              />
            </span>
          </CPTooltip>
          <CPTooltip title={<FormattedMessage id="resetPassword" />} key="1">
            <span>
              <CPButton
                shape="circle"
                disabled={loading}
                icon={
                  <span className="icon-box">
                    <RiLockPasswordLine />
                  </span>
                }
                onClick={() => onChangeAction("reset-password", row)}
              />
            </span>
          </CPTooltip>
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
                <CPButton
                  shape="circle"
                  type="primary"
                  danger
                  disabled={loading}
                  icon={
                    <span className="icon-box">{iconMap["deleteIcon"]}</span>
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
