const ActivityModalController = function (Activity,
                                         $currentModal,
                                         $location,
                                         $stateParams) {
  'ngInject';

  Activity.get($stateParams.id).then((response) => {
    this.resource = response.data;
    this.resourceTitle = this.resource.title;
    this.resourceURL = $location.absUrl();
    this.durationText = this.resource.effortText;
  });

  this.closeModal = $currentModal.close;
  this.resourceName = 'activity';
  this.pluralResourceName = 'activities';
  this.explorePath = `application.${this.pluralResourceName}`;
  this.stayingSharpPath = 'application.user.working-on';
};

export default ActivityModalController;
