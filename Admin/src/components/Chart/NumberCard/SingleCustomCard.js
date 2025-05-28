import React from "react";
import CountUp from "react-countup";
import { Progress } from "antd";
// Message
import { FormattedMessage, useIntl } from "react-intl";

function SingleCustomCard({ icon, color, data }) {
  return (
    <div className="content">
      <div className="item">
        <Progress
          type="circle"
          percent={data?.data[0].Value}
          format={(percent) => `% ${data?.data[0].Value} `}
        />
      </div>
      <div>
        <h4>
          <span>آستانه پذیرش </span> <span>{data?.operatorTitle}</span>
          {": "}
          {data?.data[0].Target}
          {/*  <CountUp
            start={0}
            end={data?.data[0].Target}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
          /> */}
          <span> {data?.symbol}</span>
        </h4>
      </div>
    </div>
  );
}

export default SingleCustomCard;
