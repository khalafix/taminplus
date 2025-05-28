import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();
  const [userOpinionType, setUserOpinionType] = useState([]);
  const [showStatus, setShowStatus] = useState([]);
  const GetUserOpinionType = async () => {
    const result = await comboServices.getUserOpinionType();

    setUserOpinionType(result.data);
  };

  const GetShowStatus = async () => {
    const result = await comboServices.getShowStatus();
    
    setShowStatus(result.data);
  };

  useEffect(() => {
    GetShowStatus();
    GetUserOpinionType();

  }, []);

  return [
    {
      type: "text",
      name: "title",
      placeholder: intl.formatMessage({ id: "title" }),
    },
    {
      type: "select",
      name: "showStatus",
      placeholder: `${intl.formatMessage({ id: "showStatus" })}`,
      dataSelect: showStatus,

    },
    {
      type: "select",
      name: "userOpinionType",
      placeholder: `${intl.formatMessage({ id: "userOpinionType" })}`,
      dataSelect: userOpinionType,

    },
  ];
};
export default FiltersInit;
