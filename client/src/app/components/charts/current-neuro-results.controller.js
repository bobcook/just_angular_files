const CurrentNeuroResultsController = function () {
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
            enabled: false
          },
          xAxis: {
            lineColor: '#c0c1c2',
            categories: [
              'Processing<br />Speed',
              'Sustained<br />Attention',
              'Working<br />Memory',
              'Cognitive<br />Flexibility',
              'Executive<br />Function',
              'Recognition<br />Memory'
              ],
            labels: {
              rotation: 0,
              style: {
                'text-align': 'center',
              },
              useHTML : true
            },
            tickLength: 0
          },
          yAxis: {
            min: 0,
            lineColor: '#c0c1c2',
            title: {
              text: null
            },
            plotBands:{
              from: 6.5,
              to: 10,
              color: '#f8f9f9'
            },
            plotLines: [{
              color: '#d9d9d9',
              value: 6.5,
              width: 2
            }],
            tickPositions: [0,10],
            gridLineWidth: 0,
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            column: {
              borderWidth: 0,
              colors: [
                '#d1282c ',
                '#e2ad24 ',
                '#375e71 ',
                '#e7763d ',
                '#6caeb6 ',
                '#6b7f8e '
                ],
              color: '#6b7f8e',
              pointPadding: 0.05
            },
            series: {
              states: {
                hover: {
                  enabled: false
                }
              }
            }
          },
          tooltip: {
            enabled: false,
          },

      },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        series: data
    };
  };

  this.updateChartConfig = (neuroResults) => {
    // TODO: make more dynamic
    const data = _.values(_.pick(neuroResults, [
      'processingSpeed',
      'sustainedAttention',
      'workingMemory',
      'cognitiveFlexibility',
      'executiveFunction',
      'recognitionMemory'
    ]));

    const consumableData = [ { 'data': data } ]

    this.chartConfig = getChartConfig(consumableData);
  };
};

export default CurrentNeuroResultsController;
