const EncouragementMessageController = function () {
  'ngInject';

  switch (this.resource.contentName) {
  case 'Game':
    this.message =
      `Your brain works hard, and sometimes you've got to play hard. Explore
      more Staying Sharp games.`;
    break;
  case 'Article':
    this.message =
      'See what the science says. Explore hundreds of brain health articles.';
    break;
  case 'Activity':
    this.message =
      'You\'re getting sharper. Find more brain-health Activities.';
    break;
  case 'UserActivity':
    this.message =
      'You\'re getting sharper. Find more brain-health Activities.';
    break;
  case 'Recipe':
    this.message =
      `Want extra helpings of brain-science? Explore and save delicious,
      brain healthy recipes.`;
    break;
  }

};

export default EncouragementMessageController;
