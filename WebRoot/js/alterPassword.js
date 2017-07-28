/**
 * Created by xwliu on 14-11-13.
 * 找回密码页面
 */
var FindPwd = FindPwd || {};

$(function(){
    var findPwd = new FindPwd();
    findPwd.bindEvent();
    adaptScreen();
})

function adaptScreen(){
    var imgPlayHeight = 660;
    var winHeight = window.screen.height;
    if( winHeight >= 1280 ){
        imgPlayHeight = 950;
    }else if( winHeight > 1024 &&  winHeight <= 1080 ){
        imgPlayHeight = 850;
    }else if( winHeight > 900 &&  winHeight <= 1024 ){
        imgPlayHeight = 780;
    }else if( winHeight > 768 && winHeight <= 900 ){
        imgPlayHeight = 670;
    }else if( winHeight > 600 && winHeight <= 768 ){
        imgPlayHeight = 560;
    }else{
        imgPlayHeight = 460;
    }
    var headerHeight = $(".tk_login_kheadwarp").outerHeight(true);
    var footerHeight = $(".tk_login_kfoot").outerHeight(true);
    $(".find_pwd").css({"height":imgPlayHeight +"px"});
    $("body").css({"height":imgPlayHeight + headerHeight + footerHeight +"px"});
}
//找回密码
FindPwd = function(){
    this.findpwdBox1 =  $($(".findpwd_box")[0]);//注册框
    this.findpwdBox2 = $($(".findpwd_box")[1]);//注册成功框
    this.findpwdIndex = $("#index_logo");//logo

	//用户名
	this.registerLoginName =  $("#register_bindUserLoginName");
	this.loginNameIconTip = $("#loginNameIconTip");
    this.loginNameTextTip = $("#loginNameTextTip");
	//真实姓名
	this.registerUserName =  $("#register_bindUserName");
	this.userNameIconTip = $("#userNameIconTip");
	//FindPwd.inputIconDisplay(this.userNameIconTip,1);
	
    this.userNameTextTip = $("#userNameTextTip");
	
	//用户密码
	this.registerUserPwd =  $("#register_bindUserPassword");
	this.userPwdIconTip = $("#userPwdIconTip");
    this.userPwdTextTip = $("#userPwdTextTip");
	
	//确认密码
    this.registerUserPwdVerify =  $("#register_bindUserPasswordVerify");
	this.userPwdVerifyIconTip = $("#userPwdVerifyIconTip");	
    this.userPwdVerifyTextTip = $("#userPwdVerifyTextTip");
	
	//验证码
	this.findpwdImgAuthCode = $($(".authcode")[0]);
    this.findpwdImgAuthCodeIconTip = $("#imgAuthIconTip");
    this.findpwdImgAuthCodeTextTip = $("#imgAuthTextTip");
    this.findpwdAuthCodeImg = $("#img_auth_code");
	this.findpwdBtnGetImgAuthCode = $($(".getauthcode")[0]);
	
	//提示
     this.findpwdTip1 = $($(".notice")[0]);
	 //注册按钮
	 this.findpwdBtnNext1 = $($(".find_pwd_btn")[0]);
}

