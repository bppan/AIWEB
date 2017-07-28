/**
 * Created by xwliu on 14-11-13.
 * �һ�����ҳ��
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
//�һ�����
FindPwd = function(){
    this.findpwdBox1 =  $($(".findpwd_box")[0]);//ע���
    this.findpwdBox2 = $($(".findpwd_box")[1]);//ע��ɹ���
    this.findpwdIndex = $("#index_logo");//logo

	//�û���
	this.registerLoginName =  $("#register_bindUserLoginName");
	this.loginNameIconTip = $("#loginNameIconTip");
    this.loginNameTextTip = $("#loginNameTextTip");
	//��ʵ����
	this.registerUserName =  $("#register_bindUserName");
	this.userNameIconTip = $("#userNameIconTip");
	//FindPwd.inputIconDisplay(this.userNameIconTip,1);
	
    this.userNameTextTip = $("#userNameTextTip");
	
	//�û�����
	this.registerUserPwd =  $("#register_bindUserPassword");
	this.userPwdIconTip = $("#userPwdIconTip");
    this.userPwdTextTip = $("#userPwdTextTip");
	
	//ȷ������
    this.registerUserPwdVerify =  $("#register_bindUserPasswordVerify");
	this.userPwdVerifyIconTip = $("#userPwdVerifyIconTip");	
    this.userPwdVerifyTextTip = $("#userPwdVerifyTextTip");
	
	//��֤��
	this.findpwdImgAuthCode = $($(".authcode")[0]);
    this.findpwdImgAuthCodeIconTip = $("#imgAuthIconTip");
    this.findpwdImgAuthCodeTextTip = $("#imgAuthTextTip");
    this.findpwdAuthCodeImg = $("#img_auth_code");
	this.findpwdBtnGetImgAuthCode = $($(".getauthcode")[0]);
	
	//��ʾ
     this.findpwdTip1 = $($(".notice")[0]);
	 //ע�ᰴť
	 this.findpwdBtnNext1 = $($(".find_pwd_btn")[0]);
}

FindPwd.prototype.inputFocusEvent = function(){

    var _this = this;	
	//�û���
	this.registerLoginName.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.loginNameIconTip,0);
        FindPwd.inputTextTipHide(_this.loginNameTextTip);
    });
    this.registerLoginName.blur(function(){
        var loginName = _this.registerLoginName.val();
        var regex = /^[A-Za-z]*[a-z0-9_]*$/;//�ж��ַ���ֻ��Ϊ���֡���ĸ���»��߻�����
        if(!loginName){
            _this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*����д�û�����");
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
					var errorInfo = "����������";
					try {
						result = eval('(' + request.responseText + ')');
						if (result) {
							errorInfo = "����������Ժ���д��";
							//errorInfo = result.message;
						} else {
							errorInfo = "����������Ժ���д��";
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
                _this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*�û�����ʽ����ȷ��");
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
        	_this.loginNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*�û�����ʽ����ȷ��");
        }
    });
	
	//��ʵ����
    this.registerUserName.focus(function(){

	    _this.findpwdTip1.empty();
	    FindPwd.inputIconDisplay(_this.userNameIconTip,0);
	    FindPwd.inputTextTipHide(_this.userNameTextTip);
	});
	this.registerUserName.blur(function(){
	    var userName = _this.registerUserName.val();
	    var loginName = _this.registerLoginName.val();
	    var regex = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;//�ж����ġ�Ӣ�ġ�����
	    if(!userName){
	        _this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*����д��ʵ������");
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
									errorInfo = "����������Ժ���д��";
									//errorInfo = result.message;
								} else {
									errorInfo = "����������Ժ���д��";
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
	            _this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*��ʵ������ʽ����ȷ��");
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
	    	_this.userNameTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*��ʵ������ʽ����ȷ��");
	    }
	});

	//��֤��
    this.findpwdImgAuthCode.focus(function(){
        _this.findpwdTip1.empty();
//        FindPwd.inputIconDisplay(_this.findpwdImgAuthCodeIconTip,0);
        FindPwd.inputTextTipHide(_this.findpwdImgAuthCodeTextTip);
    });
    this.findpwdImgAuthCode.blur(function(){
       var authCode = _this.findpwdImgAuthCode.val();
        if(!authCode){
            _this.findpwdImgAuthCodeTextTip.addClass("pwd_rtip2 pwd_rtip").find("span").text("*��������֤�룡");
        }
    });
    this.findpwdImgAuthCode.keydown(function(){
        FindPwd.inputTextTipHide(_this.findpwdImgAuthCodeTextTip);
    });
	
	//�û�����
    this.registerUserPwd.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.userPwdIconTip,0);
        FindPwd.inputTextTipHide(_this.userPwdTextTip);
    });
    this.registerUserPwd.blur(function(){
        var pwd = _this.registerUserPwd.val();
        var password = /^([A-Za-z0-9_]){6,16}$/;
        if(!pwd){
            _this.userPwdTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*���������룡");
        }else{
            if(!password.test(pwd)){
                _this.userPwdTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*����ֻ�ܰ���6-16λ��ĸ�����ֺ��»��ߣ�");
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
	//�ٴ���������
    this.registerUserPwdVerify.focus(function(){
        _this.findpwdTip1.empty();
        FindPwd.inputIconDisplay(_this.userPwdVerifyIconTip,0);
        FindPwd.inputTextTipHide(_this.userPwdVerifyTextTip);
    });
    this.registerUserPwdVerify.blur(function(){
        var pwd = _this.registerUserPwd.val();
        var pwdAgain = _this.registerUserPwdVerify.val();
        if (!pwdAgain) {
            _this.userPwdVerifyTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*���ٴ��������룡");
        } else {
            if (pwdAgain != pwd) {
                _this.userPwdVerifyTextTip.addClass("pwd_rtip1 pwd_rtip").find("span").text("*�����������벻һ�£�");
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
	
	//����Enter�����¼�
    document.onkeydown = function(event){        
        if(event.keyCode == 13){
			_this._isBindAccount();
            return false;
        }
    }
	
}

//������ⷵ�ص�¼ҳ
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
 * ��ʾ������������ͼ��
 * @param label iconԪ��
 * @param flag 0����ʾ��1��ʾ��
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
 * �������������������ʾ
 * @param label ������ʾ��ǩ
 */
