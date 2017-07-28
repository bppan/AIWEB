
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
var teacherId = -1;
$(function(){
    Transcripts.bindBaseEven();   
    Transcripts.addTeacherList();
    
});

Transcripts.bindBaseEven = function(){

	var addButton = $("#AddBut");
	var searchButton = $("#searchBut");

	addButton.click(function(){		
		
		$("#addTeacher_box").show();
	//	Transcripts.uploadFileCancel();
	});
	
	searchButton.click(function(){		
		Transcripts.searchTeacher();
	});
	
    $("#login_close").click(function () {
        $("#errorMsg").html("");
        $('#txtUserName').val('');
        $('#txtName').val('');
        $("#addTeacher_box").hide();
    });
    
    $("#deleteeacher_close").click(function () {
        $("#delete_errorMsg").html("");
        $("#delete_box").hide();
    });
    
    
    $("#alterTeacher_close").click(function () {
        $("#alter_errorMsg").html("");
        $('#txtAlterUserName').val('');
        $("#alterTeacher_box").hide();
    });
    
    $('#txtUserName').keydown(function(){
    	$("#errorMsg").html("");
    });
    
    $('#txtName').keydown(function(){
    	$("#errorMsg").html("");
    });
    
   $('#txtAlterUserName').keydown(function(){
	   $("#alter_errorMsg").html("");
    });
    
    $("#add_button").click(function () {
    	Transcripts.addTeacherFirst();
    });
    $("#alter_button").click(function () {
    	Transcripts.alterTeacherOperate();
    });
    
    $("#delete_button").click(function () {
    	Transcripts.deleteTeacherOperate();
    });
    
    document.onkeydown = function(event){
        //����Enter�����¼�
        if(event.keyCode == 13){
        	if(!$("#addTeacher_box").is(":hidden")){
        		Transcripts.addTeacherFirst();
        	}

        	if(!$("#alterTeacher_box").is(":hidden")){
        		Transcripts.alterTeacherOperate();
        	}
        	if($("#addTeacher_box").is(":hidden") && $("#alterTeacher_box").is(":hidden")){
        		Transcripts.searchTeacher();
        	}
            return false;
        }	
    }
    	
};

Transcripts.addTeacherFirst = function(){
	 $("#errorMsg").html("");
 	
     if ($('#add_button').html() == "�������..." || $('#add_button').hasClass("tk_login_kboxbtn_un")) {
         return;
     }
     var txtuserLoginName = $.trim($('#txtUserName').val());
     var txtuserRealName = $.trim($('#txtName').val());
     if (!txtuserLoginName) {
         $("#errorMsg").html("*����д��ʦ��¼����").css("color", "red");
         $('#txtUserName').focus();
         return;
     }
     
     if (!txtuserRealName) {
         $("#errorMsg").html("*����д��ʦ��ʵ������").css("color", "red");
         $('#txtUserName').blur();
         $('#txtName').focus();
         return;
     }
     Transcripts.addTeacher(txtuserLoginName,txtuserRealName);
}

