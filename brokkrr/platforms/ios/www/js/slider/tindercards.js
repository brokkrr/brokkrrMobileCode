/*jslint browser: true*/
/*global console, Hammer, $*/

/**
 * Tindercards.js
 *
 * @author www.timo-ernst.net
 * @module Tindercardsjs
 * License: MIT
 */
var Tindercardsjs = Tindercardsjs || {};


Tindercardsjs = (function () {
  'use strict';
  
  var exports = {};
  
  /**
   * Represents one card
   *
   * @memberof module:Tindercardsjs
   * @class
   */
  exports.card = function (cardid, htmlcontent,DeviceID) {
    
    var jqo;
    
    /**
     * Returns a jQuery representation of this card
     *
     * @method
     * @public
     * @return {object} A jQuery representation of this card
     */
    this.tojQuery = function () {
      if (!jqo) {
        //jqo = $('<div class="tc-card">').attr('data-cardid', cardid).html(htmlcontent);
        jqo = $('<div class="tc-card">').attr('data-cardid', cardid).attr('data-DeviceID', DeviceID).html(htmlcontent);
      }
      return jqo;
    };

  };
  
  
  /**
   * Initializes swipe
   *
   * @private
   * @function
   */
  function initSwipe(onSwiped) {
    var $topcard = $('.tc-card'),
      deltaX = 0;

    $topcard.each(function () {

      var $card = $(this);

      (new Hammer(this)).on("panleft panright panend panup pandown", function (ev) {
        var transform,
          yfactor = ev.deltaX >= 0 ? -1 : 1,
          resultEvent = {};

        if (ev.type === 'panend') {
       		          if (deltaX > 100) {
                            /////
                            if(globalcountcontact < 3)
                            {
                            globalcountcontact++;
                            
                            transform = 'translate3d(' + (5 * deltaX) + 'px, ' + (yfactor * 1.5 * deltaX) + 'px, 0)';
                            
                            $card.css({
                                      'transition': '-webkit-transform 0.5s',
                                      '-webkit-transform': transform + ' rotate(' + ((-5 * deltaX) / 10) + 'deg)'
                                      });
                            
                            setTimeout(function () {
                                       $card.css({
                                                 'display': 'none'
                                                 });
                                       
                                       if (typeof onSwiped === 'function') {
                                       resultEvent.cardid = $card.attr('data-cardid');
                                       //notification 1Dec16
                                       resultEvent.DeviceID = $card.attr('data-DeviceID');
                                       
                                       resultEvent.card = $card;
                                       if (deltaX > 100) {
                                       resultEvent.direction = 'right';
                                       } else {
                                       resultEvent.direction = 'left';
                                       }
                                       onSwiped(resultEvent);
                                       } else {
                                       console.warn('onSwipe callback does not exist!');
                                       }
                                       }, 500);
                            
                           // playAudio('file:///android_asset/www/sound/pop.m4a');
                            }
                            else
                            {
                            $card.find('.status').remove();
                            transform = 'translate3d(0px, 0, 0)';
                            $card.css({
                                      'transition': '-webkit-transform 0.3s',
                                      '-webkit-transform': transform + ' rotate(0deg)'
                                      });
                            setTimeout(function () {
                                       $card.css({
                                                 'transition': '-webkit-transform 0s'
                                                 });
                                       }, 300);
                            //alert('Sorry! You have exceed broker contact limit.');
                            jQuery("label[for='messagetext']").html("Sorry! You have exceed broker contact limit.");
                            $('#InfopopupContactBroker').popup('open');
                            }
       		        
                            
		            
		          }else if(deltaX < -100)
		        	{
                            
                            transform = 'translate3d(' + (5 * deltaX) + 'px, ' + (yfactor * 1.5 * deltaX) + 'px, 0)';
                            $card.css({
                                      'transition': '-webkit-transform 0.5s',
                                      '-webkit-transform': transform + ' rotate(' + ((-5 * deltaX) / 10) + 'deg)'
                                      });
                            
                            setTimeout(function () {
                                       $card.css({
                                                 'display': 'none'
                                                 });
                                       
                                       if (typeof onSwiped === 'function') {
                                       resultEvent.cardid = $card.attr('data-cardid');
                                       //notification 1Dec16
                                       resultEvent.DeviceID = $card.attr('data-DeviceID');
                                       
                                       resultEvent.card = $card;
                                       if (deltaX > 100) {
                                       resultEvent.direction = 'right';
                                       } else {
                                       resultEvent.direction = 'left';
                                       }
                                       onSwiped(resultEvent);
                                       } else {
                                       console.warn('onSwipe callback does not exist!');
                                       }
                                       }, 500);
                            
                           // playAudio('file:///android_asset/www/sound/pop.m4a');
		        	
		        	}
		          else {
		        	  
		        	 // $('#status').text('First id else'+ deltaX);
		        	  $card.find('.status').remove();
			            transform = 'translate3d(0px, 0, 0)';
			            $card.css({
			              'transition': '-webkit-transform 0.3s',
			              '-webkit-transform': transform + ' rotate(0deg)'
			            });
			            setTimeout(function () {
			              $card.css({
			                'transition': '-webkit-transform 0s'
			              });
			            }, 300);
		          }
		          
        } else if (ev.type === 'panup' || ev.type === 'pandown') {
        	
        	// No vertical scroll
         ev.preventDefault();
        	
        } else {
        	//alert();
        	
        	
        	
        	 deltaX = ev.deltaX;

        	// $('#status').text('third id '+ deltaX);
        	 
        	 if (deltaX > 1) {
        		 $card.find('.status').remove();  
        		// $card.append('<div class="status dislike">Ignore!</div>');
        	 }else
        		 {
        		 $card.find('.status').remove(); 
        		// $card.append('<div class="status like">Contact!</div>');
        		 }
      
        	 
          transform = 'translate3d(' + deltaX + 'px, ' + (yfactor * 0.15 * deltaX) + 'px, 0)';

          $card.css({
            '-webkit-transform': transform + ' rotate(' + ((-1 * deltaX) / 10) + 'deg)'
          });
        }


      });
    });
  }
  
  /**
   * Renders the given cards
   *
   * @param {array} cards The cards (must be instanceof Tindercardsjs.card)
   * @param {jQuery} $target The container in which the cards should be rendered into
   * @param {function} onSwiped Callback when a card was swiped
   * @example Tindercardsjs.render(cards, $('#main'));
   * @method
   * @public
   * @memberof module:Tindercardsjs
   */
  exports.render = function (cards, $target, onSwiped) {
    var i,
      $card;
    
    if (cards) {
      for (i = 0; i < cards.length; i = i + 1) {
        $card = cards[i].tojQuery().appendTo($target).css({
          'position': 'absolute',
          'border': '1px solid #17d1ff',
          'border-radius': '5px',
         'background-color': '#f8f8f8',
          'height': '360px',
          'left': '10px',
          'top': '10px',
          'right': '10px',
      //   '-webkit-box-shadow': '3px -2px 9px -2px rgba(156,230,247,1)',
       // '-moz-box-shadow': '3px -2px 9px -2px rgba(156,230,247,1)',
        //'box-shadow': '3px -2px 9px -2px rgba(156,230,247,1)'
          
        });
        
        $card.find('.tc-card-img').css({
          'width': '100%',
          'border-radius': '10px 10px 0 0'
        });
        
        $card.find('.tc-card-name').css({
          'margin-top': '0',
          'margin-bottom': '5px'
        });
        
        $card.find('.tc-card-body').css({
          'position': 'relative',
          'left': '10px',
          'width': '280px'
        });
        
      }
      
      initSwipe(onSwiped);
      
    } else {
      console.warn('tindercards array empty, no cards will be displayed');
    }
  };
  
  return exports;
  
}());