FindPwd.inputTextTipHide = function(label){
    if(label.hasClass("pwd_rtip1")){
        label.removeClass("pwd_rtip1 pwd_rtip").find("span").empty();
    }else if(label.hasClass("pwd_rtip2")){
        label.removeClass("pwd_rtip2 pwd_rtip").find("span").empty();
    }
}
/**
 * ��ȡͼƬ��֤��
 */
FindPwd.prototype._getImgAuthCode = function(){
	$("#img_auth_code").attr("src", "./getImageCode?token=" + Math.random());
}
/**
 * ��֤�ֻ������Ƿ��Ѱ�ѧ���˺�
 */
FindPwd.prototype._isBindAccount = function(){

    var _this = this;
	//��¼��
	var isValide = false;
	var contentLoginName = $.trim(_this.registerLoginName.val());
	if(_this.loginNameTextTip.hasClass("pwd_rtip1") || !contentLoginName)
	{
	   _this.findpwdTip1.text("*�����û�����");
	   return;		
	}
	else
	{
		isValide = true;
	}
	//�û���
	var contentUserName = $.trim(_this.registerUserName.val());
	if(_this.userNameTextTip.hasClass("pwd_rtip1") || !contentUserName)
	{	  
	   _this.findpwdTip1.text("*������ʵ������");
	   return;
	}
	else
	{
		isValide = true;
	}
	//����
	var contentPwd = $.trim(_this.registerUserPwd.val());
	if(_this.userPwdTextTip.hasClass("pwd_rtip1") || !contentPwd)
	{  
	   _this.findpwdTip1.text("*�������룡");
	   return;
		
	}
	else
	{
		isValide = true;
	}	
	//ȷ������
	var contentPwdVerify = $.trim(_this.registerUserPwdVerify.val());
	if(_this.userPwdVerifyTextTip.hasClass("pwd_rtip1")|| !contentPwdVerify)
	{
	  
	   _this.findpwdTip1.text("*����ȷ�����룡");
	   return;		
	}
	else
	{
		isValide = true;
	}

	//��֤��	
    var authCode = $.trim(_this.findpwdImgAuthCode.val());
	if(!authCode){
        _this.findpwdImgAuthCodeTextTip.addClass("pwd_rtip2 pwd_rtip").find("span").text("*��������֤�룡");
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
			
			  //��ת����ҳ
                _this.findpwdTip1.text("�����޸ĳɹ�");
                _this.findpwdBox1.hide().removeClass("first");
                _this.findpwdBox2.show();
                var count = 3;
                var index = setInterval(function(){
                        count--;
                        if(count == 0){
                            clearInterval(index);
                            window.location.href = "./login.jsp";
                        }else{
                            $("#turnTip").text(count+"s����ת����ҳ");
                        }
                    },
                    1000);
					
            }else{
                _this.findpwdTip1.text("*" + data.message + "��");
                _this.findpwdImgAuthCode.val("");
                FindPwd.inputIconDisplay(_this.findpwdImgAuthCodeIconTip,0);
                _this._getImgAuthCode();
            }
        },
        error:function(){
           _this.findpwdTip1.text("*�޸�ʧ�ܣ�");
           _this._getImgAuthCode();
        }
    });
}
//�����¼�
FindPwd.prototype.returnIndexEvent = function(){
    this.findpwdIndex.click(function(){
        window.location.href = "./login.jsp";
    });
}
//ע���ȡ��֤���¼�
FindPwd.prototype.getAuthCodeEvent = function(){
    var _this = this;
    this.findpwdBtnGetImgAuthCode.click(function(){
        _this._getImgAuthCode();
    });     
}

/**
 * ��װ�����¼���
 */
FindPwd.prototype.bindEvent = function(){
    this.inputFocusEvent();//�����¼�
    this.returnIndexEvent();//�����¼�
    FindPwd.prototype._getImgAuthCode();
	this.getAuthCodeEvent();
    this.registerEvent();//ע���¼�
}