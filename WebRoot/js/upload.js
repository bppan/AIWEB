
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
$(function(){
    Transcripts.bindBaseEven();   
    Transcripts.addFileList();
    
});

Transcripts.bindBaseEven = function(){
	
	var hidefile = $("#fileTyle");	
	hidefile.change(function(){	   
		var path  = Transcripts.getPath(this);      		
		$("#t_file").val(path);
	});
	$("#searchFile").click(function () {
		hidefile.click();
    });
	
    $("#alert_close").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });
    $("#alert_button").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });  
	var uploadButton = $("#btnupload");
	
	uploadButton.click(function(){	
         	 $("#alter_box_mask").show();
		});
	
	var uploadCancelButton = $("#btnCancelupload");

	uploadCancelButton.click(function(){		
		Transcripts.uploadFileCancel();
	});
};

Transcripts.uploadFileCancel = function(){
	//$('#fileTyle').uploadify('cancel')
	 Transcripts.resrtForm();
	// window.location.href = basePath + "/uploadFile.jsp";
};


Transcripts.addFileList = function(){
	var parm ={
			isupload:1
	};
	 $.ajax("./getfileList", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) {        	
             if (resultInfo.result == "fail"){
            	 $('#fileList').empty();
            	 $("#alert_box").show();
            	 $("#alert_errorMsg").html("获取文件失败,请稍后重试！").css("color", "red");
             }else if (resultInfo.result == "success") {
            	 Transcripts.AddFileListToView(resultInfo.fileList);
             }else if(resultInfo.result == "empty"){
            	 Transcripts.AddFileListToView(resultInfo.fileList);
             }       
          },   
         error: function (request, textStatus, errorThrown) {
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
		
};

Transcripts.AddFileListToView = function(fileList){
	//alert(fileList);
	 $('#fileList').empty();
	 var fileTable= " <table id = 'myfileList' width='98%'  border='1px' border-radius='5px' class = 'tc faw ft14' style = 'margin-top:15px; margin-left:9px;' >"
	 fileTable += "<tr style = 'background:#19a569; color:white;border:2px;line-height:40px;'><td >编号</td><td >文件名称</td><td >上传时间</td><td>文件大小</td><td >文件操作</td></tr>";
	 if(fileList.length != 0){
		 var fileMessage = fileList.split("+");
		 for(var i = 0; i < fileMessage.length;i++){
			 var fileItem = fileMessage[i].split("|");
			 var fileId = fileItem[0]
			 var fileName = fileItem[1];
			 var fileSize = parseInt(fileItem[2]);
			 var fileSizeUnit  = "字节";
			 if(fileSize > 1024){
				 fileSize = parseInt((parseInt(fileItem[2])*1.0/1024)*10)/10;
				 fileSizeUnit = "KB";
			 }
			 if(fileSize > 1024){
				 fileSize = parseInt((parseInt(fileItem[2])*1.0/(1024*1024))*10)/10;
				 fileSizeUnit = "MB";
			 }
			 var fileTime = fileItem[3];
			 if(i % 2 == 0){
				 fileTable += "<tr style = 'line-height:40px;background:#EFEFEF'id = '" +
				 fileId+ "'><td><a href='javascript:void(0);'>" +fileId+"</a></td><td><a href='javascript:void(0);'>" +fileName+
				 "</a></td><td><a href='javascript:void(0);'>" + fileTime+"</a></td><td><a href='javascript:void(0);'>"+fileSize +fileSizeUnit+"</a></td><td><span  id='"+
				 fileId+"' name = '"+ fileName +"' class = 'deletebutton'>删除</span></td></tr>";	
			 }else{
				 fileTable += "<tr style = 'line-height:40px;'id = '" +
				 fileId+ "'><td><a href='javascript:void(0);'>" +fileId+"</a></td><td><a href='javascript:void(0);'>" +fileName+
				 "</a></td><td><a href='javascript:void(0);'>" + fileTime+"</a></td><td><a href='javascript:void(0);'>"+fileSize +fileSizeUnit+"</a></td><td><span  id='"+
				 fileId+"' name = '"+ fileName +"' class = 'deletebutton'>删除</span></td></tr>";	
			 }

		 }
	 }
	 fileTable+="</table>";
	$('#fileList').html(fileTable);
	Transcripts.deleteFileOperate();	
}


Transcripts.deleteFileOperate = function(){
	$(".deletebutton").click(function(){	
		$("#alter_box_mask").show();
		var id = parseInt($(this).attr("id"));	
		var name = $(this).attr("name");
		var parm ={
				fileid:id,
				fileName:name
		};
		 $.ajax("./deleteFile", {
	         type: "POST",
	         dataType: "json",
	         data: parm||{},  
	         success: function (resultInfo) {
	        	 $("#alter_box_mask").hide();
	        	 if(resultInfo.result == "success"){
	        		// Transcripts.resrtForm();
	        		 window.location.href = basePath + "/uploadFile.jsp";
	        		//Transcripts.addFileList();     
	        	 }
	        	 else if(resultInfo.result != "success"){	        		
	            	 $("#alert_box").show();
	            	 $("#alert_errorMsg").html("文件删除失败！").css("color", "red");
	        	 }
	          },	      
	         error: function (request, textStatus, errorThrown) {
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
	});
}

Transcripts.resrtForm = function(){
	$("#formWrap").empty();
	var formHtml = "<form id = 'uploadFileForm' action='./uploadfile' method='post' enctype='multipart/form-data' >" + 		 				 		
	                "<input type='text' name='textfield' id='t_file' class='upLoadText faw' /> " + 	 				 		
					"<span  id='searchFile' name='searchFile' class = 'searchButton faw'>浏览...</span>" + 
					"<input id='fileTyle' type='file' name='file' class='file' size='31' onchange='document.getElementById('textfield').value=this.value'/>"+ 				 		
		 			"<input  type='submit' id='btnupload' name='btnupload' style = 'margin-left:4px' value='开始上传' class = 'upbutton faw'>" + 	
		 			"<span  id='btnCancelupload' name='btnCancelupload' style = 'margin-left:4px' class = 'upbutton faw'>取消上传</span>" + 
		 			" </form>";
	 $("#formWrap").append(formHtml);	
	 Transcripts.bindBaseEven();
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


