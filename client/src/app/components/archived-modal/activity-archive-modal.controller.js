const ActivityArchiveModalController = function (Activity,
                                                 ActivityReview,
                                                 $currentModal,
                                                 $stateParams) {
  'ngInject';

  this.closeModal = $currentModal.close;
  this.resource = Activity;
  this.reviewResource = ActivityReview;
};

export default ActivityArchiveModalController;
