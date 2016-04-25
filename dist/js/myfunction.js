$(function() {


	//ページTOPへ戻るボタン
	var topBtn = $('#toPageTop');
	topBtn.hide();
	//スクロールが100に達したらボタン表示
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});




// スクロールで要素を表示
	$('.js-effect').css("opacity","0");
	$(window).scroll(function (){
		$(".js-effect").each(function(){
			var effectPos = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > effectPos - windowHeight + windowHeight / 3){
				$(this).css("opacity","1");
			}else{
				$(this).css("opacity","0");
			}
		});
	});

});