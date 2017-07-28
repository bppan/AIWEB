/**
 * Created by Administrator on 2016/3/13.
 */
var Transcripts = Transcripts || {};
var basePath = 'http://localhost:8080/AIWEB16';

var usertype = null;
var userName = null;

$(function(){
	//Transcripts.adaptScreen();

	usertype = $("#usertype").val();
	userName = $("#userName").val();
	Transcripts.changeNav();
    Transcripts.bindBaseEven();    
})

Transcripts.changeNav = function(){
	
	if(usertype == "学生"){
		var navHtml = "<a id = 'userLoginName' href='javascript:void(0);' style = 'margin-right:2px;'>" +usertype +"："+ userName+ "</a>|<a id = 'teacherMessage' href='javascript:void(0);' style = 'margin-right:2px;margin-left:4px'>教师信息</a>|";
		$("#changeNav").html(navHtml);
	}else if(usertype == "教师"){
		var navHtml = "<a id = 'userLoginTeaName' href='javascript:void(0);' style = 'margin-right:2px;'>" +usertype +"："+ userName+"</a>|<a id = 'studentMessage' href='javascript:void(0);' style = 'margin-right:2px;margin-left:4px'>学生情况</a>|<a id = 'uploadfile' href='javascript:void(0);' style = 'margin-right:2px;margin-left:4px'>文件上传</a>|";
		$("#changeNav").html(navHtml);
	}else{
		window.location.href = "./login.jsp";
	}
}


