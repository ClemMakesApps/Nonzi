'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('MainCtrl', function ($scope, $stateParams, $timeout) {
  
  $scope.suggestedDonations = [{
    'amount': 175,
    'recurring': true,
    'message': 'Can help fund my trip for a month'
  },{
    'amount': 70,
    'recurring': false,
    'message': 'Can help fund my trip for a day'
  },{
    'amount': 20,
    'recurring': true,
    'message': 'Can help fund basic travel for a month'
  }]

  $scope.leaderBoard = [{
    'first': 'John',
    'last': 'Ellmore',
    'img': 'e130a4be9fba5eb5d932c813fbe3a58d',
    'amount': 5050
  },{
    'first': 'Rebecca',
    'last': 'Mince',
    'img': '205e460b479e2e5b48aec07710c08d50',
    'amount': 3000
  },{
    'first': 'Sally',
    'last': 'Smith',
    'img': '205e460b479e2e5b48aec07410c08d50',
    'amount': 2000
  },{
    'first': 'Bill',
    'last': 'Jones',
    'img': '205e460b479e2e5b48aec07710c08d53', 
    'amount': 1950
  }]

  $scope.faq = [{
    'question': 'How often will you send us trip updates?',
    'answer': 'My goal is to send them at least once every two weeks but realistically, it maybe more likely to be sent once every month.',
  },{
    'question': 'Are you partnering with any missions organizations?',
    'answer': 'Yes! I will be partnering with the International Missions Board (IMB).',
  },{
    'question': 'Will you be doing this mission trip alone?',
    'answer': 'Somewhat. My church and the International Missions Board (IMB) will be sending mission trips to my area every couple months to assist with my work.',
  },{
    'question': 'Can we still support you after this campaign is over?',
    'answer': 'If you are interested, please send me an email at fraser@gmail.com.',
  }]

  $scope.org = {
    'name': 'The Well Austin',
    'url': 'https://thewellaustin.com/',
  }

  $scope.cause = {
    'name': 'India Mission Trip',
    'blurb': 'Fraser is raising funds for a two year trip to share the gospel with low income families and plant churches in New Delhi, India',
    'why': 'Several years ago, God began placing a burden in my heart to share the gospel with the nations of the world (Specifically, unreached nations). Since then, I have been searching out for opportunities and discovering the nation God has placed upon my heart. Last year, my pastor at The Well Austin approached me about an opportunity to go to India to plant a new church as part of the Acts 29 Network. After praying and seeking wise counsel over the past several months, I have decided to go on this trip. I just put in my two weeks notice at my full time job at Facebook and am stepping out in faith that God will lead me every step of the way.',
    'image': 'indiademographic.jpg',
    'risks': 'Although I feel that God is calling me to go on this trip, I am stepping out in faith. I will be quitting my full time job and am unsure what types of fruit I will see in India during these 2 years. My goal is to see at least one church planted with 50 regular attendees before I finish but that is totally dependent on God.',
    'supporters':30
  }


  var dateStart='2015-03-15';
  var dateLength=30;
  var dateToday=new Date();
  var parsedToday=Date.parse(dateToday);
  var parsedStart=Date.parse(dateStart);
  var parsedLength = dateLength * 86400000;
  var parsedEnd = parsedLength + parsedStart;

  var requested = 50000;
  var raised = 12000;
  var percent = 50000-12000;

  $scope.days = {
    'end' : parsedEnd, //dateEnd.getDate() + '/' + (dateEnd.getMonth()+1) + '/' + dateEnd.getFullYear(),
    'remaining' : Math.round((parsedEnd-parsedToday)/86400000) 
  }

  $scope.money = {
    'requested' : 50000,
    'raised' : 12000,
    'percent' : Math.round(12000/50000*100)
  }

   
    var vimeoFrame = $('#vimeoFrame')[0];
    var player = $f(vimeoFrame);
    
    player.addEvent('ready', function() {
        
        player.addEvent('playProgress', onPlayProgress);
    });

    

    function onPlayProgress(data, id) {
        console.log(data.seconds + 's played');
        // $scope.highlights = true;
        // $scope.$apply();

        $( ".campaignHighlights" ).animate({"bottom": "-200px"}, 1000, function() {
          $( ".campaignHighlights" ).removeClass("whitefont");
          $( ".campaignHighlights" ).css("color","black");
          $( ".campaignHighlights .btn" ).css("color","black");
        });
        $( ".campaignContent" ).animate({"padding-top": "300px"}, 1000);
        player.removeEvent('playProgress');
    }
});
