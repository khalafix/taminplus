import React from "react";
import { Badge } from "antd";

function CPBadge({
  count,
  status,
  text,
  icon,
  dot,
  showZero,
  onClick,
  children,
  overflowCount,
  color,
}) {
  return (
    <Badge
      onClick={onClick}
      count={count}
      status={status}
      text={text}
      icon={icon}
      color={color}
      dot={dot}
      showZero={showZero}
      overflowCount={overflowCount}
    >
      {children}
    </Badge>
  );
}

export default CPBadge;
