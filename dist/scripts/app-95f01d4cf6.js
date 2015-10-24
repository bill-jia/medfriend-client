(function(){angular.module("evothingsapp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","restangular","ui.router","toastr"])}).call(this),function(){angular.module("evothingsapp").service("webDevTec",function(){"ngInject";var e,t;e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{title:"CoffeeScript",url:"http://coffeescript.org/",description:"CoffeeScript, 'a little language that compiles into JavaScript'.",logo:"coffeescript.png"},{key:"jade",title:"Jade",url:"http://jade-lang.com/",description:"Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.",logo:"jade.png"}],t=function(){return e},this.getTec=t})}.call(this),function(){angular.module("evothingsapp").directive("acmeNavbar",function(){var e,t;return e=["moment",function(e){"ngInject";var t;t=this,t.relativeDate=e(t.creationDate).fromNow()}],t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0}})}.call(this),function(){var e;e=angular.module("evothingsapp"),e.controller("MedIndexController",["$scope","MedService",function(e,t){return t.listMeds().then(function(t){return e.meds=t})}]),e.controller("MedNewController",["$scope","$state","MedService",function(e,t,n){return e.med={name:"",description:"",product_id:"",last_opened:"",openinterval:"",open_alert:"",reminder_on:""},e.save=function(){return n.createMed(e.med).then(function(){return t.go("root.meds.index",{},{reload:!0})})}}])}.call(this),function(){angular.module("evothingsapp").factory("MedService",["Restangular",function(e){var t,n;return t=e.withConfig(function(e){return e.addRequestInterceptor(function(e,t,n,a){return"put"===t||"post"===t?{medication:e}:e})}),n="medications",{listMeds:function(){return t.all(n).getList()},getMed:function(e){return t.one(n,e).get()},createMed:function(e){return t.service(n).post(e)},updateMed:function(e){return e.put()}}}])}.call(this),function(){angular.module("evothingsapp").directive("acmeMalarkey",function(){var e,t,n;return e=["$log","githubContributor",function(e,t){"ngInject";var n,a,o;o=this,n=function(){return a().then(function(){e.info("Activated Contributors View")})},a=function(){return t.getContributors(10).then(function(e){return o.contributors=e,o.contributors})},o.contributors=[],n()}],n=function(e,t,n,a){var o,i;i=void 0,o=malarkey(t[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "}),t.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(e){o.type(e).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(e){o.type(e.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})},t={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:n,controller:e,controllerAs:"vm"}})}.call(this),function(){angular.module("evothingsapp").factory("githubContributor",["$log","$http",function(e,t){"ngInject";var n,a,o;return n="https://api.github.com/repos/Swiip/generator-gulp-angular",a=function(a){var o,i;return null==a&&(a=30),o=function(e){return e.data},i=function(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))},t.get(n+"/contributors?per_page="+a).then(o)["catch"](i)},o={apiHost:n,getContributors:a}}])}.call(this),function(){angular.module("evothingsapp").controller("MainController",["$timeout","webDevTec","toastr",function(e,t,n){"ngInject";var a,o,i,r;r=this,a=function(){o(),e(function(){r.classAnimation="rubberBand"},4e3)},i=function(){n.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),r.classAnimation=""},o=function(){r.awesomeThings=t.getTec(),angular.forEach(r.awesomeThings,function(e){e.rank=Math.random()})},r.awesomeThings=[],r.classAnimation="",r.creationDate=1445705343990,r.showToastr=i,a()}])}.call(this),function(){angular.module("evothingsapp").run(["$log",function(e){"ngInject";return e.debug("runBlock end")}])}.call(this),function(){angular.module("evothingsapp").config(["$stateProvider","$urlRouterProvider",function(e,t){"ngInject";return e.state("root",{"abstract":!0,name:"root",url:"/",templateUrl:"app/main/main.html"}).state("root.home",{name:"root.home",url:"",templateUrl:"app/main/home.html"}).state("root.meds",{"abstract":!0,name:"root.meds",url:"/meds/index",template:"<ui-view/>"}).state("root.meds.index",{name:"root.meds.index",url:"",templateUrl:"app/components/meds/views/index.html",controller:"MedIndexController"}).state("root.meds.new",{name:"root.meds.new",url:"/meds/new",templateUrl:"app/components/meds/views/new.html",controller:"MedNewController"}),t.otherwise("/")}])}.call(this),function(){angular.module("evothingsapp").constant("malarkey",malarkey).constant("moment",moment)}.call(this),function(){angular.module("evothingsapp").config(["$logProvider","toastrConfig",function(e,t){"ngInject";return e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}]).config(["RestangularProvider",function(e){return e.setBaseUrl("https://desolate-bayou-3246.herokuapp.com/api")}])}.call(this),angular.module("evothingsapp").run(["$templateCache",function(e){e.put("app/main/oldmain.html",'<div class="container"><div><acme-navbar creation-date="main.creationDate"></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class="main.classAnimation"><button type="button" class="btn btn-lg btn-success" ng-click="main.showToastr()">Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class="caption"><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href="{{awesomeThing.url}}">{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>'),e.put("app/main/home.html",'<div id="topContainer" class="container"><div class="row"><div class="row-same-height"><div id="topRow" class="col-md-6 col-md-offset-3"><br><img ng-src="assets/images/logo.png" alt="MedFriend" style="width:210px;height:180px;"><h3>Never miss taking medication again.</h3><br></div></div></div></div><div class="row"></div><div class="container"><div class="row"><h3 class="center">Helpful reminders when you forget. Helpful alerts when your containers are opened.</h3></div><div class="row"><div class="col-md-4"><h2><span class="glyphicon glyphicon-log-in"></span> 30 Day Free Trial</h2><p>Get 30 days of MedFriend free. We\'ll even send you the trial package. Send it back free of charge if it\'s not for you.</p><br><br><button class="btn btn-warning marginTop marginBottom">Sign Up</button></div><div class="col-md-4"><h2><span class="glyphicon glyphicon-ok-circle"></span> How It Works</h2><p>MedFriend sends you a message if you haven\'t opened an important medication bottle by a certain time. You decide when you need to take medication by, and what kind of alerts you want. Also monitor if something harmful is being opened without you around.</p><button class="btn btn-warning marginTop marginBottom">Learn More</button></div><div class="col-md-4"><h2><span class="glyphicon glyphicon-stats"></span> Success Stories</h2><p>Read about how MedFriend is helping people stay healthy.</p><br><br><br><button class="btn btn-warning marginTop marginBottom">Learn More</button></div></div></div><div id="footer" class="container"><div class="row"><div class="col-md-8 col-md-offset-2"><h3 class="center marginTop">MedFriend is a product of the Cambridge University Engineering Department hackathon powered by ARM mbed</h3></div></div><div class="row"><div class="col-md-8 col-md-offset-2"><h3 class="center"><img id="camlogo" ng-src="assets/images/camlogo.jpeg"></h3></div></div></div>'),e.put("app/main/main.html",'<div class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="" class="navbar-brand">MedFriend</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"></ul><form class="navbar-form navbar-right"><div class="form-group"><input type="email" placeholder="email" class="form-control"></div><div class="form-group"><input type="password" placeholder="Password" class="form-control"></div><button type="submit" class="btn btn-success">Sign In</button></form></div></div></div><div class="container-fluid"><div ui-view=""></div></div>'),e.put("app/components/meds/views/index.html",'<div class="container-fluid">This is the index page.<ul><li ng-repeat="med in meds">{{med.name}} {{med.description}}</li></ul></div>'),e.put("app/components/meds/views/new.html",'<div class="container-fluid">This is the new page.<form><div class="form-group"><label>Name</label> <input type="text" placeholder="name" ng-model="med.name"></div><div class="form-group"><label>Description</label> <textarea type="text" placeholder="description" ng-model="med.description"></textarea></div><button ng-click="save()" class="btn btn-primary">Add</button></form></div>')}]);
//# sourceMappingURL=../maps/scripts/app-95f01d4cf6.js.map