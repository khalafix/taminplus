import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";

export default {
  config: (
    chart,
    data,
    option //object
  ) => {
    const series = chart.series.push(
      new am4plugins_wordCloud.WordCloudSeries()
    );

    series.dataFields.word = "tag";
    series.dataFields.value = "weight";

    series.minFontSize = 12;
    series.maxFontSize = 30;

    series.randomness = 0;

    series.accuracy = 0;
    series.step = 15;
    series.rotationThreshold = 0;
    series.maxCount = 10;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);

    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop

    series.angles = [0, -90];
    series.fontWeight = "700";

    series.data = data;

    // series.heatRules.push({
    // 	target: series.labels.template,
    // 	property: 'fill',
    // 	min: am4core.color('#ff5555'),
    // 	max: am4core.color('#000'),
    // 	dataField: 'value',
    // });

    return chart;
  },
};
