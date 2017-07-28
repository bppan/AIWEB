<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>文件下载</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <link href="css/upDownLoadFile.css" rel="stylesheet" type="text/css">
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="js/download.js" charset="GB2312" ></script>
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>文件下载</h3>
        </div>           
 		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControl faw ">
	 				<div  id = "fileList" class = "downfileList">
						<div class = "loading" style = "margin: 20% auto;">
							<img src = "images/loading.gif" width="30">
						</div>		
	 				</div>
				</div>				
		</div>				
	</div>		
 </div>
<!--尾部-->
<div class="tk_login_kfoot faw">
		Copyright© 2016-2019 School of Software in HFUT. All rights reserved
</div>
</body>
</html>