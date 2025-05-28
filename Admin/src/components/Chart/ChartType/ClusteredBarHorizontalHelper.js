import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  config: (
    chart,
    data,
    option,
    handleClick //object
  ) => {
    function getRotation() {
      return data.length > 10 ? 350 : 340;
    }

    //legend

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "Title";
    xAxis.renderer.labels.template.rotation = getRotation();
    xAxis.renderer.inversed = true;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.minGridDistance = 1;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = value;
      series.dataFields.categoryY = "Title";
      series.name = name;
      series.tooltipText = name
        ? `{name}: [bold]{valueY}[/]  ${option.symbol}`
        : ` [bold]{valueY}[/]  ${option.symbol}`;
      series.columns.template.strokeWidth = 0;
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
      series.columns.template.maxWidth = 50;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      /*       let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false; */

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

      /*       let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff"); */
      return series;
    }

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
        createSeries(item.columnName, item.title);
      });
      chart.data = data;
    }

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            /*             series.columns.template.width = am4core.percent(40); */
          });
        }
      }
    }
    // Cursor
    chart.cursor = new am4charts.XYCursor();
    /*     chart.data = data; */
    chart.rtl = true;
    /*     chart.background.fill = "#0f0"; */
    return chart;
  },
};
