// Message
import { useIntl } from "react-intl";

const ToolbarConfig = ({ onClickAdd, onClickDownload }) => {
  const intl = useIntl();

  return [
    {
      type: "excel",
      label: intl.formatMessage({ id: "exportExcel" }),
      onClick: (type) => onClickDownload("excel"),
      btnType: "danger",
      iconType: "excel",
      permissions: [],
    },
  ];
};
export default ToolbarConfig;
