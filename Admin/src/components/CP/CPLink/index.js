import React from "react";
import { Link } from "react-router-dom";

// type PropTypes = {
//   children: Node,
//   href
// };

const CPLink = ({ children, tilte, href }) => {
  return (
    <Link to={href} title={tilte}>
      {children}
    </Link>
  );
};

export default CPLink;
