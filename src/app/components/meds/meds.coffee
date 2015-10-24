app = angular.module 'evothingsapp'

app.controller("MedIndexController", ["$scope", "MedService",
  ($scope, MedService) ->
    MedService.listMeds().then((meds) ->
      $scope.meds = meds
    )
])

app.controller("MedNewController", ["$scope", "$state", "MedService",
  ($scope, $state, MedService) ->
    $scope.med = {name: "", description: "", product_id: "", last_opened: "", openinterval: "", open_alert: "", reminder_on: ""}
    $scope.save = () ->
      MedService.createMed($scope.med).then(() ->
        $state.go("root.meds.index", {}, {reload: true})
      )
])
