// Message
import { useIntl } from "react-intl";

const ToolbarConfig = ({ onClickAdd, onClickDownload }) => {
  const intl = useIntl();

  return [
    /* {
      type: "button",
      label: intl.formatMessage({ id: "add" }),
      onClick: (type) => onClickAdd("add"),
      btnType: "primary",
      iconType: "plus",
      permissions: [],
    }, */
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
