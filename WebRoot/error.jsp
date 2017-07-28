<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>智学网-页面出错</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
  

    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/tk_common.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/errorPage.js" charset="gb2312"></script>

</head>
<body style="background: #fff;">
	<script type="text/javascript">
	    var basePath = 'http://localhost:8080/AIWEB16';
	</script>
	<!--头部-->
	<div class="tk_login_kheadwarp">
	    <div class="tk_login_khead">
	        <a href="javascript:void(0);" class="fl" id="index_logo">
	            <img src="images/klogin_logo.jpg" width="297" height="60"/>
	        </a>
	    </div>
	</div>
	    <div class="find_pwd">
	        <div class="find_pwd_title">
	            <h3>页面出错</h3>
	        </div>
	     
	        <div class="findpwd_box" style="display:block;">
	            <div class="find_pwd_cont">
	                <div class="find_pwd_cont" style="text-align: center;">
	                    <p style="font-size: 32px;padding: 40% 0px 10px;font-weight: 400;color:#2db180;">页面出错！</p>
	                    <p style="font-size:14px;;color:RED;" id="turnTip">3s后跳转到首页</p>    
	                </div>                
	            </div>
	        </div>       
	    </div>
	<!--尾部-->
	<div class="tk_login_kfoot">
	    Copyright© 2016-2019 School of Software in HFUT. All rights reserved
	</div>
</body>
</html>