import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { groupBy } from "lodash";

const setResponsiveRules = (chart) => {
  return chart;
};
export default {
  config: (
    chart,
    data,
    option //object
  ) => {
    const grouped = groupBy(data, (q) => q.group);
    const result = [];
    for (const key in grouped) {
      if (Object.hasOwnProperty.call(grouped, key))
        result.push({
          name: key,
          children: grouped[key],
        });
    }

    chart.data = result;

    chart.colors.step = 1;

    // define data fields
    chart.dataFields.value = "value";
    chart.dataFields.name = "title";
    chart.dataFields.children = "children";

    chart.sorting = "none";

    chart.zoomable = false;
    const bgColor = new am4core.InterfaceColorSet().getFor("background");

    // level 0 series template
    const level0SeriesTemplate = chart.seriesTemplates.create("0");
    const level0ColumnTemplate = level0SeriesTemplate.columns.template;

    level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level0ColumnTemplate.fillOpacity = 0;
    level0ColumnTemplate.strokeWidth = 4;
    level0ColumnTemplate.strokeOpacity = 0;

    // level 1 series template
    const level1SeriesTemplate = chart.seriesTemplates.create("1");
    const level1ColumnTemplate = level1SeriesTemplate.columns.template;

    if (level1SeriesTemplate.tooltip)
      level1SeriesTemplate.tooltip.animationDuration = 0;
    level1SeriesTemplate.strokeOpacity = 1;

    level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level1ColumnTemplate.fillOpacity = 1;
    level1ColumnTemplate.strokeWidth = 4;
    level1ColumnTemplate.stroke = bgColor;

    const bullet1 = level1SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fontSize = "0.625rem";
    bullet1.label.wrap = true;
    bullet1.label.truncate = false;
    bullet1.label.padding(2, 2, 2, 2);
    bullet1.label.fill = am4core.color("#ffffff");

    chart.legend = new am4charts.Legend();

    chart.legend.fontSize = "0.625rem";
    chart.legend.contentAlign = "left";
    chart.legend.labels.template.disabled = true;
    chart.legend.position = "right";
    chart.legend.valign = "top";
    chart.legend.margin(0, -20, 0, 0);

    chart.rtl = false;
    chart.maxLevels = 2;

    return setResponsiveRules(chart);
  },
};