Transcripts.bindBaseEven = function () {
	
    $("#index_logo").click(function(){
        window.location.href = "./login.jsp";
    });
    
    $("#alterPassWord").click(function(){
        window.location.href = "./alterUserPassword.jsp";
    });
   
    $("#alterPassWord").click(function(){
        window.location.href = "./alterUserPassword.jsp";
    });
    
    $("#teacherMessage").click(function(){
    	window.open("myTeaMessage.jsp");
    });
    
    $("#userLoginTeaName").click(function(){
    	window.open("teacherMessage.jsp");
    });
    
    $("#uploadfile").click(function(){
    	 window.open("uploadFile.jsp");
    });
    
    $("#studentMessage").click(function(){
   	 window.open("studentMessage.jsp");
   });
    
    
    $("#downloadfile").click(function(){
    	 window.open("download.jsp");
    });
    
    $("#quitSystem").click(function(){
    	 window.location.href = "./login.jsp";
   });
    $("#content").empty();
    $("#contentAlo").empty();
    $("#content").append("<p>欢迎使用人工智能课程演示系统！</p>");

	//动态生成导航页
    $.ajax({
    	url:"./getKlgModule",
        type: "POST",
        dataType: "json",
    	data:{},
        success: function (resultInfo) {
            if (resultInfo.result == "success") {
            	            	
            	$(".navBar").append("<ul class='nav clearfix'></ul>");
            	$(".nav").append("<li id='mf' class='m on'><h3>"+"<a target='_blank'" + " href='javascript:void(0);'>"+"网站首页"+"</a></h3></li>");
            	var listModule = resultInfo.moduleList.split("|");//知识模块			
            	//添加知识模块
            	for(var i = 0; i < listModule.length; i++)
            	{
            		var templist = listModule[i].split(":");
            		$(".nav").append("<li id='m"+i+"' class='m'><h3>"+"<a target='_blank'" + " href='javascript:void(0);'>"+templist[1]+"</a></h3></li>"); 
            	}
                     	
            	var listUnit = resultInfo.unitList.split("|");//知识单元	
            	var pointList = resultInfo.pointList.split("|");//知识点
            	
            	/*
            	var tempunit = listUnit[0].split(":");
            	$($(".m")[1]).append("<ul class='sub'></ul>");
            	$($(".sub")[0]).append("<li id ='sub2'><a href='#'>" + tempunit[1] + "</a></li>");
            	$($(".sub")[0]).append("<li id ='sub2'><a href='#'>" + tempunit[1] + "</a></li>");
               	$($(".sub")[0]).append("<li id ='sub2'><a href='#'>" + tempunit[1] + "</a></li>");
            	$($(".sub")[0]).append("<li id ='sub2'><a href='#'>" + tempunit[1] + "</a></li>");
            	
            	jQuery(".nav").slide({ type:"menu",titCell:".m",targetCell:".sub",effect:"slideDown", delayTime:100, triggerTime:0,returnDefault:true });
            	
            	$("#m1").append("<ul class='sub'></ul>");
            	$($(".sub")[1]).append("<li id ='sub2'><a href='#'>" + tempunit[1] + "</a></li>");
            	
            	
             	$("#m2").append("<ul class='sub'></ul>");
            	$($(".sub")[2]).append("<li id ='sub2'>" + tempunit[1] + "<a href='#'></a></li>");
            	*/
            	////////////////////////////////////////
            	var countsub2 = -1;
            	var countsub3 = -1;
            	var countequals = 0;
            	for(var i = 0; i < listModule.length; i++)
            	{
            		var isfirst = true;
            		var tempmodule = listModule[i].split(":");            		
            		for(var j = 0; j <listUnit.length;j++)
            		{
            			var isUnitFirst = true;
            			var tempunit = listUnit[j].split(":");
            			var index = i+1;
            			//添加知识单元
            			if(tempunit[2] == tempmodule[0]){
            				if(isfirst){	
            					$($(".m")[index]).append("<ul class = 'sub'></ul>");     
            					countsub2++;
            					$($(".sub")[i]).append("<li id = 'sub" +countsub2+"'><a href='javascript:void(0);'>" + tempunit[1] + "</a></li>");
            					isfirst = false;
            				}
            				else{
            					countsub2++;
            					$($(".sub")[i]).append("<li id = 'sub" +countsub2+"'><a href='javascript:void(0);'>" + tempunit[1] + "</a></li>");         
            				}
            				/*
            				if(countsub2 == 0){	
            					var temppoint= pointList[0].split(":");
            					$("#sub"+ countsub2).append("<ul class = 'sub3'></ul>");
            					$($(".sub3")[0]).append("<li id = " +temppoint[0] + "><a href='#'>" + temppoint[1] + "</a></li>");
            					$($(".sub3")[0]).append("<li id = " +temppoint[0] + "><a href='#'>" + temppoint[1] + "</a></li>");
            					jQuery(".nav").slide({ type:"menu",titCell:"#sub" + countsub2,targetCell:".sub3",effect:"slideDown", delayTime:100, triggerTime:0,returnDefault:true });
            		        */
            				//添加知识点
            				for(var p = 0; p < pointList.length;p++){
                				var temppoint= pointList[p].split(":");
                				if(temppoint[2] == tempunit[0]){
                					if(isUnitFirst){
                						$("#sub"+ countsub2).append("<ul class = 'sub3'></ul>");
                						countsub3++;
                    					$($(".sub3")[countsub3]).append("<li id ='p" +temppoint[0] + "' name= '"+ temppoint[1]+"'><a href='javascript:void(0);'>" + temppoint[1] + "</a></li>");
                    					isUnitFirst = false;
                    					
                					}
                					else{
                						$($(".sub3")[countsub3]).append("<li id ='p" +temppoint[0] + "' name= '"+ temppoint[1]+ "'><a href='javascript:void(0);'>" + temppoint[1] + "</a></li>");
                					}
                					//为每一个知识点添加事件,请求内容
                					$("#p"+temppoint[0]).click(function(){
                					    Transcripts.loadingContent();
                						var temppointid = $(this).attr('id');  
                						
                						var temppointName=  $(this).attr('name')+":";
                						if($(this).attr('name') == 'null' || !$(this).attr('name')){
                							$("#contentTip").empty();               							
                							return;
                						}
                						temppointid = temppointid.substr(1,temppointid.length-1);
                						var parm ={
                								pointid:temppointid,
                						};
                						  $.ajax({
                								url:"./webContent",
                						        type: "POST",
                						        dataType: "json",
                						    	data:parm||{},  
                						    	success: function (resultInfo){                						    		
                						    		if(resultInfo.result == "success"){             						    			
                						    			$("#contentTip").html(temppointName);
                						    			Transcripts.formatContent(resultInfo.content);                						    			
                						    			Transcripts.addAlg(resultInfo.algcount,resultInfo.agllist);
                						    		}
                						    		else if(resultInfo.result != "success"){
                						    			$("#contentAlo").empty();
                						    			$("#contentTip").html(temppointName);
                						    			$("#content").html("内容不存在");
                						    		}
                						    	},
                						    	 error: function (request, textStatus, errorThrown) {
                						    		 $("#contentTip").html(temppointName);
                						    		 $("#content").html("系统异常，请稍后重试！");
                						    		 $("#contentAlo").empty();
                						         }
                							  
                						  });
                						  
                	
                						//Transcripts.pointClickEvent();
                				    });
                				}
                			}
            				jQuery(".nav").slide({ type:"menu",titCell:"#sub" + countsub2,targetCell:".sub3",effect:"slideDown", delayTime:300, triggerTime:0,returnDefault:true });
            			}
            		}
            	}
            	jQuery(".nav").slide({ type:"menu",titCell:".m",targetCell:".sub",effect:"slideDown", delayTime:300, triggerTime:0,returnDefault:true });
	
            }
            else if (resultInfo.result != "success") {
            	window.location.href = basePath + "/error.jsp";
            }
        },
        error: function (request, textStatus, errorThrown) {
			alert("exception");
        }
    });
}
Transcripts.loadingContent = function(){
	$("#content").empty();
	var contentHtml = "<div class = 'loading' style = 'margin: 15% 45.5%'>"+
						"<img src = 'images/loading.gif' width='35'></div>";
	$("#content").html(contentHtml);
	$("#contentAlo").empty();
	var aloHtml = "<div class = 'loading' style = 'margin: 0 auto;'>" +
					"<img src = 'images/loading.gif' width='35'></div>";
	$("#contentAlo").html(aloHtml);
}

