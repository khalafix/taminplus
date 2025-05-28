import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";
import { productCategoryServices } from "services/catalog/productCategoryServices";

const FiltersInit = () => {
  const intl = useIntl();
  const [brandComboDataSet, setBrandComboDataSet] = useState([]);
  const [category, setCategory] = useState([]);
  const GetBrandData = async () => {
    const result = await comboServices.getBrands();

    setBrandComboDataSet(result);
  };

  const GetCategoryData = async () => {
    const result = await productCategoryServices.getTree();
    if (result.isSuccess) {
      setCategory(result.data);
    }
 
  };

  useEffect(() => {
    GetCategoryData();
    GetBrandData();

  }, []);


  return [
    {
      type: "text",
      name: "ProductName",
      placeholder: intl.formatMessage({ id: "productName" }),
    },
    {
      type: "treeSelect",
      name: "categoryId",
      placeholder: intl.formatMessage({ id: "categoryName" }),
      dataTreeSelect: category,
    },
    {
      type: "text",
      name: "code",
      placeholder: intl.formatMessage({ id: "code" }),
    },
    {
      type: "select",
      name: "brandId",
      placeholder:`${intl.formatMessage({ id: "brand" })}`,
      dataSelect: brandComboDataSet,
      
    },
  ];
};
export default FiltersInit;
