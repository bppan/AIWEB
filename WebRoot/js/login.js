/**
 * Created with JetBrains WebStorm.
 * User: hlwang
 * Date: 14-3-10
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */

var Transcripts = Transcripts || {};
var loginFailTime = 0;
var errorMessage = decodeURI(Request.QueryString("errorMessage"));


Transcripts.bindData = function () {

	function RemeberLoginState()
	{
		var userName = $.cookie('loginUserName');
		if (userName) {
            $('#txtUserName').val(userName);
            $('#txtPassword').focus();
        } else {
            $('#txtUserName').focus();
        }

	}
    function bindBaseData() {
        $.ajax("./getLoginFailTime", {
            type: "POST",
            data: {},
            dataType: "json",
            success: function (data) {
                if (data.result = "success") {
                    loginFailTime = data.message;
                }
                getLoginFailTimeCB();
            },
            error: function (request, textStatus, errorThrown) {
                getLoginFailTimeCB();
            }
        });
    }

    function bindLogo() {
        //var thisUrl = window.location.href;
        var headLogo = $("#headLogo");
        headLogo.addClass("headLogo-zhixue");

    }

    function getLoginFailTimeCB() {
        //触发密码文本框，判断第一次登陆是否失败。
        if (loginFailTime > 0 && $("#panelImageCode").css("display") == "none") {
            //显示验证码
        	$.cookie('loginError',"userLogin");
            $("#panelImageCode").show();
            $("#imageCode").attr("src", "./login/forgetpwd/getImageCode?token=" + Math.random());
        }
        // 自动弹出登陆框
        var _popTimerIndex = setTimeout(function () {
            if ($("#login_box").is(":visible")) {
                return false;
            } else {
                $("#sp_login").trigger("click");
                return true;
            }
        }, 500);
    }

    function postOpenUrl(url, args) {
        var _form = $("<form></form>", {
            "id": "tempForm",
            "method": "post",
            "action": url,
            "style": "display:none"
        }).appendTo($("body"));
        for (var i in args) {
            _form.append($("<input>", {"type": "hidden", "name": i, "value": args[i]}));
        }
        _form.trigger("submit");
    }

    Transcripts.bindData.login = function(txtUserName, txtPassword, txtImageCode) {
        $('#signup_button').html("正在登录...").attr("class", "tk_login_kboxbtn faw").css("cursor", "default");
        var params = {
        	userLoginName:txtUserName,
        	userPassword: txtPassword,
            code: txtImageCode
        };
        var userId;
        $.ajax("./login", {
            type: "POST",
            dataType: "json",
            data: params || {},
            success: function (resultInfo) {
                if (resultInfo.result != "success") {
                    if (resultInfo.message == "needValidName") {
                        $("#txtName").val('');
                        $("#divName").show();
                        $("#stuTips").hide();
                        $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn").css("cursor", "pointer");
                        return;
                    } else {
                        //登录失败，增加验证码
                        loginFailTime = 1;
                        $("#panelImageCode").show();
                        $("#imageCode").attr("src", "./getImageCode?token=" + Math.random());
                        $("#errorMsg").html("*" + resultInfo.message).css("color", "red");
                        $.cookie('loginError',"userLogin");
                        $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                        return;
                    }
                } 
                else if (resultInfo.result == "success") {
                    userId = resultInfo.data;
                   // $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn").css("cursor", "pointer");
                    if(resultInfo.message == "manager"){
                    	 postOpenUrl("./manager.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "manager.jsp", "backUrl": "./login.jsp"});
                    } 
                    else if(resultInfo.message == "contentManager"){
                    	postOpenUrl("./contentManage.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "contentManage.jsp", "backUrl": "./login.jsp"});                 	
                    }
                    else{
                    	 postOpenUrl("./menu.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "menu.jsp", "backUrl": "./login.jsp"});
                    }                  
                }
            },
            error: function (request, textStatus, errorThrown) {
                var errorInfo = "";
                //登录失败，增加验证码
                loginFailTime = 1;
                $("#panelImageCode").show();
                $.cookie('loginError',"userLogin");
                $("#imageCode").attr("src", "./getImageCode?token=" + Math.random());
                try {
                    result = eval('(' + request.responseText + ')');
                    if (result) {
                        errorInfo = "系统请求出错，请稍后重试!";
                    } else {
                        errorInfo = "系统请求出错，请稍后重试！";
                    }
                    $("#errorMsg").html("*" + errorInfo).css("color", "red");
                    $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                } catch (e) {
                    $("#errorMsg").html("*系统请求出错，请稍后重试！").css("color", "red");
                    $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                }
            }
        });
    }

    Transcripts.bindData.nameLogin = function (txtUserName, txtPassword, txtName,txtImageCode) {
        $('#signup_button').html("正在登录...").attr("class", "tk_login_kboxbtn faw").css("cursor", "default");
        var params = {
        	userLoginName: txtUserName,
        	userPassword: txtPassword,
            userName: txtName,
            code:txtImageCode
        };
        var userId;

        $.ajax("./validateName", {
            type: "POST",
            dataType: "json",
            data: params || {},
            success: function (resultInfo) {
                if (resultInfo.result != "success") {
                    var errorInfo = "";
                    errorInfo = resultInfo.message;
                    $("#errorMsg").html("*" + errorInfo).css("color", "red");
                    $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                    return;
                } else if (resultInfo.result == "success") {
                	// $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn").css("cursor", "pointer");
                	userId = resultInfo.data;
                    if(resultInfo.message == "manager"){
                   	 postOpenUrl("./manager.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "manager.jsp", "backUrl": "./login.jsp"});
                   } 
                   else if(resultInfo.message == "contentManager"){
                   	postOpenUrl("./contentManage.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "contentManage.jsp", "backUrl": "./login.jsp"});                 	
                   }
                   else{
                   	 postOpenUrl("./menu.jsp", {"decPwd": "1", "userId": userId, "password": txtPassword, "nextpage": "menu.jsp", "backUrl": "./login.jsp"});
                   }   
                }
            },
            error: function (request, textStatus, errorThrown) {
                var errorInfo = "";
                try {
                    result = eval('(' + request.responseText + ')');
                    if (result) {
                        errorInfo = "系统请求出错，请稍后重试！";
                        //errorInfo = result.message;
                    } else {
                        errorInfo = "系统请求出错，请稍后重试！";
                    }
                    $("#errorMsg").html("*" + errorInfo).css("color", "red");
                    $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                } catch (e) {
                    $("#errorMsg").html("*系统请求出错，请稍后重试！").css("color", "red");
                    $('#signup_button').html("登录").attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                }
            }
        });
    }
    RemeberLoginState();
    bindBaseData();
    bindLogo();
};

Transcripts.bindBaseEvent = function () {
    $("#forget_password").click(function () {
        $("#login_box").hide();
        $("#findpsw_box").show();
       
      //  window.open("./login/findPwd");
    });
    $("#reg_parent").click(function () {
        window.open("register.jsp");
    });
    $("#box_mask").click(function () {
        //$("#login_box").hide();
    });
    $("#login_close").click(function () {
        $("#login_box").hide();
    });
    $("#findpsw_button").click(function () {
    	$("#findpsw_box").hide();
        $("#login_box").show();
    });
    $("#findpsw_close").on("click", function () {
        $("#findpsw_box").hide();
        $("#login_box").show();
    });
    //切换验证码
    $("#imageCode").click(function () {
        $("#imageCode").attr("src", "./getImageCode?token=" + Math.random());
    });
    $("#txtUserName").keyup(function () {
        var text = $.trim($(this).val());
        if (text.length > 30) {
            $(this).empty();
            $(this).val(text.substring(0, 30));
        }
    });
    $("#sp_login").click(function () {
        var userName = $.cookie('loginUserName');
        $("#login_box").show();
        $("#stuTips").show();
        $("#divName").hide();

        if (errorMessage != "null" && errorMessage != "") {
            $("#errorMsg").html("*" + errorMessage).css("color", "red");
            errorMessage = "";
        } else {
            $("#errorMsg").html("");
        }
        $('#txtName').val("");
        if (userName) {
            $('#txtUserName').val(userName);
            $('#txtPassword').val("").focus();
        } else {
            $('#txtUserName').val("").focus();
            $('#txtPassword').val("");
        }
    });
    $("#signup_button").click(function () {
        if ($('#signup_button').html() == "正在登录..." || $('#signup_button faw').hasClass("tk_login_kboxbtn_un")) {
            return;
        }
        var userName = $.trim($('#txtUserName').val());
        var userPassword = $('#txtPassword').val();
        var txtImageCode = $('#txtImageCode').val();
        if (!userName) {
            $("#errorMsg").html("*请填写用户名").css("color", "red");
            return;
        }
        if (!userPassword) {
            $("#errorMsg").html("*请填写密码").css("color", "red");
            return;
        }
        if (!txtImageCode && $.cookie('loginError') == "userLogin") {
            $("#errorMsg").html("*请填写验证码").css("color", "red");
            return;
        }
        $.cookie('loginUserName', userName, { expires: 7, path: "/"});
        if ($("#divName").is(":hidden") === true) {
            Transcripts.bindData.login(userName, userPassword, txtImageCode);
        } else {
            var name = $.trim($('#txtName').val());
            if (!name) {
                $("#errorMsg").html("*请填写真实姓名").css("color", "red");
                return;
            }
            Transcripts.bindData.nameLogin(userName, userPassword, name,txtImageCode);
        }
    });
};

$(document).ready(function () {
	
    $.cookie('parentChild', null, { expires: -1, path: "/"});
    $.cookie('loginRole', null, { expires: -1, path: "/"});
    $.cookie('loginError',"NoUserLogin");
    Transcripts.bindData();
    Transcripts.bindBaseEvent();

    var login = new Tk_Login.Login();
    login.bindEvent();

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13 && $("#signup_button").hasClass("tk_login_kboxbtn")) { // enter 键
            $("#signup_button").trigger("click");
        }
    };
    $(".tk_login_kbanner").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "fold",
        autoPlay: true,
        autoPage: true,
        trigger: "click",
        startFun: function (i) {
            $(".down_apk").hide();
            if (i == 0) {
                $(".code_a").show();
            } else if (i == 1) {
                $(".code_c").show();
            } else if (i == 2) {
                $(".code_b").show();
            }
        }
    });
});
///////////////////////////////////////////////////////////
var Tk_Login = Tk_Login || {};
Tk_Login.Login = (function () {
    var tkLogin = function () {
        this.txtUserName = $("#txtUserName");
        this.txtPassword = $("#txtPassword");
        this.bntLogin = $("#signup_button");
        this.radioPassword = $("#radio_password");
        this.txtErrorMsg = $("#errorMsg");
        this.divName = $("#divName");
        this.txtName = $("#txtName");
        this.stuTips = $("#stuTips");
        this.txtImageCode = $("#txtImageCode");
    };
    tkLogin.prototype.maxlength = function (node, maxcount) {
        if (node.value.length > maxcount) {
            node.value = node.value.substr(0, maxcount);
        }
    };
    /**
     * Function Brief Describe
     *  获取字符串长度（一个中文做两个字符处理）
     * @name getStrLength
     * @access public
     * @return int
     * @author binxia3<binxia3@iflytek.com>
     * @date 2014-2-8 下午1:24:00
     *
     */
    tkLogin.prototype.getStrLength = function (str) {
        var length = 0;
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        for (var i = 0; i < str.length; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                length += 2;
            } else {
                length++;
            }
        }
        return length;
    };
    /**
     * 绑定事件
     */
    tkLogin.prototype.bindEvent = function () {
        var _this = this;
        _this.dealChromeYellow();
        _this.getScreenHeight();

        _this.txtUserName.on("focusout", function () {
            var userName = $(this).val();
            var regex = /^[A-Za-z]*[a-z0-9_]*$/;
            //判断是不是数字字母下划线
            var num = /^\d+$/;
            //判断纯数字
            if (userName) {
                var result1 = regex.test(userName);
                var result2 = num.test(userName);
                var length = _this.getStrLength(userName);
                if (result1 && !result2) {
                    if (length < 4 || length > 20) {
                        return;
                    } else {
                        _this.txtErrorMsg.html("");
                    }
                } else {
                    return;
                }
            }
        });
        _this.txtName.on("focusout", function () {
            var name = $(this).val();
            var regex = /^[A-Za-z]*[a-z0-9_]*$/;
            //判断是不是数字字母下划线
            var num = /^\d+$/;
            //判断纯数字
            if (name) {
                var result1 = regex.test(name);
                var result2 = num.test(name);
                var length = _this.getStrLength(name);
                if (result1 && !result2) {
                    if (length < 3 || length > 20) {
                        return;
                    } else {
                        _this.txtErrorMsg.html("");
                    }
                } else {
                    return;
                }
            }
        });
        _this.txtUserName.on("click", function () {
            $(this).focus();
        });
        _this.txtPassword.on("click", function () {
            $(this).focus();
        });
        /**
         * 用户名、密码文本框keyup事件
         *
         * 1、判断用户名、密码是否为空；不为空则可以点击登录按钮
         * 2、超出长度截取
         */
        _this.txtUserName.on("keyup", function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode != 13) {
                _this.divName.hide();
                _this.stuTips.show();
                _this.txtName.val('');
                _this.txtErrorMsg.html("");
            }
            if ($(this).val().length > 0 && _this.txtPassword.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
            } else {
            }
        });
        _this.txtPassword.on("keyup", function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode != 13) {
                _this.txtErrorMsg.html("");
            }
            if ($(this).val().length > 0 && _this.txtUserName.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
            } else {
            }
        });
        _this.txtName.on("keyup", function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode != 13) {
                _this.txtErrorMsg.html("");
            }
            if ($(this).val().length > 0 && _this.txtUserName.val().length > 0 && _this.txtPassword.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn").css("cursor", "pointer");
            } else {
            }
        });
        _this.txtImageCode.on("keyup", function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode != 13) {
                _this.txtErrorMsg.html("");
            }
            if ($(this).val().length > 0 && _this.txtImageCode.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
            } else {
            }
        });
        /**
         * 用户名、密码文本框change事件
         *
         * 1、判断用户名、密码是否为空；不为空则可以点击登录按钮
         * 2、超出长度截取
         */
        _this.txtUserName.on("change", function () {
            if ($(this).val().length > 0 && _this.txtPassword.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
                _this.divName.hide();
                _this.stuTips.show();
                _this.txtName.val('');
                _this.txtErrorMsg.html("");
            } else {
            }
        });
        _this.txtPassword.on("change", function () {
            if ($(this).val().length > 0 && _this.txtUserName.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
            } else {
            }
        });

        _this.txtName.on("change", function () {
            if ($(this).val().length > 0 && _this.txtUserName.val().length > 0 && _this.txtPassword.val().length > 0) {
                _this.bntLogin.attr("class", "tk_login_kboxbtn faw").css("cursor", "pointer");
            } else {
            }
        });
    };
    tkLogin.prototype.getScreenHeight = function () {
        var imgPlayHeight = 660;
        var winHeight = window.screen.height;
        if (winHeight >= 1280) {
            imgPlayHeight = 950;
        } else if (winHeight > 1024 && winHeight <= 1080) {
            imgPlayHeight = 850;
        } else if (winHeight > 900 && winHeight <= 1024) {
            imgPlayHeight = 780;
        } else if (winHeight > 768 && winHeight <= 900) {
            imgPlayHeight = 670;
        } else if (winHeight > 600 && winHeight <= 768) {
            imgPlayHeight = 560;
        } else {
            imgPlayHeight = 460;
        }
        $("#imgPlay").css({"height": imgPlayHeight + "px"});
        $("#imgPlay").find("li").css({"height": imgPlayHeight + "px"});
        $("body").css({"height": imgPlayHeight + 120 + "px"});
    };
    tkLogin.prototype.dealChromeYellow = function () {
        if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
            $(window).load(function () {
                $('input:-webkit-autofill').each(function () {
                    var text = $(this).val();
                    var name = $(this).attr('name');
                    $(this).after(this.outerHTML).remove();
                    $('input[name=' + name + ']').val(text);
                });
            });
        }
    };
    return tkLogin;
})();
