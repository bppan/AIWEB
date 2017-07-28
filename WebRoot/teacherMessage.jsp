<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>我的信息</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/> 
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/navigate.css" rel="stylesheet" type="text/css">  
    <link href="css/tk_index.css" rel="stylesheet" type="text/css">   
    <link href="css/manager.css" rel="stylesheet" type="text/css">
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/teacherMessage.css" rel="stylesheet" type="text/css">
    
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/teacherMessage.js" charset="GB2312"></script>
    
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>教师材料</h3>
        </div>           
 		<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControl faw ">
					<table width="900" border="1" style = "margin:5px auto">
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">教师信息</td>
					  </tr>
					  <tr class = "trMessage">
						<td width="115" height="30" class ="ft15 tc">姓名</td>
						<td width="230">
						  <input type="text" name="teName" id="teaName" class = "text2 faw" />
						</td>
						<td width="99" class = "tc">性别</td>
						<td width="236" class = "pdl5"><p>
						  <label>
							<input type="radio" name="teaSex" value="1" id="teaSex_0" />
							男</label>
						  <label style = "margin-left:20px">
							<input type="radio" name="teaSex" value="0" id="teaSex_1" />
							女</label>
						</p></td>
					  </tr>
					  <tr class = "trMessage">
						<td class = "tc">出生年月</td>
						<td ><input type="text" name="birthDate" id="birthDate"  class = "text2 faw"/></td>
						<td class = "tc">最终学位</td>
						<td><input type="text" name="tea_degree" id="tea_degree" class = "text2 faw"/></td>
					  </tr>
					  <tr class = "trMessage ">
						<td class = "tc">毕业院校</td>
						<td>
						  <input type="text" name="user_graduate_School" id="user_graduate_School" class = "text2 faw"/>
						</td>
						<td class = "tc">从事专业</td>
						<td><input type="text" name="user_major" id="user_major" class = "text2 faw"/></td>
					  </tr>
					  <tr class = "trMessage ">
						<td class = "tc">所属院系</td>
						<td>
						  <input type="text" name="user_collage" id="user_collage" class = "text2 faw"/>
						</td>
						<td  class = "tc">职务</td>
						<td>
						  <input type="text" name="user_job" id="user_job" class = "text2 faw"/>
						</td>
					  </tr>
					  <tr class = "trMessage ">
						<td class = "tc">所属研究所</td>
						<td >
						  <input type="text" name="user_laboratory" id="user_laboratory" class = "text2 faw"/>
						</td>
						<td  class = "tc">职称</td>
						<td>
						  <input type="text" name="user_job_title" id="user_job_title" class = "text2 faw"/>
						</td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">联系方式</td>
					  </tr>
					  <tr class = "trMessage ">
						<td class = "tc">办公电话</td>
						<td><label>
						  <input type="text" name="user_office_phone" id="user_office_phone" class = "text2 faw" />
						</label></td>
						<td class = "tc">Email</td>
						<td><label>
						  <input type="text" name="user_email" id="user_email" class = "text2 faw"/>
						</label></td>
					  </tr>
					  <tr class = "trMessage ">
						<td class = "tc">通讯地址</td>
						<td colspan="3"><label>
						  <input type="text" name="user_address" id="user_address" class = "text3 faw"/>
						</label></td>
					  </tr>
					  <tr  class = "trMessage ">
						<td class = "tc">邮编</td>
						<td colspan="3"><label>
						  <input type="text" name="user_post" id="user_post" class = "text3 faw"/>
						</label></td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">简历</td>
					  </tr>
					  <tr>
						<td colspan="4"><label>
						  <textarea name="user_resume"  cols="126" rows="10" id="user_resume" class = "faw ft14"></textarea>
						</label></td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">研究方向</td>
					  </tr>
					  <tr>
						<td colspan="4">
						  <textarea name="user_research_direction" id="user_research_direction" cols="126" rows="15" class = "faw ft14"></textarea>
						</td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">教学工作</td>
					  </tr>
					  <tr>
						<td colspan="4"><label>
						  <textarea name="user_teach_work" id="user_teach_work"  cols="126" rows="10" class = "faw ft14"></textarea>
						</label></td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">获奖情况</td>
					  </tr>
					  <tr>
						<td colspan="4"><label>
						  <textarea name="user_awards" id="user_awards" cols="126" rows="12" class = "faw ft14"></textarea>
						</label></td>
					  </tr>
					  <tr>
						<td colspan="4" class = " faw ft14 tableHead">主要论著</td>
					  </tr>
					  <tr>
						<td colspan="4"><label>
						  <textarea name="user_book" id="user_book" cols="126" rows="20" class = "faw ft14"></textarea>
						</label></td>
					  </tr>
					  <tr  style = "line-height:45px; ">
						<td colspan="4" class = "tc">
					     	<span  id="cancerBut" name="btnCancelupload" class = "button faw">重置</span>			
						    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	
						    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						    <span  id="sureBut" name="btnCancelupload" class = "button faw">修改</span>
							
						</td>
					  </tr>
					</table>
	 	
				</div>	
				
				<div class="tk_Mask_kboxwrap " id="alter_box_mask" >
						<div class = "loading" style = "margin:15% auto;">					           
							<img src = "images/loading.gif" width="35">
							<div id = "maskcontent" class ="faw ft14" style = "width:80px; line-height:30px;margin:8px 0  0 -10px; color:white">正在加载...</div>		
						</div>							
	 			</div>		

				<div class="tk_login_kfoot faw">
					Copyright© 2016-2019 School of Software in HFUT. All rights reserved
				</div>
		</div>				
	</div>		
</div>
<!--尾部-->
 <!--删除弹框-->
<div id="alert_box" style = "display:none" >
 <div class="tk_AddTeacher_kboxwrap " id="delete_box_mask"></div>
    <div class=" tk_login_kbox1">
        <div class="tk_addTeacher_kbox1_hd"></div>
        <div class="tk_login_kboxcon1">
            <span style = "background:#1BB674; width:486px; height: 34px; display: block; margin-left:-1px">
             <span id = "deleteTitle" style = "height: 34px;line-height:34px;margin-left:5px;" class = "col7 faw fl ft14">提示</span>
            <span  class="closed" id="alert_close"></span>
            </span>
            <div class="clear"></div>
            <div style="height:5px;width: 290px;" ></div>
			<div class="clear"></div>
            <div class="point2 faw ft14" style="height: 15px;" id="alert_errorMsg"></div>
            <div class="clear"></div>
            <div  style="height:25px;" ></div>
            <button class="faw tk_Teacher_kboxbtn " id="alert_button">我知道了</button>
         
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div> 
</body>
</html>