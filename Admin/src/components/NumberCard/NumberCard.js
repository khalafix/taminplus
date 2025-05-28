import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { message, Card, Col, Row, text, Tooltip } from "antd";
import CountUp from "react-countup";
import iconMap from "utils/iconMap";
import { CPModal, CPCard, CPButton, CPTooltip } from "components/CP";
import { useIntl, FormattedMessage } from "react-intl";

function NumberCard({ path, icon, color, title, total, type, countUp, showNumber = true, image, companyType,companyRequestStatus,companyQuestionStatus ,isFilter }) {

  const intl = useIntl();
  const history = useHistory();
  const link = () => {
    history.push({
      pathname: path,
      // state: {
      //   companyType: companyType,
      //   isFilter: isFilter,
      // },
    });

  }
  return (
    <Card
      className={"numberCard"}
      // bordered={false}
      bodyStyle={{ padding: 10 }}
      hoverable
      onClick={link}
    >
      <span className={"iconWarp"} style={{ color }}>
        {image ? <img src={image} /> : iconMap[icon]}
      </span>
      <div className={"content"}>
        <p className={"title"}>{intl.formatMessage({ id: title }) || "No Title"}</p>
        {
          showNumber == true ?

            <p className={"number , enCardNumber"}>

              <CountUp
                start={0}
                end={total}
                duration={3.75}
                useEasing
                useGrouping
                separator=","
                {...(countUp || {})}
              />
            </p> : null
        }









      </div>
    </Card>
  );
}

export default NumberCard;
