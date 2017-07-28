<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>文件上传</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <link href="css/upDownLoadFile.css" rel="stylesheet" type="text/css">
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/tk_index.css" rel="stylesheet" type="text/css">  
    <link href="css/teacherMessage.css" rel="stylesheet" type="text/css"> 
    <link href="css/manager.css" rel="stylesheet" type="text/css">    
    
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.uploadify.min.js"></script>
	<script type="text/javascript" src="js/upload.js" charset="GB2312" ></script>
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>上传文件</h3>
        </div>           
 		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControl faw ">
	 				<div  class = "uploadControl faw">
	 				   <span id = "formWrap" style = "left:120px; top:10px;position:absolute">  
	 				    <form id = "uploadFileForm" action="./uploadfile" method="post" enctype="multipart/form-data" >  
		 				 		<input type='text' name='textfield' id="t_file" class='upLoadText faw' /> 		 				 		
								<span  id="searchFile" name="searchFile" class = "searchButton faw">浏览...</span>
								<input id="fileTyle" type="file" name="file" class="file" size="31" onchange="document.getElementById('textfield').value=this.value"/> 	 				 		
		 				 		<input  type="submit" id="btnupload" name="btnupload" value="开始上传" class = "upbutton faw">	
		 				 		<span  id="btnCancelupload" name="btnCancelupload" class = "upbutton faw">取消上传</span>	
		 				 </form>  	
	 				   </span> 				
	 				</div>
	 				
	 				<div  id = "fileList" class = "fileList">
	 			        <div class = "loading" style = "margin: 20% auto;">
							<img src = "images/loading.gif" width="30">
						</div>	
	 				</div>
				</div>				
		</div>				
	</div>		
 </div>
 
<div class="tk_Mask_kboxwrap " id="alter_box_mask" style = "display:none" >
	<div class = "loading" style = "margin:15% auto;">					           
		<img src = "images/loading.gif" width="35">
		<div id = "maskcontent" class ="faw ft14" style = "width:80px; line-height:30px;margin:8px 0  0 -10px; color:white">正在处理...</div>		
	</div>							
</div>
	 			
  <!--删除弹框-->
<div id="alert_box" style = "display:none" >
 <div class="tk_AddTeacher_kboxwrap " id="delete_box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
             <span id = "deleteTitle" style = "height: 34px;line-height:34px;margin-left:5px;" class = "col7 faw fl ft14">提示</span>
            <span  class="closed" id="alert_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:5px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point2 faw ft14" style="height: 15px;" id="alert_errorMsg"></div>
            <div class="clear"></div>
            <div  style="height:25px;" ></div>
            <button class="faw tk_Teacher_kboxbtn " id="alert_button">我知道了</button>
         
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div> 
<!--尾部-->
<div class="tk_login_kfoot faw">
		Copyright© 2016-2019 School of Software in HFUT. All rights reserved
</div>
</body>
</html>