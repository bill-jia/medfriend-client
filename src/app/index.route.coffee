angular.module 'evothingsapp'
  .config ($stateProvider, $urlRouterProvider) ->
    'ngInject'
    $stateProvider
      .state 'root',
        abstract: true
        name: "root"
        url: '/'
        templateUrl: 'app/main/main.html'
      .state "root.meds",
        abstract: true
        name: "root.meds"
        url: ""
        template: "<ui-view/>"
      .state "root.meds.index",
        name: "root.meds.index"
        url: ""
        templateUrl: "app/components/meds/views/index.html"
        controller: "MedIndexController"
      .state "root.meds.new",
        name: "root.meds.new"
        url: "/new"
        templateUrl: "app/components/meds/views/new.html"
        controller: "MedNewController"

    $urlRouterProvider.otherwise '/'
