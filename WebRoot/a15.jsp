<%@ page import="com.jspsmart.upload.SmartUpload"%>
<%@ page import="jxl.*"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="java.io.*"%>
<%
	String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" />
<title>分类算法</title>
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8" />

<link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
<link href="css/navigate.css" rel="stylesheet" type="text/css">
<link href="css/find_password.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/loadExcel.js" charset="UTF-8"></script>

<style type="text/css">
* {
	margin: 0px;
	padding: 0px;
}

#button {
	position: relative;
	top: 11px;
	cursor: pointer;
	display: inline-block;
	background: #39A4DC;
	min-width: 120px;
	height: 30px;
	display: inline-block;
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	overflow: hidden;
	border-radius: 3px;
	margin-left: 8px;
	color: white;
}

#submitButton {
	cursor: pointer;
	background: #39A4DC;
	min-width: 120px;
	height: 30px;
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	border-radius: 3px;
	margin-left: 8px;
	color: white;
	border-style: none;
}

#inputFileButton {
	cursor: pointer;
	background: #39A4DC;
	min-width: 120px;
	height: 30px;
	text-align: center;
	font-size: 14px;
	line-height: 30px;
	border-radius: 3px;
	margin-left: 8px;
	color: white;
	border-style: none;
}

#button:hover,#submitButton:hover,.a-upload:hover {
	background: #5bb3e1;
	cursor: pointer;
	color: #ff0;
}

#algorithmDisplay {
	width: 950px;
	position: absolute;
	overflow: auto;
	height: 800px;
}

#algorithmDisplayWrap {
	position: relative;
	min-height: 600px;
}

#canvasLine {
	position: absolute;
	z-index: 5;
}

.kcontentControl {
	position: relative;
	width: 950px;
	border: 1px solid #dfdedc;
	margin: 0 auto;
	margin-top: 5px;
	background: #fff;
	min-height: 0px;
	padding: 12px 20px 20px 20px;
	overflow: auto;
	font-size: 14px;
}

table,td {
	font: 100% Arial, Helvetica, sans-serif;
}

table {
	width: 800px;
	border-collapse: collapse;
	margin: 1em 0;
}

th,td {
	text-align: center;
	padding: .5em;
	border: 1px solid #fff;
}

th {
	background: #328aa4;
	color: #fff;
}

td {
	background: #e5f1f4;
}

#excelForm {
	position: relative;
	left: 180px;
}

#excelTable {
	position: relative;
	left: 75px;
}

.displaySpan {
	line-height: 60px;
	width: 150px;
	height: 60px;
	background-color: #7bb3e1;
	border: solid 2px #ddf;
	display: inline-block;
	position: absolute;
	text-align: center;
	font-size: 20px;
	font-family: "Microsoft YaHei", SimSun, SimHei;
	color: white;
	z-index: 10;
	border-radius: 10px;
}

.displaySpan:hover {
	z-index: 9;
	border: 2px solid #1F7CAF;
	background-color: #39A4DC;
	counter-reset:;
	lor: #ff0
}

.tipSpan {
	height: 40px;
	width: 100px;
	position: absolute;
	text-align: center;
	z-index: 10;
}

