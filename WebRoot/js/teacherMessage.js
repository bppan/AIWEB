
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
var messageTable = messageTable || {};

$(function(){
    Transcripts.bindBaseEven();   
    Transcripts.initViewTable();
    
});

Transcripts.bindBaseEven = function(){
	
	messageTable.name = $("#teaName");
	messageTable.sex = $('input:radio');
	messageTable.birthDate = $("#birthDate");
	
	messageTable.tea_degree =  $("#tea_degree");
	
	messageTable.user_graduate_School =  $("#user_graduate_School");
	messageTable.user_major = $("#user_major");
	messageTable.user_collage = $("#user_collage");
	messageTable.user_job_title = $("#user_job_title");
	messageTable.user_job = $("#user_job");
	messageTable.user_laboratory =  $("#user_laboratory");
	
	
	messageTable.user_office_phone = $("#user_office_phone");
	messageTable.user_email = $("#user_email");
	messageTable.user_address =  $("#user_address");
	messageTable.user_post =  $("#user_post");
	
	
	messageTable.user_resume = $("#user_resume");
	messageTable.user_research_direction = $("#user_research_direction");
	messageTable.user_teach_work =  $("#user_teach_work");
	messageTable.user_awards =  $("#user_awards");
	messageTable.user_book =  $("#user_book");
	var cancerBut = $("#cancerBut");	
	cancerBut.click(function(){		
	 	if($("#cancerBut").html() == "正在重置..."){
    		return;
    	} 
	
		Transcripts.initViewTable();
	});
	
    $("#alert_close").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });
    $("#alert_button").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });   
    $("#sureBut").click(function () {
    	if($("#sureBut").html() == "正在修改..."){
    		return;
    	}   	
    	$("#sureBut").html("正在修改...").css("cursor", "default");
    	Transcripts.alterAction();
    });
    document.onkeydown = function(event){
        //捕获Enter按键事件
        if(event.keyCode == 13){
        	if(!$("#alert_box").is(":hidden")){
                $("#alert_errorMsg").html("");
                $("#alert_box").hide();
        	}          
        }	
    }    	
};


Transcripts.initViewTable = function(){
	if($("#cancerBut").html() == "正在重置..."){
		return;
	}	
	$("#cancerBut").html("正在重置...").css("cursor", "default");
	$("#alter_box_mask").show();
 	var parm ={
 			teacherID:-1,
 			teacherName:""
 	};	
   	 $.ajax("./getTeacherMessage", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) { 
        	 $("#cancerBut").html("重置").css("cursor", "pointer");
             if (resultInfo.result == "fail"){            	
            	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("*获取信息失败,请刷新重试!").css("color", "red");
             }else if (resultInfo.result == "success") {  
            	 $("#alter_box_mask").hide();
            	 Transcripts.AddMessageToTable(resultInfo.teaMessage);
             }    
          },   
         error: function (request, textStatus, errorThrown) {  
        	 $("#alter_box_mask").hide();
        	 $("#cancerBut").html("重置").css("cursor", "pointer");
        	 $("#alert_box").show();
             var errorInfo = "";
             try {
                 result = eval('(' + request.responseText + ')');
                 if (result) {
                     errorInfo = "系统请求出错，请稍后重试!";
                 } else {
                     errorInfo = "系统请求出错，请稍后重试！";
                 }
                 $("#alert_errorMsg").html("*" + errorInfo).css("color", "red");
             } catch (e) {
                 $("#alert_errorMsg").html("*系统请求出错，请稍后重试！").css("color", "red");
             }
         }
     });
}
Transcripts.alterAction = function(){	
	$("#alter_box_mask").show();
	var sexNum = -1;
	var sex = $('input:radio:checked');
	if(sex.val() == "1"){
		sexNum = 1;
	}	
	else if(sex.val() == "0"){
		sexNum = 0;
	}
 	var parm ={
 			user_name: $.trim(messageTable.name.val()),
 			user_sex:sexNum,
 			user_birth_date: $.trim(messageTable.birthDate.val()),
 			user_degree: $.trim(messageTable.tea_degree.val()),
 			user_graduate_School:$.trim(messageTable.user_graduate_School.val()),
 			user_major:$.trim(messageTable.user_major.val()),
 			user_collage:$.trim(messageTable.user_collage.val()),
 			user_job:$.trim(messageTable.user_job.val()),
 			user_laboratory:$.trim(messageTable.user_laboratory.val()),
 			user_job_title:$.trim(messageTable.user_job_title.val()),
 			user_office_phone:$.trim(messageTable.user_office_phone.val()),
 			user_email:$.trim(messageTable.user_email.val()),
 			user_address:$.trim(messageTable.user_address.val()),
 			user_postcode:$.trim(messageTable.user_post.val()),
 			user_resume:messageTable.user_resume.val(),
 			user_research_direction:messageTable.user_research_direction.val(),
 			user_teach_work:messageTable.user_teach_work.val(),
 			user_awards:messageTable.user_awards.val(),
 			user_book:messageTable.user_book.val()	
 	};	
   	 $.ajax("./alterTeacherMessage", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) { 
        	 $("#sureBut").html("修改").css("cursor", "pointer");
             if (resultInfo.result == "fail"){            	
            	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("*修改失败,请检查输入格式!").css("color", "red");
             }else if (resultInfo.result == "success") {  
            	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("*修改成功!").css("color", "Green");
            	 Transcripts.initViewTable();
             }    
          },   
         error: function (request, textStatus, errorThrown) {        
        	 $("#sureBut").html("修改").css("cursor", "pointer");
        	// $("#searchBut").html("搜索").css("cursor", "pointer");
        	 $("#alert_box").show();
             var errorInfo = "";
             try {
                 result = eval('(' + request.responseText + ')');
                 if (result) {
                     errorInfo = "系统请求出错，请稍后重试!";
                 } else {
                     errorInfo = "系统请求出错，请稍后重试！";
                 }
                 $("#alert_errorMsg").html("*" + errorInfo).css("color", "red");
             } catch (e) {
                 $("#alert_errorMsg").html("*系统请求出错，请稍后重试！").css("color", "red");
             }
         }
     });
}

Transcripts.AddMessageToTable = function(teaMessage){
	var theMessage = teaMessage.split("|");
	messageTable.name.val(theMessage[0]);
	if(theMessage[1] == "1"){
		$(messageTable.sex[0]).attr("checked", true);
	}else if(theMessage[1] == "0"){
		$(messageTable.sex[1]).attr("checked", true);
	}
	messageTable.birthDate.val(theMessage[2]);
	messageTable.tea_degree.val(theMessage[3]);	
	messageTable.user_graduate_School.val(theMessage[4]);
	messageTable.user_major.val(theMessage[5]);	
	messageTable.user_collage.val(theMessage[6]);
	messageTable.user_job.val(theMessage[7]);
	messageTable.user_laboratory.val(theMessage[8]);
	messageTable.user_job_title.val(theMessage[9]);
	messageTable.user_office_phone.val(theMessage[10]);
	messageTable.user_email.val(theMessage[11]);
	messageTable.user_address.val(theMessage[12]);
	messageTable.user_post.val(theMessage[13]);
	messageTable.user_resume.val(theMessage[14]);
	messageTable.user_research_direction.val(theMessage[15]);
	messageTable.user_teach_work.val(theMessage[16]);
	messageTable.user_awards.val(theMessage[17]);
	messageTable.user_book.val(theMessage[18]);	
}