FindPwd.prototype.inputFocusEvent = function(){

    var _this = this;	
	//用户名
	this.registerLoginName.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.loginNameIconTip,0);
        FindPwd.inputTextTipHide(_this.loginNameTextTip);
    });
    this.registerLoginName.blur(function(){
        var loginName = _this.registerLoginName.val();
        var regex = /^[A-Za-z]*[a-z0-9_]*$/;//判断字符串只能为数字、字母、下划线或中文
        if(!loginName){
            _this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*请填写用户名！");
        }else
		{
	
            if(regex.test(loginName))
			{
				var params = {
				userLoginName: loginName
				};
				$.ajax("./validateAlterLoginName", {
                type: "POST",
				dataType: "json",
				data: params || {},
				success: function (resultInfo) {
					if (resultInfo.result == "success") {
						FindPwd.inputIconDisplay(_this.loginNameIconTip,1);
			
					} else if (resultInfo.result != "success") {
						_this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text(resultInfo.message);
						return;
					}
				},
				error: function (request, textStatus, errorThrown) {
					var errorInfo = "服务器出错！";
					try {
						result = eval('(' + request.responseText + ')');
						if (result) {
							errorInfo = "请求出错，请稍后填写！";
							//errorInfo = result.message;
						} else {
							errorInfo = "请求出错，请稍后填写！";
						}
						_this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*" + errorInfo);
					} catch (e) {
						_this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*" + errorInfo);
					}
				}
				});  
            }
			else
			{
                _this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*用户名格式不正确！");
            }
        }
    });
    this.registerLoginName.keydown(function(){
        FindPwd.inputTextTipHide(_this.loginNameTextTip);
    });
    this.registerLoginName.keyup(function(){
        var loginName = _this.registerLoginName.val();
        var regex = /^[A-Za-z]*[a-z0-9_]*$/;
        if(!regex.test(loginName)){
        	_this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*用户名格式不正确！");
        }
    });
	
	//真实姓名
    this.registerUserName.focus(function(){

	    _this.findpwdTip1.empty();
	    FindPwd.inputIconDisplay(_this.userNameIconTip,0);
	    FindPwd.inputTextTipHide(_this.userNameTextTip);
	});
	this.registerUserName.blur(function(){
	    var userName = _this.registerUserName.val();
	    var loginName = _this.registerLoginName.val();
	    var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;//判断中文、英文、数字
	    if(!userName){
	        _this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*请填写真实姓名！");
	    }else
		{
	        if(regex.test(userName)){
				
				var params = {
						contentUserName: userName,
						contentLoginName:loginName
				};
						$.ajax("./validateUserName", {
		                type: "POST",
						dataType: "json",
						data: params || {},
						success: function (resultInfo) {
							if (resultInfo.result == "success") {
								FindPwd.inputIconDisplay(_this.userNameIconTip,1);
					
							} else if (resultInfo.result != "success") {
								var errorInfo = resultInfo.message;
								_this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text(errorInfo);
								return;
							}
						},
						error: function (request, textStatus, errorThrown) {
							var errorInfo = "";
							try {
								result = eval('(' + request.responseText + ')');
								if (result) {
									errorInfo = "请求出错，请稍后填写！";
									//errorInfo = result.message;
								} else {
									errorInfo = "请求出错，请稍后填写！";
								}
								_this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*" + errorInfo);
							} catch (e) {
								_this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*" + errorInfo);
							}
						}
				});  
	        }
			else
			{
	            _this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*真实姓名格式不正确！");
	        }	
	    }
	});
	
	this.registerUserName.keydown(function(){
	    FindPwd.inputTextTipHide(_this.userNameTextTip);
	});
	this.registerUserName.keyup(function(){
	    var userName = _this.registerUserName.val();
	    var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
	    if(!regex.test(userName)){
	    	_this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*真实姓名格式不正确！");
	    }
	});

	//验证码
    this.findpwdImgAuthCode.focus(function(){
        _this.findpwdTip1.empty();
//        FindPwd.inputIconDisplay(_this.findpwdImgAuthCodeIconTip,0);
        FindPwd.inputTextTipHide(_this.findpwdImgAuthCodeTextTip);
    });
    this.findpwdImgAuthCode.blur(function(){
       var authCode = _this.findpwdImgAuthCode.val();
        if(!authCode){
            _this.findpwdImgAuthCodeTextTip.addClass("pwd_rtip2 pwd_rtip").find("span").text("*请输入验证码！");
        }
    });
    this.findpwdImgAuthCode.keydown(function(){
        FindPwd.inputTextTipHide(_this.findpwdImgAuthCodeTextTip);
    });
	
	//用户密码
    this.registerUserPwd.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.userPwdIconTip,0);
        FindPwd.inputTextTipHide(_this.userPwdTextTip);
    });
    this.registerUserPwd.blur(function(){
        var pwd = _this.registerUserPwd.val();
        var password = /^([A-Za-z0-9_]){6,16}$/;
        if(!pwd){
            _this.userPwdTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*请输入密码！");
        }else{
            if(!password.test(pwd)){
                _this.userPwdTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*密码只能包含6-16位字母、数字和下划线！");
            }
            else
            {
            	FindPwd.inputIconDisplay(_this.userPwdIconTip,1);
            }
        }
    });
    this.registerUserPwd.keydown(function(){
        FindPwd.inputTextTipHide(_this.userPwdTextTip);
    });
	//再次输入密码
    this.registerUserPwdVerify.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.userPwdVerifyIconTip,0);
        FindPwd.inputTextTipHide(_this.userPwdVerifyTextTip);
    });
    this.registerUserPwdVerify.blur(function(){
        var pwd = _this.registerUserPwd.val();
        var pwdAgain = _this.registerUserPwdVerify.val();
        if (!pwdAgain) {
            _this.userPwdVerifyTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*请再次输入密码！");
        } else {
            if (pwdAgain != pwd) {
                _this.userPwdVerifyTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*两次输入密码不一致！");
            }
            else
            {
            	FindPwd.inputIconDisplay(_this.userPwdVerifyIconTip,1);
            }
        }
    });
    this.registerUserPwdVerify.keydown(function(){
        FindPwd.inputTextTipHide(_this.userPwdVerifyTextTip);
    });
	
	//捕获Enter按键事件
    document.onkeydown = function(event){        
        if(event.keyCode == 13){
			_this._isBindAccount();
            return false;
        }
    }
	
}

//点击标题返回登录页
FindPwd.prototype.returnIndexEvent = function(){
    this.findpwdIndex.click(function(){
    	  window.open("login.jsp");
    });
}

FindPwd.prototype.registerEvent = function(){
    var _this = this;
    this.findpwdBtnNext1.click(function(){
        _this._isBindAccount()});
}
/**
 * 显示隐藏输入框后面图标
 * @param label icon元素
 * @param flag 0不显示，1显示对
 */
