<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>图搜索-宽度优先搜索算法</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
  

 	 <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/a1.css" rel="stylesheet" type="text/css">
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/a1.js" charset="gb2312"></script>
</body>
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="bodya1">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>图搜索-宽度优先搜索算法</h3>
        </div>
 			<div id = "content_Contentwarp" class = "tk_content_Contentwarp">		
			<div id = "contentWrap" class = "kcontentControla1 faw">
				<div id = "canvas" class = "graph fl">
					<div id ="0" class = "pm" name = "A,47" style = "top:10px; left:135px;position: relative;" ><img src="images/a1_img/a47.png" width="50" height="50"/></div>
					<div id ="01" class = "pm"  style = "top:10px; left:90px;position: relative;" ><img src="images/a1_img/leftArrow.png" width="50" height="50"/></div>
					<div id ="02" class = "pm"  style = "top:-36px; left:150px;position: relative;" ><img src="images/a1_img/verticalArrow.png" width="15" height="50"/></div>
					<div id ="03" class = "pm"  style = "top:-92px; left:180px;position: relative;" ><img src="images/a1_img/rightArrow.png" width="50" height="50"/></div>
					
					<div id ="1" class = "pm" name = "B1,77" style = "top:-90px; left:35px;  position: relative;" ><img src="images/a1_img/b77.png" width="56" height="50"/></div>
					<div id ="2" class = "pm" name = "B2,65" style = "top:-140px; left:130px; position: relative;"><img src="images/a1_img/b65.png" width="56" height="50"/></div>
					<div id ="3" class = "pm" name = "B3,52" style = "top:-190px; left:230px; position: relative;"><img src="images/a1_img/b52.png" width="56" height="50"/></div>
					
					<div id ="101" class = "pm"  style = "top:-185px; left:10px;position: relative;" ><img src="images/a1_img/leftArrow.png" width="50" height="50"/></div>
					<div id ="102" class = "pm"  style = "top:-235px; left:60px;position: relative;" ><img src="images/a1_img/rightArrow.png" width="50" height="50"/></div>
					<div id ="201" class = "pm"  style = "top:-285px; left:150px;position: relative;" ><img src="images/a1_img/verticalArrow.png" width="15" height="50"/></div>
					<div id ="301" class = "pm"  style = "top:-335px; left:210px;position: relative;" ><img src="images/a1_img/leftArrow.png" width="50" height="50"/></div>
					<div id ="302" class = "pm"  style = "top:-385px; left:265px;position: relative;" ><img src="images/a1_img/rightArrow.png" width="50" height="50"/></div>
					
					
					
					<div id ="4" class = "pm" name = "C1,96" style = "top:-390px; left:0px; position: relative;"><img src="images/a1_img/c96.png" width="56" height="50"/></div>
					<div id ="5" class = "pm" name = "C2,87" style = "top:-440px; left:70px; position: relative;"><img src="images/a1_img/c87.png" width="56" height="50"/></div>
					<div id ="6" class = "pm" name = "D1,77" style = "top:-490px; left:130px; position: relative;"><img src="images/a1_img/d77.png" width="56" height="50"/></div>
					<div id ="7" class = "pm" name = "E1,57" style = "top:-540px; left:190px; position: relative;"><img src="images/a1_img/e57.png" width="56" height="50"/></div>
					<div id ="8" class = "pm" name = "E2,92" style = "top:-590px; left:290px; position: relative;"><img src="images/a1_img/e92.png" width="56" height="50"/></div>
					
					<div id ="401" class = "pm"  style = "top:-585px; left:20px;position: relative;" ><img src="images/a1_img/verticalArrow.png" width="15" height="50"/></div>
					<div id ="701" class = "pm"  style = "top:-635px; left:210px;position: relative;" ><img src="images/a1_img/verticalArrow.png" width="15" height="50"/></div>
					<div id ="801" class = "pm"  style = "top:-685px; left:310px;position: relative;" ><img src="images/a1_img/verticalArrow.png" width="15" height="50"/></div>
					
					<div id ="9" class = "pm" name = "F1,32" style = "top:-690px; left:0px; position: relative;"><img src="images/a1_img/f32.png" width="56" height="50"/></div>
					<div id ="10" class = "pm" name = "G1,27" style = "top:-740px; left:190px; position: relative;"><img src="images/a1_img/g27.png" width="56" height="50"/></div>
					<div id ="11" class = "pm" name = "H1,51" style = "top:-790px; left:290px; position: relative;"><img src="images/a1_img/h51.png" width="56" height="50"/></div>
				</div>
				<div class = "controlTip fr">
					<div id = "algorithmContent" class = "faw ft14  ti lh26 ls1" style = "margin-top:10px;">
						例： 从王某家族的四代中找王A的后代且其寿命为X的人。
					</div>
					<div id = "algorithmContent" class = "faw ft14  ti lh26 ls1" style = "margin-top:10px;">
						<b>算法操作提示：</b>请先使用鼠标点击要搜索的人，然后点击运行算法按钮。
					</div>
					<div  class = "faw ft14  ti lh26 ls1" style = "margin-top:10px;">
						您选择的后代为 : <span id = "algchoise" style = "color:#39A4DC"></span>
					</div>
					
					<div id = "algorithmContent" class = "faw ft14 fc">
					   
						<span id = "run" class = "alg_btna1 mt20">运行算法</span>
					</div>
				</div>
			</div>
			<div id = "contentWrap" class = "kcontentAlgorithmShowa1 faw">
				<div id = "algorithmResultTip" class = "faw ft16">
			  	 	<p><b>算法演示:</b></p>
				</div>
				<div id = "algorithmResult" class = " faw ft14">
			  	 	<div class = "graphTable fl ">
			  	     	<div style ="margin-top:10px">
					  	 	<div style = "color:#39A4DC"><b>Open表:</b></div>
					  	 	<div id ="open" style = " height:50px;border-radius:1px;border: 1px solid #121212;padding: 0px 0px 0px 0px;"> 
					  	 	</div>
					  	 	<div style = "margin-top:10px;color:#39A4DC"><b>Close表:</b></div>
					  	 	<div id = "close" style = "height:50px; border-radius:1px; border: 1px solid #121212;"></div>
				  	 	</div>	  	 	 
			  	 	</div>
			  		<div class = "algraphTable fr">
			  		<div class = "faw ft14 tc"  style = "position:absolute; margin-left:40px;margin-top:5px">
				  	 	 <div id = "20" style = "color:#121212;width:50px;border-radius:10px;border: 1px solid #121212;position:relative;top:10px;left:150px;">开始</div>
				  	 	 <div id = "21" style = "color:#121212;width:250px;border-radius:1px;border: 1px solid #121212;position:relative;top:30px;left:40px;">初始化：S放入open表，close表制空 n=1</div>
				  	 	 <div id = "22" style = "color:#121212;width:250px;border-radius:5px;border: 1px solid #121212;position:relative;top:50px;left:40px;">open为空表null</div>
				  	 	 <div id = "23" style = "color:#121212;width:50px;border-radius:10px;border: 1px solid #121212;position:relative;top:30px;left:320px;">失败</div>
				  	 	 <div id = "24" style = "color:#121212;width:250px;border-radius:1px;border: 1px solid #121212;position:relative;top:50px;left:40px;">open表中的第一个结点n移至close表</div>
				  	 	 <div id = "25" style = "color:#121212;width:250px;border-radius:5px;border: 1px solid #121212;position:relative;top:70px;left:40px;">n等于目标结点d</div>
				  	 	 <div id = "26" style = "color:#121212;width:50px;border-radius:10px;border: 1px solid #121212;position:relative;top:50px;left:320px;">成功</div>
				  	 	 <div id = "27" style = "color:#121212;width:250px;border-radius:1px;border: 1px solid #121212;position:relative;top:70px;left:40px;">若n的后继未曾在搜索图G中出现，则将其翻入open表的末端，并提供返回结点n的指针，置n=n+1</div>
				  	 	 <div id = "28" style = "color:#121212;width:250px;border-radius:1px;border: 1px solid #121212;position:relative;top:90px;left:40px;">根据后继结点在搜索图G中的出现情况修改指针方向</div>
				  	 	 <div id = "29" style = "color:#121212;width:250px;border-radius:1px;border: 1px solid #121212;position:relative;top:110px;left:40px;">根据冒泡排序重新排序open表</div>
				  	 	<div style = "top:-265px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="20"/></div>
				  	 	<div style = "top:-225px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="20"/></div>
				  	 	<div style = "top:-205px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="26"/></div>
				  	    <div style = "top:-230px; left:40px; position: relative;color:red">N</div>
				  	 	<div style = "top:-205px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="20"/></div> 
				  	 	<div style = "top:-185px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="26"/></div> 
				  	 	<div style = "top:-210px; left:40px; position: relative; color:red">N</div>
				  	 	<div style = "top:-145px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="20"/></div> 
				  	 	<div style = "top:-105px; left:50px; position: relative;"><img src="images/a1_img/verticalArrow.png" width="10" height="25"/></div> 
				  	 	<div style = "top:-100px; left:-98px; position: relative;"><img src="images/a1_img/leftLineArrow.png" width="25" height="10"/></div> 
				  	 	<div style = "top:-518px; left:-105px; position: relative;"><img src="images/a1_img/upArrow.png" width="10" height="410"/></div> 
				  	 	<div style = "top:-796px; left:-95px; position: relative;"><img src="images/a1_img/rightLineArrow.png" width="23" height="10"/></div> 
				  	 	<div style = "top:-806px; left:183px; position: relative;"><img src="images/a1_img/rightLineArrow.png" width="35" height="10"/></div> 
				  	 	<div style = "top:-730px; left:183px; position: relative;"><img src="images/a1_img/rightLineArrow.png" width="35" height="10"/></div> 
				  	 	<div style = "top:-735px; left:182px; position: relative; color:darkgreen">Y</div>
				  	 	<div style = "top:-840px; left:182px; position: relative; color:darkgreen">Y</div>
				  	 	</div>
			  	 	</div>
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