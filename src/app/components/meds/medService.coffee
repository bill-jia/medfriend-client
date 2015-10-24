angular.module "evothingsapp"
  .factory("MedService", ["Restangular",
    (Restangular) ->
      MedRestangular = Restangular.withConfig(
        (RestangularConfigurer) ->
          RestangularConfigurer.addRequestInterceptor((elem, operation, what, url) ->
            if (operation == "put" || operation == "post")
              medication: elem
            else
              elem
          )
      )

      model = "medications"

      listMeds: () -> MedRestangular.all(model).getList()
      getMed: (medId) -> MedRestangular.one(model, medId).get()
      createMed: (med) -> MedRestangular.service(model).post(med)
      updateMed: (med) -> med.put()
  ])
