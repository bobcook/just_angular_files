const VideoIframeController = function ($sce) {
  'ngInject';

  this.videoSrc =
    $sce.trustAsResourceUrl(
      `//players.brightcove.net/3772599298001/` +
      `default_default/index.html?videoId=${this.videoId}`
    );
};

export default VideoIframeController;
