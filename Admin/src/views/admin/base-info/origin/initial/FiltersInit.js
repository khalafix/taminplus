// Message
import { useIntl } from "react-intl";

const FiltersInit = () => {
  const intl = useIntl();

  return [
    {
      type: "text",
      name: "title",
      placeholder: intl.formatMessage({ id: "title" }),
    },
    
  ];
};
export default FiltersInit;
