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
  $scope.referral = Number($stateParams.refer);
  $rootScope.title = "MultiplyMe - Bhatti Mines School Project";

  if($scope.referral) {
    $scope.referHref = 'refer=' + $scope.referral;
  }

  organization.get({id: 1}, function(result){
    console.log('result', result);
    $scope.supporters = result.organization.donation_count;
    $scope.donation_amount = result.organization.donation_amount;
  });

  $scope.suggestedDonations = [{
    'amount': 16,
    'recurring': true,
    'message': 'Sponsor a student per month'
  },{
    'amount': 36,
    'recurring': false,
    'message': 'Sponsor a teacher for one week'
  },{
    'amount': 191,
    'recurring': false,
    'message': 'Sponsor a student for a year'
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
    'question': 'How often will we get updates about the school?',
    'answer': 'There is very little infrastructure at Bhatti Mines, electricity is spotty and there is no available internet. Once a month they give us an update by phone, and once a year a group of volunteers comes from America to visit the school and get more in depth updates.',
  },{
    'question': 'What happens if my friends don\'t respond in time?',
    'answer': 'You will have 3 options. If your friends respond just after the deadline and you think you cut it close enough, email us and we can manually override to allow your donation. If you just didn\'t get it, your pledged money will never be taken from your account. You will have the option to manually allow your donation even if you don\'t succeed at the challenge, and any friends you did convince to take the challenge will still have the normal 3 days to find their own friends.',
  },{
    'question': 'If I don\'t succeed and my money is refunded, is my friend\s money refunded too?',
    'answer': 'No. If your friend donated directly, the money is going straight to Bhatti Mines School. If they took the challenge, they still have 3 days from when their challenge began.',
  },{
    'question': 'Do my friends have to match my pledge?',
    'answer': 'No, but you can encourage them to if you wish. The minimum donation is $1, and there is no maximum.',
  },{
    'question': 'How do you know who is giving because of my pledge?',
    'answer': 'When you complete your donation you will be given a unique share link so that we can figure out who refered who. On your account page you can keep track of how much money you\'ve personally raised through referals to your unique link.',
  },{
    'question': 'If I don\'t complete my challenge, when do I see a refund?',
    'answer': 'Your money is not removed from your account until AFTER you complete the challenge. You won\'t see a refund because there is nothing to refund.',
  },{
    'question': 'Is this tax deductable?',
    'answer': 'Yes, and we\'ll be automatically sending you reciepts for your tax purposes.',
  },{
    'question': 'Will I be able to cancel a recurring donation later?',
    'answer': 'Yes! When you make an pledge or donation you will create a password so that you can log in and cancel or edit your donation any time.',
  }]

  $scope.org = {
    'name': 'The Amala Foundation',
    'url': 'https://amalafoundation.org/',
  }

  $scope.cause = {
    'name': 'Bhatti Mines School',
    'blurb': 'The children served by Bhatti Mines School live in extreme poverty. For them, the school offers an alternative to child labor, an quality education, and hope for the future.',
    'image': 'infographic.png',
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

  var dateStart='2015-04-15';
  var dateLength=30;
  var dateToday=new Date();
  var parsedToday=Date.parse(dateToday);
  var parsedStart=Date.parse(dateStart);
  var parsedLength = dateLength * 86400000;
  var parsedEnd = parsedLength + parsedStart;

  var requested = 50000;
  var raised = 12000;
  var percent =  Math.round(raised/requested*100)

  $scope.days = {
    'end' : parsedEnd, //dateEnd.getDate() + '/' + (dateEnd.getMonth()+1) + '/' + dateEnd.getFullYear(),
    'remaining' : Math.round((parsedEnd-parsedToday)/86400000)
  }

  $scope.money = {
    'requested' : 50000,
    'raised' : 0,
    'percent' : Math.round(0/50000*100)
  }


  var vimeoFrame = $('#vimeoFrame')[0];
  var player = $f(vimeoFrame);
  $scope.played = false;

  player.addEvent('ready', function() {

      player.addEvent('playProgress', onPlayProgress);
  });

  $scope.playVideo = function() {
    if(!$scope.played) {
      player.api("play");
    }
  }

  $scope.popover = false;

  $scope.showPopover = function(){
    $scope.popover = !$scope.popover; 
  };
  
    function onPlayProgress(data, id) {
        console.log(data.seconds + 's played');
        // $scope.highlights = true;
        // $scope.$apply();
        $scope.played = true;
        $scope.$apply();
        $( ".campaignHighlights" ).animate({"margin-top": "50%"}, 1000, function() {
          $( ".campaignHighlights" ).removeClass("whitefont");
          $( ".campaignHighlights" ).css("color","black");
          $( ".campaignHighlights .btn" ).css("color","black");
        });
        $( ".campaignContent" ).animate({"margin-top": "335px"}, 1000);
        player.removeEvent('playProgress');
    }




});
