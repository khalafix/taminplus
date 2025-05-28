import { useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { graphType } from "../../constants/index";

// Charts
import GaugeChartHelper from "./ChartType/GaugeChartHelper";
import RadarChartHelper from "./ChartType/RadarChartHelper";
import RadarFlowerChartHelper from "./ChartType/RadarFlowerChartHelper";
import BarChartHelper from "./ChartType/BarChartHelper";
import ParetoChartHelper from "./ChartType/ParetoChartHelper";
import TreeMapChartHelper from "./ChartType/TreeMapChartHelper";
import GroupedBarChartHelper from "./ChartType/GroupedBarChartHelper";
import AreaChartHelper from "./ChartType/AreaChartHelper";
import SankeyChartHelper from "./ChartType/SankeyChartHelper";
import WordCloudChartHelper from "./ChartType/WordCloudChartHelper";
import ReverseBarChartHelper from "./ChartType/ReverseBarChartHelper";
import PieChartHelper from "./ChartType/PieChartHelper";
import DonutChartHelper from "./ChartType/DonutChartHelper";
import PyramidChartHelper from "./ChartType/PyramidChartHelper";
import LineChartHelper from "./ChartType/LineChartHelper";
import BulletChartHelper from "./ChartType/BulletChartHelper";
import CombinedBulletChartHelper from "./ChartType/CombinedBulletChartHelper";
import RadialHistogramChartHelper from "./ChartType/RadialHistogramChartHelper";
import CurvedChartHelper from "./ChartType/CurvedChartHelper";
import ClusteredBarHelper from "./ChartType/ClusteredBarHelper";
import ClusteredBarHorizontalHelper from "./ChartType/ClusteredBarHorizontalHelper";
import StackedClusteredChartHelper from "./ChartType/StackedClusteredChartHelper";
import StackedHorizontalChartHelper from "./ChartType/StackedHorizontalChartHelper";
import Semi_CirclePieChartHelper from "./ChartType/Semi_CirclePieChartHelper";
import Variance_IndicatorsChartHelper from "./ChartType/Variance_IndicatorsChartHelper";

//Theme chart
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

// Message
import { useIntl } from "react-intl";

const Chart = ({
  type,
  data,
  option,
  handleClick,
  showTypes,
  handleChangeChartType,
  handleChangeFullScreen,
  handleChangeTimeDurations,
  operatorTitle,
  handleChangeInfo,
  handleSelectTimeDurations,
  handleChangeShowTrend,
  typeAction,
}) => {
  const intl = useIntl();
  let x;
  const chartRef = useRef(null);
  const chartObjRef = useRef(null);
  const isSm = useMediaQuery({ minWidth: 576 });
  const isMd = useMediaQuery({ minWidth: 1366 });
  const baseClass = classNames("chart", {
    ["chart--" + type]: type,
    ["chart--reverse"]: option?.reverse,
  });

  const exportChart = (value) => {
    handleChangeChartType(value);
  };

  const handleFullScreen = () => {
    handleChangeFullScreen();
  };

  const handleTimeDurations = (value) => {
    handleChangeTimeDurations(value);
  };

  const handleInfo = (value) => {
    handleChangeInfo();
  };
  const handleShowTrend = (info) => {
    handleChangeShowTrend(option);
  };

  const renderChartType = () => {
    let menu = [];
    if (showTypes.length > 0) {
      showTypes?.map((item) =>
        menu.push({
          label: item.text,
          type: "custom",
          options: {
            callback: function () {
              exportChart(item.value);
            },
          },
        })
      );
    }
    return menu;
  };

  const renderTimeDurations = () => {
    let menu = [];
    if (option?.timeDurations?.length > 0) {
      option?.timeDurations?.map((item) =>
        menu.push({
          label: item.text,
          type: "custom",
          options: {
            callback: function () {
              handleTimeDurations(item.value);
            },
          },
        })
      );
    }
    return menu;
  };

  const renderExportMenuItems = () => {
    let menus = [
      {
        label: `${intl.formatMessage({ id: "details" })}`,
        type: "custom",
        options: {
          callback: function () {
            handleInfo();
          },
        },
      },
      {
        label: `${intl.formatMessage({ id: "fullScreen" })}`,
        type: "custom",
        options: {
          callback: function () {
            handleFullScreen();
          },
        },
      },
      {
        label: `${intl.formatMessage({ id: "showType" })}`,
        menu: renderChartType(),
      },
    ];

    if (option?.timeDurations?.length > 0) {
      if (option?.showTrend === 101) {
        menus.push({
          label: `${intl.formatMessage({ id: "timeDurations" })}`,
          type: "custom",
          options: {
            callback: function () {
              handleSelectTimeDurations(option);
            },
          },
        });
      } else {
        menus.push({
          label: `${intl.formatMessage({ id: "timeDurations" })}`,
          menu: renderTimeDurations(),
        });
      }
    }
    menus.push(
      {
        label: `${intl.formatMessage({ id: "hasShowTrend" })}`,
        type: "custom",
        options: {
          callback: function () {
            handleShowTrend(option);
          },
        },
      },
      {
        label: `${intl.formatMessage({ id: "export" })}`,
        menu: [
          { type: "png", label: "PNG" },
          { type: "jpg", label: "JPG" },
          { type: "pdf", label: "PDF" },
          {
            label: "Print",
            type: "print",
          },
        ],
      }
    );

    return menus;
  };

  const getChartTheme = (theme) => {
    let chartTheme = am4themes_kelly;

    switch (theme) {
      case "animated":
        chartTheme = am4themes_animated;
        break;
      case "material":
        chartTheme = am4themes_material;
        break;
      case "dataviz":
        chartTheme = am4themes_dataviz;
        break;
      case "kelly":
        chartTheme = am4themes_kelly;
        break;
      case "frozen":
        chartTheme = am4themes_frozen;
        break;
      case "moonrisekingdom":
        chartTheme = am4themes_moonrisekingdom;
        break;
      case "spiritedaway":
        chartTheme = am4themes_spiritedaway;
        break;
      case "dark":
        chartTheme = am4themes_dark;
        break;
    }

    return chartTheme;
  };

  const getChart = (chartType) => {
    am4core.unuseAllThemes();
    am4core.useTheme(getChartTheme(option.chartTheme));
    const chart = am4core.create(chartRef.current, chartType);

    // Add title
    let title = chart.titles.create();
    title.text = option?.title;
    title.disabled = true;

    // Enable title on export
    chart.exporting.events.on("exportstarted", function (ev) {
      title.disabled = false;
      title.parent.invalidate();
    });

    // Disable title when export finishes
    chart.exporting.events.on("exportfinished", function (ev) {
      title.disabled = true;
    });

    // Add title to validated sprites
    chart.exporting.validateSprites.push(title);
    chart.exporting.validateSprites.push(title.parent);

    chart.rtl = true;
    chart.responsive.enabled = true;
    chart.tapToActivate = true;
    chart.tapTimeout = 1000;
    chart.exporting.menu = new am4core.ExportMenu();
    /*    chart.contextMenuDisabled = true; */
    chart.exporting.menu.items = [
      {
        label: "...",
        menu: renderExportMenuItems(),
      },
    ];

    return chart;
  };

  const createChart = (type) => {
    switch (type) {
      case graphType.WORDCLOUD: {
        const wordCloudData =
          data?.map((q) => ({
            ...q,
            tag: q.title,
            weight: q.value,
          })) ?? [];

        const chart = getChart(am4plugins_wordCloud.WordCloud);
        return WordCloudChartHelper.config(chart, wordCloudData, handleClick);
      }

      case graphType.RADAR: {
        /* const radarData =
          data?.map((q) => ({
            ...q,
            title: q.title,
            value: q.value * 2,
          })) ?? []; */

        const chart = getChart(am4charts.RadarChart);

        return RadarChartHelper.config(chart, data, option, handleClick);
      }

      case graphType.RADAR_FLOWER: {
        const radarData =
          data?.map((q) => ({
            ...q,
            title: q.title,
            value: q.value * 2,
          })) ?? [];

        const chart = getChart(am4charts.RadarChart);

        return RadarFlowerChartHelper.config(
          chart,
          radarData,
          option,
          handleClick
        );
      }

      case graphType.GAUGE: {
        for (let i = 0; i < 2; i++) {
          const chart = getChart(am4charts.GaugeChart);

          return GaugeChartHelper.config(chart, data[0], option, handleClick);
        }
      }

      case graphType.BAR: {
        const chart = getChart(am4charts.XYChart);

        return ClusteredBarHelper.config(chart, data, option, handleClick);
      }

      case graphType.BAR_HORIZONTAL: {
        const chart = getChart(am4charts.XYChart);

        return ClusteredBarHorizontalHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.STACKED: {
        const chart = getChart(am4charts.XYChart);

        return StackedClusteredChartHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.STACKED_HORIZONTAL: {
        const chart = getChart(am4charts.XYChart);

        return StackedHorizontalChartHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.VARIANCE_INDICATORS: {
        const chart = getChart(am4charts.XYChart);

        return Variance_IndicatorsChartHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.PARETO: {
        const chart = getChart(am4charts.XYChart);

        return ParetoChartHelper.config(
          chart,
          data,
          option,
          handleClick,
          operatorTitle
        );
      }

      case graphType.LINE: {
        const chart = getChart(am4charts.XYChart);

        return LineChartHelper.config(chart, data, option, handleClick);
      }

      case graphType.BULLET: {
        const chart = getChart(am4charts.XYChart);

        return BulletChartHelper.config(chart, data, option, handleClick);
      }

      case graphType.COMBINED_BULLET: {
        const chart = getChart(am4charts.XYChart);

        return CombinedBulletChartHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.CURVE: {
        const chart = getChart(am4charts.XYChart);

        return CurvedChartHelper.config(chart, data, option, handleClick);
      }

      case graphType.PIE: {
        const chart = getChart(am4charts.PieChart);

        return PieChartHelper.config(
          chart,
          data,
          option,
          handleClick,
          typeAction
        );
      }

      case graphType.SEMI_CIRCLE: {
        const chart = getChart(am4charts.PieChart);

        return Semi_CirclePieChartHelper.config(
          chart,
          data,
          option,
          handleClick
        );
      }

      case graphType.DONUT: {
        const pieData =
          data?.map((q) => ({
            ...q,
            title: q.title,
            value: q.value,
          })) ?? [];

        const chart = getChart(am4charts.PieChart);

        return DonutChartHelper.config(chart, pieData, option, handleClick);
      }

      case graphType.PYRAMID: {
        const pieData =
          data?.map((q) => ({
            ...q,
            title: q.title,
            value: q.value,
          })) ?? [];

        const chart = getChart(am4charts.SlicedChart);

        return PyramidChartHelper.config(chart, pieData, option, handleClick);
      }

      case graphType.HISTOGRAM: {
        const groupedBarData =
          data?.map((q) => ({
            ...q,
            group: q.group,
            title: q.title,
            value: q.value * 100,
          })) ?? [];

        const chart = getChart(am4charts.RadarChart);

        return RadialHistogramChartHelper.config(
          chart,
          groupedBarData,
          option,
          handleClick
        );
      }

      case graphType.TREE_MAP: {
        const treeMapData =
          data?.map((q) => ({
            ...q,
            title: q.title,
            value: q.value,
            group: q.group,
          })) ?? [];

        const chart = getChart(am4charts.TreeMap);

        return TreeMapChartHelper.config(
          chart,
          treeMapData,
          option,
          handleClick
        );
      }

      case graphType.AREA: {
        const areaData =
          data?.map((q) => ({
            ...q,
            group: q.group ?? "0",
            title: q.title,
            value: q.value,
            zeroValue: 0,
          })) ?? [];

        const chart = getChart(am4charts.XYChart);

        return AreaChartHelper.config(chart, areaData, option, handleClick);
      }

      case graphType.SANKEY: {
        const sankeyData =
          data?.map((q) => ({
            ...q,
            from: q.from,
            to: q.to,
            value: q.fieldId,
            id: q.fieldId,
          })) ?? [];

        const chart = getChart(am4charts.SankeyDiagram);

        return SankeyChartHelper.config(chart, sankeyData, {
          ...option,
          orientation: isSm ? "horizontal" : "vertical",
          handleClick,
        });
      }

      case graphType.METER: {
        return null;
      }

      default:
        return null;
    }
  };

  useLayoutEffect(() => {
    x = createChart(type);
    chartObjRef.current = x;
  }, [type, data]);

  useEffect(() => {
    return () => {
      if (chartObjRef.current && !chartObjRef.current.isDisposed) {
        chartObjRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      className={baseClass}
      ref={chartRef}
      style={{ height: `calc(100% - 40px)` }}
    ></div>
  );
};

Chart.propTypes = {
  type: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        group: PropTypes.string,
      }),
      PropTypes.shape({
        fieldId: PropTypes.number,
        fieldLevel: PropTypes.string,
        fieldTitle: PropTypes.string,
        from: PropTypes.string,
        to: PropTypes.string,
      }),
    ])
  ),
  option: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Chart;
