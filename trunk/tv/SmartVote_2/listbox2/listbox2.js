/**
 * Create the list with some property received by parameter.
 * options parameter can receive many properties of List or receive string
 * value used to treat behavior it has
 */
(function ($) {
	
	/**
	 *  Return the number of rows is showing
	 */
	$.fn.getNumberRows = function() {
		return $(this).data('itemsPerPage');
	}
	
	/**
	 * Return the size of List, how many rows has
	 */
	$.fn.getLengthData = function() {
		return $(this).data('data').length;
	}
	
	/**
	 * Return the list has focus or not
	 */
	$.fn.isFocus = function() {
		return $(this).data('focus');
	}
    
    /**
	 * Return the list type
	 */
	$.fn.isHorizontal = function() {
		return $(this).data('horizontal');
	}

	/**
	 * Responsable for create a List Component.
	 * Parameter options : When receive a string parameter can receive values as 'focus','hide','prev','next',
	 * 'getIndex','setIndex', 'blur','show','hide' and when receive between curly brackets{} could having inside: 
	 * 'data' as array of contents of the rows, also as 'width', 'height', 'itemsPerPage', 'index'. E.g. {data:myArray,width:'100px'}
	 * Parameter value : the value parameter is used to define which row you choice, but it can reason only when option parameter is definied as 'setIndex'
	*/
	$.fn.sfListbox2 = function(options, value){
		alert("sfListbox2(" + $(this).attr('id') + ", " + options + ")");
		
		//Verifies whether the stored data "sfui" have definition equals "List"
		if (!($(this).data('sfui') == 'sfListbox2')) {
			// define the properties of List component will going stored
			// data is used of rows content
			// index is used to define which rows is set
			// focus is used to define whether List will have focus
			// sfui is used to define the kind of element that it represents
			// addClass defines the which class of css going to use
			$(this)
				.data('data', [])		
				.data('index', 0)
				.data('itemsPerPage', 5)
				.data('focus', false)
                .data('horizontal',options.horizontal)
				.data('sfui', 'sfListbox2')
                .addClass('sf-ui-list');
		}
		//options is a parameter and can to be a object when receive an array
		if (typeof options == 'object') {
			
			var defaults = {
				data: $(this).data('data'),
				index: $(this).data('index'), 
				itemsPerPage: $(this).data('itemsPerPage')
			}
			//extending options parameter to defaults variable
			var opts = $.extend(defaults, options);
            
			//creating the rows and stored some data
			$(this)
				.html(getDiv(opts.itemsPerPage))	
				.data('data', opts.data)
				.data('index', opts.index)
				.data('itemsPerPage', opts.itemsPerPage);
			//every rows receive blur effect
			blur(this);	
			
		//########################### BEGIN TREATMENT FOR THE OPTIONS PARAMETER ############################
		// Case the options parameter receive some definitions such as index, width and height
  	   //define which row will going to be focus
			if (options.index != undefined) {		
				$(this).data('focus', true);
				focus(this, opts.index);
			}
			//define the width of List
			if(options.width != undefined) {
                /* Bigger in order to acommodate the internal divs */
                outerLeftWidth = Number(opts.width) +14;
                
                /* Width for border right (outer_right) */
                outerRightWidth = outerLeftWidth-7;
               
               /* Setting the width of all divs */
                $(this).children().css('width',outerLeftWidth +'px');
                $(this).children('div.outer_left').children('div.btn_content').css('width',opts.width +'px');
                $(this).children('div.outer_left').children('div.outer_right').css('margin-left',outerRightWidth +'px');
            }
            
			//define the height of List
			if(options.height != undefined) {
				$(this).children().css('height',opts.height +'px');
			}
			
            //define the list style (horizontal or vertical (default)
			if(options.horizontal) {
				$(this).children().css('display','inline-block');
			}

		    //########################### END TREATMENT FOR THE OPTIONS PARAMETER ############################
			// insert values for each rows
			insert(this, opts.index);
		}
        
        
		//whether the options parameter as simple string will have behaviors on the list and your rows
		if (typeof options == 'string') {
			switch (options) {
				case 'prev':
				case 'next':
					//prev or next are movement to do inside the List
					if (!$(this).data('focus')) {	
						$(this).sfListbox2('focus');
						$(this).data('focus', true);
						break;
					}
					
					//take the last row
					var old = $(this).data('index');
					var itemsPerPage = $(this).data('itemsPerPage');
					var data = $(this).data('data');
					var next;
					
					if (options == 'next')
						//calculates the increase value of next row
						next = (Number(old) + 1 > data.length - 1) ? 0 : (Number(old) + 1);
					else 
						//calculates the decrease value of next row, in this case because use the prev options
						next = (Number(old) - 1 < 0) ? data.length - 1 : (Number(old) - 1);

					//in case of list has many page and the navigation need to change the content on each rows then changed the Page
					if (getPage(old, itemsPerPage) != getPage(next, itemsPerPage)) {	
						insert(this, next);
					}
					
					// the previous row receive blur and the next receive focus
					blur (this, old);
					focus (this, next);
					//stored index with the next value
					$(this).data('index', next);
					break;
				case 'getIndex':
					//take the which index has
					return $(this).data('index');
				case 'setIndex':
					//verifies the value parameter is a number
					if (!isNaN(value)) {
						//stored value of index
						$(this).data('index', value);
						blur(this);		// all blur
					}
					else {
						alert('cannot set the index. second parameter must be a number.');
					}
					break;
				case 'focus':
					//make focus on the current index 
					focus(this, $(this).data('index'));
					$(this).data('focus', true);
					break;
				case 'blur':
					// make selection on the current index 
					select(this, $(this).data('index'));
					$(this).data('focus', false);
					break;
				case 'clear':
					// clear the all focus on the rows
					blur(this);
					$(this).data('focus', false);
					break;
				case 'show':
					//The list is going visible
					$(this).show();
					break;
				case 'hide':
					//The list isn´t going visible
					$(this).hide();
					break;
				default:
					break;
			}
		}
		return this;
	}
	
	/**
	 * Mark the row of List as focus according with the index value
	 */
	function focus (self, index) {
		alert('focus('+self+','+(index?index:'all')+')');
		//take the itemsPerpage stored
		var itemsPerPage = $(self).data('itemsPerPage');
		alert('itemsPerPage = '+ $(self).data('itemsPerPage'));
		//selects the current row
		var selecter = (index === undefined) ? '' : ':nth-child('+(index%itemsPerPage+1)+')';
		//remove the class and add class contains focus image
		$(self).children(selecter).children('div.btn_content')
			.removeClass(stateClasses)
			.addClass('sf-ui-list-focused_lst');
       
      /* Border Left */
       $(self).children(selecter)
			.removeClass('outer_left_normal')
			.addClass('outer_left_selected');
            
       /* Border Right */
       $(self).children(selecter).children('div.outer_right')
			.removeClass('outer_right_normal')
			.addClass('outer_right_selected');
        
	}
	
	/**
	 * Mark the row of List as blur according with the index value
	 */
	function blur (self, index) {
		alert('blur('+self+','+(index?index:'all')+')');
		var itemsPerPage = $(self).data('itemsPerPage');
		//selects the current row
		var selecter = (index === undefined) ? '' : ':nth-child('+(index%itemsPerPage+1)+')';
		
        //remove the class and add class contains focus image
		$(self).children(selecter).children('div.btn_content')
			.removeClass(stateClasses)
			.addClass('sf-ui-list-blured_lst');
            
       /* Border Left */
       $(self).children(selecter)
			.removeClass('outer_left_selected')
			.addClass('outer_left_normal');
            
        /* Border Right */
       $(self).children(selecter).children('div.outer_right')
			.removeClass('outer_right_selected')
			.addClass('outer_right_normal');
	}
	
	/**
	 * Mark the row of List as selected according with the index value
	 */
	function select (self, index) {
		alert('select('+self+','+(index?index:'all')+')');
		var itemsPerPage = $(self).data('itemsPerPage');
		//selects the current row
		var selecter = (index === undefined) ? '' : ':nth-child('+(index%itemsPerPage+1)+')';
		//remove the class and add class contains focus image
		$(self).children(selecter).children('div.btn_content')
			.removeClass(stateClasses)
			.addClass('sf-ui-list-selected_lst');
           
          $(self).children(selecter)
			.removeClass('outer_left_normal')
			.addClass('outer_left_selected');
            
        $(self).children(selecter).children('div.outer_right')
			.removeClass('outer_right_normal')
			.addClass('outer_right_selected');
	}
	
	/**
	 * Inserts the contents of each rows
	 */
	function insert (self, index) {
		alert('insert('+self+','+index+')');
		var itemsPerPage = $(self).data('itemsPerPage');
		var data = $(self).data('data');
		//take the first index per page. 
		var firstIndex = getPage(index, itemsPerPage) * itemsPerPage;	//
        var elementId;
		//Read the each row and insert the content
        $(self).children('div.outer_left').children('div.btn_content').each(function(index, element){
            //variable to take the number of ID, because div id is sequencial number
            elementId = Number(element.id);
            if (firstIndex + index < data.length) {
                if (elementId == index) {
                    $(element).html(data[firstIndex + index]);
                } else {
                    if ( data[firstIndex + elementId ] == undefined) {      //this condition is to verified when element doesn´t 
                        $(element).html('');
                    } else {
                        $(element).html(data[firstIndex + elementId ]);
                    }
                }
            } else {
                if ( data[firstIndex + elementId ] == undefined) {
                    $(element).html('');
                } else {
                    $(element).html(data[firstIndex + elementId]);
                }
            }
        });
	}
    
	/**
	 * Return the number of page navigated
	 */
	function getPage (index, itemsPerPage) {
		var retValue = Math.floor(index/itemsPerPage);
		alert('getPage('+index+','+itemsPerPage+') returns ' + retValue);
		return retValue;
	}
	
	
	/**
	 * Create the rows of List.
	 * n parameter is number of rows going makes
	 */
	function getDiv (n) {
		var retValue = '';
		for (var i=0; i < n; i++) {
            retValue += '<div class="outer_left"><div class="btn_content" id="' +  i +'"></div><div class="outer_right"></div></div>';
        }
		return retValue;
	}
	//variable stateClasses indicate the class name of css to use. The definition of class is in ui.css file
	var stateClasses = 'sf-ui-list-focused_lst sf-ui-list-blured_lst sf-ui-list-selected_lst';
	
})(jQuery);