
/*------------二级导航右侧search框 效果 开始--------------------*/
var bb=true;
$("#aa a").click(function(event){
	event.stopPropagation();//取消事件冒泡
	if(bb==true){
	$(".text").animate({width:"265px",left:"0px"},"slow",function(){
		$('.text').focus();
		bb=false;
	});	
	}else if(bb==false){
		$(".text").animate({width:"0px",left:"266px"},"slow",function(){
		 bb=true; 
	})
	}
})
$(".text").click(function(){
	 $(this).animate({width:"265px",left:"0px"},"slow");
	 return false;
})
//添加点击页面，让 input消失
$(document).click(function(){
	$(".text").animate({width:"0px",left:"266px"},"slow",function(){
		 bb=true; 
	})
})

/*------------二级导航右侧search框 效果 结束--------------------*/

//小胖爪子
$("#search .xx").mouseenter(function(){
	$(this).animate({left:"-20px"});
	$(this).animate({left:"0"});
	$(this).animate({left:"-20px"});
	$(this).animate({left:"0px"});
})

