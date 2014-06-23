/* global app:true */

'use strict';

var app = angular.module('confinderApp', [
  'confinderApp.filters',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'google-maps'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'ConsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
