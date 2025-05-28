import React from "react";
import CountUp from "react-countup";
import { AiOutlineLineChart } from "react-icons/ai";

function SingleCard({ icon, color, data }) {
  const renderItem = (field, title, index) => {
    if (data.data.length > 0) {
      return (
        <div key={index} className="number">
          {title} :{data.data[0][field]}
          {/* <CountUp
            start={0}
            end={data.data[0][field]}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
          /> */}
          <span> {data?.symbol}</span>
        </div>
      );
    }
  };
  return (
    <>
      <div className="number">
        {data?.columns?.map((item, index) =>
          renderItem(item.columnName, item.title, index)
        )}
      </div>
      <div className="iconWarp" style={{ color: "orange" }}>
        <AiOutlineLineChart />
      </div>
    </>
  );
}

export default SingleCard;
