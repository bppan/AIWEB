/**
 * Created by Administrator on 2016/3/13.
 */
var Transcripts = Transcripts || {};
var basePath = 'http://localhost:8080/AIWEB16';
var control = control ||{};
var alg = alg ||{};
var world = world ||{};
var isWrong = false;
var genNum = 1;
var genList =[];
var table = {};
var curGenNum = 1;
var gendata = {};
var changMessage ={};
var variationMessage = {};
var changeProbability = 0.8;
var variationProbability = 0.006;

var highchartsview = null;


$(function(){
	//初始化网页

	Transcripts.initContent();

})

Transcripts.initContent = function(){
	
	control = {};
	alg = {};
	world = {};
	isWrong = false;
	genNum = 1;
	genList =[];
	table = {};
	curGenNum = 1;
	gendata = {};
	changMessage ={};
	variationMessage = {};

	changeProbability = 0.8;
	variationProbability = 0.006;

	highchartsview = null;
	
	//设置highcharts
    $(document).ready(function() {
    	Transcripts.setHighcharts();
    	highchartsview = $('#highcharts').highcharts();
    	Transcripts.initGenData();
    	/*
    	setInterval(function(){
    		
    		Transcripts.refreshHighcharts();
    	}, 1800);
    	*/
    
    });
    $("#box_mask1").fadeOut(1800);
    $("#box_maskImp").fadeOut(1800);
    $("#box_mask3").fadeOut(1800);
    //绑定基本事件
    Transcripts.bindBaseEven();    
}


Transcripts.setHighcharts = function(){	
	  $('#highcharts').empty();
	  
	   Highcharts.setOptions({                                                     
            global: {                                                               
                useUTC: false                                                       
            } ,
        	lang: {
                resetZoom: '恢复',
                resetZoomTitle:"恢复缩放比例"
        	}
        });                                                                                                                                                                                                                       
	   $('#highcharts').highcharts({                                                
            chart: {                                                                
                type: 'spline',  
                zoomType: 'y',
                style : {
                    fontFamily:"微软雅黑",    
                  },
                resetZoomButton: {
                    theme: {
                        fill: '#39A4DC',
                        stroke: 'silver',
                        style: {
                            color: 'white',
                        },
                        r:3,
                        states: {
                            hover: {
                                fill: '#1F7CAF',
                                style: {
                                    color: '#ff0'
                                }
                            }
                        }
                    }
                 },
                panning: true,
                panKey: 'shift',       
                marginRight: 5,                                                    
                events: {                                                                                                                       
                }                                                                   
            }, 
            
            
            title: {                                                                
                text: '种群进化曲线图',
                style : {
                    fontFamily:"微软雅黑",
                    fontSize:'15px',
                  }
            },                                                                      
            xAxis: {    
                title: {                                                            
                    text: '进化代数'                                                   
                },   
                tickPixelInterval: 200                                             
            },                                                                      
            yAxis: {                                                                
                title: {                                                            
                    text: '适应值'                                                   
                },     
                tickPixelInterval: 10,
                plotLines: [{  
                	color:'Red',           //线的颜色，定义为红色
                    dashStyle:'solid',     //默认值，这里定义为实线
                    value:961,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                    width:2,
                }]                                                                  
            },                                                                      
            tooltip: {                                                              
                formatter: function() {                                             
                        return '进化代数:' + this.x + ' 最优值:' + this.y;                         
                }                                                                   
            },   
            credits:{
                enabled:false // 禁用版权信息
           },
            legend: {  
            	   layout: 'vertical',
                   align: 'right',
                   verticalAlign: 'top',
                   borderWidth: 0
            },    
            
            exporting: {                                                            
                enabled: false                                                      
            },                                                                      
            series: [{                                                              
                name: '最优值',                                                
                data:[0]                                                        
            },
            {                                                              
                name: '历史最优值',                                                
                data:gendata.allbestData                                                   
            }
            ]                                                                      
        });	   
}

Transcripts.refreshHighcharts = function(){
	
	var chart = $('#highcharts').highcharts();
	
	chart.series[0].addPoint(gendata.bestData);
	chart.series[1].addPoint(gendata.allbestData);
	
}


var mobile = /^1[0-9]{10}$/;

