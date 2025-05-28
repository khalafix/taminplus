// Message
import { useIntl } from "react-intl";

const FiltersInit = () => {
  const intl = useIntl();

  return [
    {
      type: "text",
      name: "brandName",
      placeholder: intl.formatMessage({ id: "brand" }),
    },
    {
      type: "text",
      name: "productName",
      placeholder: intl.formatMessage({ id: "productName" }),
    },
    {
      type: "text",
      name: "categoryName",
      placeholder: intl.formatMessage({ id: "categoryName" }),
    },
    {
      type: "text",
      name: "subCategoryName",
      placeholder: intl.formatMessage({ id: "categoryParent" }),
    },
  ];
};
export default FiltersInit;
