#= require jquery
#= require jquery-ujs
#= require lodash
#= require angular
#= require azul7/main
#= require ng-templates/templates
#= require_self
#= require_tree ./application

window.SS =
  Services: angular.module 'stayingSharp.services', [
    'rails'
  ]
  ReminderSettings: angular.module 'stayingSharp.reminderSettings', []