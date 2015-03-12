'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function ($scope, $stateParams, $timeout) {
  
  	$scope.suggestedDonations = [{
  		'amount': 195,
  		'recurring': false,
  		'message': 'Can help educate a child for a year'
  	},{
  		'amount': 17,
  		'recurring': false,
  		'message': 'Can help educate a child for a month'
  	},{
  		'amount': 4,
  		'recurring': true,
  		'message': 'Can help educate a child for 3 months'
  	}]
	
	$scope.leaderBoard = [{
  		'first': 'Donatello',
  		'last': 'Turtle',
  		'img': '205e460b479e2e5b48aec07710c08d50',
  		'amount': 100
  	},{
  		'first': 'Raphael',
  		'last': 'Turtle',
  		'img': '205e460b479e2e5b48aec07710c08d50',
  		'amount': 75
  	},{
  		'first': 'Leonardo',
  		'last': 'Turtle',
  		'img': '205e460b479e2e5b48aec07710c08d50',
  		'amount': 50
  	},{
  		'first': 'Michelangelo',
  		'last': 'Turtle',
  		'img': '205e460b479e2e5b48aec07710c08d50', 
  		'amount': 25
  	}]
	
	$scope.faq = [{
  		'question': 'How are babby made?',
  		'answer': 'Ask your mom',
  	},{
  		'question': 'To whom do the bases belong?',
  		'answer': 'Us. And google, probably.',
  	},{
  		'question': 'How is everything?',
  		'answer': 'AWESOME!',
  	}]
    
  	$scope.org = {
  		'name': 'Amala Foundation',
  		'url': 'html://amala.org',
  	}

  	$scope.cause = {
  		'name': 'Bhatti Mines School',
  		'blurb': 'This is a blurb. Blurb blurb blurb',
		'why': 'Why dolor sit amet, consectetur adipiscing elit. Aliquam eget sapien sapien. Curabitur in mihdolor sit amet, consectetur adipiscing elit. Aliquam eget sapien sapien. Curabitur in mold.',
		'image': 'network.png',
		'risks': 'Risks Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui. Proin massa magna, vulputate nec bibendum nec, posuere nec lacus',
		'supporters':30
  	}
	
	
	var dateStart="2015-03-08"; 
	var dateLength=30; 
	var dateToday=new Date();
	var parsedToday=Date.parse(dateToday);
	var parsedStart=Date.parse(dateStart);
	var parsedLength = dateLength * 86400000;
	var parsedEnd = parsedLength + parsedStart;

	var requested = 30294;
	var raised = 12000;
	var percent = 30294-12000;
	
	$scope.days = {
		'end' : parsedEnd, //dateEnd.getDate() + '/' + (dateEnd.getMonth()+1) + '/' + dateEnd.getFullYear(),
		'remaining' : Math.round((parsedEnd-parsedToday)/86400000) 
	}
	
	$scope.money = {
		'requested' : 30294,
		'raised' : 12000,
		'percent' : Math.round(12000/30294*100)
	}
	

	
});
