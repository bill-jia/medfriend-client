app = angular.module 'evothingsapp'

app.factory("onBottleFound", ["$rootScope",
  ($rootScope) ->
    broadcast: (date, name) ->
      $rootScope.$broadcast("bottlefound", date, name)
])
