angular.module('app.routes',['ngRoute'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/',{
			templateUrl : 'app/views/pages/home.html',
		})
		.when('/login',{
			templateUrl:'app/views/pages/login.html',
			controller:'mainController',
			controllerAs:'login'
		}).
		when('/register',{
			templateUrl:'app/views/pages/register.html',
			controller:'mainController',
			controllerAs:'register'
		}).
		when('/success',{
			templateUrl:"app/views/pages/success.html",
			controller:"mainController",
			controllerAs:"success"
		})
		
		$locationProvider.html5Mode(true);
	});