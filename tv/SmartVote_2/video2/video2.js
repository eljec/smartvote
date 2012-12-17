/**
 *  Class: $.Video2
 *  Scrollbar is used when the content on the application is bigger than the screen
*/
(function($) {
    var PlayerPlugin 			= new Object();
    var AudioPlugin 			= new Object();
    var TVPlugin 				= new Object();
    var objVideo2_controller 	= new Object();         //Progressbar needs to work together with Video plugin

    var urlMedia = "";
    //constant for size of screen
    MAX_HEIGHT_SCREEN 	= 540;
    MAX_WIDTH_SCREEN 	= 960;
    JUMP_SECONDS 		= 0;
    
    //constants for status of media    
    PLAYING 	= 1;
    PAUSED  	= 2;
    STOPPED 	= 3;
    RESUME 		= 4;
    //initial value for status
    var status = STOPPED;
    // total time of video
    this.totalTime = 0;
    
    var timeSecondHidden	= 0;               // variable used to be hidden the progress bar after request to change for full screen
    var timeFullScreen 		= 0;                      // variable to get the value of time when the full screen is requested
    var boolFullScreen 		= false;               // variable used for indicating full screen is requested 
    var boolMarkTime 		= false;               // variable indicating if the time was marking when Full Screen called
    var boolBeginVideo 		= false;             // variable used to prohibit to press key pause, play, stop, forward, backward before the Video begins
    
    /**
	  * Video2 function is responsible for showing the video or for listening music
	  * Options parameter can to receive an object value or string value. When receive object value is to
	  * create the Video, and otherwise to do some behavior
      *
	  */
	 $.fn.sfVideo2 = function(options, opt) {
		 
		 //Verifies whether the stored data "sfui" have definition equals "Video"
		 if (!($(this).data('sfui') == 'Video2')) {
		             
			$(this).data('sfui', 'Video2');
			
			var contents = [
                '<div id="Video2Div" ></div>'
			].join('');
			
            //insert the video tag
			$(this).html(contents);
        }
        /*******************************************/
        // The urlMedia is a parameter to indicate where the media file stayed
        if ( options.urlMedia != undefined) {
            urlMedia = options.urlMedia;
        }
        
        // The jumpSeconds is a parameter to indicate how many secods can forward or backward
        if ( options.jumpSeconds != undefined) {
            JUMP_SECONDS = options.jumpSeconds;
        }
        // get the Progressbar component to work together with video plugin
        if ( options.idVideo2_controller != undefined ) {
                objVideo2_controller = $("#"+ options.idVideo2_controller);
        }
        /*******************************************/
        if (typeof options == 'object') {
            load($(this));
        } else if (typeof options =='string') {
            switch (options) {
				case 'stop':
                    runStop();
                    break;
                case 'pause':
                    runPause();
                    break;
                case 'resume':
                    PlayerPlugin.Resume();
                    break;
                case 'play':
                    if( (opt != undefined) && (opt.urlMedia != undefined)) {
                        urlMedia = opt.urlMedia;
                    }
                    runPlay(this);
                    break;
                case 'setFullScreen':
                    //define how second progressbar going to hidden
                    timeSecondHidden = opt;
                    boolFullScreen = true;
                    boolMarkTime = true;
                    //*******************************************************
                    // process to change the video screen size
                    PlayerPlugin.ClearScreen( );
                    PlayerPlugin.SetDisplayArea(0, 0, MAX_WIDTH_SCREEN, MAX_HEIGHT_SCREEN);
                    $("#pluginPlayer").css('top', '0px');
                    $("#pluginPlayer").css('left', '0px');
                    
                    $(this).css('top', '0px');
                    $(this).css('left', '0px');
                    
                    $("#pluginPlayer").css('width', MAX_WIDTH_SCREEN + 'px');
                    $("#pluginPlayer").css('height', MAX_HEIGHT_SCREEN + 'px');
                    //*******************************************************
                    //If the status of Video is PAUSED and the video size is called then the video is playing automatic but in this case it´s need  
                    //to verify the status to change for use play button otherwise the button stay with button pause. 
                    //Maybe the method SetDisplayArea start the video
                    if (status == PAUSED) {
                        status = PLAYING;
                        objVideo2_controller.changeButton('play');
                    }
                    break;
				case 'SetVideoScreen':
                    boolFullScreen = false;
                     //*******************************************************
                    // process to change the video screen size
                    PlayerPlugin.ClearScreen( );
					PlayerPlugin.SetDisplayArea(opt.left, opt.top, opt.width, opt.height);
					
                    $("#pluginPlayer").css('width', opt.width+'px');
                    $("#pluginPlayer").css('height', opt.height+'px');
                    
                    $(this).css('width', opt.width+'px');
                    $(this).css('height', opt.height+'px');
                    $(this).css('left', opt.left+'px');
                    $(this).css('top', opt.top+'px');
                    //*********************************************************
                    //If the status of Video is PAUSED and the video size is called then the video is playing automatic but in this case it´s need  
                    //to verify the status to change for use play button otherwise the button stay with button pause. 
                    //Maybe the method SetDisplayArea start the video
                     if (status == PAUSED) {
                        status = PLAYING;
                        objVideo2_controller.changeButton('play');
                    }
                    break;
                case 'backward':
                    runJumpBackward(JUMP_SECONDS);
                    break;
                case 'forward':
                    runJumpForward(JUMP_SECONDS);
                    break;
                case 'setMute':
                    runMute(AudioPlugin);
                    break;
                case 'RCKeyDefined':
                    if ( boolFullScreen ) {
                        objVideo2_controller.setVisible('visible');
                        boolMarkTime = true;
                    }
                    switch (opt) {
                        case $.sfKey.PLAY:
                            runPlay(this);
                            break;
                         case $.sfKey.STOP:
                            // verify locked the video control, if the boolBeginVideo is false then do nothing when stop is pressed
                            if ( boolBeginVideo ) {
                                runStop();
                            }
                            break;
                         case $.sfKey.PAUSE:
                            // verify locked the video control, if the boolBeginVideo is false then do nothing when pause  is psressed
                            if ( boolBeginVideo ) {
                                runPause();
                            }
                            break;
                         case $.sfKey.RW:
                            // verify locked the video control, if the boolBeginVideo is false then do nothing when backward  is pressed
                            if ( boolBeginVideo ) {
                                runJumpBackward(JUMP_SECONDS);
                            }
                            break;
                        case $.sfKey.FF:
                            // verify locked the video control, if the boolBeginVideo is false then do nothing when forward is pressed
                            if ( boolBeginVideo ) { 
                                runJumpForward(JUMP_SECONDS);
                            }
                            break;
                        
						case $.sfKey.RETURN:
                            runStop();
							 PlayerPlugin.ClearScreen( );
                            break;
						
						case $.sfKey.VOL_UP:
                            runVolumeUp();
							break;
                        
						case $.sfKey.VOL_DOWN:
                            runVolumeDown();
                            break;
                    }
                    break;
                case 'getTotalTime':
                    return PlayerPlugin.GetDuration();
                case 'getStatus':
                    return status;
                case 'show':
                    $(this).show();
                    break;
                case 'hide':
                    $(this).hide();
                    break;
			}
        }
        
	    return this;
	};
    
    /**
     *  Run the progressbar
     */
   function runProgressbar() {
        if (objVideo2_controller != undefined) {
            //reference for function to calculate time and the bar for progress
            PlayerPlugin.OnCurrentPlayTime =  'setOnCurrentPlayTime';
        } else {
            alert("PROGRESSBAR NOT FOUND");
        }
    }
	
    
    /**
     * Executing mute on the media
     */
    function runMute() {
        var isMute = AudioPlugin.GetSystemMute();
        if ($.sf.define.PLR_TRUE == isMute ) {
            AudioPlugin.SetSystemMute($.sf.define.PLR_FALSE);
        } else if ($.sf.define.PLR_FALSE == isMute ) {
            AudioPlugin.SetSystemMute($.sf.define.PLR_TRUE);
        } else {
             alert("#### ERROR IN THE MUTE FUNCTION #####");
        }
    }
    
    /**
     * Executing stop on the media
     */
     function runStop() {
        status = STOPPED;
        PlayerPlugin.Stop();
        
        //send state for Progressbar component to update the button  displayed
        //the values of changeButton accept are: stop, pause, play
        if(objVideo2_controller != undefined) {
             objVideo2_controller.changeButton('stop');
        }
        //locked the video controls(pause, forward, backward)
        boolBeginVideo = false;
    }
     
     /**
      * Executing play on the media
      */
    function runPlay(self) {	
        var ret = false;
            if (status == PAUSED) {
                status = RESUME;
                ret = PlayerPlugin.Resume();
            } else if( status == STOPPED) {
                status = PLAYING;
				var objectWidth = $(self).css('width').replace('px','');
				var objectHeight = $(self).css('height').replace('px','');
				var objectLeft = $(self).css('left').replace('px','');
				var objectTop = $(self).css('top').replace('px','');
				PlayerPlugin.SetDisplayArea(objectLeft, objectTop, objectWidth, objectHeight);
                
				ret = PlayerPlugin.Play(urlMedia);
            } 
           
             //send state for Progressbar component to update the button  displayed
            //the values of changeButton accept are: stop, pause, play
           if(objVideo2_controller != undefined) {
                objVideo2_controller.changeButton('play');
            }
            return ret;
    }
    
    /**
      * Executing pause on the media and control the status of video
      */
    function runPause() {
        var state = 'pause';    //use to change the button
           
        if( status == PLAYING || status == RESUME ) {
                PlayerPlugin.Pause();
                status = PAUSED;
            } else if (status == PAUSED) {
                PlayerPlugin.Resume();
                status = PLAYING;
                state = 'play';
            }

          //send state for Progressbar component to update the button  displayed
            //the values of changeButton accept are: stop, pause, play
           if(objVideo2_controller != undefined) {
                objVideo2_controller.changeButton(state);
            }
    }
    
    /**
     * Executing backward on the media
     */
     function runJumpBackward(seconds) {
        objVideo2_controller.changeButton('backward');
        PlayerPlugin.JumpBackward(seconds);
    }
    
    /**
     * Executing forward on the media
     */
     function runJumpForward(seconds) {
        objVideo2_controller.changeButton('forward');
        PlayerPlugin.JumpForward(seconds);
    }
    
    /**
     * Executing volume up on the media
     */
     function runVolumeUp() {
       AudioPlugin.SetVolumeWithKey($.sf.define.PL_AUDIO_VOLUME_KEY_UP);
       //set up value of Volume
       objVideo2_controller.setVolume(AudioPlugin.GetVolume());
    }
    
    /**
     * Executing volume down on the media
     */
     function runVolumeDown() {
       AudioPlugin.SetVolumeWithKey($.sf.define.PL_AUDIO_VOLUME_KEY_DOWN);
       //set up value of Volume
       objVideo2_controller.setVolume(AudioPlugin.GetVolume());
    }
    
    /**
     * This method is responsible for load the plugins of video / audio and configure the basic values for run media
     */
    function load(self) {
        var tagObject = "<object id='pluginPlayer' classid='clsid:SAMSUNG-INFOLINK-PLAYER' class='videoConfiguration'></object>";
        tagObject += "<object id='tvPlayer'  classid='clsid:SAMSUNG-INFOLINK-TVMW' ></object>";
        tagObject += "<object id='audioPlayer' classid='clsid:SAMSUNG-INFOLINK-AUDIO' ></object>";

        document.getElementById('Video2Div').innerHTML = tagObject ;
        //variable to control some events of  player and audio plugins
        PlayerPlugin = document.getElementById('pluginPlayer');
        AudioPlugin = document.getElementById('audioPlayer');
        TVPlugin = document.getElementById('tvPlayer');
       
        /************* CONFIGURATIONS **********************/
        this.OriginalSource = TVPlugin.GetSource();
        TVPlugin.SetMediaSource();
        
        PlayerPlugin.SetTotalBufferSize(2*1024*1024);
        PlayerPlugin.SetInitialBuffer(1024*1024);
        PlayerPlugin.SetInitialTimeOut(15);
        PlayerPlugin.ClearScreen( );
        
        // Take the values of css parameter has into Scene1.css.index This values is declared in the Visual Editor
        var objectWidth = $(self).css('width').replace('px','');
        var objectHeight = $(self).css('height').replace('px','');
        var objectLeft = $(self).css('left').replace('px','');
        var objectTop = $(self).css('top').replace('px','');
        
        //Define values of video for definitions above 
        //$("#pluginPlayer").css('width',objectWidth +'px');
        //$("#pluginPlayer").css('height',objectHeight +'px');
		
		$("#pluginPlayer").width(objectWidth);
        $("#pluginPlayer").height(objectHeight);
		
        //Method to modified the position and size of Video
        PlayerPlugin.SetDisplayArea(objectLeft, objectTop, objectWidth, objectHeight);
		/************* CONFIGURATIONS **********************/
              
        //execute play on the video set up
        runPlay(self);
        
        //variable used in the setOnCurrentPlayTime function
        this.totalTime = PlayerPlugin.GetDuration();
        //execute event current time
        runProgressbar();
    }
        /**
         * calculate time to show in the progress
         * this function is used with Progressbar component
         */
        setOnCurrentPlayTime = function(time) {
            var timePercent = (100 * time) / this.totalTime;
            var timeHTML = "";
            var timeHour = 0; var timeMinute = 0; var timeSecond = 0;
            var totalTimeHour = 0; var totalTimeMinute = 0; var totalTimesecond = 0;
            if (status == PLAYING ||  status == PAUSED ||status == RESUME ) {
                //send state for Progressbar component to update the button  displayed
                //the values of changeButton accept are: stop, pause, play
                if ( objVideo2_controller != undefined && status != PAUSED ) {
                    status = PLAYING;
                    objVideo2_controller.changeButton('play');
                } else if (objVideo2_controller != undefined && status == PAUSED ){
                    objVideo2_controller.changeButton('pause');
                }
                    
                //set the time of percent for  progressbar
                objVideo2_controller.setProgress(timePercent);
                //set up value of Volume
                objVideo2_controller.setVolume(AudioPlugin.GetVolume());
                
                totalTimeHour = Math.floor(this.totalTime/3600000);
                timeHour = Math.floor(time/3600000);
                totalTimeMinute = Math.floor((this.totalTime%3600000)/60000);
                timeMinute = Math.floor((time%3600000)/60000);
                totalTimeSecond = Math.floor((this.totalTime%60000)/1000);
                timeSecond = Math.floor((time%60000)/1000);
                    
                timeHTML = timeHour + ":";
                if(timeMinute == 0)
                    timeHTML += "00:";
                else if(timeMinute <10)
                    timeHTML += "0" + timeMinute + ":";
                else
                    timeHTML += timeMinute + ":";
                        
                if(timeSecond == 0)
                    timeHTML += "00/";
                else if(timeSecond <10)
                    timeHTML += "0" + timeSecond + "/";
                else
                    timeHTML +=  timeSecond + "/";
                        
                timeHTML += totalTimeHour + ":";
                if(totalTimeMinute == 0)
                    timeHTML += "00:";
                else if(totalTimeMinute <10)
                    timeHTML += "0" + totalTimeMinute;
                else
                    timeHTML += totalTimeMinute;

                if(totalTimeSecond == 0)
                    timeHTML += ":00";
                else if(totalTimeSecond <10)
                    timeHTML += "0" + totalTimeSecond;
                else
                    timeHTML += ":"+ totalTimeSecond;
                    boolBeginVideo = true;
            } else if ( status == STOPPED) {
                timeHTML = "0:00:00/0:00:00";
            }
            //set value of time on the div
            objVideo2_controller.setTime(timeHTML);
            //unlocked the key control of video(pause, forward, backward)
            boolBeginVideo = true;
            
            //get the time of begin full screen displayed
            if (  boolFullScreen && boolMarkTime ) {
                timeFullScreen = timeSecond;
                boolMarkTime = false;
            } 
            
            //calculate the time after full screen showing for hide the progress bar
            if (boolFullScreen && boolMarkTime ==false) {
                if ( timeSecond == (timeSecondHidden+timeFullScreen) ) {
                    objVideo2_controller.setVisible('hidden');
                }
            }
}  
    
})(jQuery);

        