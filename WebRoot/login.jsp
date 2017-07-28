<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta content="text/html;charset=UTF-8" http-equiv="content-type">
    <title>人工智能课程教学网</title>
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
    
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/tk_common.css" rel="stylesheet" type="text/css">
    <link href="css/tk_index.css" rel="stylesheet" type="text/css">
    <link href="css/login.css" rel="stylesheet" type="text/css">
   
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/superslide.2.1.js"></script>
    <script type="text/javascript" src="js/login.js"></script>

</head>
<body style="background: none; overflow-y: hidden;">
<%session.invalidate();%>
<div class="tk_login_kheadwarp">
    <div class="tk_login_khead">
        <div class="fl headLogo-zhixue">
        </div>
        <span class="fr right ft16" id="sp_login">登 录</span>
    </div>
</div>

<div class="clear"></div>

<!--banner图-->
<div class="tk_login_kbanner" id="imgPlay">
    <div class="bd">
        <ul>
            <li class="klogin2">
                <a href="javascript:void(0);"></a>
            </li>
            <li class="klogin3">
                <a href="javascript:void(0);"></a>
            </li>
            <li class="klogin1">
                <a href="javascript:void(0);"></a>
            </li>
        </ul>
    </div>
    <div class="hd">
        <ul></ul>
    </div>
</div>

<!--foot-->
<div class="tk_login_kfoot faw">Copyright© 2016-2019 School of Software in HFUT. All rights reserved
</div>

<!--登录弹框-->
<div id="login_box" style="display: block">
    <div class="tk_login_kboxwrap" id="box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_login_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">        
            <div class="closed" id="login_close"></div>
            <div class="clear"></div>
            <div class="point faw" style="height: 19px" id="errorMsg"></div>
            <div class="bd">
                <i></i>
                <input placeholder="请输入用户名" id="txtUserName" name="txtUserName" type="text" style="outline: none;">
            </div>
            <div class="hd">
                <i></i>
                <input placeholder="请输入密码" id="txtPassword" name="txtPassword" type="password" style="outline: none;">
            </div>
            
            <!-- 验证码begin -->
            <div class="hd" style="display: none; position: relative;" id="panelImageCode">
                <i></i>
                <input placeholder="请输入验证码" id="txtImageCode" name="txtImageCode" type="text" style="outline: none; width: 164px;">
                <img id="imageCode" style="position: absolute; right: 0px; width: 80px; height: 38px;" alt="验证码">
            </div>
            <!-- 验证码end -->
            <div class="ft" style="display: block">
					<a href="javascript:void(0)" class="fl forget ft12" id="reg_parent">注册账号</a>
					<a href="javascript:void(0)" class="fr forget ft12" id="forget_password">忘记密码</a>
			</div>
            <div class="clear"></div>
            <div id="divName" style="display: none">
                <div class="ft14 tk_login_notice col3 faw">您的密码为初始密码，为防止他人恶意操作，需要姓名验证！</div>
                <div class="bd" style="margin-bottom: 15px;">
                    <input style="width: 280px; outline: none;" placeholder="请输入您注册的真实姓名" id="txtName" name="txtName"
                           type="text">
                </div>
            </div>
            <button class="tk_login_kboxbtn faw" id="signup_button">登录</button>
            <p id="stuTips" class="mt20 col3 ft12 tc faw">温馨提示：如果您没有修改密码，初始密码六个一</p>
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>
<!--/登录弹框-->

<!--找回密码弹框-->
<div id="findpsw_box" style="display: none">
    <div class="tk_login_kboxwrap" id="box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_login_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <div class="closed" id="findpsw_close"></div>
            <div class="clear"></div>
            <div style="margin-top: 20px; height: 50px; text-align: center; color: #2e2e2e">
                <p>请联系学校管理员重置密码，联系电话XXX-XXXXXX</p>
            </div>
            <button class="tk_login_kboxbtn faw" id="findpsw_button">确定</button>
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>
<!--/找回密码弹框-->

<!--注册账号弹框-->
<div id="register_box" style="display: none">
    <div class="tk_login_kboxwrap" id="box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_login_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <div class="closed" id="findpsw_close"></div>
            <div class="clear"></div>
            <div style="margin-top: 20px; height: 50px; text-align: center; color: #2e2e2e">
                <p>请联系学校管理员或客服重置密码，客服电话400-887-8557</p>
            </div>
            <button class="tk_login_kboxbtn faw" id="findpsw_button">确定</button>
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>
<!--/注册账号弹框-->

</body>
</html>