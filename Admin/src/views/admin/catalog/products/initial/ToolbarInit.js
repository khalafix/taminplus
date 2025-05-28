// Message
import { useIntl } from "react-intl";

const ToolbarConfig = ({ onClickAdd, onClickDownload  , onClickImportExcel}) => {
  const intl = useIntl();

  return [
    {
      type: "button",
      label: intl.formatMessage({ id: "add" }),
      onClick: (type) => onClickAdd("add"),
      btnType: "primary",
      iconType: "plus",
      permissions: [],
    },
    {
      type: "excel",
      label: intl.formatMessage({ id: "exportExcel" }),
      onClick: (type) => onClickDownload("excel"),
      btnType: "danger",
      iconType: "excel",
      permissions: [],
    },
    {
      type: "excel",
      label: intl.formatMessage({ id: "importExcel" }),
      onClick: (type) => onClickImportExcel("importExcel"),
      iconType: "file",
      permissions: [],
    },
  ];
};
export default ToolbarConfig;
