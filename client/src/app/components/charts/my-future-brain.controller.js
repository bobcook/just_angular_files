const MyFutureBrainController = function (AssessmentResultScores,
                                          FutureBrainStats,
                                          $filter) {
  'ngInject';

  const COLORS = {
    optimal: '#56aa56',
    current: '#9dced3',
  };

  const getChartConfig = (data) => {
    return {
      options: {
        chart: {
          type: 'spline',
          spacingLeft: 0,
          spacingRight: 10,
          style: {
            fontFamily: 'Open Sans',
          },
        },
        exporting: {
          enabled: false,
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            pointRange: 1,
          },
          spline: {
            marker: {
              enabled: false,
            },
          },
          series: {
            states: {
              hover: {
                enabled: false,
              },
            },
            marker: {
              symbol: 'circle',
            },
            events: {
              legendItemClick: function () {
                return false;
              },
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        xAxis: {
          lineColor: '#c0c1c2',
          gridLineWidth: 0,
          tickInterval: 1,
          title :{
            text: 'Age',
            style: {
              fontWeight: 'bold',
            },
          },
          labels: {
            step: 1,
            pointInterval: 1,
            formatter: function () {
              return data.labels[this.value];
            },
          },
          tickLength: 0,
        },
        yAxis: {
          title :{
            text: 'Neuroperformance Score',
            style: {
              fontWeight: 'bold',
            },
          },
          min: 0,
          max: 10,
          gridLineWidth: 0,
          tickLength: 0,
        },
        legend: {
          title: {
            text: 'Estimated Brain Trajectory',
            style: {
              fontSize:'16px',
              color: '#5a5e61',
            },
          },
          layout: 'horizontal',
          align: 'left',
          x: 47,
          verticalAlign: 'bottom',
          itemMarginTop: 5,
          itemMarginBottom: 5,
          itemStyle: {
            fontSize:'14px',
            lineHeight: '21px',
            fontWeight: 'normal',
            color: '#5a5e61',
          },
        },
        credits: {
          enabled: false,
        },
      },
      series: data.data,
      title: {
        text: '',
        style: {
          display: 'none',
        },
      },
      subtitle: {
        text: '',
        style: {
          display: 'none',
        },
      },
    };
  };

  const calcNeuroScore = function (neuroResults) {
    return AssessmentResultScores.scoresAvg(neuroResults.scores);
  };

  const getAgeProgressions = FutureBrainStats.getAgeProgressions;

  const getColor = function (name) {
    return COLORS[name] || '';
  };

  const formatData = function (ageProgressions) {
    const labels = _.keys(_.first(_.values(ageProgressions)));
    const data = _.map(ageProgressions, function (progression, name) {
      return {
        name: $filter('capitalize')(name),
        data: _.values(progression),
        color: getColor(name),
      };
    });
    return {
      labels: labels,
      data: data,
    };
  };

  this.updateChartConfig = (neuroResults) => {
    if (_.isUndefined(neuroResults)) { return; }

    const neuroOverallScore = calcNeuroScore(neuroResults);

    getAgeProgressions(neuroOverallScore).then((vals) => {
      const consumableData = formatData(vals);
      this.chartConfig = getChartConfig(consumableData);
    });
  };
};

export default MyFutureBrainController;
