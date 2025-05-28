import { useIntl } from "react-intl";
import React, { useState, useEffect } from "react";
//API
import { comboServices } from "services/comboService";
const FiltersInit = () => {
  const intl = useIntl();
  const [comboDataSet, setComboDataSet] = useState([]);

  return [
    {
      type: "text",
      name: "firstName",
      placeholder: `${intl.formatMessage({ id: "firstName" })}`,
    },
    {
      type: "text",
      name: "lastName",
      placeholder: `${intl.formatMessage({ id: "lastName" })}`,
    },
    {
      type: "text",
      name: "mobile",
      placeholder: `${intl.formatMessage({ id: "mobile" })}`,
    },
    {
      type: "text",
      name: "token",
      placeholder: `${intl.formatMessage({ id: "trackingCode" })}`,
    },
    {
      type: "select",
      name: "isSuccess",
      placeholder: `${intl.formatMessage({ id: "status" })}`,
      dataSelect: [{ value: true, text: intl.formatMessage({ id: "paymentSuccess" }) },
      { value: false, text: intl.formatMessage({ id: "paymentError" }) },],

    },
    {
      type: "datePicker",
      name: "fromDate",
      placeholder: `${intl.formatMessage({ id: "fromDate" })}`,
    },
    {
      type: "datePicker",
      name: "toDate",
      placeholder: `${intl.formatMessage({ id: "toDate" })}`,

    },

  ];
};
export default FiltersInit;
