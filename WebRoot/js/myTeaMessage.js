
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
var teacherId = -1;
$(function(){
    Transcripts.bindBaseEven();   
    Transcripts.addStudentList();
  
});

Transcripts.bindBaseEven = function(){

	var searchButton = $("#searchBut");	
	searchButton.click(function(){		
		Transcripts.searchStudent();
	});
	
    $("#alert_close").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });
    $("#alert_button").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });
    document.onkeydown = function(event){
        //����Enter�����¼�
        if(event.keyCode == 13){
        	if(!$("#alert_box").is(":hidden")){
                $("#alert_errorMsg").html("");
                $("#alert_box").hide();
        	}
        	else{
        		Transcripts.searchStudent();
        	}
            return false;
        }	
    }
    	
};
Transcripts.searchStudent = function(){	
    if($('#searchBut').html() == "��������...") {
        return;
    }
    Transcripts.Loading();
	$("#searchBut").html("��������...").css("cursor", "default");
	var inputUserId = $.trim($("#studentId").val());
	var inputUserLoginName = $.trim($("#studentName").val());
	
    if (!inputUserId && !inputUserLoginName ) { 
    	Transcripts.addStudentList();
        return;
    }
    else{  
        if (!inputUserId) {
        	inputUserId = -1;
        }
        if(!inputUserLoginName){
        	inputUserLoginName = "";
        }
	    inputUserId = parseInt(inputUserId);
	    Transcripts.Loading();
	 	var parm ={
	 			teacherID:inputUserId,
	 			teacherLoginName:inputUserLoginName
		};
		
	   	 $.ajax("./getTeaMessageList", {
	         type: "POST",
	         dataType: "json",
	         data:parm||{},  
	         success: function (resultInfo) { 
	        	 $("#searchBut").html("����").css("cursor", "pointer");
	             if (resultInfo.result == "fail"){            	
	            	 $("#alert_box").show();
	            	 $("#alert_errorMsg").html("*��ȡ��ʦ��Ϣʧ��,���Ժ���������!").css("color", "red");
	             }else if (resultInfo.result == "success") {
	            	 
	            	 Transcripts.AddStuListToView(resultInfo.teaList);
	             }else if(resultInfo.result == "empty"){
	            	 $("#alert_box").show();
	            	 $("#alert_errorMsg").html("�˽�ʦ������!").css("color", "red");
	            	 Transcripts.AddStuListToView(resultInfo.teaList);
	             }       
	          },   
	         error: function (request, textStatus, errorThrown) {
	        
	        	 $("#searchBut").html("����").css("cursor", "pointer");
	        	 $("#alert_box").show();
	             var errorInfo = "";
	             try {
	                 result = eval('(' + request.responseText + ')');
	                 if (result) {
	                     errorInfo = "ϵͳ����������Ժ�����!";
	                 } else {
	                     errorInfo = "ϵͳ����������Ժ����ԣ�";
	                 }
	                 $("#alert_errorMsg").html("*" + errorInfo).css("color", "red");
	             } catch (e) {
	                 $("#alert_errorMsg").html("*ϵͳ����������Ժ����ԣ�").css("color", "red");
	             }
	         }
	     });
    }
};
Transcripts.addStudentList = function(){
	Transcripts.Loading();
 	var parm ={
 			teacherID:-1,
 			teacherLoginName:""
	};
	 $.ajax("./getTeaMessageList", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) { 
        	 $("#searchBut").html("����").css("cursor", "pointer");
             if (resultInfo.result == "fail"){
            	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("*��ȡ��ʦ��Ϣʧ��,���Ժ���������!").css("color", "red");
             }else if (resultInfo.result == "success") {
            	 Transcripts.AddStuListToView(resultInfo.teaList);
             }else if(resultInfo.result == "empty"){
             	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("*�˽�ʦ������!").css("color", "red");
            	 Transcripts.AddStuListToView(resultInfo.teaList);
             }       
          },   
         error: function (request, textStatus, errorThrown) {	 
        	 $("#searchBut").html("����").css("cursor", "pointer");
             var errorInfo = "";
             $("#alert_box").show();
             try {
                 result = eval('(' + request.responseText + ')');
                 if (result) {
                     errorInfo = "ϵͳ����������Ժ�����!";
                 } else {
                     errorInfo = "ϵͳ����������Ժ����ԣ�";
                 }              
                 $("#alert_errorMsg").html("*" + errorInfo).css("color", "red");
             } catch (e) {
                 $("#alert_errorMsg").html("*ϵͳ����������Ժ����ԣ�").css("color", "red");
             }
         }
     });
		
};

