'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('MainCtrl', function ($scope, $window, $location, $stateParams, $timeout, $rootScope, LeaderboardLoader, organization) {
  $scope.referral = $stateParams.refer;
  $rootScope.title = "MultiplyMe + Back on My Feet Austin";
  $rootScope.ogTitle = $rootScope.title;

  if($scope.referral) {
    $scope.referHref = 'refer=' + $scope.referral;
  }
  if($stateParams.refer != null){
    $scope.referrerName = $stateParams.refer.replace(/[0-9]/g, '');
  }

  organization.get({id: 2}, function(result){
    //console.log('result', result);
    $scope.supporters = result.organization.donation_count;
    $scope.donation_amount = result.organization.donation_amount;
  });

  $scope.suggestedDonations = [{
    'amount': 10,
    'recurring': false,
    'message': 'A Food Handler’s Course certification'
  },{
    'amount': 25,
    'recurring': false,
    'message': 'A pair of winter gloves'
  },{
    'amount': 41,
    'recurring': true,
    'message': 'A monthly bus pass'
  },{
    'amount': 100,
    'recurring': false,
    'message': 'Two pairs of running shoes'
  },{
    'amount': 250,
    'recurring': false,
    'message': 'Full running gear and incentives'
  }]

  LeaderboardLoader(5).then(function(result){
    var i;
    $scope.leaders = [];
    for(i=0 ; i < result.leaders.length; i++){
      $scope.leaders[i] = result.leaders[i];
      $scope.leaders[i].img = md5(result.leaders[i].email.toLowerCase());
    }
  });

  $scope.faq = [{
    'question': 'What happens to my money if my friends don\'t respond in time?',
    'answer': 'Your pledged money will never be taken from your account. You are welcome to try again, either the challenge, or just donating directly. Any friends you did convince to take the challenge will still have the normal 3 days to find their own friends.',
  },{
    'question': 'Is my friends\' money refunded too if I don\'t beat the challenge?',
    'answer': 'No. If your friend donated directly, the money is going straight to Back on My Feet. If they took the challenge, they still have 3 days from when their challenge began.',
  },{
    'question': 'Do my friends have to match my pledge?',
    'answer': 'No, but you can encourage them to if you wish. The minimum donation is $1, and there is no maximum.',
  },{
    'question': 'How much money did my friends give?',
    'answer': 'When you complete your donation you will be given a referal code. On your account page you can keep track of how much money you\'ve personally raised through referals, and friends\' referals.',
  },{
    'question': 'Will I be able to cancel a recurring donation later?',
    'answer': 'Yes! When you make an pledge or donation you will create a password so that you can log in and cancel or edit your donation any time.',
  },{
    'question': 'How did Back on my Feet start?',
    'answer': 'Back on My Feet started when founder Anne Mahlum began a running group with some men she met outside of the Sunday Breakfast Rescue Mission during her early morning runs. From that humble beginning, Back on My Feet grew, expanding into cities across the country and growing into a more structured organization that has helped hundreds of people experiencing homelessness from coast to coast move their lives forward.',
  },{
    'question': 'How can I get involved?',
    'answer': 'There are many opportunities, whether that’s through running with our teams, volunteering at an event, getting your company involved, or becoming a FundRacer! http://austin.backonmyfeet.org/austin-get-involved',
  }]

  $scope.org = {
    'name': 'Back on My Feet',
    'url': 'http://austin.backonmyfeet.org/',
  }

  $scope.cause = {
    'name': 'Back on My Feet Austin',
    'blurb': 'Back on My Feet uses running to help adults experiencing homelessness build skills for self-sufficiency and independent living. Join our MultiplyMe challenge today and help our Members move their lives forward!',
    'image': 'bomfinfographic.jpg',
    'supporters':0
  }

  
    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($location.absUrl()),
         'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'twitter'){
        $window.open(
          '//www.twitter.com/intent/tweet?url=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'google'){
        $window.open(
          '//plus.google.com/share?url=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }

  var dateStart='2015-08-04';
  var dateLength=37;
  var dateToday=new Date();
  var parsedToday=Date.parse(dateToday);
  var parsedStart=Date.parse(dateStart);
  var parsedLength = dateLength * 86400000;
  var parsedEnd = parsedLength + parsedStart;

  var requested = 2000;
  var raised = 12000;
  var percent =  Math.round(raised/requested*100)

  $scope.days = {
    'end' : parsedEnd, //dateEnd.getDate() + '/' + (dateEnd.getMonth()+1) + '/' + dateEnd.getFullYear(),
    'remaining' : Math.round((parsedEnd-parsedToday)/86400000)
  }

  $scope.money = {
    'requested' : 2000,
    'raised' : 0,
    'percent' : Math.round(0/2000*100)
  }


//  var vimeoFrame = $('#vimeoFrame')[0];
//  var player = $f(vimeoFrame);
//  $scope.played = false;

//  player.addEvent('ready', function() {

//      player.addEvent('playProgress', onPlayProgress);
//  });

//  $scope.playVideo = function() {
//    if(!$scope.played) {
//      player.api("play");
//    }
//  }

  $scope.popover = false;

  $scope.showPopover = function(){
    $scope.popover = !$scope.popover; 
  };
  //
   // function onPlayProgress(data, id) {
   //     //console.log(data.seconds + 's played');
   //    // $scope.highlights = true;
   //     // $scope.$apply();
   //     $scope.played = true;
   //     $scope.$apply();
   //     $( ".campaignHighlights" ).animate({"margin-top": "50%"}, 1000, function() {
   //       $( ".campaignHighlights" ).removeClass("whitefont");
   //       $( ".campaignHighlights" ).css("color","black");
   //       $( ".campaignHighlights .btn" ).css("color","black");
   //     });
   //     $( ".campaignContent" ).animate({"margin-top": "335px"}, 1000);
   //     player.removeEvent('playProgress');
   // }




});
