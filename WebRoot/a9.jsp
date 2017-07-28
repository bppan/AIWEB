<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>遗传算法-基础演示</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=10;IE=9;IE=8"/>
  

   <link type="image/x-icon" href="images/aicourse.ico" rel="shortcut icon"/>
    <link href="css/find_password.css" rel="stylesheet" type="text/css">
    <link href="css/a9.css" rel="stylesheet" type="text/css">
    <link href="css/navigate.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/highcharts/highcharts.js"></script>
    <script type="text/javascript" src="js/a9.js" charset="gb2312"></script>
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
            <h3>遗传算法-基础演示</h3>
        </div>
 			<div id = "content_Contentwarp" class = "tk_content_Contentwarp">		
			<div id = "contentWrap" class = "kcontentControla1 faw">
				<div id = "canvas" class = "graph fl ft14 faw tc">
				  <div class="algGraphe_kboxwrap" id="box_mask1"></div>
				   <div style="position:absolute; left:25%;top:10px">
						<div id = "start" style = "width:150px;  border: 1px solid #121212;border-radius:10px;top:10px;left:30px;position:absolute" >开始</div>
						<div id = "code" style = "width:150px; border: 1px solid #121212;border-radius:3px;top:50px;left:30px;position:absolute" >编码</div>
						<div id = "initPopulation" style = "width:150px; border: 1px solid #121212;border-radius:3px;top:90px;left:30px;position:absolute" >初始化种群</div>
						<div id = "caculate" style = "width:150px;  border: 1px solid #121212;border-radius:3px;top:130px;left:30px;position:absolute" >计算适应度值</div>
						<div id = "choice" style = "width:150px;  border: 1px solid #121212;border-radius:3px;top:170px;left:30px;position:absolute" >选择</div>
						<div id = "change" style = "width:150px; border: 1px solid #121212;border-radius:3px;top:210px;left:30px;position:absolute" >交叉</div>
						<div id = "variation" style = "width:150px;  border: 1px solid #121212;border-radius:3px;top:250px;left:30px;position:absolute" >变异</div>
						<div id = "endCondition" style = "width:150px;  border: 1px solid #121212;border-radius:6px;top:290px;left:30px; position:absolute" >终止条件</div>
						<div id = "bestUnit" style = "width:150px;  border: 1px solid #121212;border-radius:3px;top:330px;left:30px;position:absolute" >适应度最优个体</div>
						<div id = "end" style = "width:150px; border: 1px solid #121212;border-radius:10px;top:370px;left:30px;position:absolute" >结束</div>
					</div>
				</div>
				<div class = "controlTip fr">
				  
					<div id = "algorithmContent" class = "faw ft14  ti lh26 ls1" style = "margin-top:10px;">
						<b>例:</b> 设有函数f(x)=x<sup>2</sup>, 请用遗传算法求其自变量x在区间[0，31] 取整数值时的最大值，并说明此函数的优化问题。 
					</div>
					<div id = "algorithmContent" class = "faw ft14  ti lh26 ls1" style = "margin-top:10px;">
						<p id = "codeWorld"><b>编码方案：</b>将x编码表示为染色体的数字符号串。针对本题自变量x定义域,取值范围为[0，31],考虑采用二进制数来对其编码,由2的5次方 等于32,故使用5位无符号二进制数组成染色体数字字符串,用以表达变量x及问题的解答过程。</p>
						<p id = "initWorld"><b>初始种群：</b>通过随机的方法来产生染色体的数字串，并组成初始种群。例如，为得到数字串的某位——又称之为基因(genes)，使用计算机在0～1之间产生随机数K，在0<=k<0.5时，该位取0，在0.5<=k<=1时，该位取1。</p>
						<p id = "choiceWorld"><b>选择：</b>选择适应值大的串作为母本，根据种群计算出每个个体的适应值，计算出个体适应值占总体适应值的比值，产生四次随即数p(0<=p<=1),根据p的值落在哪个比值区间，哪个个体就得到选择，从而选择出更优秀的下一代。</p>
						<p id = "changeWorld"><b>交叉：</b>①将新复制产生的染色体随机两两匹配,称其为双亲染色体；②再把双亲染色体进行交叉繁殖。</p>
						<p id = "variationWorld"><b>变异：</b>遍历所有种群，产生随机数p,与变异概率KP比较，如果小于变异概率就随机改变一位基因，否则就不变异。</p>
						
					</div>	
					<div style = "height:50px; margin-top:20px;position:absolute">
					 <div class="algWord_kboxwrap" id="box_mask3"></div>
					 <div style = "height:50px; margin-top:10px">
					 <span style = "height:33px; margin-left:65px; border:1px">
					    <input id = "inputChange" style = "border:1px solid #6F6F6F;" type="text" placeholder="交叉概率" class="text2 faw"/>	 
						<input id = "inputVariation" style = "border:1px solid #6F6F6F;" type="text" placeholder="变异概率" class="text2 faw"/>	 
					    <input id = "inputGenerate" style = "border:1px solid #6F6F6F;" type="text" placeholder="请输入运行代数" class="text1 faw"/>	  
					    <span id = "run" class = "alg_btna1">运行算法</span>						
					 </span>
					 </div>
					
					</div>
				</div>
				<div id = "genAnimate" class = "graphTable fl faw ft14">
				     <div class="animate_kboxwrap" id="box_maskImp"></div>
                     <div id = "agenNum1" class = "genWrap fc"> 
	                     <span class = "genTitle">1</span>
	                     <span class ="genSpan" style = "left:45px;">1</span>
	                     <span class ="genSpan" style = "left:95px">1</span>
	                     <span class ="genSpan" style = "left:145px">1</span>
	                     <span class ="genSpan" style = "left:195px">1</span>
	                     <span class ="genSpan" style = "left:245px">1</span>
                     </div>
                         <div id = "agenNum2" class = "genWrap fc" style = "top:70px"> 
	                     <span  class = "genTitle">2</span>
	     			     <span  class ="genSpan" style = "left:45px">1</span>
	                     <span  class ="genSpan" style = "left:95px">1</span>
	                     <span  class ="genSpan" style = "left:145px">1</span>
	                     <span  class ="genSpan" style = "left:195px">1</span>
	                     <span  class ="genSpan" style = "left:245px">1</span>
                     </div>
                     <div id = "agenNum3" class = "genWrap fc" style = "top:140px"> 
	                     <span  class = "genTitle">3</span>
	   	     			 <span  class ="genSpan" style = "left:45px">1</span>
	                     <span  class ="genSpan" style = "left:95px">1</span>
	                     <span  class ="genSpan" style = "left:145px">1</span>
	                     <span  class ="genSpan" style = "left:195px">1</span>
	                     <span  class ="genSpan" style = "left:245px">1</span>
                     </div>
                      <div id = "agenNum4" class = "genWrap fc"style = "top:210px"> 
	                     <span  class ="genTitle">4</span>
	             	     <span  class ="genSpan" style = "left:45px">1</span>
	                     <span  class ="genSpan" style = "left:95px">1</span>
	                     <span  class ="genSpan" style = "left:145px">1</span>
	                     <span  class ="genSpan" style = "left:195px">1</span>
	                     <span  class ="genSpan" style = "left:245px">1</span>
                     </div>
			  	 </div>
			  	 <div class = "algraphTable fr">

                         <table width="530px" height="400px" border="1px"  class = "tc faw ft14" style = "margin-top:5px;">
							  <tr>
							    <td colspan="7">第<span id = "generationNum" style = "color:Red;font-weight:900">1</span>次迭代</td>
							  </tr>
							  <tr>
							    <td >编号</td>
							    <td >染色体</td>
							    <td >占总值比例（选择概率）</td>
							    <td>交叉概率</td>
							    <td >变异概率</td>
							    <td >个体值</td>
							    <td >适应值</td>
							  </tr>
							  <tr id = "gen1">
							    <td>1</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							  </tr>
							  <tr id = "gen2">
							    <td>2</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							  </tr>
							  <tr id = "gen3">
							    <td>3</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							  </tr>
							  <tr id = "gen4">
							    <td>4</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							    <td>&nbsp;</td>
							  </tr>
							  <tr>
							    <td colspan="6">该代最优值</td>
							    <td id = "bestGen">&nbsp;</td>
							  </tr>
							  <tr>
							    <td colspan="6">该代平均值</td>
							    <td id = "avgGen">&nbsp;</td>
							  </tr>
							  <tr>
							    <td colspan="6">该代总值</td>
							    <td id = "totalGen">&nbsp;</td>
							  </tr>
							 <tr>
							    <td colspan="6">进化种群最优值</td>
							    <td id = "allbestGen">&nbsp;</td>
							  </tr>
						</table>
			  	 </div>
			  	 	<div id = "highcharts" class = "highchart fl">
                      		 
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