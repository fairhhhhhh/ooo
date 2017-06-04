//轮播图
var vv=0;
$(".banner li").eq(0).show().siblings().hide();
 var play=function(){
 	vv++;
 	if(vv<8){
 		if(vv==7){vv=-1}
 			$(".banner li").eq(vv).fadeIn().siblings().fadeOut();
 			$(".an li").eq(vv).addClass("change").siblings().removeClass("change");
 	}
 	
 }
 var time=setInterval(play,2000);
$(".box").mouseenter(function(){
	clearInterval(time);
})
$(".box").mouseleave(function(){
	time=setInterval(play,2000);
})
$('.an li').mouseenter(function(){
	vv=$(this).index();
	$('.banner li').eq(vv).fadeIn().siblings().fadeOut();
	$('.an li').eq(vv).addClass('change').siblings('li').removeClass('change');
})
$(".left").click(function(){
//	console.log(vv);
	vv-=1;
	if(vv<0){
		vv=7;
	}	
	$(".banner li").eq(vv).fadeIn().siblings().fadeOut();
 	$(".an li").eq(vv).addClass("change").siblings().removeClass("change");
})
$(".right").click(function(){
	vv++;
	 if(vv>7){
	 	vv=0;
	 }
	 $(".banner li").eq(vv).fadeIn().siblings().fadeOut();
 	$(".an li").eq(vv).addClass("change").siblings().removeClass("change");
})
