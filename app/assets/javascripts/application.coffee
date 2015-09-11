#= require jquery
#= require jquery-ujs
#= require lodash
#= require angular
#= require angular-rails-resource
#= require azul7/vendor/modernizr
#= require azul7/vendor
#= require azul7/plugins
#= require azul7/main
#= require lodash
#= require ng-templates/templates
#= require_self
#= require_tree ./application

angular.module 'stayingSharp.services', [
  'rails'
]

angular.module 'stayingSharp.reminderSettings', []
angular.module 'stayingSharp.userActivities', [
  'rails'
]