FindPwd.inputIconDisplay = function (label,flag){
    switch(flag){
        case 0:
            if(label.hasClass("pwd_wrong"))
                label.removeClass("pwd_wrong");
            if(label.hasClass("pwd_right"))
                label.removeClass("pwd_right");
            break;
        case 1:
            if(label.hasClass("pwd_wrong"))
				label.removeClass("pwd_wrong");              
            if(!label.hasClass("pwd_right"))
				label.addClass("pwd_right");  	          	            
            break;
        default :
            break;
    }
}
/**
 * 隐藏输入框后面的文字提示
 * @param label 文字提示标签
 */
FindPwd.inputTextTipHide = function(label){
    if(label.hasClass("pwd_rtip1")){
        label.removeClass("pwd_rtip1 pwd_rtip").find("span").empty();
    }else if(label.hasClass("pwd_rtip2")){
        label.removeClass("pwd_rtip2 pwd_rtip").find("span").empty();
    }
}
/**
 * 获取图片验证码
 */
FindPwd.prototype._getImgAuthCode = function(){
	$("#img_auth_code").attr("src", "./getImageCode?token=" + Math.random());
}
/**
 * 验证手机号码是否已绑定学生账号
 */
FindPwd.prototype._isBindAccount = function(){

    var _this = this;
	//登录名
	var isValide = false;
	var contentLoginName = $.trim(_this.registerLoginName.val());
	if(_this.loginNameTextTip.hasClass("pwd_rtip1") || !contentLoginName)
	{
	   _this.findpwdTip1.text("*请检查用户名！");
	   return;		
	}
	else
	{
		isValide = true;
	}
	//用户名
	var contentUserName = $.trim(_this.registerUserName.val());
	if(_this.userNameTextTip.hasClass("pwd_rtip1") || !contentUserName)
	{	  
	   _this.findpwdTip1.text("*请检查真实姓名！");
	   return;
	}
	else
	{
		isValide = true;
	}
	//密码
	var contentPwd = $.trim(_this.registerUserPwd.val());
	if(_this.userPwdTextTip.hasClass("pwd_rtip1") || !contentPwd)
	{  
	   _this.findpwdTip1.text("*请检查密码！");
	   return;
		
	}
	else
	{
		isValide = true;
	}	
	//确认密码
	var contentPwdVerify = $.trim(_this.registerUserPwdVerify.val());
	if(_this.userPwdVerifyTextTip.hasClass("pwd_rtip1")|| !contentPwdVerify)
	{
	  
	   _this.findpwdTip1.text("*请检查确认密码！");
	   return;		
	}
	else
	{
		isValide = true;
	}

	//验证码	
    var authCode = $.trim(_this.findpwdImgAuthCode.val());
	if(!authCode){
        _this.findpwdImgAuthCodeTextTip.addClass("pwd_rtip2 pwd_rtip").find("span").text("*请输入验证码！");
        return false;
    }
	
    if(window.localStorage){
        window.localStorage.contentLoginName = contentLoginName;
		window.localStorage.contentUserName = contentUserName;
    }else{
        $.cookie("contentLoginName",contentLoginName);
		$.cookie("contentUserName",contentUserName);
	}
	
    var _option = {};
    _option.contentLoginName = contentLoginName;
	_option.contentUserName = contentUserName;
    _option.contentPwd = contentPwd;
    _option.code = authCode;
    $.ajax({
        url:"./alterUser",
        data:_option,
        type:"POST",
        dataType:"json",
        success:function(data){
            if(data.result == "success"){
			
			  //跳转到首页
                _this.findpwdTip1.text("密码修改成功");
                _this.findpwdBox1.hide().removeClass("first");
                _this.findpwdBox2.show();
                var count = 3;
                var index = setInterval(function(){
                        count--;
                        if(count == 0){
                            clearInterval(index);
                            window.location.href = "./login.jsp";
                        }else{
                            $("#turnTip").text(count+"s后跳转到首页");
                        }
                    },
                    1000);
					
            }else{
                _this.findpwdTip1.text("*" + data.message + "！");
                _this.findpwdImgAuthCode.val("");
                FindPwd.inputIconDisplay(_this.findpwdImgAuthCodeIconTip,0);
                _this._getImgAuthCode();
            }
        },
        error:function(){
           _this.findpwdTip1.text("*修改失败！");
           _this._getImgAuthCode();
        }
    });
}
//返回事件
FindPwd.prototype.returnIndexEvent = function(){
    this.findpwdIndex.click(function(){
        window.location.href = "./login.jsp";
    });
}
//注册获取验证码事件
FindPwd.prototype.getAuthCodeEvent = function(){
    var _this = this;
    this.findpwdBtnGetImgAuthCode.click(function(){
        _this._getImgAuthCode();
    });     
}

/**
 * 封装各种事件绑定
 */
FindPwd.prototype.bindEvent = function(){
    this.inputFocusEvent();//基本事件
    this.returnIndexEvent();//返回事件
    FindPwd.prototype._getImgAuthCode();
	this.getAuthCodeEvent();
    this.registerEvent();//注册事件
}