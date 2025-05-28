import { CPCard } from "components/CP";
// Message

import { CPButton, CPTooltip } from "components/CP";
import { PlusCircleFilled } from "@ant-design/icons";
// Message
import { FormattedMessage } from "react-intl";
const WidgetItem = ({ widgetItem, onDragStart, handleAddItem }) => {
  return (
    <div
      draggable={false}
      key={widgetItem.type}
      onDragStart={onDragStart}
      style={{ cursor: "pointer" }}
    >
      <CPCard bodyStyle={{ padding: "5px" }} bordered>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            {" "}
            {widgetItem.option.title}-{widgetItem.option.code}
          </span>
          <CPTooltip
            title={<FormattedMessage id="addToList" />}
            key="1"
            placement="topLeft"
          >
            <span style={{ textAlign: "left" }}>
              <CPButton
                shape="circle"
                onClick={(e) => handleAddItem(widgetItem, e)}
                className="icon-svg"
              >
                <PlusCircleFilled />
              </CPButton>
            </span>
          </CPTooltip>
        </div>
      </CPCard>
    </div>
  );
};

export default WidgetItem;
