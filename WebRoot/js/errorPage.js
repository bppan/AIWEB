    				
var ErrorPage = ErrorPage || {};					
$(function(){
	
	$("#index_logo").click(function(){
		window.location.href = basePath + "/login.jsp";
    });
	
	ErrorPage.adaptScreen();
	ErrorPage.returnLogin();
})

ErrorPage.returnLogin = function(){
	var count = 3;
    var index = setInterval(function(){
		count--;
		if(count == 0){
			clearInterval(index);
			window.location.href = basePath + "/login.jsp";
		}else{
			$("#turnTip").text(count+ "s后跳转到首页");
		}
    },
    1000);
}
ErrorPage.adaptScreen = function(){
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