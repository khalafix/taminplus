import React from "react";

// UI
import { CPButton, CPTooltip } from "components/CP";
import { Popconfirm, Space } from "antd";

// Message
import { FormattedMessage, useIntl } from "react-intl";
// Util
import CheckPermissions from "utils/checkPermissions";
// Constants
import { ListPermissions } from "../../../constants";
import iconMap from "utils/iconMap";

const TableInit = ({ onChangeAction, onDelete, loading }) => {
  const intl = useIntl();

  return [
    {
      title: <FormattedMessage id="code" />,
      dataIndex: "code",

      ellipsis: {
        showTitle: true,
      },
      key: "code",
    },
    {
      title: <FormattedMessage id="title" />,
      dataIndex: "title",

      ellipsis: {
        showTitle: true,
      },
      key: "title",
    },
    {
      title: <FormattedMessage id="sections" />,
      dataIndex: "disciplineTitles",

      ellipsis: {
        showTitle: true,
      },
      key: "disciplineTitles",
      render: (item) => ` ${item}`,
    },
    {
      title: <FormattedMessage id="status" />,
      dataIndex: "isActive",
      key: "isActive",
      align: "center",

      render: (item) => (
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
      width: 100,
      render: (row) => (
        <Space>
          {/* <CheckPermissions permissions={[ListPermissions.EDIT_TAG]}> */}
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
          {/* </CheckPermissions>
          <CheckPermissions permissions={[ListPermissions.DELETE_TAG]}> */}
          <CPTooltip title={<FormattedMessage id="delete" />} key="1">
            <span>
              <Popconfirm
                key={row.id}
                title={`${intl.formatMessage({ id: "deleteMessage" })}
             `}
                trigger="click"
                okText={`${intl.formatMessage({ id: "yes" })}`}
                cancelText={`${intl.formatMessage({ id: "no" })}`}
                placement="bottom"
                onConfirm={() => onDelete(row.id)}
              >
                <CPButton
                  shape="circle"
                  type="primary"
                  disabled={loading}
                  danger
                  icon={
                    <span className="icon-box">{iconMap["deleteIcon"]}</span>
                  }
                />
              </Popconfirm>
            </span>
          </CPTooltip>
          {/*    </CheckPermissions> */}
        </Space>
      ),
    },
  ];
};
export default TableInit;
