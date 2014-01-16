(function($){

/* wrapper H - window-H , minus , top & btm H : height:560px; overflow:auto; */ 
var newH = $(window).height() - ($('#main-top-nav').height() - $('#main-bottom-nav').height());
$('#wrapper').css({
	overflow:'auto',
	height: (newH - 60) + 'px'
});

$('a[href="#/search"]').click(function(event){
	$('#search-tab').toggleClass('active');
	$('#main-content').toggleClass('search-active');
	event.isPropagationStopped();
	return false;
});

/*==========*/
})(jQuery);
