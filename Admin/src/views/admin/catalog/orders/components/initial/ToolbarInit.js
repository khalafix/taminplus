// Message
import { useIntl } from "react-intl";

const ToolbarConfig = ({ onClickAdd, onClickDownload }) => {
  const intl = useIntl();

  return [
    // {
    //   type: "button",
    //   label: intl.formatMessage({ id: "add" }),
    //   onClick: (type) => onClickAdd("add"),
    //   btnType: "primary",
    //   iconType: "plus",
    //   permissions: [],
    // },
  ];
};
export default ToolbarConfig;
