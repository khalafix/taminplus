// Message
import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();
  const [orderStatus, setOrderStatus] = useState([]);

  const GetOrderStatus = async () => {
    const result = await comboServices.getOrderStatus();
    setOrderStatus(result.data);
 
  };
  useEffect(() => {
    GetOrderStatus();

  }, []);
  return [
    {
      type: "text",
      name: "orderNumber",
      placeholder: intl.formatMessage({ id: "orderNumber" }),
    },
    {
      type: "text",
      name: "phoneNumber",
      placeholder: intl.formatMessage({ id: "phoneNumber" }),

    },
    {
      type: "text",
      name: "customerName",
      placeholder: intl.formatMessage({ id: "customerName" }),
    },

    {
      type: "select",
      name: "orderStatus",
      dataSelect: orderStatus,
      placeholder: intl.formatMessage({ id: "status" }),

    },
  ];
};
export default FiltersInit;
