import React, { useState, useEffect } from "react";
// Message
import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();

  // const [comboDataSet, setComboDataSet] =useState([]);

  // const getComboDataSet = async () => {
  //   const result = await comboServices.getIndexTemplateCombo();
  //   setComboDataSet(result);
  // };
  // useEffect(() => {
  //   getComboDataSet();
  // }, []);

  return [
    // {
    //   type: "text",
    //   name: "code",

    //   placeholder: intl.formatMessage({ id: "code" }),
    // },
    {
      type: "text",
      name: "username",
      placeholder: intl.formatMessage({ id: "userName" }),
    },
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
      name: "natinalCode",
      placeholder: intl.formatMessage({ id: "natinalCode" }),
    },
  ];
};
export default FiltersInit;
