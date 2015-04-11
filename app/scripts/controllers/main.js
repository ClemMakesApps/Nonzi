'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('MainCtrl', function ($scope, $window, $location, $stateParams, $timeout, LeaderboardLoader) {
  $scope.referral = Number($stateParams.refer);

  if($scope.referral) {
    $scope.referHref = 'refer=' + $scope.referral;
  }

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
  }]

  $scope.org = {
    'name': 'The Amala Foundation',
    'url': 'https://amalafoundation.org/',
  }

  $scope.cause = {
    'name': 'Bhatti Mines School',
    'blurb': 'The children served by Bhatti Mines School live in extreme poverty. For them, the school offers an alternative to child labor, an quality education, and hope for the future.',
    'why': '   Bhatti Mines community is one of the most impoverished in the Delhi area. There is no running water, electricity, adequate food and shelter, or health services. Before the Bhatti Mines had a school, manual labor started in childhood, seeking an education was impossible, and this community was trapped in the cycle of poverty.<br/> But twelve years ago, Santosh and Archana Singh invested in the future of this community. With funding from people like you, they build a free school. Instead of laboring for survival, children can now pursue an education. The school is full of positive role models, adults who care about the success of their students. Each year, approximately 200 children are offered an alternative to child labor, a route out of extreme poverty. Children who attend school are more likely to grow up healthy, earn a living wage, marry later, and pass on a better life to the next generation. For these kids, Bhatti Mines School means hope for the future and freedom to thrive.',
    'image': 'indiademographic.jpg',
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
        // $window.open(
        //   '//plus.google.com/share?url=' + encodeURIComponent($location.absUrl()),
        //   'sharer', 'toolbar=0,status=0,width=500,height=500');
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

    player.addEvent('ready', function() {

        player.addEvent('playProgress', onPlayProgress);
    });



  $scope.popover = false;

  $scope.showPopover = function(){
    $scope.popover = true;  
	console.log("");
  };

    function onPlayProgress(data, id) {
        console.log(data.seconds + 's played');
        // $scope.highlights = true;
        // $scope.$apply();

        $( ".campaignHighlights" ).animate({"top": "540px"}, 1000, function() {
          $( ".campaignHighlights" ).removeClass("whitefont");
          $( ".campaignHighlights" ).css("color","black");
          $( ".campaignHighlights .btn" ).css("color","black");
        });
        $( ".campaignContent" ).animate({"padding-top": "490px"}, 1000);
        player.removeEvent('playProgress');
    }




});
$(function () {
  $('[data-toggle="popover"]').popover()
})
