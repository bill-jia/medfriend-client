app = angular.module 'evothingsapp'

app.controller("MedIndexController", ["$scope", "$state", "MedService",
  ($scope, $state, MedService) ->
    MedService.listMeds().then((meds) ->
      for med in meds
        med.edit = false
      $scope.meds = meds
    )
    $scope.newMed = {name: "", description: "", product_id: "", last_opened: "", openinterval: "", open_alert: "", reminder_on: ""}



    $scope.flipEdit = (index) ->
      if $scope.meds[index].edit
        $scope.meds[index].edit = false
      else
        $scope.meds[index].edit = true

    $scope.update = (index) ->
      MedService.updateMed($scope.meds[index]).then(() ->
        $state.go("root.meds.index", {}, {reload: true})
      )

    $scope.save = () ->
      MedService.createMed($scope.newMed).then(() ->
        $state.go("root.meds.index", {}, {reload: true})
      )

    $scope.delete = (index) ->
      $scope.meds[index].remove().then(() ->
        $state.go("root.meds.index", {}, {reload: true})
      )
])

# app.controller("MedNewController", ["$scope", "$state", "MedService",
#   ($scope, $state, MedService) ->
#     $scope.med = {name: "", description: "", product_id: "", last_opened: "", openinterval: "", open_alert: "", reminder_on: ""}
#     $scope.save = () ->
#       MedService.createMed($scope.med).then(() ->
#         $state.go("root.meds.index", {}, {reload: true})
#       )
# ])
