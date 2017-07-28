

var basePath = 'http://localhost:8080/AIWEB16';
var Transcripts = Transcripts || {};
var databaseDB = [];
var minsupport = 2;

$(function(){
	//初始化网页
	Transcripts.initTable();
	Transcripts.initDB();
	Transcripts.bindBaseEven();
});

Transcripts.initDB = function(){
	var tabletres = $("tr");		
	databaseDB = [];
	for(var i = 0; i < tabletres.length - 1; i++){
		var keyValue = {};
		var tabledbid = $("#id" + i);	
		var tabledbvalue = $("#idc" + i);	
		var dbid = parseInt(tabledbid.html());
		var dbvalue = tabledbvalue.val();
		keyValue.key = dbid;
		keyValue.value = dbvalue;
		databaseDB.push(keyValue)
	}	
	minsupport = parseInt($("#min").val());
}

Transcripts.initTable = function(){
	var initString = [];
	initString.push("A C D");
	initString.push("B C E");
	initString.push("A B C E");
	initString.push("B E");
	initString.push("B D");
	var tabletres = $("tr");		
	for(var i = 0; i < tabletres.length - 1; i++){
		var tabledbvalue = $("#idc" + i);	
		tabledbvalue.val(initString[i]);
	}	
	$("#min").val(2);
} 




Transcripts.bindBaseEven = function(){		
	
	$("#runButton").click(function () {		
		Transcripts.runAlg();	
    });
	var maxLeft = 10000;
	var minLeft = -10000;
	
	var maxTop = 10000;
	var minTop = -10000;
	
	$("#algorithmDisplayWrap").bind("mousedown", displayDrag);
	function displayDrag(event) {
		event.stopPropagation();
		var oldX = event.pageX;
		var oldY = event.pageY;
		$(this).bind("mousemove", function(event) {
			event.stopPropagation();
			var deltaX = event.pageX - oldX;
			var deltaY = event.pageY - oldY;
			oldX = event.pageX;
			oldY = event.pageY;
			var left = $("#algorithmDisplay").css("left");
			var top = $("#algorithmDisplay").css("top");
			
			var newLeft = parseInt(left) + deltaX;
			var newTop =  parseInt(top) + deltaY;
			
			if (newLeft > maxLeft) {
				newLeft = maxLeft;
			}
			if (newLeft < minLeft) {
				newLeft = minLeft;
			}
			
			if (newTop > maxTop) {
				newTop = maxTop;
			}
			if (newTop < minTop) {
				newTop = minTop;
			}
			
			$("#algorithmDisplay").css("left", newLeft);
			$("#algorithmDisplay").css("top", newTop);
		});
		$(this).bind("mouseout mouseleave mouseup", function(event) {
			$(this).unbind("mousemove mouseleave mouseup mouseout");
		});
	}
};

