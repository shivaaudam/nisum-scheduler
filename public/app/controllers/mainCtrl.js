angular.module('mainCtrl',['userService'])
.controller('mainController',function($location, User){	
	var vm = this;
		vm.error = "";
		vm.success = "";
		vm.doRegister = function(){	
			User.register(vm.registerData)
			.success(function(data){
				console.log(data);
				if(data.success){
					//$location.path('/success');
					vm.success = data.message;
					vm.error = '';				
					console.log(vm.success);
				}
				else{
					vm.success ="";
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