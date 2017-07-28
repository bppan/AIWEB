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
var colorList = [];
var table = {};
var curGenNum = 1;
var gendata = {};
var changMessage ={};
var variationMessage = {};
var changeProbability = 0.8;
var variationProbability = 0.006;

////////////////////////////////////////////NewNew
var ListPosition = {};
var highchartsview = null;
var cityDistance = {};


$(function(){
	//初始化网页
	Transcripts.drawGraph();
	Transcripts.initDistance();
	Transcripts.initContent();

});

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
    	Transcripts.initGenData()    
    });
    $("#box_mask3").fadeOut(1800);
    //绑定基本事件
    Transcripts.bindBaseEven();    
}

Transcripts.drawGraph = function(){
	Transcripts.generateCityPosition();
	Transcripts.drawLine();
	Transcripts.drawCityArc();
	Transcripts.wirteCityId();
	
	
}

Transcripts.drawBestRouteGraphe= function(){
	$("#canvasFrame").empty();	
	$("#canvasFrame").html("<canvas  id = 'canvas' width='940' height='405'>Your browser does not support the canvas element.</canvas>");
	Transcripts.drawBestRouteLine();
	Transcripts.drawCityArcBest();
	Transcripts.wirteCityId();

}
Transcripts.drawBestRouteLine= function(){
	var c=document.getElementById("canvas");
	var cxt = canvas.getContext("2d");	
	colorList = [];
	for(var i = 1; i < table.bestRoute.length;i++){
		cxt.beginPath();
		var sp= parseInt(table.bestRoute[i]);
		var ep= parseInt(table.bestRoute[i - 1]);		
		cxt.moveTo(ListPosition.posX[sp], ListPosition.posY[sp]);
		cxt.lineTo(ListPosition.posX[ep], ListPosition.posY[ep]);
		
	//	cxt.strokeStyle = "#39A4DC";
	    var linecolor = Transcripts.randColor();
		cxt.strokeStyle = linecolor;
		colorList.push(linecolor);
		cxt.lineWidth = 2;
		cxt.fill();
		cxt.stroke();
		cxt.closePath();
	}	
	
	
}

Transcripts.randColor = function(){
	var str = "0123456789ABCDEF"; 
	var color = "#";
	for(var j =0;j < 6; j++){
		var randl =  Math.floor(Math.random()*str.length);
		color = color + str[randl];
	}
	return color;
}

Transcripts.drawCityArc = function(){
	var c= document.getElementById("canvas");
	var cxt=c.getContext("2d");
	cxt.fillStyle="#4C4C4C";	
	var radius = 20;
	for(var i = 0; i < ListPosition.posX.length; i++){	
		cxt.beginPath();
		cxt.arc(ListPosition.posX[i],ListPosition.posY[i],radius,0,Math.PI*2,true);		
		cxt.closePath();
		cxt.fill();
	}
	
}

Transcripts.drawCityArcBest = function(){
	var c= document.getElementById("canvas");
	var cxt=c.getContext("2d");
	cxt.fillStyle="#4C4C4C";	
	var radius = 20;
	var startPoint = parseInt(table.bestRoute[0]);
	var endPoint = parseInt(table.bestRoute[table.bestRoute.length -1]);
	for(var i = 0; i < ListPosition.posX.length; i++){	
	
		if(i == startPoint){
			cxt.fillStyle="#419F4A";
		}
		else if(i === endPoint){
			cxt.fillStyle="#CA1515";
		}
		else{
			cxt.fillStyle="#4C4C4C";
		}
		cxt.beginPath();
		cxt.arc(ListPosition.posX[i],ListPosition.posY[i],radius,0,Math.PI*2,true);		
		cxt.closePath();
		cxt.fill();
	}
	
}

Transcripts.generateCityPosition = function(){	
	var td = 50;
	var tdwidth = 94;
	var startHeight = 25;
	var endHeight = 280;
	ListPosition.posX = [];
	ListPosition.posY = [];
	for(var i = 0; i < 10; i++){
		var trPosY = parseInt(startHeight + Math.floor(Math.random()*(endHeight -startHeight)));					
		ListPosition.posX.push(td);
		ListPosition.posY.push(trPosY);
		td+=tdwidth;
	}
	
}

