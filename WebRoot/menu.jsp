<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="Content-Language" content="zh-CN"/>
		<title>人工智能课程教学网</title>
		<link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
		
		<link href="css/navigate.css" rel="stylesheet"  type="text/css">
		<link href="css/find_password.css" rel="stylesheet" type="text/css">
		<link href="third-party/mathquill/mathquill.css" type="text/css" rel="stylesheet">
		
	    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/jquery.SuperSlide.2.1.1.js"></script>
		<script type="text/javascript" src="js/menu.js"  charset="gb2312"></script>
    	<script type="text/javascript" src="third-party/mathquill/mathquill.js" charset="GB2312" ></script>
	</head>
	<body>
	<div class="siteWidth">
		<div class="tk_login_kheadwarp">
			<div class="khead fl">
				<a href="javascript:void(0);" class="fl" id="index_logo">
					<img src="images/klogin_logo.jpg" width="297" height="60"/>
				</a>	
				<span id = "smallNavigate" class = "fr right faw pt20">
				    <input type="hidden" id="usertype"  value="${sessionScope.userTypes}"/>
				    <input type="hidden" id="userName"  value="${sessionScope.userName}"/>
				    <span id = "changeNav">
			    	<a id = "userLoginName" href="javascript:void(0);" style = "margin-right:2px;"><%=session.getAttribute("userTypes")%>：<%=session.getAttribute("userName")%></a>|					
					</span>
					<a id = "downloadfile" href="javascript:void(0);"  style = "margin-right:2px;">文件下载</a>|			
					<a id = "alterPassWord" href="javascript:void(0);" style = "margin-right:2px;">修改密码</a>|
					<a id = "quitSystem" href="javascript:void(0);">退出登录</a>
				</span>	
			</div>

		</div>
	</div>
		
		<div id="header">	
			<div class="navBar">			
			</div>	
		</div>

		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">		
			<div id = "contentWrap" class = "kcontent faw ft16">
				<div id = "contentTip" class = "faw ft16 col1">
			 	 	 首页:
				</div>
				<div id = "content" class = "lh26 ls1" style = "word-wrap: break-word; word-break: normal; ">
					<div class = "loading" style = "margin: 15% 48.5%">
						<img src = "images/loading.gif" width="35">
					</div>		
				</div>
				
			</div>
			<div id = "contentWrap" class = "kcontentAlgorithm faw">
				<div id = "contentAloTip" class = "faw ft16 col1">
			  	 	<p>算法：</p>
				</div>
				<div id = "contentAlo" class = "tc faw ft16">
					<div class = "loading" style = "margin: 0 auto;">
							<img src = "images/loading.gif" width="35">
					</div>		
				</div>
			</div>
		</div>
		
		<div class="siteWidth">	
		<!--foot-->
		<div class="tk_login_kfoot faw">Copyright© 2016-2019 School of Software in HFUT. All rights reserved</div>	
		</div>
	</body>
</html>