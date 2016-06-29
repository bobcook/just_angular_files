const Airbrake = function (airbrakeConfig, envName) {
  'ngInject';

  const airbrake =
    new airbrakeJs.Client(
      { projectId: airbrakeConfig.id, projectKey: airbrakeConfig.key }
    );

  airbrake.addFilter(function (notice) {
    debugger;
    notice.context.environment = envName;
    return notice;
  });

  return { client: airbrake };
};

export default Airbrake;
