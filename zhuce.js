var aa=document.getElementsByTagName("input")[1];
var bb=document.getElementsByTagName("input")[2];
var cc=document.getElementsByTagName("input")[3];
var dd=document.getElementsByClassName("item1")[0];

dd.onclick=function(){
//	console.log(aa.value);
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_user.php",
		data:{status:"register",username:aa.value,password:bb.value},
		dataType:"json",
		success:function(data){
			console.log(data);
	  if(data.code==0 && (bb.value==cc.value)){
	  	 alert("您已经注册成功");
	  	 return false;
	  }else if(data.code==2002){
	  	alert("您的用户名已存在");   
	  }{
	  	alert("请重新输入");
	  }
		}
	});
}
