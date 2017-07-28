<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>内容管理</title>

    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>    
    <link href="css/contentManage.css" rel="stylesheet" type="text/css">    
    <link href="themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
    
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="js/contentManage.js" charset="GB2312" ></script>
    <script type="text/javascript" charset="utf-8" src="umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="umeditor.js" charset="GB2312" ></script>
    <script type="text/javascript" src="js/umeditor/zh-cn.js" charset="GB2312" ></script>
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->
	
		
<div class = "body">
    <div class="find_pwd">
        <div class="find_pwd_title ft16">
            <h3  style = "font-family:'微软雅黑';" >内容管理</h3>
        </div>           
 		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControlNew">
	 				<div  class = "control faw" style = "  box-shadow: 2px 2px 5px #d3d6da;">
		 				<div style = "margin-top:15px;">		 				
		 						<select id="selectModule" class = "faw ft14"style = "height:30px;line-height:30px; border-radius: 3px;min-width:100px;font-family:'微软雅黑';">
     								   <option value="0">请选择知识模块</option>
    							</select>	
    						
    							<select  id="selectUnit" class = "faw ft14" style = "margin-left:5px;line-height:30px; height:30px;border-radius: 3px;min-width:100px;font-family:'微软雅黑';">
     								 	<option value="0">请选择知识单元</option>
    							</select>		
    							<select id="selectPoint" class = "faw ft14" style = "margin-left:5px;line-height:30px; height:30px;border-radius: 3px;min-width:100px;font-family:'微软雅黑';">
     								 	<option value="0">请选择知识点</option>
    							</select>	  							
    							<span  id="SureBut" style = "font-family:'微软雅黑';"  class = "button faw">内容修改</span>	
    							<span  id="AddModuleBut" style = "font-family:'微软雅黑';"  class = "button faw">添加知识模块</span>	
    							<span  id="AddUnitBut" style = "font-family:'微软雅黑';"  class = "button faw">添加知识单元</span>	
    							<span  id="AddPointBut" style = "font-family:'微软雅黑';"  class = "button faw">添加知识点</span>	
    							<span  id="AddAlgBut" style = "font-family:'微软雅黑';"  class = "button faw">添加算法</span>	
						</div>

		 			</div> 	
	 				<div  style="width:950px;min-height:470px;font-family:'微软雅黑';z-index: 0;">
						<script type="text/plain" id="myEditor" style="width:950px;height:450px;z-index: 0;"><p style="font-family:'微软雅黑';">请在此处输入知识点内容</p>
						</script>	
					</div>
				</div>				
				<div class="tk_login_kfoot faw" style = "font-family:'微软雅黑';">
					Copyright© 2016-2019 School of Software in HFUT. All rights reserved
				</div>
		</div>				
	</div>		
</div>

<!--尾部-->
 <!--删除弹框-->
<div id="alert_box" style = "display:none">
 <div class="tk_AddTeacher_kboxwrap " id="delete_box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
             <span id = "deleteTitle" style = "height: 34px;line-height:34px;margin-left:5px;color:#fff;font-family:'微软雅黑';" class = " ft15">提示</span>
           	 <span  class="closed" id="alert_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:5px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point2  ft14" style="height: 20px;line-height:30px;font-family:'微软雅黑';" id="alert_errorMsg"></div>
            <div class="clear"></div>
            <div  style="height:20px;" ></div>
            <button class="tk_Teacher_kboxbtn "  style = "font-family:'微软雅黑';" id="alert_button">我知道了</button>
         
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div> 

<div class="tk_AddTeacher_kboxwrap" id="box_mask" >
	<div class = "loading" style = "margin:15% auto;z-index:20000">					           
		<img src = "images/loading.gif" width="35">
		<div id = "maskcontent" class ="faw ft14" style = "width:80px; line-height:30px;margin:8px 0  0 -10px;z-index:20030; color:white;font-family:'微软雅黑';">数据加载...</div>		
	</div>							
</div>	

<!--添加知识模块-->
<div id="add_box" style = "display:none">
 <div class="tk_AddTeacher_kboxwrap " id="add_box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
            <span id = "alterTitle" style = "height: 34px;line-height:34px;margin-left:5px;color:white;font-family:'微软雅黑'" class = "fl ft14"></span>
            <span  class="closed" id="add_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:10px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point2 ft14" style="height: 20px;font-family:'微软雅黑'" id="add_errorMsg"></div>
            <div class="bd">
                <input placeholder="请输入算法名称" id="txtName" type="text" style="outline: none;font-family:'微软雅黑'">
            </div>
            <div class="clear"></div>
            <div style="height:25px;" ></div>
            <button class="tk_Teacher_kboxbtn faw" id="add_button"  style = "font-family:'微软雅黑'">添加</button>
            <p id="stuTips" class="mt20 col3 ft12 tc faw" style = "font-family:'微软雅黑'"></p>
        </div>       
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div>



</body>
</html>