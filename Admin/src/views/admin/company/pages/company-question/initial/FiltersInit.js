import React, { useState, useEffect } from "react";
// Message
import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();

  const [comboDataSet, setComboDataSet] = useState({});

  const getComboDataSet = async () => {
    const result = await comboServices.getIndexTemplateCombo();
    setComboDataSet(result);
  };

  useEffect(() => {
    getComboDataSet();
  }, []);

  return [
    {
      type: "text",
      name: "title",
      placeholder: intl.formatMessage({ id: "title" }),
    },
    {
      type: "select",
      name: "companyQuestionStatus",
      placeholder: intl.formatMessage({ id: "status" }),
      dataSelect: comboDataSet.companyQuestionStatus,
    },
  ];
};
export default FiltersInit;
