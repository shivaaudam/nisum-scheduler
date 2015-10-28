angular.module('userService',[])
.factory('User',function($http){
	var userFactory={};

	userFactory.register = function(userData){
		//console.log(userData);
		return $http.post('/register',userData);
	};

	userFactory.login = function(loginData){
		return $http.post('/login',loginData);
	};

	return userFactory;
})