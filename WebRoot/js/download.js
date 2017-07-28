
var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
$(function(){
    Transcripts.addFileList();
    
});

Transcripts.addFileList = function(){
	var parm ={
			isupload:0
	};
	 $.ajax("./getfileList", {
         type: "POST",
         dataType: "json",
         data:parm||{},  
         success: function (resultInfo) {        	
             if (resultInfo.result == "fail"){
            	 $('#fileList').empty();
            	 alert("获取文件失败，请稍后重试！");
             }else if (resultInfo.result == "success") {
            	 Transcripts.AddFileListToView(resultInfo.fileList);
             }else if(resultInfo.result == "empty"){
            	 Transcripts.AddFileListToView(resultInfo.fileList);
             }
          },   
         error: function (request, textStatus, errorThrown) {
         	alert("服务器出错！");
         }
     });
		
};

Transcripts.AddFileListToView = function(fileList){
	//alert(fileList);
	 $('#fileList').empty();
	 var fileTable= " <table id = 'myfileList' width='98%'  border='1px' border-radius='5px' class = 'tc faw ft14' style = 'margin-top:15px; margin-left:9px;' >"
	 fileTable += "<tr style = 'background:#19a569; color:white;border:2px;line-height:40px;'><td >编号</td><td >文件名称</td><td >上传时间</td><td>文件大小</td><td >上传教师</td><td>下载次数</td><td >文件操作</td></tr>";
	 if(fileList.length != 0){
		 var fileMessage = fileList.split("+");
		 for(var i = 0; i < fileMessage.length; i++){
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
			 var fileTeacher = fileItem[4];
			 var fileDownTime = fileItem[5];
			 if(i % 2 == 0){
				 fileTable += "<tr style = 'line-height:40px;background:#EFEFEF' id = '" +
				 	fileId+ "'><td><a href='javascript:void(0);'>" + fileId+
				 	"</a></td><td><a href='javascript:void(0);'>" +fileName +" </a></td><td><a href='javascript:void(0);'>" +
				 	fileTime+"</a></td><td><a href='javascript:void(0);'>"+fileSize +fileSizeUnit+"</a></td><td><a href='javascript:void(0);'>" +fileTeacher +
				 	"</a></td><td><a href='javascript:void(0);'>" +fileDownTime+"次</a></td><td><a class = 'downbutton' href='./downFile?fileid=" + fileId + 
				 	"'>下载</a></td></tr>";	
			 }else{
				 fileTable += "<tr style = 'line-height:40px;' id = '" +
				 	fileId+ "'><td><a href='javascript:void(0);'>" + fileId+
				 	"</a></td><td><a href='javascript:void(0);'>" +fileName +" </a></td><td><a href='javascript:void(0);'>" +
				 	fileTime+"</a></td><td><a href='javascript:void(0);'>"+fileSize +fileSizeUnit+"</a></td><td><a href='javascript:void(0);'>" +fileTeacher +
				 	"</a></td><td><a href='javascript:void(0);'>" +fileDownTime+"次</a></td><td><a class = 'downbutton' href='./downFile?fileid=" + fileId + 
				 	"'>下载</a></td></tr>";	
			 }

		 }
	 }
	 fileTable+="</table>";
	$('#fileList').html(fileTable);
	
}


