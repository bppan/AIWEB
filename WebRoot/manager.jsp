<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>教师管理</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/tk_index.css" rel="stylesheet" type="text/css">
    
    <link href="css/manager.css" rel="stylesheet" type="text/css">
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.uploadify.min.js"></script>
	<script type="text/javascript" src="js/manageTeacher.js" charset="GB2312" ></script>
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>教师管理</h3>
        </div>           
 		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControl faw ">
	 				<div  class = "control faw">
		 				<div>
			 				<input type='text'  id="teacherId"  placeholder="教师id"  class='searchText faw' /> 	
			 				<input type='text'  id="teacherName" placeholder="教师登录名"  class='searchText faw' /> 	
			 				<span  id="searchBut" name="btnCancelupload" class = "button faw">搜索</span>	
							<span  id="AddBut" name="btnCancelupload" class = "button faw">添加教师</span>	
						</div>
						<div  class = "faw" style = "margin-top:10px;">
		 					<span id = "searchTip" style = "color:red;margin-top:100px;"> 请在输入教师id或教师登录名后（不输入默认为全搜索，支持模糊搜索），点击搜索按钮或回车，进行搜索。</span>	
		 				</div>		
		 			</div>
	 		
	 				<div  id = "teaList" class = "teaList">
						<div class = "loading" style = "margin: 20% auto;">
							<img src = "images/loading.gif" width="30">
						</div>							
	 				</div>
	 	
				</div>				
				<div class="tk_login_kfoot faw">
					Copyright© 2016-2019 School of Software in HFUT. All rights reserved
				</div>
		</div>				
	</div>		
</div>
<!--尾部-->

<!--登录弹框-->
<div id="addTeacher_box" style="display: none;">
 <div class="tk_AddTeacher_kboxwrap " id="box_mask"></div>
 
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
            <span  style = "height: 34px;line-height:34px;margin-left:5px;" class = "col7 faw fl ft14">添加教师</span>
            <span  class="closed" id="login_close"></span>
            </span>
            <div class="clear"></div>
            <div  style="height:15px;" ></div>
			<div class="clear"></div>
            <div class="point faw " style="height: 20px;" id="errorMsg"></div>
            <div class="bd">              
                <input placeholder="请输入教师登录名" id="txtUserName" name="txtUserName" type="text" style="outline: none;">
            </div>
         
            <div class="hd">                
                <input placeholder="请输入教师真实姓名" id="txtName" name="txtName" type="text" style="outline: none;">
            </div>      
            <div class="clear"></div>
            <button class="tk_Teacher_kboxbtn faw" id="add_button">添加</button>
            <p id="stuTips" class="mt20 col3 ft12 tc faw">温馨提示：添加的教师，其初始密码为六个1</p>
        </div>
        
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>


<!--登录弹框-->
<div id="alterTeacher_box" style="display: none;">
 <div class="tk_AddTeacher_kboxwrap " id="alter_box_mask"></div>
 
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
             <span id = "alterTitle" style = "height: 34px;line-height:34px;margin-left:5px;" class = "col7 faw fl ft14"></span>
            <span  class="closed" id="alterTeacher_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:10px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point faw " style="height: 20px;" id="alter_errorMsg"></div>
            <div class="bd">
                <i></i>
                <input placeholder="请输入要修改的真实姓名" id="txtAlterUserName" name="txtUserName" type="text" style="outline: none;">
            </div>
            <div class="clear"></div>
             <div  style="height:25px;" ></div>
            <button class="tk_Teacher_kboxbtn faw" id="alter_button">修改</button>
            <p id="stuTips" class="mt20 col3 ft12 tc faw">温馨提示：教师真实姓名修改后，教师的密码将会重置</p>
        </div>
        
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>
  
 <!--删除弹框-->
<div id="delete_box" style="display: none;">
 <div class="tk_AddTeacher_kboxwrap " id="delete_box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
             <span id = "deleteTitle" style = "height: 34px;line-height:34px;margin-left:5px;" class = "col7 faw fl ft14"></span>
            <span  class="closed" id="deleteeacher_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:5px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point faw " style="height: 10px;" id="delete_errorMsg"></div>
            <div class="clear"></div>
            <div  style="height:25px;" ></div>
            <button class="faw tk_Teacher_kboxbtn " id="delete_button">删除</button>
         
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div> 
</body>
</html>