Transcripts.runAlg = function(){	
	
    if($('#runButton').html() == "正在运行...") {
        return;
    }
    if(parseInt($("#min").val()) <= 1){
    	 alert("请输入大于1的支持度");
    	 return;
    }
    Transcripts.reset();
	Transcripts.initDB();  
	$("#runButton").html("正在运行...").css("cursor", "default");

	$(document).scrollTop(110);
	var coordinate = {};
	var tempC = {};
	var temSet = [];
	//计算支持度
	for(var i = 0; i < databaseDB.length; i++){
		var str = databaseDB[i].value.split(" ");
		for(var p = 0; p < str.length; p++){
			if(!isInSet(temSet, str[p])){
				temSet.push(str[p]);
			}
		}
	}
	tempC.set = temSet;
	var leftLocation = 0;
	var coordinateX1 = [];
	var coordinateY1 = [];
	var coordinateX2 = [];
	var coordinateY2 = [];
	var creatElementTop = 30;
	var numberCount = 1;
	do{
		tempC.sup = [];
		var temSup = [];
		var count = 0;
		for(var i = 0; i < tempC.set.length; i++){
			var tempchar = tempC.set[i];
			for(var p = 0; p < databaseDB.length; p++){
				if(isInSet(databaseDB[p].value.split(" "), tempchar)){
					count++;
				}
			}
			temSup.push(count);
			count = 0;
		}
		tempC.sup = temSup;
		//显示支持度表格
		creatC(tempC,leftLocation,creatElementTop,numberCount);
		//筛选之支持度
		var supL = {};
		var supSet =[];
		var supSup =[];
		for(var i = 0; i < tempC.sup.length; i++){
			if(tempC.sup[i] >= minsupport){
				supSet.push(tempC.set[i]);
				supSup.push(tempC.sup[i]);		
			}
		}
		supL.set = supSet;
		supL.sup = supSup;
		//保存直线坐标
		coordinateX1.push(leftLocation + 200);
		coordinateX2.push(leftLocation + 300);
		//绘制筛选后的支持度表格
		leftLocation = leftLocation + 200 + 100;
		creatL(supL, leftLocation, creatElementTop,numberCount);

		if(supL.set.length != 1){
			numberCount++;
			var allarray = creatArrayItem(supL.set);		
			coordinateX1.push(leftLocation + 200);
			coordinateX2.push(leftLocation + 300);
			leftLocation = leftLocation + 200 + 100;
			//绘制全排列表格
			creatArray(allarray,leftLocation, creatElementTop,numberCount);
			tempC.set = [];
			tempC.set = allarray;	
		}
		if(supL.set.length != 1){
			
			coordinateX1.push(leftLocation + 200);
			coordinateX2.push(leftLocation + 300);
		}
		leftLocation = leftLocation + 200 + 100;
	}while(supL.set.length != 1);	
	
	
	//计算y坐标
	for(var i = 1; i < $("span").length; i++){
		var tempy1 =  parseInt($($("span")[i - 1]).css("height"))/2 + parseInt($($("span")[i - 1]).css("top"));
		var tempy2 =  parseInt($($("span")[i]).css("height"))/2 + parseInt($($("span")[i]).css("top"));
		coordinateY1.push(tempy1);
		coordinateY2.push(tempy2);
	}
	coordinate.X1 = coordinateX1;
	coordinate.Y1 = coordinateY1;
	coordinate.X2 = coordinateX2;
	coordinate.Y2 = coordinateY2;
	
	//Transcripts.drawLine(coordinate);
	
	
	Transcripts.animate(coordinate);
	
	

	
	//$($("span")[0]).fadeIn(3000, function(){$($("span")[1]).fadeIn(3000);});
	
	
	function creatArrayItem(itemset){
		var arrayset = [];
		for(var i = 0; i < itemset.length;i++){
			for(p = i + 1; p < itemset.length; p++){				
				var str = combineStr(itemset[i], itemset[p]);
				arrayset.push(str);
			}
		}
		var temSet =[];
		for(var i = 0; i < arrayset.length; i++){
			if(i == 0){
				temSet.push(arrayset[i]);
			}
			else{
				for(var p = 0; p < temSet.length; p++){
					var isind = false;
					if(isInSet(temSet[p].split(" "), arrayset[i]) && (temSet[p].length == arrayset[i].length)){
						isind = true;
					}		
				}
				if(!isind){
					temSet.push(arrayset[i])
				}
			}
		}
		return temSet;
	}
	function combineStr(str1, str2){	
		var comstr = str1;	
		for(var i = 0; i < str2.split(" ").length; i++){
			if(!isInSet(str1.split(" "), str2.split(" ")[i])){
				comstr = comstr + " " +  str2.split(" ")[i];
			}
		}
		
		return comstr;
	}
	
	function isTarget(theSup, minsupport){
		for(var i = 0; i < theSup.length; i++){
			if(theSup[i] > minsupport){
				return true;
			}
		}
		return false;
	}
	
	function isInSet(theTempSet, thechar){
		var tempchar = thechar.split(" ");
		for(var p = 0; p < tempchar.length;p++){
			var isFind = false;
			for(var i = 0; i < theTempSet.length; i++){
				if(tempchar[p] == theTempSet[i]){
					isFind = true;
					break;
				}
			}
			if(!isFind){
				return false;
			}

		}		
		return true;
	}
	
	function creatC(thetempC, theleft, thetop,numberCount){
		var newElemnt = "<p style = 'display:none;position:absolute; left:"+(theleft+90) +"px; top:"+10+"px'>" + "<b>C"+numberCount+
		"</b></p><span class = 'tc faw ft15' style = 'left: "+theleft+ 
		"px; top:"+thetop+"px;position:absolute;display:none'><table width='200' border='1' >"+
		"<tr style = 'background:#19a569; color:white; border:2px;'><td>itemSet</td><td>sup</td></tr>";
		for(var i = 0; i < thetempC.set.length; i++){
			if(thetempC.sup[i] < minsupport){
				newElemnt = newElemnt + "<tr height='25' style = 'background:#FF8080'><td>"+thetempC.set[i]+"</td><td>" + thetempC.sup[i]+"</td></tr>";
			}
			else{
				newElemnt = newElemnt + "<tr height='25'><td>"+thetempC.set[i]+"</td><td>" + thetempC.sup[i]+"</td></tr>";
			}
			
		}
		newElemnt = newElemnt + "</table></span>";
		$("#algorithmDisplay").append(newElemnt);
	}
	
	function creatL(thesupL, theleft, thetop,numberCount){
		var newElemnt = "<p style = 'display:none;position:absolute; left:"+(theleft+90) +"px; top:"+10+"px'>" + "<b>L"+numberCount+
		"</b></p>"+"<span class = 'tc faw ft15' style = 'display:none;left: "+theleft+ "px; top:"+thetop+"px;position:absolute;'><table width='200' border='1' >"+
		"<tr style = 'background:#19a569; color:white; border:2px;'><td>itemSet</td><td>sup</td></tr>";
		for(var i = 0; i < thesupL.set.length; i++){
			newElemnt = newElemnt + "<tr height='25'><td>"+thesupL.set[i]+"</td><td>" + thesupL.sup[i]+"</td></tr>";
		}
		newElemnt = newElemnt + "</table></span>";
		$("#algorithmDisplay").append(newElemnt);
	}
	
	function creatArray(theallArray, theleft, thetop,numberCount){
		var newElemnt = "<p style = 'display:none;position:absolute; left:"+(theleft+90) +"px; top:"+10+"px'>" + "<b>C"+numberCount+
		"</b></p>"+"<span class = 'tc faw ft15' style = 'display:none;left: "+theleft+ "px; top:"+thetop+"px;position:absolute;'><table width='200' border='1' >"+
		"<tr style = 'background:#19a569; color:white; border:2px;'><td>itemSet</td></tr>";
		for(var i = 0; i < theallArray.length; i++){
	
			newElemnt = newElemnt + "<tr height='25'><td>"+theallArray[i]+"</td></tr>";
		}
		newElemnt = newElemnt + "</table></span>";
		$("#algorithmDisplay").append(newElemnt);
	}
};