Transcripts.adaptScreen = function(){
    var imgPlayHeight = 660;
    var winHeight = window.screen.height;
    if( winHeight >= 1280 ){
        imgPlayHeight = 950;
    }else if( winHeight > 1024 &&  winHeight <= 1080 ){
        imgPlayHeight = 850;
    }else if( winHeight > 900 &&  winHeight <= 1024 ){
        imgPlayHeight = 780;
    }else if( winHeight > 768 && winHeight <= 900 ){
        imgPlayHeight = 670;
    }else if( winHeight > 600 && winHeight <= 768 ){
        imgPlayHeight = 560;
    }else{
        imgPlayHeight = 460;
    }
    var headerHeight = $(".tk_login_kheadwarp").outerHeight(true);
    var footerHeight = $(".tk_login_kfoot").outerHeight(true);
    $(".find_pwd").css({"height":imgPlayHeight +"px"});
    $("body").css({"height":imgPlayHeight + headerHeight + footerHeight +"px"});
}
Transcripts.pointClickEvent = function(){
	$(this).attr('id');
	alert($(this).attr('id'));
}
Transcripts.addAlg = function(algcount,alglist){
	$("#contentAlo").empty();
	var listalgall = alglist.split("|");//算法集合	
	for(var i = 0; i < algcount; i++){	
		var alg = listalgall[i].split(":");
		$("#contentAlo").append("<span id = 'alg"+alg[0]+"' name = '"+ alg[0] + "' class='alg_btn mt20'>" +alg[1]+"</span>");
		$("#alg"+alg[0]).click(function(){	
			 window.open("a"+ $(this).attr("name")+".jsp");
		});
		
	}
	
	//$("#contentAlo").append("<buttion><a href='"+ "javascript:void(0);" +"'class='alg_btn mt20'>" + "注册ere" +"</a></buttion>");
//	$("#contentAlo").append("<buttion><a href="+"'javascript:void(0);'"+ "class='alg_btn mt20'>" + "注册ere" +"</a></buttion>");
	
	
	//alert(algcount);
	//alert(alglist);
	
}
Transcripts.formatContent = function(webCount){
	$("#content").empty();
	$("#content").html(webCount);
}
