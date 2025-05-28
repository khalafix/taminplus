import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";
import { productCategoryServices } from "services/catalog/productCategoryServices";

const FiltersInit = () => {
  const intl = useIntl();
  const [deliveryType, setDeliveryType] = useState([]);
  const [province, setProvince] = useState([]);
  const GetDeliveryType = async () => {
    const result = await comboServices.getDeliveryType();
    setDeliveryType(result.data)

  };
  const GetProvince = async () => {
    const result = await comboServices.getProvince();
    setProvince(result.data)

  };

  useEffect(() => {
    GetDeliveryType();
    GetProvince();

  }, []);


  return [
    {
      type: "select",
      name: "province",
      placeholder: `${intl.formatMessage({ id: "province" })}`,
      dataSelect: province,

    },
    {
      type: "select",
      name: "deliveryType",
      placeholder: `${intl.formatMessage({ id: "deliveryType" })}`,
      dataSelect: deliveryType,

    },
  ];
};
export default FiltersInit;
