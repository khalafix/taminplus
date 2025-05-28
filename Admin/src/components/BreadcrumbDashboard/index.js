import { Breadcrumb } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBreadcrumb } from "redux/reducers/breadcrumbDashboard";
const Index = () => {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const history = useHistory();
  const dispatch = useDispatch();

  const itemRender = (route, routes, paths) => {
    const last = breadcrumb.indexOf(route) === breadcrumb.length - 1;

    const handleClick = (_route) => {
      if (_route.state) {
        history.push({
          pathname: _route.path,
          state: _route.state,
        });
      } else {
        dispatch(
          addBreadcrumb({
            path: _route.path,
            breadcrumbName: _route.breadcrumbName,
          })
        );
        history.push(_route.path);
      }
    };

    return last ? (
      <span key={0}>{route.breadcrumbName}</span>
    ) : (
      <span
        key={1}
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => handleClick(route)}
      >
        {route.breadcrumbName}
      </span>
    );
  };
  return (
    <Breadcrumb itemRender={itemRender} routes={breadcrumb} separator=">" />
  );
};

export default Index;
