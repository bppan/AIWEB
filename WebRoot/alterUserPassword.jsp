<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>人工智能课程教学网-修改密码</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
  

   <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/tk_common.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/alterPassword.js" charset="gb2312"></script>
</body>
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
<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title">
            <h3>修改密码</h3>
        </div>
        
        
        <div class="findpwd_box first">
            <div class="find_pwd_cont">
                 <div class="pr fixed">
                    <input type="text" placeholder="请输入用户名" class="text1 fl faw" id="register_bindUserLoginName"/>
                    <div class="fl " id="loginNameIconTip"></div>
                    <div id="loginNameTextTip"><em></em><span></span><i></i></div>
                </div>
                
                <div class="pr fixed">
                    <input type="text" placeholder="请输入真实姓名" class="text1 fl faw" id="register_bindUserName"/>
                    <div class="fl" id="userNameIconTip"></div>
                    <div id="userNameTextTip"><em></em><span></span><i></i></div>
                </div>
                
                <div class="pr fixed">
                    <input type="password" placeholder="请输入新用户密码" class="text1 fl faw" id="register_bindUserPassword"/>
                    <div class="fl" id="userPwdIconTip"></div>
                    <div id="userPwdTextTip"><em></em><span></span><i></i></div>
                </div>
                
               <div class="pr fixed">
                    <input type="password" placeholder="请再次输入新密码" class="text1 fl faw" id="register_bindUserPasswordVerify"/>
                    <div class="fl " id="userPwdVerifyIconTip"></div>
                    <div id="userPwdVerifyTextTip"><em></em><span></span><i></i></div>
                </div>
                
                <div class="pr fixed">
                    <input type="text" placeholder="请输入验证码" class="text2 fl authcode faw"/>
                    <a href="javascript:void(0);" class="fl mt20 ml5 yzma getauthcode" title="看不清楚？点击换一张"><img id="img_auth_code" src="./getImageCode" /></a>
                   
                    <div class="fl" id="imgAuthIconTip"></div>
                    <div id="imgAuthTextTip"><em></em><span></span><i></i></div>
                </div>
                
                <div class="clear"></div>
                
                <p class="notice"></p>
                <p><a href="javascript:void(0);" class="find_pwd_btn mt20">确定</a></p>
                
            </div>
            <div class="find_pwd_bottom">
                <p>温馨提示：</p>
                <p class="content">用户名和用户密码是您登录系统的凭证，请谨记！ </p>
            </div>
        </div>

        <div class="findpwd_box" style="display: none;">
            <div class="find_pwd_cont">
                <div class="find_pwd_cont" style="text-align: center;">
                    <p style="font-size: 32px;padding: 40% 0px 10px;font-weight: 400;color: #2db180;">修改密码成功</p>
                    <p style="font-size:14px;;color:#2db180;" id="turnTip">3s后跳转到首页</p>
                </div>
            </div>
        </div>
        
    </div>
</div>
<!--尾部-->
<div class="tk_login_kfoot faw">
Copyright© 2016-2019 School of Software in HFUT. All rights reserved
</div>

</html>