Transcripts.bindBaseEven = function () {
	
	
	
	control.input = $("#inputGenerate");
	
	control.run = $("#run");
	
	alg.start = $("#start");
	alg.code = $("#code");
	alg.initPopulation = $("#initPopulation");
	alg.caculate = $("#caculate");
	alg.choice = $("#choice");
	alg.change = $("#change");
	alg.variation = $("#variation");
	alg.endCondition = $("#endCondition");
	alg.bestUnit = $("#bestUnit");
	alg.end = $("#end");
	
	world.codeWorld = $("#codeWorld");
	world.initWorld = $("#initWorld");
	world.choiceWorld = $("#choiceWorld");
	world.changeWorld = $("#changeWorld");
	world.variationWorld = $("#variationWorld");
	
//	alert(byteToTen);
	
	
	control.input.focus(function(){
		control.input.val("");
		
    });
    
	control.input.keydown(function(){
		Transcripts.wrongInput(0);
    });	
	/*
	control.input.blur(function(){
		var numstyle =  /^[0-9]*$/;
		var inputNum = $.trim(control.input.val());	
		if(!numstyle.test(inputNum)){
			control.input.val("输入错误");
			Transcripts.wrongInput(1);
		}
		else if(!inputNum){
		   	control.input.val("请在此输入代数");
        	Transcripts.wrongInput(1);
		}
	});
	*/
	control.run.click(function(){
			var numstyle =  /^[0-9]*$/;
			var inputNum = $.trim(control.input.val());	
			if(!inputNum){
			   	control.input.val("请在此输入代数");
	        	Transcripts.wrongInput(1);
			
			}
			else if(!numstyle.test(inputNum)){
				control.input.val("输入错误");
				Transcripts.wrongInput(1);
			}
			else{
				Transcripts.initContent();
				genNum = $.trim(control.input.val())*1.0;	
				changeProbability =  $.trim($("#inputChange").val())*1.0;
	    		variationProbability =  $.trim($("#inputVariation").val())*1.0;
				Transcripts.runAlg();
			}
	});
	
	

	
	//产生随机种群
	genList = Transcripts.randGenList();
	
	document.onkeydown = function(event){
	        //捕获Enter按键事件
	        if(event.keyCode == 13){
		        	var inputNum = $.trim(control.input.val());	
		        	var numstyle =  /^[0-9]*$/;
		            if(!control.input.val()){
		            	isWrong = false;
		            	control.input.val("请输入代数");
		            	Transcripts.wrongInput(1);
		            }else{
		            	if(!numstyle.test(inputNum)){
		            		isWrong = false;
		            		control.input.val("输入错误");
		            		Transcripts.wrongInput(1);
		            	}	
		            	else{
		            		Transcripts.initContent();
		            		genNum = $.trim(control.input.val())*1.0;	
		            		changeProbability =  $.trim($("#inputChange").val())*1.0;
		            		variationProbability =  $.trim($("#inputVariation").val())*1.0;
		            		Transcripts.runAlg();
		            	}
		            }
		            return false;
	      }	
	}
}

Transcripts.initGenData = function(){
	gendata.bestData = 0;	
	gendata.allbestData = 0;
}

Transcripts.addGenData = function(){
	
	gendata.bestData = table.best;
	gendata.allbestData = table.allbest;
}

Transcripts.initTable = function(){
	table.id = 1;
	table.best = 0;
	table.allbest = 0;
	table.average = 0;
	table.sum = 0;
	
	table.change = changeProbability;//交叉概率
	table.variation = variationProbability;  //变异概率
	
	var tgen1 = {};
	tgen1.id = 1;
	tgen1.str = "";
	tgen1.ten = 0;
	tgen1.result = 0;
	tgen1.rat = 0;
	
	var tgen2 = {};
	tgen2.id = 2;
	tgen2.str = "";
	tgen2.ten = 0;
	tgen2.result = 0;
	tgen2.rat = 0;
	
	var tgen3 = {};
	tgen3.id = 3;
	tgen3.str = "";
	tgen3.ten = 0;
	tgen3.result = 0;
	tgen3.rat = 0;
	
	var tgen4 = {};
	tgen4.id = 4;
	tgen4.str = "";
	tgen4.ten = 0;
	tgen4.result = 0;
	tgen4.rat = 0;
	
	var tgens = [tgen1, tgen2,tgen3,tgen4];
	table.genrationes = tgens;
	
	Transcripts.refreshViewTable();
	
	

}

