$(document).ready(function() {

   // var speed = 30;
   // var level = 1;
   // var points = 0;
   // var check_bship_creation = 0;
   // var generate_how_open = 3;

   var bombs = [];
   var missiles = [];
   var mSpeed = 30;
   var shipSpeed = 50;
   var bombSpeed = 50;
   // Button is being pressed??
   var movement = { u: false, d: false, l: false, r: false }
   var frameW = $('.frame').width();
   var frameH = $('.frame').height();
   var shipW = $('.bship').width();
   var dir = 3;
   var live = 3;
   var pause = false;
   var points = 0;

   $('.bship').css('display', 'block');

   // Background music
   playBgm();

   // Key control
   $(document).keydown(function(e) {
      var position = $('.submarine').position();
      var move_d = 20 // moving distance

      switch (e.keyCode) {
         case 37: // left
         $('.submarine').css('transform', 'scaleX(-1)');
         movement.l = true;
         break;
         case 38: // up
         movement.u = true;
         break;
         case 39: // right
         $('.submarine').css('transform', 'scaleX(1)');
         movement.r = true;
         break;
         case 40: // down
         movement.d = true;
         break;
         case 32: // space key
         missiles.push(
            $('<div class="missile">')
            .css('left', position.left + 93)
            .css('top', position.top - 30)
            .appendTo('.missiles')
         );
         break;
      }
   });

   $(document).keyup(function(e) {
      switch (e.keyCode) {
         case 37: // left
         movement.l = false;
         break;
         case 38: // up
         movement.u = false;
         break;
         case 39: // right
         movement.r = false;
         break;
         case 40: // down
         movement.d = false;
         break;
      }
   });

   var move_d = 5
   var move = setInterval (function() {
      var position = $('.submarine').position();
      if (position) {
        if (movement.u) {
           $('.submarine').css('top', position.top - move_d +'px');
        }
        if (movement.d) {
           $('.submarine').css('top', position.top + move_d +'px');
        }
        if (movement.l){
           $('.submarine').css('left', position.left - move_d +'px');
        }
        if (movement.r){
           $('.submarine').css('left', position.left + move_d +'px');
        }
      }
   }, 40);


   // Launching missiles
/*   var movemis = setInterval(function() {
      missiles.forEach(function(m, i) {

         if (missiles.length < 1) {
            return;

            var mTop = parseInt(m.css('top', '-=5px').css('top'));
            var mH = m.height();

            if(mTop < -mH) {
               missiles.splice(i, 1);
            }

            // Collision missiles with bship
            for(var i = 0; i < missiles.length; i++) {

               var mi = m.position();
               var b = $('.bship').position();
               var bW = $('.bship').width();
               var bH = $('.bship').height();

               if (mi.left >= (b.left - bW/2) && mi.left <= (b.left + bW/2) &&
                   mi.top >= (b.top - bH/2) && mi.top <= (b.top + bH/2))
               {
                  $('.bship').css('display', 'none').remove();
                  $('.missile').css('display', 'none').remove();
                  missiles.splice(i, 1);

                  // Clear missiles
                  missiles = [];
                  pause = true;  // stops new bombs from coming

                  var reset = setInterval(function() {

                    // Remove explosion
                    $('.explosion').css('background-image', 'none').remove();
                    // New battle ship
                    $('<div class="bship">').appendTo('.frame');

                    // Start bombs
                    pause = false;
                    // Stop this reset
                    clearInterval(reset);

                  }, 1000);

                  // explosion animation
                  $('<div class="explosion">').css('display', 'block').css('left', b.left+60).css('top', b.top-20).css('background-image', 'url("img/explosion.gif")').appendTo('.frame');

                  // explosion sound
                  soundEffect1();

                  // Up score
                  upScore();

                  // // explosion animation
                  // $('.explosion').css('display', 'block').css('left', b.left+60).css('top', b.top-20);
                  //
                  // // explosion sound
                  // soundEffect1();
               }
            }
         }
      });
   }, mSpeed);
*/

   var movemis = setInterval(function() {
      missiles.forEach(function(m, i) {
         var mTop = parseInt(m.css('top', '-=5px').css('top'));
         var mH = m.height();

         if(mTop < -mH) {
            missiles.splice(i, 1);
         }

         // Collision missiles with bship
         for(var i = 0; i < missiles.length; i++) {

            var mi = m.position();
            var b = $('.bship').position();
            var bW = $('.bship').width();
            var bH = $('.bship').height();

            if (mi.left >= (b.left - bW) && mi.left <= (b.left + bW) &&
                mi.top >= (b.top - bH/2) && mi.top <= (b.top + bH/2))
            {
               $('.bship').css('display', 'none').remove();
               $('.missile').css('display', 'none').remove();
               // missiles.splice(i, 1);

               missiles = [];
               pause = true;  // stops

               var reset = setInterval(function() {

               // Remove explosion
               $('.explosion').css('background-image', 'none').remove();

               // New bship
               $('<div class="bship">').css('display', 'block').appendTo('.frame');
               pause = false;
               clearInterval(reset);

               // Up score
               points += 100;
               upScore();

            }, 1000);

               // explosion animation
               $('<div class="explosion">').css('display', 'block').css('left', b.left+60).css('top', b.top-20).css('background-image', 'url("img/explosion.gif")').appendTo('.frame');

               // explosion sound
               soundEffect1();
            }
         }
      });
   }, mSpeed);


   // Count up score
   function upScore() {
      var p = "Score: " + points;
      $('.score').text(p);
   }


   // Droping bombs
   var dropbombs = setInterval(function() {
      bombs.forEach(function(b, i) {

        if (bombs.length < 1)
          return;

         var bTop = parseInt(b.css('top', '+=3').css('top'));
         var bH = b.height();

         if (bTop > frameH) {
            bombs.splice(i, 1);
         }

         // Collision bombs with submarine
         for (var i = 0; i < bombs.length; i++) {
            var bo = b.position();
            var s = $('.submarine').position();
            var sW = $('.submarine').width();
            var sH = $('.submarine').height();

            if (bo.left >= (s.left - sW/2) && bo.left <= (s.left + sW/2) &&
                bo.top >= (s.top - sH/2) && bo.top <= (s.top + sH/2))
            {
               $('.submarine').css('display', 'none').remove();
               $('.bomb').css('display', 'none').remove();
               // Clear bombs
               bombs = [];
               pause = true;  // stops new bombs from coming

               $('<h1 class="dead">You Died!</h1>').appendTo('.frame');
               var reset = setInterval(function() {
                 // remove message
                 $('.dead').remove();
                 // Remove explosion
                 $('.explosion').css('background-image', 'none').remove();
                 // New submarine
                 $('<div class="submarine">').appendTo('.frame');
                 // Start bombs
                 pause = false;
                 // Stop this reset
                 clearInterval(reset);
               }, 3000);
               // explosion animation
               $('<div class="explosion">').css('display', 'block').css('left', s.left+30).css('top', s.top-10).css('background-image', 'url("img/explosion.gif")').appendTo('.frame');
               // explosion sound
               soundEffect2();
               // Live count
               live -=1;
               $('.live').text('Live: ' + live);

               if (live < 0) {
                  clearInterval(dropbombs);
                  clearInterval(ship);
                  clearInterval(movemis);
                  $('.dead').remove();
                  $('.gameover').css('display', 'block');
                  break;
               }
              //  clearInterval(dropbombs);
               break;
            }
         }
      });
   }, bombSpeed);

   // moving ship
   var ship = setInterval(function() {
      var l = parseInt( $('.bship').css('left','+=' + dir).css('left') );
      if (l > frameW - shipW) {
         $('.bship').css('transform', 'scaleX(-1)');
         dir *= -1;
      }
      else if (l < 0) {
         $('.bship').css('transform', 'scaleX(1)');
         dir *= -1;
      }

      // Making bombs
      var rand = Math.floor(Math.random() * 40);
      if (rand == 0 && !pause) {
         var position_bs = $('.bship').position();
         bombs.push($('<div class="bomb">')
         .css('left', position_bs.left + 80)
         .css('top', position_bs.top + 50)
         .appendTo('.bombs')
         );
      }

   }, shipSpeed);



   function live() {
      var lives = "Live: " + live;
      $('.live').text(lives);
   }

   function soundEffect1() {
      var sound1 = new Audio("audio/explosion_bship.mp3");
      sound1.load();
      sound1.play();
   }

   function soundEffect2() {
      var sound2 = new Audio("audio/explosion_bomb.mp3");
      sound2.load();
      sound2.play();
   }

   function playBgm() {
      var bg = new Audio("audio/bg.mp3");
      bg.load();
      bg.loop = true;
      bg.play();
   }

   function getRandom(maxSize) {
      return parseInt(Math.random() * maxSize);
   }

});
