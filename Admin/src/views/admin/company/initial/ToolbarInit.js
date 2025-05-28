// Message
import { FormattedMessage, useIntl } from "react-intl";

import {
RiFileExcel2Fill
} from "react-icons/ri";

const ToolbarConfig = ({ onClickAdd , onClickExcel }) => {
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
      type: "button",
      label: intl.formatMessage({ id: "importExcel" } ) ,
      onClick: (type) => onClickExcel("importExcel"),
      permissions: [],
    },

  ];
};
export default ToolbarConfig;