Transcripts.wrongInput = function(isShow){
	if(isShow == 1){
		$("#inputGenerate").css("border","1px solid #E10001");
		
	}else if(isShow == 0){
		control.input.css("border","1px solid #6F6F6F");
	}
	
}

Transcripts.randString = function(){
	randString = "";
	for(var i = 0; i < 5; i++){
		var rand = Math.floor(Math.random()*10+1);
		if(rand <=5){
			randString =randString+"0";
		}else{
			randString =randString+"1";
		}
	}
	return randString;
	
}
Transcripts.randGenList = function(){
	randGenList = [];
	for(var i = 0; i < 4; i++){
		var randString = Transcripts.randString();
		randGenList[i] = randString;
	}
	return randGenList;	
}

Transcripts.codeAnimate = function(){
	var tempList = [$($("#agenNum1 span")), $($("#agenNum2 span")),$($("#agenNum3 span")),$($("#agenNum4 span"))];
	$(tempList[0]).fadeIn(1800);
	$(tempList[1]).fadeIn(1800);
	$(tempList[2]).fadeIn(1800);
	$(tempList[3]).fadeIn(1800);
}
Transcripts.initAnimate = function(){
	

	//agen1
	var tempList = [$($("#agenNum1 span")), $($("#agenNum2 span")),$($("#agenNum3 span")),$($("#agenNum4 span"))];
	for(var i = 0; i < genList.length;i++){	
		var currgen = tempList[i];
		for(var j = 0; j < currgen.length;j++){
			if(j == 0){
				$(currgen[j]).html(i + 1);
			}
			else{
				$(currgen[j]).html(genList[i][j - 1]);
			}
		}
	
	}
	$(tempList[0]).fadeOut(1800, function(){
		$(tempList[0]).fadeIn(1800);
	});
	$(tempList[1]).fadeOut(1800,function(){
		$(tempList[1]).fadeIn(1800);
	});
	$(tempList[2]).fadeOut(1800,function(){
		$(tempList[2]).fadeIn(1800);
	});
	$(tempList[3]).fadeOut(1800,function(){
		$(tempList[3]).fadeIn(1800);
	});
	
//	$("#agenNum1").fadeIn();

	//$("div").animate({left:'250px'});
	
}

Transcripts.refreshAnimate = function(){
	Transcripts.initAnimate();
}

Transcripts.choice = function(){	
	var gens = [];
	for(var i = 0; i < table.genrationes.length;i++){		
		gens[i] = table.genrationes[i];
	}
	var nextgens = [];
	var ratRange = [];
	
	var sumRage = 0;
	for(var i = 0; i < gens.length; i++){
		sumRage += gens[i].rat;
		ratRange[i] = sumRage;
	}
	//轮盘选择法
	for(var i = 0; i < gens.length; i++){
		var rand = Math.random();
		if(rand < ratRange[0]){
			nextgens[i] = gens[0];
		}
		else if(rand < ratRange[1]){
			nextgens[i] = gens[1];
		}
		else if(rand <ratRange[2]){
			nextgens[i] = gens[2];
		}
		else if(rand < ratRange[3]){
			nextgens[i] = gens[3];
		}
		
	}
	for(var k = 0; k < nextgens.length;k++){		
		table.genrationes[k].str = nextgens[k].str;
		genList[k] = nextgens[k].str;
	}	
}

Transcripts.variation = function(){
	
	
	var variation = table.variation;
	var target = [];
	
	var knum = 0;
	for(var i = 0; i < genList.length; i++){
		var temp = "";	
		for(var j = 0; j < genList[i].length;j++){
			var rand = Math.random();
			if(rand < variation){
				var vartag = {};
				vartag.tag = i;
				vartag.loc = j;		
				if(genList[i][j] == '0'){
					temp = temp + "1"; 
					genList[i][j] = '1';
        			vartag.con = "1";
				}else if(genList[i][j] == '1'){
					temp = temp + "0"; 
					genList[i][j] = '0';
					vartag.con = "0";
				}
				target[knum] = vartag;
				knum++;				
			}else{
				temp  = temp + genList[i][j];
			}
		}
		genList[i] = "";
		genList[i] = temp;
	}
	variationMessage.tarArray = target;
}



