<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>微博-注册账号</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
  

    <link type="image/x-icon" href="images/favicon.ico" rel="shortcut icon"/>
    <link href="css/regist.css" rel="stylesheet" type="text/css">
    <link href="css/tk_common.css" rel="stylesheet" type="text/css">
    
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/regist.js" charset="GB2312" ></script>
    <script type="text/javascript" src="js/birthday.js" charset="GB2312"></script>
     <script type="text/javascript" src="js/Area.js" charset="GB2312"></script>
      <script type="text/javascript" src="js/AreaData.js" charset="GB2312"></script>
</head>
<body style="background: #fff;">
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
            <h3>注册账号</h3>
        </div>
      
        <div class="findpwd_box first" style="display: block;">
            <div class="find_pwd_cont">
                 <div class="pr fixed">
                    <input type="text" placeholder="请输入账户名" class="text1 fl" id="register_bindUserLoginName"/>
                    <div class="fl " id="loginNameIconTip"></div>
                    <div id="loginNameTextTip"><em></em><span></span><i></i></div>
                </div>
                
                <div class="pr fixed">
                    <input type="text" placeholder="请输入昵称" class="text1 fl" id="register_bindUserName"/>
                    <div class="fl" id="userNameIconTip"></div>
                    <div id="userNameTextTip"><em></em><span></span><i></i></div>
                </div>
                
   
                <div class="pr fixed">
                    <input type="password" placeholder="请输入账户密码" class="text1 fl" id="register_bindUserPassword"/>
                    <div class="fl" id="userPwdIconTip"></div>
                    <div id="userPwdTextTip"><em></em><span></span><i></i></div>
                </div>
                
               <div class="pr fixed">
                    <input type="password" placeholder="请再次输入密码" class="text1 fl" id="register_bindUserPasswordVerify"/>
                    <div class="fl " id="userPwdVerifyIconTip"></div>
                    <div id="userPwdVerifyTextTip"><em></em><span></span><i></i></div>
                </div>
                <div class="pr fixed">
                    <input type="text" placeholder="请输入常用邮箱" class="text1 fl" id="register_email"/>
                    <div class="fl" id="userEmailIconTip"></div>
                    <div id="userEmailTextTip"><em></em><span></span><i></i></div>
                </div>
                <div class="pr fixed mt20 faw ft14" >
               		<label > 生日：</label>  
					<select class="sel_year sel_all faw tc" rel="2000"> </select> 年 
					<select class="sel_month sel_all faw tc" rel="2"> </select> 月 
					<select class="sel_day sel_all faw ft14 tc" rel="14"> </select> 日 
                </div>
                
                <div class="pr fixed mt20 faw ft14" >
               		<label > 性别：</label>  
					<select class="sel_sex sel_all faw tc" rel='男'> 
					<option class='faw ft14' value='男' >男</option>
					<option class='faw ft14' value='女' >女</option>
					</select> 
                </div>
             	<div class="pr fixed mt20 faw ft14" >
               		<label >所在地：</label>  
               		<select id="seachprov" class = "faw tc sel_loca" name="seachprov" onchange="changeComplexProvince(this.value, sub_array, 'seachcity', 'seachdistrict');"></select>
					<select id="seachcity" class = "faw tc sel_loca" name="homecity" onchange="changeCity(this.value,'seachdistrict','seachdistrict');"></select>
					<select id="seachdistrict"  class = "faw tc sel_loca" name="seachdistrict"></select>
					</select> 
                </div>
                <div class="pr fixed ">
                    <input type="text" placeholder="请输入验证码" class="text2 fl authcode"/>
                    <a href="javascript:void(0);" class="fl mt20 ml5 yzma getauthcode" title="看不清楚？点击换一张"><img src="./getImageCode" id="img_auth_code"/></a>
                    <div class="fl" id="imgAuthIconTip"></div>
                    <div id="imgAuthTextTip"><em></em><span></span><i></i></div>
                </div>
                
    
                
                <div class="clear"></div>
                <p class="notice"></p>
                <p><a href="javascript:void(0);" class="find_pwd_btn mt20">注册</a></p>
                
            </div>
            <div class="find_pwd_bottom">
                <p>温馨提示：</p>
                <p class="content">账户名和账户密码是您登录系统的凭证，真实姓名是您重置密码的凭证，请谨记！ </p>
            </div>
        </div>

        <div class="findpwd_box" style="display: none;">
            <div class="find_pwd_cont">
                <div class="find_pwd_cont" style="text-align: center;">
                    <p style="font-size: 32px;padding: 40% 0px 10px;font-weight: 400;color: #2db180;">注册成功</p>
                    <p style="font-size:14px;;color:#2db180;" id="turnTip">3s后跳转到首页</p>
                </div>
            </div>
        </div>
        
    </div>
</div>
<!--尾部-->
<div class="tk_login_kfoot faw">
Copyright &copy;  School of Software in RUC. All rights reserved
</div>
</body>
</html>