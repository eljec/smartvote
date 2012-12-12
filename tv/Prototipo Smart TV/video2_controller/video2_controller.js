/**
 *  Class: $.Video2_controller
 *  
*/
(function($) {
     var m_timerHandle = false;
     
     //store the value of top and left position of Div
     var originalVideo2_controller_divMasterTop = 0;
     var originalVideo2_controller_divMasterLeft = 0;
   
	//Video2_controller function
	$.fn.sfVideo2_controller = function(options) {
         //Verifies whether the stored data "sfui" have definition equals "Video2_controller" because the tag was create yet
		 if (!($(this).data('sfui') == 'Video2_controller')) {
			$(this).data('sfui', 'Video2_controller');
			
			var contents = [
                '<div id="mainVideo2_controller" class="main">',
                    '<div id="Video2_controllerBGUp" class="Video2_controllerUp">',
                        '<div id="Video2_controllerBGTime" class="Video2_controllerTime">',
                            '<div id="progressTime" class="progressTime" ></div>',
                        '</div>',
                        '<div id="timeInfo" class="time"></div>',
                    '</div>',
                    '<div id="Video2_controllerBGDown" class="Video2_controllerBGDown">',
                        '<div id="iconVolume" class="iconVolume"></div>',
                        '<div id="Video2_controllerVolume" class="Video2_controllerVolume">',
                            '<div id="progressVolume" class="progressVolume" ></div>',
                        '</div>',
                        '<div id="volumeValue" class="volumeValue"></div>',
                        '<div id="buttons" class="buttons">',
                            '<div id="backwardButton" class="bkButton" ></div>',
                            '<div id="playButton" class="plButton" ></div>',
                            '<div id="stopButton" class="stButton" ></div>',
                            '<div id="pauseButton" class="paButton" ></div>',
                            '<div id="fowardButton" class="fwButton" ></div>',
                            '<div id="textButton" class="txButton"></div>',
                        '</div>',
                    '</div>',
                 '</div>'
                         
			].join('');
			
            //insert the video tag
			$(this).html(contents);
            
            //store the original value of itens going to change
            // this variables used to set a default screen size
            originalVideo2_controller_divMasterTop = $(this).css('top').replace('px','');
            originalVideo2_controller_divMasterLeft = $(this).css('left').replace('px','');
            
        }
         if  ( typeof options == 'object') {
            //define the value of time
            $(this).setTime("0:00:00/0:00:00");
        } else if ( typeof options == 'string') {
            switch (options) {
                case 'setFullScreen':
                    $(this).children().removeClass('main');
                    $(this).children().addClass('mainFullScreen');                   
                    
                    //adjust position of div master
                    $(this).css('left', '0px');
                    $(this).css('top', '0px');
                                        
                    //adjust progress bar Up(Video2_controllerBGUp)
                    $(this).children().children(':nth-child(1)').removeClass('Video2_controllerUp');
                    $(this).children().children(':nth-child(1)').addClass('Video2_controllerUpFullScreen');
                    
                    //adjust progress bar Down (Video2_controllerBGDown)
                    $(this).children().children(':nth-child(2)').removeClass('Video2_controllerBGDown') ;
                    $(this).children().children(':nth-child(2)').addClass('Video2_controllerBGDownFullScreen') ;

                    break;
                case 'setDefaultScreen':
                    $(this).children().removeClass('mainFullScreen');
                    $(this).children().addClass('main'); 
                    
                     //adjust position of div master
                    $(this).css('left', originalVideo2_controller_divMasterLeft + 'px');
                    $(this).css('top', originalVideo2_controller_divMasterTop + 'px');
                    
                    //adjust progress bar Up(Video2_controllerBGUp)
                    $(this).children().children(':nth-child(1)').removeClass('Video2_controllerUpFullScreen');
                    $(this).children().children(':nth-child(1)').addClass('Video2_controllerUp');
                  
                    //adjust progress bar Down (Video2_controllerBGDown)
                    $(this).children().children(':nth-child(2)').removeClass('Video2_controllerBGDownFullScreen') ;
                    $(this).children().children(':nth-child(2)').addClass('Video2_controllerBGDown') ;
                  
                    $(this).setVisible('visible');
                    break;
                case 'show':
                    $(this).show();
                    break;
                case 'hide':
                    $(this).hide();
                    break;
            }
        }
     }
    
    /**
     * Function responsible for change the button of Progress area, that button can be: stop, play, pause
     */ 
     $.fn.changeButton = function(string) {
        //reset the buttons
        $("#playButton").css('background-image', 'url(video2_controller/images/play.png)' );
        $("#pauseButton").css('background-image', 'url(video2_controller/images/pause.png)' );
        $("#stopButton").css('background-image', 'url(video2_controller/images/stop.png)' );
        $("#backwardButton").css('background-image', 'url(video2_controller/images/rew.png)' );
        $("#fowardButton").css('background-image', 'url(video2_controller/images/ff.png)' );
        
        if ( string == 'play' ) {
            $("#playButton").css('background-image', 'url(video2_controller/images/play_sl.png)' );
            $("#textButton").text("Play" );             //div to show the string of button
        } else if ( string == 'pause') {
            $("#pauseButton").css('background-image', 'url(video2_controller/images/pause_sl.png)' );
            $("#textButton").text("Pause" );            //div to show the string of button
        } else if ( string == 'stop' ) {    
            $("#stopButton").css('background-image', 'url(video2_controller/images/stop_sl.png)' );
            $(this).setProgress(0);
            $(this).setTime("0:00:00/0:00:00");
            $("#textButton").text("Stop" );             //div to show the string of button
        } else if ( string == 'backward' ) {
            $("#backwardButton").css('background-image', 'url(video2_controller/images/rew_sl.png)' );
            $("#textButton").text("Backward" );         //div to show the string of button
        } else if ( string == 'forward' ) {
            $("#fowardButton").css('background-image', 'url(video2_controller/images/ff_sl.png)' );
            $("#textButton").text("Forward" );          //div to show the string of button
        }
     }
     
     /**
      * Function to set up the time
      */
     $.fn.setTime = function(timeProgress) {
        $("#timeInfo").html(timeProgress);
     }
     
     /**
      * Function to set up the Progress
      */
     $.fn.setProgress = function(timePercent) {
        $("#progressTime").css('width', timePercent + "%");
     }
     
     /**
      * Set the visibility for progress bar
      */
     $.fn.setVisible = function(valueVisible) {
            $(this).css('visibility', valueVisible);
     }
    
     /**
      * Function to set up the Volume progress
      */
     $.fn.setVolume = function(volumePercent) {
        $("#progressVolume").css('width', volumePercent + "%");
        $("#volumeValue").text(volumePercent);
     }
     
})(jQuery);
        

