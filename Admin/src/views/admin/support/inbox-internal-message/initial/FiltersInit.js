// Message
import { useIntl } from "react-intl";

const FiltersInit = () => {
  const intl = useIntl();

  return [
    {
      type: "text",
      name: "subject",
      placeholder: intl.formatMessage({ id: "subject" }),
    },
    {
      type: "text",
      name: "company",
      placeholder: intl.formatMessage({ id: "company" }),
    },
    {
      type: "text",
      name: "receiverEmail",
      placeholder: intl.formatMessage({ id: "email" }),
    },
  ];
};
export default FiltersInit;