Transcripts.variationAnimate = function(){

	var tempList = [$($("#agenNum1 span")), $($("#agenNum2 span")),$($("#agenNum3 span")),$($("#agenNum4 span"))];	
	for(var i = 0; i < variationMessage.tarArray.length; i++){		
		var targetGen = variationMessage.tarArray[i].tag;
		var targetGenLoc = variationMessage.tarArray[i].loc + 1;
		var content = variationMessage.tarArray[i].con;
		$(tempList[targetGen][targetGenLoc]).css("background-color","#E51B24");
		$(tempList[targetGen][targetGenLoc]).html(content);
			
    }	
}
Transcripts.change = function(){
	
	var rand1 = Math.floor(Math.random()*genList.length);
	var rand2 = Math.floor(Math.random()*genList.length);
	while(rand1 == rand2){
		rand2 = Math.floor(Math.random()*genList.length);
	}
	changMessage.c1 = rand1;
	changMessage.c2 = rand2;
	
	var changeRate = table.change;
	//开始的两个交叉
	var changLocation = Math.floor(Math.random()*genList[0].length);	
	changMessage.c1loc = changLocation;
	
	var changRand = Math.random();
	var isChange = false;
	if(changRand < changeRate){
		isChange = true;
		var tempChar = genList[rand1][changLocation];
		genList[rand1][changLocation] = genList[rand2][changLocation];
		genList[rand2][changLocation] = tempChar;
	}
	changMessage.c12isChange = isChange;
	
	var resList = [];
	var h = 0;
	for(var j = 0; j < genList.length;j++){
		if(j != rand1 && j != rand2){
			resList[h] = j;
			h++;
		}
	}
	
	
	changMessage.c3 = resList[0];
	changMessage.c4 = resList[1];
	
	//剩下的两个交叉
	var changLocation2 = Math.floor(Math.random()*genList[0].length);
	changMessage.c34loc = changLocation2;
	
	var changRand2 = Math.random();
	var isChange2 = false;
	if(changRand2 < changeRate){
		isChange2 = true;
		var tempChar = genList[resList[0]][changLocation2];
		genList[resList[0]][changLocation2] = genList[resList[1]][changLocation2];
		genList[resList[1]][changLocation2] = tempChar;
	}
	changMessage.c34isChange = isChange2;
	
}

Transcripts.changeAnimate = function(){
	
	var v1 = $("#agenNum1");
	var v2 = $("#agenNum2");
	var v3 = $("#agenNum3");
	var v4 = $("#agenNum4");
	
	
	var vt1 = $("#agenNum1 span:first");
	var vt2 = $("#agenNum2 span:first");
	var vt3 = $("#agenNum3 span:first");
	var vt4 = $("#agenNum4 span:first");
	
	var vtList = [vt1,vt2,vt3,vt4];
	
	var vList = [v1,v2,v3,v4];
	
	var a1 = changMessage.c1;
	var a2 = changMessage.c2;
	
	//alert(a1 + ":" + a2);
	
	if(a1 > a2){
		var temp = a1;
		a1 = a2;
		a2 = temp;
	}
	//alert(a1 + ":" + a2);
	
	var a3 = changMessage.c3;
	var a4 = changMessage.c4;
	
	//alert(a3 + ":" + a4);
	
	if(a3 > a4){
		var temp = a3;
		a3 = a4;
		a3 = temp;
	}

	
	var pList1 = [a1,a2];
	
	var pList2 = [a3,a4];
	var isfind1 = false;
	
	var ani1 = null;
	var ani2 = null;
	
	var first = a1;
	var second = a2;
	var third = a3;
	var fouth = a4;
	
	if(a1 == 0){
		ani1 = vList[a2];
		if(a2 == 1){
			ani2 = vList[a2];
		}else{
			ani2 = vList[a3];
		}
		
	}else if(a3 == 0){
		first = a3;
		second = a4;
		third = a1;
		fouth = a2;
		ani1 = vList[a4];
		if(a4 == 1){
			ani2 = vList[a4];
		}else{
			
			ani2 = vList[a1];
		}	
	}	
	var top1 = ani1.css("top");
	var top2 = ani2.css("top");
	
	//交换位置
	ani1.animate({top:top2},1800);
	ani2.animate({top:top1},1800,function(){
		
		
		var tempList = [$($("#agenNum1 span")), $($("#agenNum2 span")),$($("#agenNum3 span")),$($("#agenNum4 span"))];	
		var secondTop = vList[second].css("top");
		var moveFirst = parseInt(secondTop) -1;
		var moveTwo = -1*parseInt(secondTop) +1;
			//alert(moveTwo);
		if(changMessage.c12isChange){
			var loc1 = changMessage.c1loc + 1;
			$(tempList[first][loc1]).css("background-color","#5bb3e1");
			$(tempList[second][loc1]).css("background-color","#5bb3e1");
			$(tempList[first][loc1]).animate({top:moveFirst},1800);
			$(tempList[second][loc1]).animate({top:moveTwo},1800);
		}
		
		var thirdTop = vList[third].css("top");
		var fouthTop = vList[fouth].css("top");
			
		var moveFouth = parseInt(fouthTop) - parseInt(thirdTop);
		var moveThird= parseInt(thirdTop) - parseInt(fouthTop);
			//alert(moveTwo);
		if(changMessage.c34isChange){
			var loc2 = changMessage.c34loc+ 1;
			$(tempList[third][loc2]).css("background-color","#5bb3e1");
			$(tempList[fouth][loc2]).css("background-color","#5bb3e1");
			$(tempList[third][loc2]).animate({top:moveFouth},1800);
			$(tempList[fouth][loc2]).animate({top:moveThird},1800, function(){
				$(vtList[first]).html("1");
				$(vtList[second]).html("2");
				$(vtList[third]).html("3");
				$(vtList[fouth]).html("4");		
				setTimeout(Transcripts.resetDivGen(),2000);
			});
		}
		
	
		
	});
	
}

