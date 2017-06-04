var aa=decodeURI(document.URL);
var bb=aa.split('=');
var cc=document.getElementById("shang");
cc.innerHTML=bb[2];
var goods_id=bb[1];
var dd=document.getElementById("tuo");
dd.setAttribute('src',bb[3]);
var ee=document.getElementsByClassName("che")[0];
ee.onclick=function(){
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_cart.php",
		async:false,
		data:"goods_id="+goods_id,
		beforeSend: function(request) {
			request.setRequestHeader("token",localStorage.token);
		},
		success:function(data){
//			console.log(data)
		}
	});
}
	var tem=$("#templete1").html();
	var strr=_.template(tem);
	$.ajax({
		type:"get",
		url:"http://lc.shudong.wang/api_cart.php",
		async:false,
		data:{},
	   dataType:"json",
	   beforeSend: function(request) {
			request.setRequestHeader("token",localStorage.token);
		},
	   success:function(data){
	   	  var obj=data.data;
	   	  var ff="";
	   	  $.each(obj,function(index,value){
	   	  	 ff+=strr(value);
	   	  })
	   	  $("#ban").append(ff); 	  	  
	   }
	});
