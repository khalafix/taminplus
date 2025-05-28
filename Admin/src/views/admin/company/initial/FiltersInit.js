import { useIntl } from "react-intl";
import React, { useState, useEffect } from "react";
//API
import { comboServices } from "services/comboService";
const FiltersInit = () => {
  const intl = useIntl();
  const [comboDataSet, setComboDataSet] = useState([]);

  const getComboDataSet = async () => {
    const result = await comboServices.getRegisterByCombo();
    setComboDataSet(result);
  };
  useEffect(() => {
    getComboDataSet();
  }, []);
  return [

    {
      type: "text",
      name: "companyName",

      placeholder: intl.formatMessage({ id: "companyName" }),
    },
    
    {
      type: "text",
      name: "hematCode",
      placeholder: intl.formatMessage({ id: "hematCode" }),
    },

    {
      type: "select",
      name: "registerBy",
      placeholder:`${intl.formatMessage({ id: "registerBy" })}`,
      dataSelect: comboDataSet,
      
    },
  ];
};
export default FiltersInit;