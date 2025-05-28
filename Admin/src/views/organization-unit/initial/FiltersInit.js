import React, { useState, useEffect } from "react";

//API
import { comboServices } from "services/comboService";

// Message
import { useIntl } from "react-intl";

const FiltersInit = () => {
  const intl = useIntl();
  /*  const [comboDataSet, setComboDataSet] = useState({});

  const getComboDataSet = async () => {
    const result = await comboServices.getIndexTemplateCombo();

    setComboDataSet(result);
  };
  useEffect(() => {
    getComboDataSet();
  }, []); */
  return [
    {
      type: "text",
      name: "code",

      placeholder: intl.formatMessage({ id: "code" }),
    },
    {
      type: "text",
      name: "title",

      placeholder: intl.formatMessage({ id: "title" }),
    },
    /*  {
      type: "select",
      name: "organizationUnitId",
      placeholder: intl.formatMessage({ id: "organizationUnitTitle" }),
      dataSelect: comboDataSet.organizationUnits,
    } */
  ];
};
export default FiltersInit;
