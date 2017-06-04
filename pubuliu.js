//登录用户名
$(window).load(function(){
	if(localStorage.username){
		$('.images').css('display','block');
		$('#login').html(localStorage.username);
		$('.ima').css('display','none');
		// console.log(localStorage)
	}

})		
$('.chu').click(function(){
	$('.images').css('display','none');
	$('.ima').css('display','block');
})
//导航滚动
var jj=0;
$(window).scroll(function(){
	if ($(window).scrollTop() > 56) {
		$("header").css("top",-56);
	}else{
		$("header").css("top",0);
	}
	// console.log($(window).scrollTop())
	if(jj>$(window).scrollTop()){
          $("header").css("top",0);
	}
    jj=$(window).scrollTop()
})

//回到顶部按钮
//原生js
var dd=document.getElementsByClassName('ding')[0];
dd.onclick=function(){
	document.documentElement.scrollTop=document.body.scrollTop=0;
}

// JQuery 
// $(".ding").click(function(){
// 	$(window).scrollTop(0);
// })

//瀑布流
var page=1;
var pagesize=6;
window.onload=function(){
	var templeteStr =$("#templete").html(); //
	var temStr =_.template(templeteStr);
	function add(paga){
		$.ajax({
			type:"get",
			dataType:"json",
			data:{page:page,pagesize:pagesize},
			url:"http://lc.shudong.wang/api_goods.php",
			async:true,
			success:function(data){
//				 console.log(paga)
				var obj=data.data;
//				 console.log(obj);
				$.each(obj, function(index,value){
		            var good =temStr(value);
//		            console.log(obj)
		            var $dom =$(good);
		            // console.log(value)
		            $kk = $dom[0].children[2].children[1];
		            $oo=$dom[0];
	             	if(index%3==0){
	             		$dom.css("margin-left",0)
	             	}
	             	$("#goods").append($dom);
	             	var nn = true;
	             	
	             	// console.log(dom[0].children[2].children[1]);
	            	$kk.onclick = function(){
	             		if (nn == true) {
	             			$(this).css("background-image","url(img/img/heart_red20_18.png)");
	             			$(this).html(parseInt($(this).html())+1);
	             			nn = false;
	             		}else{
	             			$(this).css("background-image","url(img/img/heart_gray20_18.png)");
	             			$(this).html(parseInt($(this).html())-1);
	             			nn = true;
	             		}
					}
					$oo.onclick=function(){
						$.ajax({
							type:"get",
							url:"http://lc.shudong.wang/api_goods.php",
							dataType:"json",
							data:{},
							success:function(data){
									console.log(value.goods_thumb);
									var goods_id=value.goods_id;
									var goods_name=value.goods_name;
									var goods_thumb=value.goods_thumb;
									window.location.href='sosuo.html?goods_id='+goods_id+'='+goods_name+"="+goods_thumb;
							}
						})
					}
				});
			}
		})				
	}
	add(page);
    $("#more").click(function(){
    	page++;
    	add(page);
//    	console.log(paga);
    }) 
}