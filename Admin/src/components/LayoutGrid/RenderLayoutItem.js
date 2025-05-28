import React, { useState, useEffect } from "react";
import SingleCard from "components/Chart/NumberCard/SingleCard";
import MultiValueCard from "components/Chart/NumberCard/MultiValueCard";
import SingleCustomCard from "components/Chart/NumberCard/SingleCustomCard";
import Table from "components/Chart/Table";
import Chart from "components/Chart/Chart";
import ModalInfo from "components/LayoutGrid/components/Info";
import ModalShowTrends from "components/LayoutGrid/components/ShowTrends";
import ModalDurationDatePicker from "components/LayoutGrid/components/DurationDatePicker";
import { Card, Menu, Dropdown } from "antd";
import { graphType } from "./../../constants/index";
import { CPModal } from "components/CP";
import { BsArrow90DegDown } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//API
import { dashboardTemplateServices } from "services/dashboardTemplate";

// Message
import { useIntl } from "react-intl";
import { addBreadcrumb } from "redux/reducers/breadcrumbDashboard";

const { SubMenu } = Menu;

const RenderLayoutItem = ({
  type,
  option,
  isClickable,
  isHoverable = true,
}) => {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const intl = useIntl();
  const [typeChart, setTypeChart] = useState(type);
  const [data, setData] = useState(option);
  const [isClickableChart, setIsClickableChart] = useState(isClickable);
  const [openModal, setOpenModal] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [currentData, setCurrentData] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const getData = async (payload) => {
    const result = await dashboardTemplateServices.getShowChartData(payload);
    if (result.isSuccess) {
      setData(result.data);
      setTypeChart(result.data.newShowType);
    }
  };

  const handleChangeChartType = (chartType) => {
    setTypeChart(parseInt(chartType));
  };

  const handleChangeChartTimeDurations = (value) => {
    getData({
      time: value,
      dashboardTemplateItemId: data.dashboardTemplateItemId,
    });
  };

  const handleChangeFullScreen = () => {
    setTypeAction("chart");
    setOpenModal(true);
  };

  const handleChangeInfo = (info) => {
    setTypeAction("info");
    setOpenModal(true);
  };

  const handleChangeShowTrend = (info) => {
    setTypeAction("showTrend");
    setOpenModal(true);
  };

  const handleSelectTimeDurations = (info) => {
    setTypeAction("timeDurations");
    setCurrentData(info);
    setOpenModal(true);
  };

  const handleChangeTimeDuration = (value) => {
    value.time = value.time.format("YYYY/MM/DD");
    getData({
      ...value,
      dashboardTemplateItemId: currentData.dashboardTemplateItemId,
    });
    setOpenModal(false);
  };

  const renderMenuItem = () => {
    return (
      <Menu mode="inline">
        <Menu.Item key={100} onClick={() => handleChangeInfo(data.info)}>
          {intl.formatMessage({ id: "details" })}
        </Menu.Item>
        {data?.showTypes?.filter((x) => x.value === 101) && (
          <Menu.Item key={101} onClick={() => handleChangeFullScreen()}>
            {intl.formatMessage({ id: "fullScreen" })}
          </Menu.Item>
        )}

        {data?.showTrend === 101 ? (
          <Menu.Item key={102} onClick={() => handleSelectTimeDurations(data)}>
            {intl.formatMessage({ id: "timeDurations" })}
          </Menu.Item>
        ) : (
          <SubMenu
            key="sub1"
            title={`${intl.formatMessage({ id: "timeDurations" })}`}
            className="single-chart-menu"
          >
            {data?.timeDurations?.map((item, index) => (
              <Menu.Item
                key={index}
                onClick={() => handleChangeChartTimeDurations(item.value)}
              >
                {item.text}
              </Menu.Item>
            ))}
          </SubMenu>
        )}

        <Menu.Item key={100} onClick={() => handleChangeShowTrend(data.info)}>
          {intl.formatMessage({ id: "hasShowTrend" })}
        </Menu.Item>
        <SubMenu
          key="sub2"
          title={`${intl.formatMessage({ id: "showType" })}`}
          className="single-chart-menu"
        >
          {data?.showTypes?.map((item, index) => (
            <Menu.Item
              key={index}
              onClick={() => handleChangeChartType(item.value)}
            >
              {item.text}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    );
  };

  const renderModalComponent = (type) => {
    switch (type) {
      case "info":
        return (
          <ModalInfo
            data={data.info}
            onCloseModal={() => setOpenModal(false)}
          />
        );
      case "chart":
        return renderType();
      case "timeDurations":
        return (
          <ModalDurationDatePicker
            onSubmit={handleChangeTimeDuration}
            onCloseModal={() => setOpenModal(false)}
          />
        );
      case "showTrend":
        return (
          <ModalShowTrends
            currentData={data}
            onCloseModal={() => setOpenModal(false)}
          />
        );
    }
  };

  const sizeModal = (type) => {
    switch (type) {
      case "info":
        return "40%";
      case "chart":
        return "80%";
      case "timeDurations":
        return "20%";
      case "showTrend":
        return "85%";
    }
  };

  const renderType = () => {
    if (data?.data?.length > 0) {
      switch (typeChart) {
        case graphType.SINGLE:
          return (
            <>
              <div className="chart-action">
                <Dropdown overlay={renderMenuItem()}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <strong>...</strong>
                  </a>
                </Dropdown>
              </div>

              <div
                style={{ backgroundColor: option?.bgColor }}
                className="single-card"
                onClick={() =>
                  handleClick({
                    ParentId: data.dashboardTemplateItemId,
                    isClickable: data.isClickable,
                    Id: 0,
                    Title: data.title,
                  })
                }
              >
                <SingleCard data={data} option={""} />
              </div>
            </>
          );
        case graphType.MULTI:
          return (
            <>
              <div className="chart-action">
                <Dropdown overlay={renderMenuItem()}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <strong>...</strong>
                  </a>
                </Dropdown>
              </div>

              <div
                style={{ backgroundColor: option?.bgColor }}
                className="multi-value-card"
                onClick={() =>
                  handleClick({
                    ParentId: data.dashboardTemplateItemId,
                    isClickable: data.isClickable,
                    Id: 0,
                    Title: data.title,
                  })
                }
              >
                <MultiValueCard data={data} option={""} />
              </div>
            </>
          );
        case graphType.CIRCLE_PROGRESS:
          return (
            <>
              <div className="chart-action">
                <Dropdown overlay={renderMenuItem()}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <strong>...</strong>
                  </a>
                </Dropdown>
              </div>

              <div
                style={{ backgroundColor: option?.bgColor }}
                className="single-custom-card"
                onClick={() => handleClick(data?.data[0])}
              >
                <SingleCustomCard
                  data={data}
                  operatorTitle={data?.operatorTitle}
                />
              </div>
            </>
          );

        case graphType.TABLE:
          return (
            <>
              <div className="chart-action">
                <Dropdown overlay={renderMenuItem()}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <strong>...</strong>
                  </a>
                </Dropdown>
              </div>
              <div style={{ height: `calc(100% - 40px)`, overflow: "scroll" }}>
                <Table data={option} handleClick={handleClick} />
              </div>
            </>
          );

        case graphType.BAR:
        case graphType.PIE:
        case graphType.LINE:
        case graphType.GAUGE:
        case graphType.BAR:
        case graphType.BULLET:
        case graphType.CURVE:
        case graphType.RADAR:
        case graphType.PARETO:
        case graphType.STACKED:
        case graphType.PYRAMID:
        case graphType.DONUT:
        case graphType.SEMI_CIRCLE:
        case graphType.VARIANCE_INDICATORS:
        case graphType.STACKED_HORIZONTAL:
        case graphType.BAR_HORIZONTAL:
        case graphType.COMBINED_BULLET:
          return (
            <Chart
              type={typeChart}
              data={data?.data}
              option={data}
              handleClick={handleClick}
              showTypes={data?.showTypes}
              handleChangeChartType={handleChangeChartType}
              handleChangeFullScreen={handleChangeFullScreen}
              handleChangeTimeDurations={handleChangeChartTimeDurations}
              operatorTitle={data?.operatorTitle}
              handleChangeInfo={handleChangeInfo}
              handleSelectTimeDurations={handleSelectTimeDurations}
              handleChangeShowTrend={handleChangeShowTrend}
              typeAction={typeAction}
            />
          );
      }
    } else {
      return (
        <div
          style={{
            height: `calc(100% - 40px)`,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={"/chart.png"} alt="" width={"40%"} />
          <p> داده در دسترسی نمی باشد!</p>
        </div>
      );
    }
  };

  const handleClick = (item) => {
    let newTitle = "";
    if (data?.data.length > 1) {
      newTitle = data?.data?.find((x) => x.Id == item.Id).Title;
    } else {
      newTitle = data?.data[0].Title;
    }

    if (data?.isClickable && breadcrumb.length < 5) {
      dispatch(
        addBreadcrumb({
          path: `/dashboard-template/detail-view/${item.ParentId}/${
            item.Id
          }/${newTitle.replace(/\s+|[,\/]/g, "-")}`,
          breadcrumbName: `${newTitle}`,
        })
      );
      history.push(
        `/dashboard-template/detail-view/${item.ParentId}/${
          item.Id
        }/${newTitle.replace(/\s+|[,\/]/g, "-")}`
      );
    }
  };

  return (
    <div className="layout-view-item">
      <Card
        hoverable={isHoverable}
        bordered
        bodyStyle={{ height: "100%", padding: 0, overflow: "hidden" }}
        style={{ height: "100%" }}
      >
        {renderType()}
        <div className="chart-item-title">
          <h4 style={{ margin: 0 }}>
            <span>{data?.title} </span>
            <span style={{ font: "50px" }}>
              {isClickableChart ? <BsArrow90DegDown /> : ""}
            </span>
          </h4>
        </div>
      </Card>
      <CPModal
        title={
          typeAction === "timeDurations"
            ? `${intl.formatMessage({ id: "selectTimeDuration" })}`
            : `${intl.formatMessage({ id: "titleIndexTemplate" })}: ${
                data?.templateTitle
              }`
        }
        visible={openModal}
        closable
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={sizeModal(typeAction)}
        bodyStyle={{ padding: 10 }}
      >
        <div style={{ height: typeAction === "chart" ? "600px" : "" }}>
          {renderModalComponent(typeAction)}
        </div>
      </CPModal>
    </div>
  );
};

export default RenderLayoutItem;