Transcripts.drawLine = function(coordinate, num){	
	var canvas = document.getElementById("canvasLine");
	var c = canvas.getContext("2d");
	c.beginPath();
	c.moveTo(coordinate.X1[num], coordinate.Y1[num]);
	c.lineTo(coordinate.X2[num], coordinate.Y2[num]);
	c.strokeStyle = "#39A4DC";
	c.lineWidth = 2;
	c.fill();
	c.stroke();
	c.closePath();
	
	if(coordinate.X2[num] + 200> 950){
		var newleft = parseInt($("#algorithmDisplay").css("left"));
		 $("#algorithmDisplay").animate({left:(newleft -300) + 'px'});
		//$("#algorithmDisplay").css("left", newleft -300);
	}
} 

Transcripts.animate = function(coordinate){	
	var element = $("span");
	var p = 0;
	var linep = 0;
	var distance = 0;
	continualAnimate(p, linep, distance);
	
	function continualAnimate(p, linep, distance){
		var timeset = setInterval(function(){
			if(p > element.length){
				$("#runButton").html("运行").css("cursor", "pointer");
				clearInterval(timeset);
			}
			if(p == (distance*3) && p < element.length){			
					distance++;
					clearInterval(timeset);
					if(p != coordinate.X1.length){
						Transcripts.ScanDbAnimate();
						setTimeout(function(){continualAnimate(p, linep, distance);},5000);	
					}							
		    }
			else{
				$($("p")[p + 2]).fadeIn(1000);
				$($("span")[p]).fadeIn(1000, function(){Transcripts.drawLine(coordinate, linep);linep++;});
				p++;
			}
		}, 1500);	
	}
	
}

Transcripts.ScanDbAnimate = function(){
	var tabletres = $("tr");			
	var p = 1;	
	var timeset = setInterval(function(){
		if(p > databaseDB.length){
			var inputext  = $("#idc" + (p - 2));
			var tabletr  = $(tabletres[p -1]);	
			
			tabletr.css("background","#fff");
			inputext.css("background","#fff");
			clearInterval(timeset);
		}
		else{
			if(p > 1){
				var inputext  = $("#idc" + (p - 2));	
				var tabletr  = $(tabletres[p -1]);	
				tabletr.css("background","#fff");
				inputext.css("background","#fff");
			}
			var inputext  = $("#idc" + (p - 1));	
			var tabletr  = $(tabletres[p]);	
			tabletr.css("background","#A6C0E5");
			inputext.css("background","#A6C0E5");
			p++;
		}
	}, 1000);	
} 

Transcripts.reset = function(){
	$("#algorithmDisplay").empty();
	$("#algorithmDisplay").css("left", 20);
	$("#algorithmDisplay").css("top", 30);
	$("#algorithmDisplay").append("<canvas id = 'canvasLine' width='20000' height='300'></canvas>");
}