.a-upload {
	top: 11px;
	font-size: 14px;
	text-align: center;
	margin-left: 8px;
    height: 30px;
    line-height: 30px;
    min-width: 120px;
    position: relative;
    cursor: pointer;
    color: white;
    background: #39A4DC;
    border: 1px solid #ddd;
    border-radius: 3px;
    overflow: hidden;
    border-style: none;
    display: inline-block;
    *display: inline;
    border-style: none;
    *zoom: 1
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.tk_AddTeacher_kboxwrap{
	z-index: 300;
}
.tk_login_kbox1{
	z-index: 400;
}

.upLoadText {
    width: 200px;
    /* vertical-align: middle; */
    border-radius: 3px;
    border: 1px solid #6F6F6F;
    color: #2e2e2e;
    font-size: 12px;
    font-family: "微软雅黑";
    padding-left: 3px;
    height: 27px;
</style>
</head>
<body style="background: #fff;">
	<script type="text/javascript">
		var basePath = 'http://localhost:8080/AIWEB16';
	</script>
	<!--头部-->

	<div class="body">
		<div class="find_pwd">
			<div class="find_pwd_title faw ft16">
				<h3>ID3算法</h3>
			</div>
			<div id="content_Contentwarp" class="tk_content_Contentwarp">
				<div id="contentWrap" style="min-height:60px;"
					class="kcontentControl faw ">
					<div id="algorithmContent" class="faw ft15 fl ls1 lh26">
						<div>
							说明: 
							<h3 style="text-indent:2em">
								通过读取excel表格中的数据并使用ID3算法进行分析，最终获得决策树。首先点击选择文件按钮对导入文件进行选择，然后点击提交按钮，表格的内容会在网页上显示出来。最后点击运行算法按钮可以在算法演示区域生成决策树。
							</h3>
							<h3 style="text-indent:2em">文件的格式要求:
								文件的后缀名必须是xls。从Sheet1的(A,1)单元格开始，第一行为影响因素的属性名，其中最后一列为结果的属性名，之后的每行都是属性的具体值。
							</h3>
						</div>
					</div>
				</div>
				<div id="contentWrap" class="kcontentControl faw ">
					<div id="algorithmContent" class="faw ft15 fl ls1">
						ID3算法 <br> <br> 
						<form id="excelForm" action="./id3file"
							method="post" enctype="multipart/form-data">
							<input type="text" id="fileName" name="fileName" class="upLoadText faw"value="">
							<span class="a-upload">
							    <input type="file" name="file" id="inputFile">上传文件
							</span>
							
							<input type="submit" class = "faw" value="提交" id="submitButton">
							<span id="button">运行算法</span>
						</form>
						<br>
						<%
							request.setCharacterEncoding("utf-8");
			                String result = (String)request.getSession().getAttribute("result");
			                if("success".equals(result)){
			                  	int currentCount = 0;
			                  	int colCount = Integer.parseInt(request.getSession().getAttribute("colCount").toString());
				                int rowCount = Integer.parseInt(request.getSession().getAttribute("rowCount").toString());
			                  	List<String> th = (List)request.getSession().getAttribute("th");
			                  	List<String> td = (List)request.getSession().getAttribute("td");
						%>
						<table id="excelTable" cellspacing="0" cellpadding="0">
							<tr>
								<th class = "faw">序号</th>
								<%
									for(int i = 0;i < colCount;i++){
								%>
								<th class = "faw"><%=th.get(i)%></th>
								<%
									}
								%>
							</tr>
							<%
								for(int i = 0;i < rowCount - 1;i++){
							%>
							<tr class = "faw">
								<td><%=i+1%></td>
								<%
									for(int j = 0; j < colCount;j++){
								%>
								<td><%=td.get(currentCount)%></td>
								<%
									currentCount++;
																				                    }
								%>
							</tr>
							<%
								}
																	                }
														                request.getSession().setAttribute("result", null);
														                request.getSession().setAttribute("colCount", null);
														                request.getSession().setAttribute("colCount", null);
														                request.getSession().setAttribute("colCount", null);
														                request.getSession().setAttribute("colCount", null);
							%>
						</table>
						<br> <br>
						
					</div>
				</div>

				<div id="algorithmDisplayWrap" class="kcontentAlgorithmShow faw">
					<div id="algorithmContent" class="faw ft15 fl ls1">算法演示区域</div>
					<div id="algorithmDisplay">
						<canvas id="canvasLine" width="2000" height="600"></canvas>
					</div>
				</div>
				<%
					if("fail".equals(result)){
				%>
				<script type="text/javascript">
					alertFunc();
				</script>
				<%
					}
				%>
			</div>
		</div>
	</div>
	<div id="alert_box" style = "display:none"  >
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
            <div class="point2 faw ft15" style="height: 15px;" id="alert_errorMsg"></div>
            <div class="clear"></div>
            <div  style="height:25px;" ></div>
            <button class="faw tk_Teacher_kboxbtn " id="alert_button">我知道了</button>
         
        </div>
        <div class="tk_login_kbox1_ft"></div>
    </div>
</div> 
	<!--尾部-->
	<div class="tk_login_kfoot faw">Copyright© 2016-2019 School of
		Software in HFUT. All rights reserved</div>
</html>