Transcripts.resetDivGen = function(){
	
	$("#genAnimate").empty();	
	$("#genAnimate").append("<div id = 'agenNum1' class = 'genWrap fc'> </div>");
	$("#genAnimate").append("<div id = 'agenNum2' class = 'genWrap fc' style = 'top:70px'> </div>");
	$("#genAnimate").append("<div id = 'agenNum3' class = 'genWrap fc' style = 'top:140px'> </div>");
	$("#genAnimate").append("<div id = 'agenNum4' class = 'genWrap fc' style = 'top:210px'> </div>");
	
	var tempList = [$("#agenNum1"), $("#agenNum2"),$("#agenNum3"),$("#agenNum4")];		
	for(var i = 0; i < tempList.length; i++){	
		var title = i+1;
		tempList[i].append("<span  class = 'genTitle'>" +title + "</span>");
		tempList[i].append(" <span  class ='genSpan' style = 'left:45px'>" + genList[i][0] + "</span>");
		tempList[i].append(" <span  class ='genSpan' style = 'left:95px'>" + genList[i][1] + "</span>");
		tempList[i].append(" <span  class ='genSpan' style = 'left:145px'>" + genList[i][2] + "</span>");
		tempList[i].append(" <span  class ='genSpan' style = 'left:195px'>" + genList[i][3] + "</span>");
		tempList[i].append(" <span  class ='genSpan' style = 'left:245px'>" + genList[i][4] + "</span>");
	}
	Transcripts.addColorGen();
}
Transcripts.addColorGen = function(){
	var temp2List = [$($("#agenNum1 span")), $($("#agenNum2 span")),$($("#agenNum3 span")),$($("#agenNum4 span"))];	
	
	var loc1 = changMessage.c1loc + 1;
	var loc2 = changMessage.c34loc+ 1;
	
	if(changMessage.c12isChange){
		$(temp2List[changMessage.c1][loc1]).css("background-color","#5bb3e1");
		$(temp2List[changMessage.c2][loc1]).css("background-color","#5bb3e1");
	}
	
	if(changMessage.c34isChange){
		$(temp2List[changMessage.c3][loc2]).css("background-color","#5bb3e1");
		$(temp2List[changMessage.c4][loc2]).css("background-color","#5bb3e1");
	}

}

//刷新表格
Transcripts.refreshTable = function(){
	table.id = curGenNum;
	var currsum = 0;
	var best = -1;
	
	//alert(genList.length);
	for(var i = 0; i < genList.length;i++){
		table.genrationes[i].str = genList[i];
		//转化为二进制
		var byteToTen = 0;
		var pow = 0;
		for(var j = genList[i].length - 1; j >= 0 ; j--){
			
			if(genList[i][j] == '0'){
				byteToTen  = byteToTen + 0 * Math.pow(2,pow);
			}
			else if(genList[i][j] == '1'){
				byteToTen  = byteToTen + 1 * Math.pow(2,pow);
			}
			pow++;	
		}

		table.genrationes[i].ten = byteToTen;
		table.genrationes[i].result = byteToTen * byteToTen;//适应度韩式 y = x*x
		currsum = currsum +  byteToTen * byteToTen;
		if(table.genrationes[i].result > best){
			best = table.genrationes[i].result;
		}
	}
	//计算比值
	for(var j = 0; j < table.genrationes.length;j++){
		table.genrationes[j].rat = table.genrationes[j].result * 1.0 / currsum;
	}
	
	table.best = best;//最优值
	if(table.best > table.allbest){
		table.allbest = table.best;
	}
	table.average = currsum / table.genrationes.length; //平均值
	table.sum = currsum;//总值
	Transcripts.refreshViewTable();
}

