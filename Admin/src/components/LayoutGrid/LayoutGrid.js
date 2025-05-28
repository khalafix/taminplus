import React, { useState, useEffect } from "react";
import { memoize, cloneDeep } from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";
import { withSize } from "react-sizeme";
import {
  CPButton,
  CPTooltip,
  CPSelect,
  CPModal,
  CPDivider,
} from "components/CP";
import CPColorPicker from "components/CP/CPColorPicker";

import { bfs } from "utils/helpers";

import { Row, Col, Space, message } from "antd";
// ICON
import {
  RiCloseLine,
  RiSettings2Line,
  RiInformationLine,
} from "react-icons/ri";

// Message
import { FormattedMessage, useIntl } from "react-intl";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpointRules = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const colRules = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const gridItemMargin = 10;
const editingGridColor = "#cccccc80";
const LayoutGrid = ({
  currentWidgetItem,
  setLayouts,
  layouts,
  dropping,
  setDropping,
  comboDataSet,
  size: { width },
}) => {
  const intl = useIntl();
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const checkWidhLayoutSize = () => {
    if (width > breakpointRules.lg) {
      return "lg";
    } else if (width < breakpointRules.lg && width < breakpointRules.lg) {
      return "md";
    }
  };
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    checkWidhLayoutSize()
  );
  const [nextId, setNextId] = useState(uuidv4());

  const resolver = () =>
    JSON.stringify({
      layouts: layouts,
      isEditing: true,
      breakpoint: currentBreakpoint,
    });

  const handleChangeAction = (item) => {
    setCurrentItem(item);
    setOpenModal(true);
  };
  const getBoxColor = (item) => {
    if (
      item?.option?.timeDuration === 0 ||
      item?.option?.actionShowType === 0 ||
      item?.option?.newShowType === 0
    ) {
      return "#fde2c1";
    } else {
      return "#fff";
    }
  };

  const memoizedItems = memoize(() => {
    return layouts[currentBreakpoint]?.map((item) => {
      return (
        <div
          key={item.i}
          style={{
            backgroundColor: getBoxColor(item),
          }}
        >
          <Row>
            <Col xs={24} sm={12} md={24}>
              <div className="react-grid-item-cp-header">
                {item?.option?.title}- {item?.option?.code}
              </div>
            </Col>
            <Col xs={24} sm={12} md={24} className="react-grid-item-cp-body">
              <Space>
                <CPTooltip title={<FormattedMessage id="customize" />} key="2">
                  <span>
                    <CPButton
                      shape="circle"
                      icon={
                        <span className="icon-box">
                          <RiSettings2Line />
                        </span>
                      }
                      onClick={() => handleChangeAction(item)}
                    />
                  </span>
                </CPTooltip>

                <CPTooltip title={<FormattedMessage id="removeItem" />}>
                  <span>
                    <CPButton
                      shape="circle"
                      icon={
                        <span className="icon-box">
                          <RiCloseLine />
                        </span>
                      }
                      onClick={() => onRemoveItem(null, item.i)}
                    />
                  </span>
                </CPTooltip>
              </Space>
            </Col>
          </Row>
        </div>
      );
    });
  }, resolver);

  const handleDrop = (layout, item, e) => {
    const { type, option } = currentWidgetItem;
    const newLayouts = cloneDeep(layouts);
    const newItem = {
      ...item,
      option,
      isDraggable: undefined,
      isResizable: undefined,
    };
    Object.keys(newLayouts).map((size) => {
      newLayouts[size] = bfs(newLayouts[size], newItem);
      return null;
    });

    setLayouts(newLayouts);
    setNextId(uuidv4());
    setDropping(false);
  };
  const getDroppingItem = () => {
    if (!currentWidgetItem) {
      return null;
    }
    return { ...currentWidgetItem, i: nextId };
  };

  const handleLayoutChange = (layout, _layouts) => {
    if (dropping) {
      return;
    }

    if (layout.find(({ i }) => i === nextId)) {
      return;
    }

    const newLayouts = cloneDeep(_layouts);
    Object.keys(newLayouts).map((size) => {
      newLayouts[size] = newLayouts[size].map((item, index) => {
        const original = layouts[size] || layouts.lg;
        return { ...original[index], ...item };
      });
      return null;
    });

    setLayouts(newLayouts);
  };

  const handleBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  };

  const gridItemWidth = () => {
    return (
      Math.round((width - gridItemMargin) / colRules[currentBreakpoint]) -
      gridItemMargin
    );
  };

  const gridItemHeight = () => {
    return (
      Math.round((width - gridItemMargin) / colRules[currentBreakpoint]) -
      gridItemMargin
    );
  };

  const onRemoveItem = (value, i) => {
    let layout = layouts[currentBreakpoint].filter((x) => x.i !== i);
    setLayouts({ [currentBreakpoint]: layout });
  };

  const handleChangItems = () => {
    if (
      currentItem.option.newShowType !== 0 &&
      currentItem.option.actionShowType !== 0
    ) {
      const newLayouts = cloneDeep(layouts);
      Object.keys(newLayouts).map((size) => {
        newLayouts[size] = newLayouts[size].map((item, index) => {
          if (item.i === currentItem.i) {
            item.option.newShowType = currentItem.option.newShowType;
            item.option.actionShowType = currentItem.option.actionShowType;
            item.option.timeDuration = 1;
          }
          return item;
        });
        return null;
      });

      setLayouts(newLayouts);
      setCurrentItem({});
      setOpenModal(false);
    } else {
      message.error("پر کردن ویژگی های چارت الزامی می باشد.");
    }
  };
  const getWrapperStyle = (size) => ({
    backgroundPosition: `0 ${gridItemMargin}px`,
    backgroundSize: `${gridItemWidth(size) + gridItemMargin}px ${
      gridItemHeight(size) + gridItemMargin
    }px`,
    backgroundImage: false
      ? "none"
      : `linear-gradient(
      90deg,
      rgba(var(--palette-neutral-0, 255, 255, 255), 1) 0,
      rgba(var(--palette-neutral-0, 255, 255, 255), 1) ${gridItemMargin + 1}px,
      rgba(232, 232, 232, 0) ${gridItemMargin + 1}px,
      rgba(232, 232, 232, 0) ${gridItemWidth(size) + gridItemMargin + 1}px
    ),
    linear-gradient(
      0deg,
      rgba(var(--palette-neutral-0, 255, 255, 255), 1) 0,
      rgba(var(--palette-neutral-0, 255, 255, 255), 1) ${gridItemMargin + 1}px,
      rgba(232, 232, 232, 0) ${gridItemMargin + 1}px,
      rgba(232, 232, 232, 0) ${gridItemHeight(size) + gridItemMargin + 1}px
    )`,
  });

  const renderModalComponent = (item) => {
    const itemThemCharts = [
      {
        value: "kelly",
        text: <div className="chart-theme-kelly">Kelly</div>,
      },
      {
        value: "dataviz",
        text: <div className="chart-theme-dataviz">Dataviz</div>,
      },
      {
        value: "material",
        text: <div className="chart-theme-material">Material</div>,
      },
      {
        value: "dark",
        text: <div className="chart-theme-dark">Dark</div>,
      },
      {
        value: "frozen",
        text: <div className="chart-theme-frozen">Frozen</div>,
      },
      {
        value: "moonrisekingdom",
        text: (
          <div className="chart-theme-moonrise_kingdom">Moonrise Kingdom</div>
        ),
      },
      {
        value: "spiritedaway",
        text: <div className="chart-theme-spirited_away">Spirited Away</div>,
      },
    ];

    return (
      <>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={24}>
            <span> {intl.formatMessage({ id: "defaultShowType" })}</span>
            <CPSelect
              dataSource={item?.option?.showTypes}
              name={"defaultShowType"}
              showSearch
              value={currentItem?.option?.newShowType}
              placeholder={intl.formatMessage({ id: "defaultShowType" })}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  ...(currentItem.option.newShowType = e),
                })
              }
            />
          </Col>
          {/* <Col xs={24} sm={12} md={24} >
            <span> {intl.formatMessage({ id: "timeDuration" })}</span>
            <CPSelect
              name={"timeDuration"}
              placeholder={intl.formatMessage({
                id: "timeDuration",
              })}
              dataSource={comboDataSet.timeDurations}
              value={currentItem?.option?.timeDuration}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  ...(currentItem.option.timeDuration = e),
                })
              }
            />
          </Col> */}
          <Col xs={24} sm={12} md={24}>
            <span> {intl.formatMessage({ id: "actionShowType" })}</span>
            <CPSelect
              dataSource={comboDataSet.actionShowTypes}
              name={"actionShowType"}
              showSearch
              value={currentItem?.option?.actionShowType}
              placeholder={intl.formatMessage({ id: "actionShowType" })}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  ...(currentItem.option.actionShowType = e),
                })
              }
            />
          </Col>

          <Col xs={24} sm={12} md={12}>
            <span> {intl.formatMessage({ id: "selectThemeChart" })}</span>
            <CPSelect
              dataSource={itemThemCharts}
              name={"chartTheme"}
              showSearch
              value={currentItem?.option?.chartTheme}
              placeholder={intl.formatMessage({ id: "selectThemeChart" })}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  ...(currentItem.option.chartTheme = e),
                })
              }
            />
          </Col>

          <Col xs={24} sm={12} md={12}>
            <span> {intl.formatMessage({ id: "selectColorPicker" })}</span>
            <CPColorPicker
              color={currentItem?.option?.bgColor}
              displayColorPicker={displayColorPicker}
              onChange={(color) =>
                setCurrentItem({
                  ...currentItem,
                  ...(currentItem.option.bgColor = color.hex),
                })
              }
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
              onClose={() => setDisplayColorPicker(false)}
            />
          </Col>
        </Row>

        <div className="footer-modal">
          <Row>
            <Col span={12}>
              <Space>
                <CPButton type="primary" onClick={handleChangItems}>
                  <FormattedMessage id="addInformation" />
                </CPButton>
              </Space>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentItem({});
  };

  return (
    <div className="layout-grid">
      <div
        className="layout-grid__wrapper"
        style={{
          backgroundColor: editingGridColor,
          ...getWrapperStyle(),
        }}
      >
        <ResponsiveReactGridLayout
          className="layout-grid__grids"
          rowHeight={gridItemHeight()}
          layouts={layouts}
          isDroppable={true}
          isDraggable={true}
          isResizable={true}
          onDrop={handleDrop}
          droppingItem={getDroppingItem()}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={handleBreakpointChange}
          breakpoints={breakpointRules}
          cols={colRules}
          width={width}
          margin={[gridItemMargin, gridItemMargin]}
          useCSSTransforms={false}
          isBounded={true}
        >
          {memoizedItems()}
        </ResponsiveReactGridLayout>
      </div>
      <CPModal
        title={"تغییر ویژگی چارت"}
        visible={openModal}
        closable
        onCancel={handleCloseModal}
        footer={null}
        width={"20%"}
      >
        {renderModalComponent(currentItem)}
      </CPModal>
    </div>
  );
};

export default withSize({
  refreshMode: "debounce",
  refreshRate: 60,
  monitorHeight: true,
})(LayoutGrid);
