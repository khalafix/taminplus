// Message
import { useIntl } from "react-intl";
import React, { useState, useEffect } from "react";
//API
import { comboServices } from "services/comboService";
const FiltersInit = () => {
  const intl = useIntl();
  const [smsType, setSmsType] = useState([]);

  const getSmsType = async () => {
    const result = await comboServices.getSmsType();
    setSmsType(result.filter(f=>f.value == 50 || f.value == 60 || f.value == 40 || f.value == 100 || f.value ==120 ));
  };
  useEffect(() => {
    getSmsType();
  }, []);
  return [
    {
      type: "text",
      name: "firstName",
      placeholder: intl.formatMessage({ id: "firstName" }),
    },
    {
      type: "text",
      name: "lastName",
      placeholder: intl.formatMessage({ id: "lastName" }),
    },
    {
      type: "text",
      name: "phonenumber",
      placeholder: intl.formatMessage({ id: "mobile" }),
    },
    {
      type: "select",
      name: "smstype",
      placeholder: `${intl.formatMessage({ id: "smsType" })}`,
      dataSelect: smsType,

    },
    {
      type: "select",
      name: "status",
      placeholder: `${intl.formatMessage({ id: "status" })}`,
      dataSelect: [{ value: true, text: intl.formatMessage({ id: "active" }) },
      { value: false, text: intl.formatMessage({ id: "deactivate" }) },],

    },
  ];
};
export default FiltersInit;