Transcripts.refreshViewTable = function(){
	
	var title = $("#generationNum");
	title.html(table.id);
	//设置表格
	var gen1 = $($("#gen1 td"));
	//alert(gen1.length);

	$(gen1[0]).html(table.genrationes[0].id);
	$(gen1[1]).html(table.genrationes[0].str);
	$(gen1[2]).html(parseInt(table.genrationes[0].rat * 1000)/1000);
	$(gen1[3]).html(table.change);
	$(gen1[4]).html(table.variation);
	$(gen1[5]).html(table.genrationes[0].ten);
	$(gen1[6]).html(table.genrationes[0].result);
	
	var gen2 = $($("#gen2 td"));
	$(gen2[0]).html(table.genrationes[1].id);
	$(gen2[1]).html(table.genrationes[1].str);
	$(gen2[2]).html(parseInt(table.genrationes[1].rat *1000)/1000);
	$(gen2[3]).html(table.change);
	$(gen2[4]).html(table.variation);
	$(gen2[5]).html(table.genrationes[1].ten);
	$(gen2[6]).html(table.genrationes[1].result);
	
	
	var gen3= $($("#gen3 td"));
	$(gen3[0]).html(table.genrationes[2].id);
	$(gen3[1]).html(table.genrationes[2].str);
	$(gen3[2]).html(parseInt(table.genrationes[2].rat *1000)/1000);
	$(gen3[3]).html(table.change);
	$(gen3[4]).html(table.variation);
	$(gen3[5]).html(table.genrationes[2].ten);
	$(gen3[6]).html(table.genrationes[2].result);
	
	var gen4= $($("#gen4 td"));
	$(gen4[0]).html(table.genrationes[3].id);
	$(gen4[1]).html(table.genrationes[3].str);
	$(gen4[2]).html(parseInt(table.genrationes[3].rat *1000)/1000);
	$(gen4[3]).html(table.change);
	$(gen4[4]).html(table.variation);
	$(gen4[5]).html(table.genrationes[3].ten);
	$(gen4[6]).html(table.genrationes[3].result);
	
	 $("#bestGen").html(table.best);	 
	 $("#avgGen").html(table.average);
	 $("#totalGen").html(table.sum);
	 $("#allbestGen").html(table.allbest);

}

Transcripts.fastRunAlg = function(){
    $("#box_maskImp").fadeIn(1800);
	var targetNum = genNum;
	if(curGenNum <= targetNum){	
		curGenNum++;
		Transcripts.dofastRunAlg();
		
	}
	
	
	var stop = setInterval(function(){
	//	alert("start");
		if(curGenNum >= targetNum){
			$(document).scrollTop(10);
			$("#box_mask3").fadeOut(1800);
			Transcripts.resetalgGraphe();
			clearInterval(stop);			
		}else{
			curGenNum++;
			if(curGenNum == Math.ceil(targetNum/2)){
				$(document).scrollTop(975);
			}
			Transcripts.dofastRunAlg();			
		}
				
	},1300*3.1);
	
}
Transcripts.dofastRunAlg = function(){
	$("#box_maskImp").fadeIn(1800);
	setTimeout(function(){	
	//	alert("choice");
		Transcripts.choice();
		Transcripts.refreshTable();	
		
		setTimeout(function(){		
	//		alert("change");
			Transcripts.change();
			Transcripts.refreshTable();
			
			setTimeout(function(){	
	//			alert("variation");
				Transcripts.variation();
				Transcripts.refreshTable();		
				Transcripts.addGenData();
				Transcripts.refreshHighcharts();
			},1300);
			
		},1300);
			
	},1300);	
}

