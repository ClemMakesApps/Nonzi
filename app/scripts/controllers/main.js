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
  		'img': 'http://lorempixel.com/140/140/',
  		'amount': 100
  	},{
  		'first': 'Raphael',
  		'last': 'Turtle',
  		'img': 'http://lorempixel.com/140/140/',
  		'amount': 75
  	},{
  		'first': 'Leonardo',
  		'last': 'Turtle',
  		'img': 'http://lorempixel.com/140/140/',
  		'amount': 50
  	},{
  		'first': 'Michelangelo',
  		'last': 'Turtle',
  		'img': 'http://lorempixel.com/140/140/',
  		'amount': 25
  	}]
	
	
	$scope.faq = [{
  		'question': 'How are babby made?',
  		'answer': 'Ask your mom',
  		'number': 1
  	},{
  		'question': 'To whom do the bases belong?',
  		'answer': 'Us. And google, probably.',
  		'number': 2
  	},{
  		'question': 'How is everything?',
  		'answer': 'AWESOME!',
  		'number': 3
  	}]
  
	
});
