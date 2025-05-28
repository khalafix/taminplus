// Message
import { useIntl } from "react-intl";
// Constants
import { ListPermissions } from "../../../constants";

const ToolbarConfig = ({ onClickAdd, onClickDownload }) => {
  const intl = useIntl();

  return [
    {
      type: "button",
      label: intl.formatMessage({ id: "add" }),
      onClick: (type) => onClickAdd("add"),
      btnType: "primary",
      iconType: "plus",
      permissions: [ListPermissions.ADD_TAG],
    },
  ];
};
export default ToolbarConfig;
