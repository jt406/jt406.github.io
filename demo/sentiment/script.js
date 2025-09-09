$(document).ready(function() {
    setTimeout(function() {
    	$('#loading').css("display", "none");
    }, 2200)

    $('#stock_name').on('keypress', function(e) {
	    var code = e.keyCode || e.which;
	    if(code==13){
	        // Enter pressed... do anything here...
	        document.location.href = "file:///Users/jessewu/Documents/Personal-Website/jessewu.github.com/demo/sentiment/templates/stock.html";
	    }
	});

	$('#industries .industry').click(function() {
	    // Enter pressed... do anything here...
	    document.location.href = "file:///Users/jessewu/Documents/Personal-Website/jessewu.github.com/demo/sentiment/templates/list.html";
	});

	$('#actions #read').click(function() {
		if ($(this).hasClass("clicked")) {
			$(this).removeClass("clicked");

			$(this).attr("src", "../img/read_the_news.svg");

			$('#news').animate({
				opacity: 0
			}, 250, function () {
				$('#single_stock').css("display", "block");
				$('#single_stock').animate({
					opacity: 1
				}, 250);
			});
		} else { 
			$(this).addClass("clicked");

			$(this).attr("src", "../img/exit_the_news.svg");

			$('#single_stock').animate({
				opacity: 0
			}, 250, function() {
				$('#single_stock').css("display", "none");
				$('#news').animate({
					opacity: 1
				}, 250);
			});
		}
	});
});