Transcripts.resetalgGraphe = function(){
	var resetBorder = "1px solid #121212";
	var higBorder = "2px solid #39A4DC";
	
	alg.caculate.css("border", resetBorder);
	alg.choice.css("border", resetBorder);
	alg.variation.css("border", resetBorder);
	alg.change.css("border", resetBorder);
	alg.endCondition.css("border", resetBorder);
	
	alg.bestUnit.css("border", higBorder);
	//判断是否符合终止条件							
	//运行变异动画
	setTimeout(function(){	
		alg.bestUnit.css("border", resetBorder);
		alg.end.css("border", higBorder);
		//判断是否符合终止条件							
		//运行变异动画
		
	},2000); 
}

Transcripts.runAlg = function(isShow){
	$("#box_mask3").fadeIn(1800);
	//alert("yunxing");
	var resetBorder = "1px solid #121212";
	var higBorder = "2px solid #39A4DC";
	
	alg.end.css("border", resetBorder);
	alg.start.css("border",higBorder);
	
	setTimeout(function(){
		alg.start.css("border", resetBorder);
		alg.code.css("border", higBorder);
		world.codeWorld.css("border",higBorder);
		//运行编码动画
		Transcripts.codeAnimate();

		setTimeout(function(){	
			
			world.codeWorld.css("border","");
			alg.code.css("border", resetBorder);
			alg.initPopulation.css("border", higBorder);
			world.initWorld.css("border", higBorder);
			//运行初始化代码
			Transcripts.initAnimate();
			Transcripts.initTable();
			
					
			setTimeout(function(){	

				alg.initPopulation.css("border", resetBorder);
				alg.caculate.css("border", higBorder);
				world.initWorld.css("border","");
				//计算适应度值
				Transcripts.refreshTable();
				Transcripts.addGenData();
				Transcripts.refreshHighcharts();
				
				setTimeout(function(){	

					alg.caculate.css("border", resetBorder);
					alg.choice.css("border", higBorder);
					world.choiceWorld.css("border", higBorder);			
					//选择动画
					Transcripts.choice();
					Transcripts.refreshAnimate();
					Transcripts.refreshTable();
					
					setTimeout(function(){	
						world.choiceWorld.css("border", "");
						alg.choice.css("border", resetBorder);
						alg.change.css("border", higBorder);
						world.changeWorld.css("border", higBorder);
						//运行交叉动画
						Transcripts.change();
						Transcripts.changeAnimate();
						Transcripts.refreshTable();

						setTimeout(function(){	
							world.changeWorld.css("border", "");
							alg.change.css("border", resetBorder);
							alg.variation.css("border", higBorder);
							world.variationWorld.css("border", higBorder);
							//运行变异动画
							Transcripts.variation()
							Transcripts.variationAnimate();
							Transcripts.refreshTable();
							
							
							
							setTimeout(function(){	
								world.variationWorld.css("border", "");
								alg.variation.css("border", resetBorder);
								alg.endCondition.css("border", higBorder);
								
								//判断是否符合终止条件							
								//运行变异动画
				
								setTimeout(function(){	
									alg.variation.css("border", resetBorder);
									alg.endCondition.css("border", higBorder);
									
									Transcripts.addGenData();
									Transcripts.refreshHighcharts();
									//判断是否符合终止条件							
									//运行变异动画
									if(genNum == 1){
										setTimeout(function(){	
											alg.endCondition.css("border", resetBorder);
											alg.bestUnit.css("border", higBorder);
											//判断是否符合终止条件							
											//运行变异动画
											setTimeout(function(){	
												alg.bestUnit.css("border", resetBorder);
												alg.end.css("border", higBorder);
												
												//判断是否符合终止条件							
												//运行变异动画
												
											},2000); 
										},2000); 	
									}
									else{									
										setTimeout(function(){	
											alg.endCondition.css("border", resetBorder);
											alg.caculate.css("border", higBorder);
											alg.choice.css("border", higBorder);
											alg.variation.css("border", higBorder);
											alg.change.css("border", higBorder);
											alg.endCondition.css("border", higBorder);
											$(document).scrollTop(486);
										    $("#box_maskImp").fadeIn(1800);
										    $("#box_mask1").fadeIn(1800);
											//终止动画 开始调用算法进行运行
											Transcripts.fastRunAlg();
											
										},3000); 																	
									}

								},3000); 
								
							},3000); 
							
						},5000); 
						
					},4000); 
					
					
				},4000); 
				
			},4000); 
			
		},4000); 
		
	},2000); 
}



