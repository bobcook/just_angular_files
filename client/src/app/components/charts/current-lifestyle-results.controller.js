const CurrentLifestyleResultsController = function () {
  'ngInject';

  const getChartConfig = (data) => {
    return {
      options: {
        chart: {
          type: 'column',
          spacingLeft: 0,
          spacingRight: 0,
        },
        exporting: {
          enabled: false,
        },
        xAxis: {
          lineColor: '#c0c1c2',
          categories: [
            'Move',
            'Discover',
            'Relax',
            'Nourish',
            'Connect',
          ],
          tickLength: 0,
        },
        yAxis: {
          min: 0,
          lineColor: '#c0c1c2',
          title: {
            text: null,
          },
          plotBands:{
            from: 6.5,
            to: 10,
            color: '#f8f9f9',
          },
          plotLines: [{
            color: '#d9d9d9',
            value: 6.5,
            width: 2,
          }],
          tickPositions: [0, 10],
          gridLineWidth: 0,
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            colors: [
              '#cf2a2b',
              '#e6763e',
              '#e2ad0e',
              '#6dafb7',
              '#385d70',
              '#6b7f8e',
            ],
            pointPadding: 0.05,
          },
          series: {
            colorByPoint: true,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      series: data,
      subtitle: {
        text: null,
      },
      title: {
        text: null,
      },
    };
  };

  this.updateChartConfig = (lifestyleResults) => {
    // TODO: make more dynamic
    const data = _.values(_.pick(lifestyleResults, [
      'move',
      'discover',
      'relax',
      'nourish',
      'connect',
    ]));

    const consumableData = [ { 'data': data } ];

    this.chartConfig = getChartConfig(consumableData);
  };
};

export default CurrentLifestyleResultsController;
