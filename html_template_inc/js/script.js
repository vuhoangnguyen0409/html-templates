( function( $ ) {
	//$(document).ready(function() {
$( window ).load(function() {
    //////////////////////////////    dropdown menu
    $("#nav_global li ul").hide();
    $("#nav_global li").hover(function() {
        $(this).children("ul").stop().slideDown();
    }, function() {
        $(this).children("ul").stop().slideUp();
    });

    /////////////////////////////      add class active to menu of current page (text, no sub-menu)
    $('#nav_global ul li').each(function() {
        if (window.location.href.indexOf($(this).find('a:first').attr('href')) > -1) // lay href cua element a dau tien trong moi element li roi kiem tra co trong window href khong
        {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('li').addClass('active').siblings().removeClass('active');
            var li_is_text = $(this).children('a').text(); // check text in tag <a>
            //console.log(li_is_text);
            if (li_is_text == '') { // neu menu la hinh
                $('.active > a > img').each(function() {
                    var src = $(this).attr('src');
                    $(this).attr('src', src.replace('off', 'actived'));
                });
            }
        }
    });
    //////////////////////////         scroll to id trong pagge (landing page)
    $('a[href^="#"]').on('click', function(e) {
        //e.preventDefault(); //
        var target = this.hash;
        //alert(target);
        $target = $(target);
        $('html, body').stop().animate({
            //'scrollTop': $target.offset().top - headerHeight
            'scrollTop': $target.offset().top - 0
        }, 1200, 'swing');
        //return false;
    });

	///////////////////////////           sroll to id  ngoai page
    var getHash = window.location.hash;
    //console.log(getHash);
    if (getHash != '') {
        var pst = $(getHash).offset().top;
        //alert(pst);
        $('html,body').animate({
            scrollTop: pst
        }, 800);
    }

    //call functions
    rollover("#siteID a img", 0.6, 200); // exclusion / opacity / speed
    imgReplace(769, 'img'); // width / object
    spAutoTel('.tel', 0974487944); // object/ number



}); // end document

//----------------------------------------------------------------------------------------------------------

///////////////////////////////           hover img_off - img_on
var rollover = function(exclusion, opacity, speed) {
    $("a img").not(exclusion).each(function() {
        var img = $(this);
        if ($(this).attr("src").match("_off")) {
            $(this).hover(function() {
                $(img).attr("src", $(img).attr("src").replace("_off", "_on"));
            }, function() {
                $(img).attr("src", $(img).attr("src").replace("_on", "_off"));
            });
        } else {
            $(this).hover(function() {
                $(img).stop().animate({
                    "opacity": opacity
                }, speed);
            }, function() {
                $(img).stop().animate({
                    "opacity": 1
                }, speed);
            });
        }
    });
};



////////////////////////////////// imgPeplace pc_sp
var imgReplace = function(widthReplace, objectReplace){
	var $setElem = $(objectReplace),
	replaceWidth = widthReplace;
	$setElem.each(function(){
		var $this = $(this);
		function imgSize(){
			var windowWidth = parseInt(window.innerWidth||document.documentElement.clientWidth);
			if(windowWidth >= replaceWidth) {
				$this.attr('src',$this.attr('src').replace('_sp','_pc'));
			} else if(windowWidth < replaceWidth) {
				$this.attr('src',$this.attr('src').replace('_pc','_sp'));
			}
		}
		$(window).resize(function(){imgSize();});
		imgSize();
	});
};


///////////////////////////////// !sp auto tel
var spAutoTel = function(elemClass, telNumber) {
    var device = navigator.userAgent;
    //console.log(device);
    if ((device.indexOf('iPhone') > 0 && device.indexOf('iPad') == -1) || device.indexOf('iPod') > 0 || device.indexOf('Android') > 0) {
        $(elemClass).wrapInner("<a href=tel:" + telNumber + "></a>");
    }
};
} )( jQuery );
