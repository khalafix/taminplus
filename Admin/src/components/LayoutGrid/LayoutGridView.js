import React, { useState, useEffect } from "react";

import { memoize } from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { withSize } from "react-sizeme";
import RenderLayoutItem from "./RenderLayoutItem";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpointRules = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const colRules = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const gridItemMargin = 10;

const LayoutGrid = ({ layouts, size: { width } }) => {
  const checkWidthLayoutSize = () => {
    if (width > breakpointRules.lg) {
      return "lg";
    } else if (width < breakpointRules.lg && width < breakpointRules.lg) {
      return "md";
    }
  };
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    checkWidthLayoutSize()
  );

  const resolver = () =>
    JSON.stringify({
      layouts: layouts,
      breakpoint: currentBreakpoint,
    });
  const memoizedItems = memoize(() => {
    return layouts[currentBreakpoint]?.map((item) => {
      return (
        <div key={item.i}>
          <RenderLayoutItem
            type={item?.option?.showType}
            option={item?.option}
          />
        </div>
      );
    });
  }, resolver);

  const handleBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const gridItemHeight = () => {
    return (
      Math.round((width - gridItemMargin) / colRules[currentBreakpoint]) -
      gridItemMargin
    );
  };

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
    return () => {};
  }, []);

  return (
    <div className="layout-grid">
      <div className="layout-grid__wrapper">
        <ResponsiveReactGridLayout
          className="layout-grid__grids layout-grid-view"
          rowHeight={gridItemHeight()}
          layouts={layouts}
          isDroppable={false}
          isDraggable={false}
          isResizable={false}
          onBreakpointChange={handleBreakpointChange}
          breakpoints={breakpointRules}
          cols={colRules}
          width={width}
          margin={[gridItemMargin, gridItemMargin]}
          useCSSTransforms={false}
        >
          {memoizedItems()}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
};

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(
  LayoutGrid
);
