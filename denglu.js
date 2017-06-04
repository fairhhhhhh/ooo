var aa=document.getElementsByTagName("input")[0];
var bb=document.getElementsByTagName("input")[1];
var cc=document.getElementsByClassName("item1")[0];
cc.onclick=function(){
	$.ajax({
		type:"post",
		url:"http://lc.shudong.wang/api_user.php",
		dataType:"json",
		data:{status:"login",username:aa.value,password:bb.value},
		success:function(data){
	     
	       console.log(data);
	      var obj=data.data;
	      localStorage.avatar = obj.avatar;
	      localStorage.token = obj.token;
	      localStorage.user_id = obj.user_id;
	      localStorage.username = obj.username;      
	    if(data.code==0){
	         alert("您已经登录成功");
	         // console.log( localStorage.username)
	         window.location.href = "index.html";
	        }else{
	        	alert("请重新输入");
	        }
		}
		
	});
}