Transcripts.wirteCityId = function(){
	var c= document.getElementById("canvas");
	var cxt=c.getContext("2d");
	var cxtf =c.getContext("2d");
	cxtf.fillStyle="#F9F8F8";	
	cxtf.font="20px Arial";
	for(var i = 0; i < 10; i++){
		cxtf.fillText(i,ListPosition.posX[i] - 6,ListPosition.posY[i]+6);
	}	
}


Transcripts.drawLine = function(){
	var c=document.getElementById("canvas");
	var cxt = canvas.getContext("2d");	
	for(var i = 1; i < ListPosition.posX.length;i++){
		cxt.beginPath();
		cxt.moveTo(ListPosition.posX[i], ListPosition.posY[i]);
		cxt.lineTo(ListPosition.posX[i - 1], ListPosition.posY[i - 1]);
		cxt.strokeStyle = "#39A4DC";
		cxt.lineWidth = 2;
		cxt.fill();
		cxt.stroke();
		cxt.closePath();
	}
}
Transcripts.initDistance = function(){
	
	var city = [];
	cityDistance.theCity = city;
	var startIndex = 5;
	var endIndex = 100;
	for(var i = 0; i < 10; i++){
		var thecity = [];
		for(var j = 0; j < 10; j++){
			var tempDis = startIndex + Math.floor(Math.random()*(endIndex -startIndex ));
			if(i == j){
				tempDis = 0;
			}				
			thecity.push(tempDis);
		}
		cityDistance.theCity.push(thecity);
	}
	Transcripts.showDistance();
}

