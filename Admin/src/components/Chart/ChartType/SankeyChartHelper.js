import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const setResponsiveRules = (chart) => {
  // chart.responsive.rules.push({
  // 	relevant: am4core.ResponsiveBreakpoints.isL,
  // 	state: (target, stateId) => {
  // 		if (target instanceof am4charts.SankeyDiagram) {
  // 			const state = target.states.create(stateId);

  // 			state.properties.orientation = 'vertical';

  // 			return state;
  // 		}
  // 	},
  // });
  return chart;
};

export default {
  config: (
    chart,
    data,
    option //object
  ) => {
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    const hoverState = chart.links.template.states.create("hover");
    hoverState.properties.fillOpacity = 0.6;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    chart.nodes.template.togglable = false;
    chart.nodes.template.fontSize = "0.75rem";

    chart.links.template.propertyFields.id = "id";
    chart.links.template.colorMode = "solid";
    chart.links.template.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    chart.links.template.fillOpacity = 0.1;
    chart.links.template.tooltipText = "";

    // highlight all links with the same id beginning
    chart.links.template.events.on("over", function (event) {
      chart.links.each(function (link) {
        if (link.id != event.target.id) {
          link.isHover = true;
        }
      });
    });

    chart.links.template.events.on("out", function (event) {
      chart.links.each(function (link) {
        link.isHover = false;
      });
    });

    // for right-most label to fit
    chart.paddingRight = 30;

    // make nodes draggable
    const nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = "Drag me!";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    nodeTemplate.nameLabel.label.align = "center";
    nodeTemplate.nameLabel.label.wrap = true;
    nodeTemplate.nameLabel.label.truncate = false;

    chart.orientation = option?.orientation ?? "vertical";
    option?.orientation === "horizontal" && chart.padding(40, 120, 40, 40);

    chart.data = data;

    return setResponsiveRules(chart);
  },
};
