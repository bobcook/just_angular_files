const videoIframe = function () {
  return {
    restrict: 'E',
    templateUrl: 'app/articles/video-iframe/video-iframe.html',
    controller: 'VideoIframeController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      videoId: '=ssVideoId',
    },
  };
};

export default videoIframe;
