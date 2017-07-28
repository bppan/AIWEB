
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
var controlType = -1;

$(function(){
    Transcripts.bindBaseEven();      
});

Transcripts.bindBaseEven = function(){

    UM.getEditor('myEditor').setDisabled('fullscreen');
	var sureButton = $("#SureBut");
	sureButton.click(function(){	
		Transcripts.alterPointContent();		
	});	
	
	$("#AddModuleBut").click(function(){
		Transcripts.addModule();	
	});	
	
	$("#AddUnitBut").click(function(){
		var thevalue = $("#selectModule").val()
		if(thevalue == "0"){
			$("#selectModule").focus();
	    	$("#alert_errorMsg").html("��ѡ��֪ʶģ�飡");
	    	$("#alert_box").show();
	    	return;
		}else{
			Transcripts.addUnit();
		}
	});	
	
	$("#AddPointBut").click(function(){
		var thevalue = $("#selectUnit").val()
		if(thevalue == "0"){
			$("#selectUnit").focus();
	    	$("#alert_errorMsg").html("��ѡ��֪ʶ��Ԫ��");
	    	$("#alert_box").show();
	    	return;
		}else{
			Transcripts.addPoint();
		}	
	});	
	
	$("#AddAlgBut").click(function(){
		var thevalue = $("#selectPoint").val()
		if(thevalue == "0"){
			
	    	$("#alert_errorMsg").html("��ѡ��֪ʶ�㣡");
	    	$("#alert_box").show();
	    	return;
		}else{
			Transcripts.addAlg();
		}	
	});	
	
	
	var selectModule = $("#selectModule");
	selectModule.change(function(){		
		
		var thevalue = $("#selectModule").val();
		UM.getEditor('myEditor').setDisabled('fullscreen');
		if(thevalue == "0"){
			Transcripts.clearUnitList();
			Transcripts.clearPointList ();
			Transcripts.clearContent();
		}else{
			$("#selectUnit").focus();
			var mid = parseInt($("#selectModule").val());
			Transcripts.getUnitList(mid);
			Transcripts.clearPointList ();
			Transcripts.clearContent();
		}
	});
	
	var selectUnit = $("#selectUnit");
	selectUnit.change(function(){		
		UM.getEditor('myEditor').setDisabled('fullscreen');
		var thevalue = $("#selectUnit").val();
		if(thevalue == "0"){
			Transcripts.clearPointList ();
		}else{
			$("#selectPoint").focus();
			var uid = parseInt($("#selectUnit").val());
			Transcripts.getPointList(uid);
			Transcripts.clearContent();
		}
	});

	var selectPoint = $("#selectPoint");
	selectPoint.change(function(){	
		var thevalue = $("#selectPoint").val();
		if(thevalue == "0"){
			return;
		}else{
	        UM.getEditor('myEditor').setEnabled();
			UM.getEditor('myEditor').focus();
			var pid = parseInt($("#selectPoint").val());
			Transcripts.getPointContent(pid);
		}
	});
	
    $("#alert_close").click(function () {
    	$("#alert_errorMsg").html("");
    	$("#alert_box").hide();
    });
    $("#add_close").click(function () {
    	$("#add_errorMsg").html("");
    	$("#add_box").hide();
    	$("#txtName").val('');
    	$('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");    	
    });
    
    $("#alert_button").click(function () {
    	$("#alert_errorMsg").html("");
    	$("#alert_box").hide();
    });
	
    $("#add_button").click(function () {
    	if($("#add_button").html() == "���"){
        	$("#add_errorMsg").html("");
        	$("#add_box").hide();
        	$("#txtName").val('');
        	$('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
        	return;
    	}
    	var pmuaName = $.trim($("#txtName").val());
    	if(!pmuaName){
    		   $("#add_errorMsg").html("*����д���ƣ�").css("color", "red");
    		   return;
    	}
    	if(controlType == 0){
    		if($("#add_button").html() == "�������..."){
    			return;
    		}
    		$('#add_button').html("�������...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
    		Transcripts.addMUPA(-1,pmuaName,0);
    	}else if(controlType == 1){
    		if($("#add_button").html() == "�������..."){
    			return;
    		}
    		var theid = parseInt($("#selectModule").val());
    		$('#add_button').html("�������...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
    		Transcripts.addMUPA(theid,pmuaName,1);
    	}else if(controlType == 2){
    		if($("#add_button").html() == "�������..."){
    			return;
    		}
    		var theid = parseInt($("#selectUnit").val());
    		$('#add_button').html("�������...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
    		Transcripts.addMUPA(theid,pmuaName,2);
    	}else if(controlType == 3){
    		if($("#add_button").html() == "�������..."){
    			return;
    		}
    		var theid = parseInt($("#selectPoint").val());
    		$('#add_button').html("�������...").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "default");
    		Transcripts.addMUPA(theid,pmuaName,3);
    	}
    		
    	$("#alert_errorMsg").html("");
    	$("#alert_box").hide();
    });
    //��ʼ��ģ���б�
    Transcripts.getModuleList();
	
	/* 
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
    */
    
};

Transcripts.clearModuleList = function(){
	 $("#selectModule").empty();
	 var modulehtml = "<option value='0'>��ѡ��Ԫ��Ԫ</option>";
	 $("#selectModule").append(modulehtml);
}

Transcripts.clearUnitList = function(){
	 $("#selectUnit").empty();
	 var unithtml = "<option value='0'>��ѡ��֪ʶ��Ԫ</option>";
	 $("#selectUnit").append(unithtml);
}
Transcripts.clearPointList = function(){
	 $("#selectPoint").empty();
	 var pointhtml = "<option value='0'>��ѡ��֪ʶ��</option>";
	 $("#selectPoint").append(pointhtml);
}
Transcripts.clearContent = function(){
	UM.getEditor('myEditor').setContent('');
}

Transcripts.getModuleList = function(){
    var params = {
    		type:0
        };
	 $.ajax("./getModuleUnitPointList", {
	        type: "POST",
	        dataType: "json",
	        data: params || {},
	        success: function (resultInfo) {
	        	 $("#box_mask").hide();
	            if (resultInfo.result == "fail") {
	            	 $("#alert_box").show();
	                  $("#alert_errorMsg").html("��ȡ֪ʶģ������ʧ�ܣ���ˢ������").css("color", "red");
	                  return;
	            } 
	            else if (resultInfo.result == "success") {	            	
	            	addModuleToView(resultInfo.resultList);
	            }else if(resultInfo.result == "empty") {	    			
	    			Transcripts.clearPointList ();
	    			Transcripts.clearUnitList();
	    			Transcripts.clearModuleList();
	            }
	        },
	        error: function (request, textStatus, errorThrown) {
	        	$("#box_mask").hide();
	        	$("#alert_box").show();
	            var errorInfo = "";
	            try {
	                result = eval('(' + request.responseText + ')');
	                if (result) {
	                    errorInfo = "ϵͳ����������Ժ�����!";
	                } else {
	                    errorInfo = "ϵͳ����������Ժ����ԣ�";
	                }
	                $("#alert_errorMsg").html( errorInfo).css("color", "red");
	            } catch (e) {
	                $("#alert_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
	            }
	        }
	 });
	 
	 function addModuleToView(moduleList){	
		 $("#selectModule").empty();
		 var moduleStr = moduleList.split("|");
		 var modulehtml = "<option value='0'>��ѡ��֪ʶģ��</option>";
		 for(var i = 0; i < moduleStr.length;i++){
			 var theModule = moduleStr[i].split(":");
			 modulehtml = modulehtml +"<option value='"+theModule[0] + "'>"+ theModule[1]+"</option>";
		 }	 
		 $("#selectModule").append(modulehtml);		 
	 } 
}

Transcripts.getUnitList = function(themoduleId){
    var params = {
    		type:1,
    		moduleId:themoduleId
        };
	 $.ajax("./getModuleUnitPointList", {
	        type: "POST",
	        dataType: "json",
	        data: params || {},
	        success: function (resultInfo) {
	            if (resultInfo.result == "fail") {
	            	 $("#alert_box").show();
	                  $("#alert_errorMsg").html("��ȡ֪ʶ��Ԫ����ʧ�ܣ���ˢ������").css("color", "red");
	                  return;
	            } 
	            else if (resultInfo.result == "success") {	            	
	            	addUnitToView(resultInfo.resultList);
	            }else if(resultInfo.result == "empty") {
	            	Transcripts.clearUnitList();
	            	Transcripts.clearPointList ();
	            }
	        },
	        error: function (request, textStatus, errorThrown) {
	        	$("#alert_box").show();
	            var errorInfo = "";
	            try {
	                result = eval('(' + request.responseText + ')');
	                if (result) {
	                    errorInfo = "ϵͳ����������Ժ�����!";
	                } else {
	                    errorInfo = "ϵͳ����������Ժ����ԣ�";
	                }
	                $("#alert_errorMsg").html( errorInfo).css("color", "red");
	            } catch (e) {
	                $("#alert_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
	            }
	        }
	 });
	 
	 function addUnitToView(unitList){	
		 $("#selectUnit").empty();
		 var unitStr = unitList.split("|");
		 var unithtml = "<option value='0'>��ѡ��֪ʶ��Ԫ</option>";
		 for(var i = 0; i < unitStr.length;i++){
			 var theUnit = unitStr[i].split(":");
			 unithtml = unithtml +"<option value='"+theUnit[0] + "'>"+ theUnit[1]+"</option>";
		 }	 
		 $("#selectUnit").append(unithtml);		 
	 } 
}

Transcripts.getPointList = function(theUnitId){
    var params = {
    		type:2,
    		unitId:theUnitId
        };
	 $.ajax("./getModuleUnitPointList", {
	        type: "POST",
	        dataType: "json",
	        data: params || {},
	        success: function (resultInfo) {
	            if (resultInfo.result == "fail") {
	            	 $("#alert_box").show();
	                  $("#alert_errorMsg").html("��ȡ֪ʶ������ʧ�ܣ���ˢ������").css("color", "red");
	                  return;
	            } 
	            else if (resultInfo.result == "success") {	            	
	            	addPointToView(resultInfo.resultList);
	            }else if(resultInfo.result == "empty") {
	            	 $("#alert_box").show();
	                 $("#alert_errorMsg").html("��֪ʶ�㣡").css("color", "red");
	            	Transcripts.clearPointList ();
	            }
	        },
	        error: function (request, textStatus, errorThrown) {
	        	$("#alert_box").show();
	            var errorInfo = "";
	            try {
	                result = eval('(' + request.responseText + ')');
	                if (result) {
	                    errorInfo = "ϵͳ����������Ժ�����!";
	                } else {
	                    errorInfo = "ϵͳ����������Ժ����ԣ�";
	                }
	                $("#alert_errorMsg").html( errorInfo).css("color", "red");
	            } catch (e) {
	                $("#alert_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
	            }
	        }
	 });
	 
	 function addPointToView(pointList){	
		 $("#selectPoint").empty();
		 var pointStr = pointList.split("|");
		 var pointtml = "<option value='0'>��ѡ��֪ʶ��</option>";
		 for(var i = 0; i < pointStr.length;i++){
			 var thepoint = pointStr[i].split(":");
			 if( thepoint[1] != ""){
				 pointtml = pointtml +"<option value='"+thepoint[0] + "'>"+ thepoint[1]+"</option>";
			 }		
		 }	 
		 $("#selectPoint").append(pointtml);		 
	 } 
}


Transcripts.getPointContent = function(temppointid){
	$("#maskcontent").html("���ݼ���...");
	$("#box_mask").show();
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
	    			$("#maskcontent").html("���ݼ���...");
	    			$("#box_mask").hide();
	    			UM.getEditor('myEditor').setContent(resultInfo.content);
	    		}
	    		else if(resultInfo.result != "success"){
	    			$("#maskcontent").html("���ݼ���...");
	    			$("#box_mask").hide();
	    			UM.getEditor('myEditor').setContent('����Ϊ�գ�');
	    		}
	    	},
	    	 error: function (request, textStatus, errorThrown) {
	    			$("#maskcontent").html("���ݼ���...");
	    			$("#box_mask").hide();
		        	$("#alert_box").show();
		            var errorInfo = "";
		            try {
		                result = eval('(' + request.responseText + ')');
		                if (result) {
		                    errorInfo = "ϵͳ����������Ժ�����!";
		                } else {
		                    errorInfo = "ϵͳ����������Ժ����ԣ�";
		                }
		                $("#alert_errorMsg").html( errorInfo).css("color", "red");
		            } catch (e) {
		                $("#alert_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
		            }
	         }		  
	  });	  
}

Transcripts.alterPointContent = function(){
	
	var thevalue = $("#selectPoint").val();
	if(thevalue == "0"){
		$("#alert_box").show();
	    $("#alert_errorMsg").html("��ѡ��֪ʶ��!").css("color", "red");
		return;
	}
	if($("#SureBut").html() == "�����޸�..."){
		return;
	}
	$("#SureBut").html("�����޸�...").css("cursor", "default");
	var content = UM.getEditor('myEditor').getContent();	
	var parm ={
			pointid:parseInt(thevalue),
			pointContent:content
	};
	  $.ajax({
			url:"./alterWebContent",
	        type: "POST",
	        dataType: "json",
	    	data:parm||{},  
	    	success: function (resultInfo){  
	    		$("#alert_box").show();
	    		$("#SureBut").html("�����޸�").css("cursor", "pointer");
	    		if(resultInfo.result == "success"){  
	    		    $("#alert_errorMsg").html("�޸ĳɹ���").css("color", "Green");
	    		}
	    		else if(resultInfo.result != "success"){
	    			 $("#alert_errorMsg").html("�޸�ʧ�ܣ������ԣ�").css("color", "red");
	    		}
	    	},
	    	 error: function (request, textStatus, errorThrown) {
	    		 $("#SureBut").html("�����޸�").css("cursor", "pointer");
		        	$("#alert_box").show();
		            var errorInfo = "";
		            try {
		                result = eval('(' + request.responseText + ')');
		                if (result) {
		                    errorInfo = "ϵͳ����������Ժ�����!";
		                } else {
		                    errorInfo = "ϵͳ����������Ժ����ԣ�";
		                }
		                $("#alert_errorMsg").html( errorInfo).css("color", "red");
		            } catch (e) {
		                $("#alert_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
		            }
	         }		  
	  });		
}
Transcripts.addModule =function(){
	$("#add_box").show();
	$("#alterTitle").html("���֪ʶģ��");
	$("#stuTips").html("��ܰ��ʾ��ģ�������뾡�����");
	controlType = 0;	
}
Transcripts.addUnit =function(moduleId){
	$("#add_box").show();
	$("#alterTitle").html("���֪ʶ��Ԫ");
	$("#stuTips").html("��ܰ��ʾ��֪ʶ��Ԫ�����뾡����������");
	controlType = 1;	
}
Transcripts.addPoint =function(unitId){
	$("#add_box").show();
	$("#alterTitle").html("���֪ʶ��");
	$("#stuTips").html("��ܰ��ʾ��֪ʶ�������뾡����������");
	controlType = 2;	
}
Transcripts.addAlg =function(pointId){
	$("#add_box").show();
	$("#alterTitle").html("����㷨");
	$("#stuTips").html("��ܰ��ʾ���㷨�����뾡����������");
	controlType = 3;	
}
Transcripts.addMUPA = function(id,name,thetype){
	var parm ={
			pMUAId:id,
			pMUAName:name,
			type:thetype
	};
	  $.ajax({
			url:"./addPMUA",
	        type: "POST",
	        dataType: "json",
	    	data:parm||{},  
	    	success: function (resultInfo){  
	    		if(resultInfo.result == "success"){  
	    			$('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
	    		    $("#add_errorMsg").html("��ӳɹ���").css("color", "Green");
	    		    if(thetype == 0){
	    		    	Transcripts.getModuleList();
	    		    	Transcripts.clearUnitList();
	    		    	Transcripts.clearPointList();
	    		    	Transcripts.clearContent();
	    		    }else if(thetype == 1){
	    		    	Transcripts.getUnitList(id);
	    		    	Transcripts.clearPointList();
	    		    	Transcripts.clearContent();
	    		    }else if(thetype == 2){
	    		    	Transcripts.getPointList(id);
	    		    	Transcripts.clearContent();
	    		    }
	    		    if(thetype == 3){
	    		    	$("#alert_box").show();
	    		    	$("#alert_errorMsg").html("���μ�����ӵ��㷨����ҳ�棺a" + resultInfo.theAlgId + ".jsp" ).css("color", "Red");	    	
	    		    }
	    		}
	    		else if(resultInfo.result != "success"){
	    			$('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
	    			if(resultInfo.result == "rename" && thetype == 3){
	    				$("#add_errorMsg").html("�㷨���Ƴ�ͻ�����������").css("color", "red");
	    			}
	    			else{
	    				$("#add_errorMsg").html("���ʧ�ܣ������ԣ�").css("color", "red");
	    			}	    			 
	    		}
	    	},
	    	 error: function (request, textStatus, errorThrown) {
	    		  $('#add_button').html("���").attr("class", "tk_Teacher_kboxbtn faw").css("cursor", "pointer");
		            var errorInfo = "";
		            try {
		                result = eval('(' + request.responseText + ')');
		                if (result) {
		                    errorInfo = "ϵͳ����������Ժ�����!";
		                } else {
		                    errorInfo = "ϵͳ����������Ժ����ԣ�";
		                }
		                $("#add_errorMsg").html(errorInfo).css("color", "red");
		            } catch (e) {
		                $("#add_errorMsg").html("ϵͳ����������Ժ����ԣ�").css("color", "red");
		            }
	         }		  
	  });		
}







