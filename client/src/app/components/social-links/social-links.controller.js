const SocialLinksController = function ($filter) {
  'ngInject';

  this.title = this.title || ''; // via-ss-title
  this.pageURL = this.pageURL || ''; // via ss-page-url
  this.resourceName = this.resourceName || ''; // via ss-resource-type

  this.iconClassFor = function (provider) {
    return providers[provider].iconClass;
  };

  this.providerNames = function () {
    return _.filter(_.keys(providers), function (providerName) {
      return providerName !== 'email';
    });
  };

  const providers = {
    facebook: {
      iconClass: 'icon-facebook',
    },
    twitter: {
      iconClass: 'icon-twitter',
    },
    'google+': {
      iconClass: 'icon-google-plus',
    },
    email: {
      iconClass: 'icon-email',
    },
    pinterest: {
      iconClass: 'icon-pinterest',
    },
  };
};

export default SocialLinksController;
