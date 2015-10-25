app = angular.module 'evothingsapp'

app.controller("MedIndexController", ["$scope", "$rootScope", "$state", "MedService", "$cordovaBLE", "$cordovaLocalNotification", "onBottleFound",
  ($scope, $rootScope, $state, MedService, $cordovaBLE, $cordovaLocalNotification, onBottleFound) ->
    MedService.listMeds().then((meds) ->
      for med in meds
        med.edit = false
      $scope.meds = meds
    )
    $scope.newMed = {name: "", description: "", product_id: "", last_opened: "", openinterval: "", open_alert: "", reminder_on: ""}
    $scope.device = {}
    $scope.interrupted = false

    $scope.scheduleSingleNotification = (title, text) ->
      $cordovaLocalNotification.schedule({
        id: 1,
        title: title,
        text: text,
        data: {}
      }).then(() ->)

    $scope.scanBT = () ->
      $scope.lastBottleDetected = 0
      $scope.currBottleDetected = 0
      $scope.lastName = ""
      $scope.deviceFound = false
      $scope.loopBTScan()

    $scope.loopBTScan = () ->
      console.log "Loop begins"
      document.addEventListener("deviceready", () ->
          ble.startScan(['0000'+'0010'+'-0000-1000-8000-00805F9B34FB'], (device)->
            onBottleFound.broadcast(new Date(), device.name)
            ble.stopScan(
              () -> $scope.loopBTScan()
            )
          )
      )

    $scope.$on("bottlefound", (e, nextDate, nextName) ->
      console.log "MEDFRIEND next date " + nextDate
      console.log "MEDFRIEND next name " + nextName
      if $scope.lastBottleDetected == 0
        $scope.lastBottleDetected = nextDate
      else
        $scope.lastBottleDetected = $scope.currBottleDetected
      if $scope.currBottleDetected == 0
        $scope.currBottleDetected = $scope.lastBottleDetected
      else
        $scope.currBottleDetected = nextDate

      console.log "MEDFRIEND last bottle date: " + $scope.lastBottleDetected

      console.log "MEDFRIEND curr bottle date: " + $scope.currBottleDetected
      if $scope.lastBottleDetected != 0
        timeDifference = ($scope.currBottleDetected).getTime() - ($scope.lastBottleDetected).getTime()
        console.log "MEDFRIEND time diff: " + timeDifference
        # $scope.device = device

      if ($scope.lastName != nextName || timeDifference > 5500)
        $scope.scheduleSingleNotification(nextName, "last signal: " + timeDifference)
        $scope.lastName = nextName
        console.log "MEDFRIEND name to be saved: " + $scope.lastName
    )
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
