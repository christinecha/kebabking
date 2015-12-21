var ref = new Firebase("https://kebabking.firebaseio.com/");

//// Objects & Functions
var sky = {};
sky.autoHide = function(){
  if ($(window).height() < 700) {
    $('.sky').hide();
  } else {
    $('.sky').show();
  }
};

var clouds = {
  min: '',
  max: '',
};
clouds.setInitialOffset = function(){
  $('.cloud').each(function(){
    clouds.min = -200;
    clouds.max = $(window).width() + 200;
    var random = (Math.random() * (clouds.max - clouds.min)) + clouds.min;
    $(this).css('margin-left', random);
  });
};
clouds.moveRight = function(){
  var offsets = [];
  $('.cloud').each(function(){
    var offset = parseInt($(this).css('margin-left'));
    offsets.push(offset);
  });
  if (offsets[0] >= clouds.max) {
    offsets[0] = clouds.min;
  };
  if (offsets[1] >= clouds.max) {
    offsets[1] = clouds.min;
  };
  offsets[0]+=1;
  offsets[1]+=1;
  $('.cloud1').css('margin-left', offsets[0] + 'px');
  $('.cloud2').css('margin-left', offsets[1] + 'px');
};

//// Events
$(document).ready(function(){

  $(window).on('resize', function(){
    sky.autoHide();
  });

  clouds.setInitialOffset();
  setInterval(clouds.moveRight, 30);;

  $('#mailing-list').on('submit', function(e) {
    console.log('hi')
    e.preventDefault;
    var email = $('#email').val();
    ref.child('mailing-list').push({
      email: email,
      addedAt: Firebase.ServerValue.TIMESTAMP,
    });
    $('.confirmation').text('You\'ve been added to the list :)');
    return false;
  });
});









////
