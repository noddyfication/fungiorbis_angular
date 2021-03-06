'use strict';

angular.module('public', [
  'public.species'])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home.tpl.html',
        controller: 'HomeController as homeCtrl',
        resolve: {
          statsResponse: function (Species) {
            return Species.stats('home');
          }
        }
      });
  })

  .controller('HomeController', function (statsResponse) {
    this.stats = statsResponse.data.stats;
  })

  .controller('NavigationController', function (authentication) {
    this.activeTab = 'home';
    this.hasAccess = authentication.hasAccess;

    this.publicItems = [
      {name: 'species', text: 'Vrste'},
      {name: 'specimens', text: 'Nalazi'}
    ];

    this.isActiveTab = function (tab) {
      return tab === this.activeTab;
    };

    this.setActiveTab = function (tab) {
      this.activeTab = tab;
    };
  });