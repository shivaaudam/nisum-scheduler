angular.module('mainCtrl',['userService'])
.controller('mainController',function($location, User){	
	var vm = this;
	vm.error = "";
	vm.doRegister = function(){		
		console.log(vm.registerData);
		User.register(vm.registerData)
		.success(function(data){
			console.log(data);
			if(data.success){
				$location.path('/login');
			}
			else{
				vm.error = data.message;
			}
		})
	};

	vm.doLogin = function(){
		console.log(vm.loginData);
		User.login(vm.loginData)
		.success(function(data){
			console.log(data);
		})
	};

});