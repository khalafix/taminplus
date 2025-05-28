import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option, //object
    handleClick,
    operatorTitle
  ) => {
    function getRotation() {
      return data.length > 5 ? 270 : 340;
    }

    //legend

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;
    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.rotation = getRotation();
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "Title";
      series.columns.template.strokeWidth = 0;
      series.name = name;
      series.tooltip.pointerOrientation = "vertical";
      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;
      series.columns.template.maxWidth = 50;
      series.tooltipText = name
        ? `${name}: [bold]{valueY}[/]  ${option.symbol}`
        : ` [bold]{valueY}[/]  ${option.symbol}`;

      //click events
      series.columns.template.events.on(
        "hit",
        function (ev) {
          handleClick({
            ...ev.target.dataItem._dataContext,
            isClickable: option.isClickable,
          });
        },
        this
      );
      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");
    }
    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'";
    paretoValueAxis.cursorTooltipEnabled = false;

    /*     let paretoSeries = chart.series.push(new am4charts.LineSeries()); */
    let paretoSeries = chart.series.push(new am4charts.StepLineSeries());
    paretoSeries.dataFields.valueY = "Target";
    paretoSeries.dataFields.categoryX = "Title";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = `آستانه پذیرش ${operatorTitle} {valueY.formatNumber('#.0')}%[/]`;

    paretoSeries.strokeWidth = 3;
    paretoSeries.stroke = "red";
    paretoSeries.strokeOpacity = 0.5;
    /*    paretoSeries.bullets.push(new am4charts.CircleBullet()); */
    //data
    if (data.length === 1) {
      let newData = [];
      for (let i = 0; i < option.columns.length; i++) {
        const element = option.columns[i];

        newData.push({
          ...data[0],
          Title: element.title,
          Value: data[0][element.columnName],
        });
      }
      createSeries("Value", "");
      chart.data = newData;
    } else {
      option?.columns?.forEach((item) => {
        if (item.columnName !== "Target") {
          createSeries(item.columnName, item.title);
        }
      });
      chart.data = data;
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    return chart;
  },
};