Transcripts.showDistance = function(){
	
	for(var i = 0; i < 10; i++){
		var trid = "#t" + i;
		var tr = $($(trid + " td"));
		//alert(tr.length);
		for(var j = 1; j < tr.length;j++){
			$(tr[j]).html(cityDistance.theCity[i][j - 1]);
		}
	}
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

Transcripts.bindBaseEven = function () {
	control.input = $("#inputGenerate");	
	control.run = $("#run");	
	control.input.focus(function(){
		control.input.val("");
		
    });

	control.input.keydown(function(){
		Transcripts.wrongInput(0);
    });	
	
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
	table.best = 100000;
	table.allbest =100000;
	table.bestRoute = "";
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
	
	var tgen5 = {};
	tgen5.id = 5;
	tgen5.str = "";
	tgen5.ten = 0;
	tgen5.result = 0;
	tgen5.rat = 0;
	
	var tgens = [tgen1, tgen2,tgen3,tgen4,tgen5];
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
	for(var i = 0; i < 10; i++){
		randString =randString+i;
	}
	return randString;	
}
Transcripts.randGenList = function(){
	randGenList = [];
	for(var i = 0; i < 5; i++){
		var randString = Transcripts.randString();
		randGenList[i] = randString;
	}
	return randGenList;	
}

//选择
Transcripts.choice = function(){	
	var gens = [];
	for(var i = 0; i < table.genrationes.length;i++){		
		gens[i] = table.genrationes[i];
	}
	var nextgens = [];
	var ratRange = [];
	
	var sumRage = 0;
	for(var i = 0; i < gens.length; i++){
		sumRage += (1 - gens[i].rat);
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
		else if(rand < ratRange[4]){
			nextgens[i] = gens[4];
		}
	}
	for(var k = 0; k < nextgens.length;k++){		
		table.genrationes[k].str = nextgens[k].str;
		genList[k] = nextgens[k].str;
	}	
}
//变异
Transcripts.variation = function(){
	
	var variationRate = table.variation;
	
	for(var i = 0; i < genList.length;i++){
		var rand1 = Math.floor(Math.random()*genList[i].length);
		var rand2 = Math.floor(Math.random()*genList[i].length);
		while(rand1 == rand2){
			rand2 = Math.floor(Math.random()*genList[i].length);
		}
		
		var variationRand = Math.random();
		if(variationRand < variationRate){	
		//	alert(i + " : " + rand1 + " : " +rand2);
			var variationString = "";
			var tempchar1 = genList[i][rand1];
			var tempchar2 = genList[i][rand2];
			for(var j = 0; j < genList[i].length;j++){
				if( j==rand1){
					variationString = variationString + tempchar2;
				}
				else if(j ==rand2 ){
					variationString = variationString + tempchar1;
				}
				else{
					variationString = variationString + genList[i][j];
				}
			}
			genList[i] = variationString;
		}	
		
	}	
	
}
//交叉
Transcripts.change = function(){
	var changeRate = table.change;
	for(var i = 0; i < genList.length;i++){
		var rand1 = Math.floor(Math.random()*genList[i].length);
		var changRand = Math.random();
		var tempstr = "";
		var ischange = false;
		if(changRand < changeRate ){	
			ischange = true;
			for(var k = 0; k < rand1;k++){
				tempstr += genList[i][k];
			}
			for(var p = genList[i].length - 1; p >= rand1;p--){
				tempstr += genList[i][p];
			}
		}
		if(ischange){
			genList[i] = tempstr;	
		}		
	}	
}

//刷新表格
Transcripts.refreshTable = function(){
	table.id = curGenNum;
	var currsum = 0;
	var best = 100000;
	
	var bestRoute  = "";
	//alert(genList.length);
	for(var i = 0; i < genList.length;i++){
		table.genrationes[i].str = genList[i];
		var disctane = 0;
		for(var j = 1; j < genList[i].length;j++){
			
			var column = parseInt(genList[i][j]);
			var row = parseInt(genList[i][j - 1]);
			disctane += cityDistance.theCity[row][column];
		}
		table.genrationes[i].ten = disctane;
		table.genrationes[i].result = disctane;//适应度韩式 
		currsum = currsum + disctane;
		if(table.genrationes[i].result < best){
			bestRoute = table.genrationes[i].str;
			best = table.genrationes[i].result;
		}
	}
	//计算比值
	for(var j = 0; j < table.genrationes.length;j++){
		table.genrationes[j].rat = table.genrationes[j].result * 1.0 / currsum;
	}
	
	table.best = best;//最优值
	if(table.best < table.allbest){
		table.allbest = table.best;
		table.bestRoute = bestRoute;
		Transcripts.drawBestRouteGraphe();
	}
	table.average = currsum / table.genrationes.length; //平均值
	table.sum = currsum;//总值
	Transcripts.refreshViewTable();
}

Transcripts.refreshViewTable = function(){
	
	var title = $("#generationNum");
	title.html(table.id);
	//设置表格
	for(var i = 0; i < 5; i++){
		var genid = "g"+ (i + 1);
		var gen = $($("#" + genid + " td"));
		$(gen[0]).html(table.genrationes[i].id);
		$(gen[1]).html(table.genrationes[i].str);
		$(gen[2]).html(parseInt(table.genrationes[i].rat * 1000)/1000);
		$(gen[3]).html(table.change);
		$(gen[4]).html(table.variation);
		$(gen[5]).html(table.genrationes[i].ten);
		$(gen[6]).html(table.genrationes[i].result);
	}
	 $("#bestGen").html(table.best);	 
	 $("#avgGen").html(table.average);
	 $("#totalGen").html(table.sum);
	 $("#allbestGen").html(table.allbest);
	 
	 var rout = "";
	 for(var i = 0; i < table.bestRoute.length;i++ ){
		if(i == 0){
			rout = rout + table.bestRoute[i];
		}
		else{
			rout  = rout + "<span style = 'color:" + colorList[i - 1] + "'> ——> </span>" +table.bestRoute[i];
		}
		 
	 }
	 $("#allbestRoute").html(rout);

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
			$("#box_mask3").fadeOut(1800);
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

Transcripts.runAlg = function(isShow){
	$("#box_mask3").fadeIn(1800);
    //产生随机种群
	genList = Transcripts.randGenList();
	//运行初始化代码
	Transcripts.initTable();	
	Transcripts.refreshTable();	
	Transcripts.fastRunAlg();
}



