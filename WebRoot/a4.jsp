<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>等代价搜索</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
    <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <link href="css/a4.css" rel="stylesheet" type="text/css">
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/a4.js"></script>
	
</head>
<body style="background: #fff;">
<script type="text/javascript">
    var basePath = 'http://localhost:8080/AIWEB16';
</script>
<!--头部-->

<div class="body">
    <div class="find_pwd">
        <div class="find_pwd_title faw ft16">
            <h3>等代价搜索</h3>
        </div>           
 			<div id = "content_Contentwarp" class = "tk_content_Contentwarp">
 				<div id = "contentWrap" class = "kcontentControl faw ">
				<div id = "algorithmContent" class = "faw ft14 fl">
					算法细节：算法采用宽度优先搜索，采用先下在右在上在下的顺序进行搜索，搜索过程以黑色边框标出。
				<div>
					<h3 id="start">初始局面</h3>
					<div id="head1">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span> </span>
						<span>5</span>
						<span>6</span>
						<span>7</span>
						<span>8</span>
					</div>
				</div>
				<div>
					<h3 id="end">终止局面</h3>
					<div id="head2">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span> </span>
						<span>5</span>
						<span>6</span>
						<span>7</span>
						<span>8</span>
					</div>
				</div>
					<div id="button">运行算法</div>
				</div>
			</div>
				
			<div id = "algorithmDisplay" class = "kcontentAlgorithmShow faw">
				<div id = "algorithmContent" class = "faw ft14">
					算法演示区域：
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