Transcripts.addTeacher = function(txtuserLoginName,txtuserRealName){
    $('#add_button').html("�������...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
    var params = {
    	userLoginName:txtuserLoginName,
    	userRealName: txtuserRealName
    };
    $.ajax("./addTeacher", {
        type: "POST",
        dataType: "json",
        data: params || {},
        success: function (resultInfo) {
            if (resultInfo.result != "success") {
            	  $('#txtUserName').val('');
                  $('#txtName').val('');
                  $('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
                  $("#errorMsg").html("*��ʦ��¼����ע��,����ģ�").css("color", "red");
                  return;
            } 
            else if (resultInfo.result == "success") {
                $('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");   
                Transcripts.addTeacherList();
                $("#errorMsg").html("*��ӳɹ���").css("color", "red");
                $('#txtUserName').val('');
                $('#txtName').val('');
            }
        },
        error: function (request, textStatus, errorThrown) {
            var errorInfo = "";
            try {
                result = eval('(' + request.responseText + ')');
                if (result) {
                    errorInfo = "ϵͳ����������Ժ�����!";
                } else {
                    errorInfo = "ϵͳ����������Ժ����ԣ�";
                }
                $("#errorMsg").html("*" + errorInfo).css("color", "red");
                $('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
            } catch (e) {
                $("#errorMsg").html("*ϵͳ����������Ժ����ԣ�").css("color", "red");
                $('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
            }
        }
    });
	
}

Transcripts.searchTeacher = function(){
	//$('#fileTyle').uploadify('cancel')
	
	var inputUserId = $("#teacherId").val();
	var inputUserLoginName = $("#teacherName").val();
	
    if (!inputUserId && !inputUserLoginName ) {
    	Transcripts.addTeacherList();
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
	   	 $.ajax("./getteaList", {
	         type: "POST",
	         dataType: "json",
	         data:parm||{},  
	         success: function (resultInfo) {        	
	             if (resultInfo.result == "fail"){
	            	 $('#teaList').empty();
	            	 alert("��ȡ��ʦ�б�ʧ��,���Ժ����ԣ�");
	             }else if (resultInfo.result == "success") {
	            	 
	            	 Transcripts.AddTeaListToView(resultInfo.teaList);
	             }else if(resultInfo.result == "empty"){
	            	 Transcripts.AddTeaListToView(resultInfo.teaList);
	             }       
	          },   
	         error: function (request, textStatus, errorThrown) {
	         	alert("����������,���Ժ����ԣ�");
	         }
	     });
    }
	// window.location.href = basePath + "/uploadFile.jsp";
};


Transcripts.addTeacherList = function(){
	Transcripts.Loading();
 	var parm ={
			teacherID:-1,
			teacherLoginName:""
	};
	 $.ajax("./getteaList", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) {        	
             if (resultInfo.result == "fail"){
            	 $('#teaList').empty();
            	 alert("��ȡ��ʦ�б�ʧ��,���Ժ����ԣ�");
             }else if (resultInfo.result == "success") {
            	 Transcripts.AddTeaListToView(resultInfo.teaList);
             }else if(resultInfo.result == "empty"){
            	 Transcripts.AddTeaListToView(resultInfo.teaList);
             }       
          },   
         error: function (request, textStatus, errorThrown) {
         	alert("����������,���Ժ����ԣ�");
         }
     });
		
};

Transcripts.Loading = function(){	
	$('#teaList').empty();
	var loading = "<div class = 'loading' style = 'margin: 20% auto;'><img src = 'images/loading.gif' width='30'></div>";
	$('#teaList').html(loading);
}

Transcripts.AddTeaListToView = function(teaList){
	 $('#teaList').empty();
	 var teaTable= " <table id = 'myteaList' width='98%'  border='1px' border-radius='5px' class = 'tc faw ft14' style = 'margin-top:15px; margin-left:9px;' >"
		 teaTable += "<tr style = 'background:#19a569; color:white;border:2px;line-height:40px;'><td >��ʦid</td><td >��ʦ��¼��</td><td >��ʦ��ʵ����</td><td>��ʦ��¼ʱ��</td><td >�������</td></tr>";
	 if(teaList.length != 0){
		 var teaMessage = teaList.split("+");
		 for(var i = 0; i < teaMessage.length;i++){
			 var teaItem = teaMessage[i].split("|");
			 var teaId = teaItem[0]
			 var teaLoginName = teaItem[1];
			 var teaRealName = teaItem[2];
			 var teaTime = teaItem[3];
			 if(i % 2 == 0){
				 teaTable += "<tr style = 'line-height:40px;background:#EFEFEF' id = '" +teaId+ "'><td><a href='javascript:void(0);'>" +teaId+
				 "</a></td><td><a href='javascript:void(0);'>" + teaLoginName+"</a></td><td>" +teaRealName+"</td><td>"+teaTime+
				 "</td><td><span  id='"+teaItem + "' name = '"+teaLoginName + "' class = 'alterbutton'>�޸�</span><span  id='"+teaItem+"' name = '"+
				 teaLoginName +"' class = 'deletebutton'>ɾ��</span></td></tr>";	
			 }else{
				 teaTable += "<tr style = 'line-height:40px;background:#FFFFFF' id = '" +teaId+ "'><td><a href='javascript:void(0);'>" +teaId+
				 "</a></td><td><a href='javascript:void(0);'>" + teaLoginName+"</a></td><td>" +teaRealName+"</td><td>"+teaTime+
				 "</td><td><span  id='"+teaItem + "' name = '"+teaLoginName + "' class = 'alterbutton'>�޸�</span><span  id='"+teaItem+"' name = '"+
				 teaLoginName +"' class = 'deletebutton'>ɾ��</span></td></tr>";	
			 }

		 }
	 }
	 teaTable+="</table>";
	$('#teaList').html(teaTable);
	Transcripts.deleteTeacherOperateClickEvent();
	Transcripts.alterTeacherOperateClickEvent();
	
	
}
Transcripts.deleteTeacherOperateClickEvent = function(){
	$(".deletebutton").click(function(){				
		$("#delete_box").show();
		$('#delete_button').html("ɾ��").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
		teacherId = parseInt($(this).attr("id"));	
		var teacherRealName = $(this).attr("name");
		$("#deleteTitle").html("ɾ����¼�˻���" + teacherRealName);		
    
	});
};

Transcripts.deleteTeacherOperate = function(){	
    if ($('#delete_button').html() == "����ɾ��..." || $('#delete_button').hasClass("tk_login_kboxbtn_un")) {
        return;
    }
    if ($('#delete_button').html() == "ȷ��") {
        $("#delete_errorMsg").html("");
        $("#delete_box").hide();
        return;
    }
    $('#delete_button').html("����ɾ��...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
	Transcripts.Loading();
	var id = teacherId;	
	var parm ={
			teacherid:id	
	};
	 $.ajax("./deleteTeacher", {
	       type: "POST",
	       dataType: "json",
	       data: parm||{},  
	       success: function (resultInfo) {
		       	 if(resultInfo.result == "success"){
		       	     $("#delete_errorMsg").html("*ɾ���ɹ���" ).css("color", "red");
		       	      $('#delete_button').html("ȷ��").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
		        	  Transcripts.addTeacherList();     
		         }
		         else if(resultInfo.result != "success"){
		        	 Transcripts.addTeacherList();   
		        	 $('#delete_button').html("ɾ��").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
		        	 $("#delete_errorMsg").html("*ɾ��ʧ�ܣ������ԣ�" ).css("color", "red");     		 
		         }
	         },	      
	       error: function (request, textStatus, errorThrown) {
	             var errorInfo = "";
	             try {
	                 result = eval('(' + request.responseText + ')');
	                 if (result) {
	                     errorInfo = "ϵͳ����������Ժ�����!";
	                 } else {
	                     errorInfo = "ϵͳ����������Ժ����ԣ�";
	                 }
	                 $("#delete_errorMsg").html("*" + errorInfo).css("color", "red");
	                 $('#delete_button').html("ɾ��").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
	             } catch (e) {
	                 $("#delete_errorMsg").html("*ϵͳ����������Ժ����ԣ�").css("color", "red");
	                 $('#delete_button').html("ɾ��").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
	             }
	         }
	    });
	
}

//�޸Ľ�ʦ��ť�¼�
Transcripts.alterTeacherOperateClickEvent = function(){
	
	$(".alterbutton").click(function(){				
		$("#alterTeacher_box").show();
		$("#txtAlterUserName").val('');
		teacherId = parseInt($(this).attr("id"));	
		var teacherRealName = $(this).attr("name");
		$("#alterTitle").html("�޸ĵ�¼�˻���" + teacherRealName);
		
	});
}
//�޸Ľ�ʦ��ʵ����
Transcripts.alterTeacherOperate = function(){
	
	var txtAlterName = $("#txtAlterUserName").val();	
    if ($('#alter_button').html() == "�����޸�..." || $('#alter_button').hasClass("tk_login_kboxbtn_un")) {
        return;
    }
    if (!txtAlterName || teacherId == -1) {
        $("#alter_errorMsg").html("*����д��ʦ��ʵ������").css("color", "red");
        $("#txtAlterUserName").focus();
        return;
    }
    $('#alter_button').html("�����޸�...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
	var id = teacherId;	
	var parm ={
			teacherid:id,
			teacherRealName:txtAlterName
	};
	 $.ajax("./alterTeacher", {
         type: "POST",
         dataType: "json",
         data: parm||{},  
         success: function (resultInfo) {
        	 if(resultInfo.result == "success"){
        		 $('#txtAlterUserName').val();
        		 $("#alter_errorMsg").html("*�޸ĳɹ���").css("color", "red");
        		 $('#alter_button').html("�޸�").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
        		 Transcripts.addTeacherList();     
        	 }
        	 else if(resultInfo.result != "success"){
        		 $('#txtAlterUserName').focus();
        		 $("#alter_errorMsg").html("*�޸�ʧ�ܣ�").css("color", "red");
        		 $('#alter_button').html("�޸�").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
        	 }
          },	      
         error: function (request, textStatus, errorThrown) {
             var errorInfo = "";
             try {
                 result = eval('(' + request.responseText + ')');
                 if (result) {
                     errorInfo = "ϵͳ����������Ժ�����!";
                 } else {
                     errorInfo = "ϵͳ����������Ժ����ԣ�";
                 }
                 $("#alter_errorMsg").html("*" + errorInfo).css("color", "red");
                 $('#alter_button').html("�޸�").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
             } catch (e) {
                 $("#alter_errorMsg").html("*ϵͳ����������Ժ����ԣ�").css("color", "red");
                 $('#alter_button').html("�޸�").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
             }
         }
     });
}

Transcripts.getPath = function(obj){
	
    if(obj){
           //ie
           if (window.navigator.userAgent.indexOf("MSIE")>=1)
           {
               obj.select();
               return document.selection.createRange().text;
           }
            //firefox
            else if(window.navigator.userAgent.indexOf("Firefox")>=1)
            {
                if(obj.files)
                {
                   return obj.files.item(0).getAsDataURL();
                }
                    return obj.value;
            } 
            return obj.value;
    }
}


