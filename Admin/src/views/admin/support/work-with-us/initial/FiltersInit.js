import React, { useState, useEffect } from "react";
// Message

import { useIntl } from "react-intl";
import { comboServices } from "services/comboService";

const FiltersInit = () => {
  const intl = useIntl();
  return [
    {
      type: "text",
      name: "fullName",
      placeholder: intl.formatMessage({ id: "fullName" }),
    },
  ];
};
export default FiltersInit;