Transcripts.Loading = function(){	
	$('#StudentList').empty();
	var loading = "<div class = 'loading' style = 'margin: 20% auto;'><img src = 'images/loading.gif' width='30'></div>";
	$('#StudentList').html(loading);
}

Transcripts.AddStuListToView = function(studentMessageList){
	 $('#StudentList').empty();
	 var teaTable= " <table id = 'myteaList' width='98%'  border='1px' border-radius='5px' class = 'tc faw ft14' style = 'margin-top:15px; margin-left:9px;' >"
		 teaTable += "<tr style = 'background:#19a569; color:white;border:2px;line-height:40px;'><td >��ʦid</td><td >��ʦ����</td><td >�Ա�</td><td>����Ժϵ</td><td>ְ��</td><td >��ϸ��Ϣ</td></tr>";
	 if(studentMessageList.length != 0){
		 var teaMessage = studentMessageList.split("+");
		 for(var i = 0; i < teaMessage.length;i++){
			 var teaItem = teaMessage[i].split("|");
			 var teaId = teaItem[0]
			 var teaName = teaItem[1];
			 var teaSex = teaItem[2];
			 var teaCollage = teaItem[3];
			 var teaJob = teaItem[4];
			 var stuIp = teaItem[5];
			 if(i % 2 == 0){
				 teaTable += "<tr id = '" +teaId+ "' style = 'line-height:40px;background:#EFEFEF' class = 'faw tc ft14'><td><a href='javascript:void(0);'>" +
				 teaId+"</a></td><td><a href='javascript:void(0);'>" +teaName+"</a></td><td><a href='javascript:void(0);'>" +
				 teaSex + "</a></td><td><a href='javascript:void(0);'>"+teaCollage+"</a></td><td><a href='javascript:void(0);'>"+teaJob+"</a></td><td><span  id='"+teaId + 
				 "' name = '"+teaName + "' class = 'alterbutton'>�鿴</span></td></tr>";	
			 }
			 else{
				 teaTable += "<tr id = '" +teaId+ "' style = 'line-height:40px' class = 'faw tc ft14'><td><a href='javascript:void(0);'>" +
				 teaId+"</a></td><td><a href='javascript:void(0);'>" +teaName+"</a></td><td><a href='javascript:void(0);'>" +
				 teaSex + "</a></td><td><a href='javascript:void(0);'>"+teaCollage+"</a></td><td><a href='javascript:void(0);'>"+teaJob+"</a></td><td><span  id='"+teaId + 
				 "' name = '"+teaName + "' class = 'alterbutton'>�鿴</span></td></tr>";	
			 }

		 }
	 }
	 teaTable+="</table>";
	$('#StudentList').html(teaTable);  
	Transcripts.browseTeacherOperateClickEvent();

}

Transcripts.browseTeacherOperateClickEvent = function(){
	$(".alterbutton").click(function(){		
		var teacherId = parseInt($(this).attr("id"));	
		var teacherName = $(this).attr("name");	
	
		$.cookie('viewTeacherId',teacherId);
		$.cookie('viewTeacherName',teacherName);
		
	   	document.location.href = "./browseTeacher.jsp";
	});
};

