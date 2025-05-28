// Message
import { useIntl } from "react-intl";

const ToolbarConfig = ({ onClick, onClickDownload }) => {
  const intl = useIntl();

  return [
    {
      type: "button",
      label: intl.formatMessage({ id: "add" }),
      onClick: (type) => onClick("add"),
      btnType: "primary",
      /*       iconType: "plus" */
      permissions: [],
    },
    {
      type: "button",
      label: intl.formatMessage({ id: "edit" }),
      onClick: (type) => onClick("edit"),
      btnType: "primary",
      permissions: [],
    },
    {
      type: "button",
      label: intl.formatMessage({ id: "managementPermissions" }),
      btnType: "primary",
      onClick: (type) => onClick("permissions"),
      permissions: [],
    },
    // {
    //   type: "button",
    //   label: intl.formatMessage({ id: "permissionDashboards" }),
    //   btnType: "primary",
    //   onClick: (type) => onClick("permission-dashboards"),
    //   permissions: [],
    // },
    {
      type: "button",
      label: intl.formatMessage({ id: "delete" }),
      btnType: "primary",
      danger: true,
      onClick: (type) => onClick("delete"),
      permissions: [],
    },

    // {
    //   type: "dropdown",
    //   label: intl.formatMessage({ id: "downloadLists" }),
    //   onClick: (data    ) => onClickDownload(data),
    //   menuList: [
    //     { name: <FormattedMessage id="excel" />, value: "excel" },
    //     { name: <FormattedMessage id="csv" />, value: "csv" },
    //     { name: <FormattedMessage id="txt" />, value: "txt" }
    //   ]
    // }
  ];
};
export default ToolbarConfig;
