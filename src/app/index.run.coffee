angular.module 'evothingsapp'
  .run(["$rootScope", "$log", "onBottleFound", ($rootScope, $log, onBottleFound) ->
    'ngInject'
    $log.debug 'runBlock end'
    $rootScope.loopBTScan = () ->
      document.addEventListener("deviceready", () ->
        ble.startScan(['0000'+'0010'+'-0000-1000-8000-00805F9B34FB'], (device)->
          onBottleFound.broadcast(new Date(), device.name)
          ble.stopScan(
            () -> $rootScope.loopBTScan()
          )
        )
      )
    $rootScope.loopBTScan()
  ])
