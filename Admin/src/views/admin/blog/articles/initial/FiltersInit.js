import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();
  const [category, setCategory] = useState([]);


  const GetCategoryData = async () => {
    const result = await comboServices.getArticleCategory();

      setCategory(result);
    
 
  };

  useEffect(() => {
    GetCategoryData();

  }, []);


  return [
    {
      type: "text",
      name: "title",
      placeholder: intl.formatMessage({ id: "title" }),
    },
    {
      type: "select",
      name: "articleCategoryId",
      placeholder: intl.formatMessage({ id: "articleCategory" }),
      dataSelect: category,
    },

  ];
};
export default FiltersInit;
