$(function() {
	var thArr;
	var tdArr;
	var classArr;
	var excelTable;
	var excelRows;
	var rowCount;
	var colCount;
	var thCells;
	var thObj;
	var nodeRecord = [];
	var currentId = 0;
	var maxFloor = 0;
	var everyFloorPos;
	var currentPos = 0;
	var minPos = 0;
	var maxPos = 0;
	$("#button").bind("mousedown", buttonHandler);

	function buttonHandler() {
		excelTable = document.getElementById("excelTable");
		excelRows = excelTable.rows;
		rowCount = excelRows.length;
		colCount = excelRows[0].cells.length;
		thCells = excelRows[0].cells;
		thArr = [];
		tdArr = new Array(colCount - 1);
		thObj = {};
		classArr = {};
		for (var i = 1; i < thCells.length; i++) {
			thArr.push($(thCells[i]).text());
			thObj[thArr[i - 1]] = i - 1;
			classArr[thArr[i - 1]] = [];
		}
		for (var i = 1; i < colCount; i++) {
			var tempArr = [];
			for (var j = 1; j < rowCount; j++) {
				var text = $(excelRows[j].cells[i]).text();
				if (classArr[thArr[i - 1]].indexOf(text) == -1) {
					classArr[thArr[i - 1]].push(text);
				}
				tempArr.push(text);
			}
			tdArr[i - 1] = tempArr.slice();
		}
		recur([], [], -1);
		everyFloorPos = new Array(maxFloor + 1);
		for (var i = 0; i < everyFloorPos.length; i++) {
			everyFloorPos[i] = 0;
		}
		setNodePos(0);
		displayResult();
	}

	function recur(attrName, attrNum, parentId) {
		// console.log("attrName " + JSON.stringify(attrName));
		var tempArr = new Array(colCount - 1 - attrNum.length);
		var tempCount;
		for (var i = 0; i < colCount - 1 - attrNum.length; i++) {
			tempArr[i] = [];
		}
		tempCount = 0;
		for (var i = 0; i < colCount - 1; i++) {
			if (attrNum.indexOf(i) == -1) {
				tempArr[tempCount].push(thArr[i]);
				tempCount++;
			}
		}
		for (var i = 0; i < rowCount - 1; i++) {
			var isFind = true;
			for (var j = 0; j < attrNum.length; j++) {
				if (tdArr[attrNum[j]][i] != attrName[j]) {
					isFind = false;
					break;
				}
			}
			if (isFind) {
				tempCount = 0;
				for (var j = 0; j < colCount - 1; j++) {
					if (attrNum.indexOf(j) == -1) {
						tempArr[tempCount].push(tdArr[j][i]);
						tempCount++;
					}
				}
			}
		}

		var MapObj = {};
		for (var i = 0; i < tempArr.length; i++) {
			var tempTh = tempArr[i][0];
			MapObj[tempTh] = {};
			for (var j = 1; j < tempArr[0].length; j++) {
				if (MapObj[tempTh][tempArr[i][j]] == undefined) {
					if (i == tempArr.length - 1) {
						MapObj[tempTh][tempArr[i][j]] = 0;
						if (MapObj[tempTh]["TOTAL"] == undefined) {
							MapObj[tempTh]["TOTAL"] = 0;
						}
					} else {
						MapObj[tempTh][tempArr[i][j]] = {};
					}
				}
				if (i == tempArr.length - 1) {
					MapObj[tempTh][tempArr[i][j]]++;
					MapObj[tempTh]["TOTAL"]++;
				} else {
					if (MapObj[tempTh][tempArr[i][j]][tempArr[tempArr.length - 1][j]] == undefined) {
						MapObj[tempTh][tempArr[i][j]][tempArr[tempArr.length - 1][j]] = 1;
						if (MapObj[tempTh][tempArr[i][j]]["TOTAL"] == undefined) {
							MapObj[tempTh][tempArr[i][j]]["TOTAL"] = 1;
						} else {
							MapObj[tempTh][tempArr[i][j]]["TOTAL"]++;
						}
					} else {
						MapObj[tempTh][tempArr[i][j]][tempArr[tempArr.length - 1][j]]++;
						MapObj[tempTh][tempArr[i][j]]["TOTAL"]++;
					}
				}
			}
		}

		var resAttrName = tempArr[tempArr.length - 1][0];
		var resAttrObj = MapObj[resAttrName];
		var beforeEntropy = 0;
		var isStop = false;
		var maxAttr = "";
		for (var i in resAttrObj) {
			if (i != "TOTAL") {
				if (resAttrObj[i] == resAttrObj["TOTAL"]) {
					isStop = true;
					maxAttr = i;
					break;
				}
				beforeEntropy += (-resAttrObj[i] / resAttrObj["TOTAL"] * Math.log2(resAttrObj[i] / resAttrObj["TOTAL"]));
			}
		}

		if (!isStop) {
			var entropyObj = {};
			for (var i in MapObj) {
				if (i != resAttrName) {
					entropyObj[i] = 0;
					var tempAttrObj = MapObj[i];
					for (var j in tempAttrObj) {
						var sonEntropy = 0;
						var tempSonAttrObj = tempAttrObj[j];
						for (var k in tempSonAttrObj) {
							if (k != "TOTAL") {
								sonEntropy += (-tempSonAttrObj[k] / tempSonAttrObj["TOTAL"] * Math.log2(tempSonAttrObj[k] / tempSonAttrObj["TOTAL"]));
							}
						}
						entropyObj[i] += tempSonAttrObj["TOTAL"] / (tempArr[0].length - 1) * sonEntropy;
					}
				}
			}
			// console.log("MapObj " + JSON.stringify(MapObj));
			// console.log("entropyObj " + JSON.stringify(entropyObj));
			for (var i in entropyObj) {
				entropyObj[i] = beforeEntropy - entropyObj[i];
			}
			maxGain = -100;
			var maxAttr = "";
			for (var i in entropyObj) {
				if (entropyObj[i] > maxGain) {
					maxGain = entropyObj[i];
					maxAttr = i;
				}
			}
		}
		var node = {};
		node.id = currentId;
		if (parentId != -1) {
			nodeRecord[parentId].sonId.push(node.id);
		}
		currentId++;
		node.sonId = [];
		node.parentId = parentId;
		node.parentAttr = attrName[attrName.length - 1];
		node.attrName = maxAttr;
		if (parentId == -1) {
			node.floor = 0;
		} else {
			node.floor = nodeRecord[node.parentId].floor + 1;
		}
		if (node.floor > maxFloor) {
			maxFloor = node.floor;
		}
		if (isStop) {
			node.isFinalNode = true;
		} else {
			node.isFinalNode = false;
		}
		nodeRecord.push(node);
		// console.log("maxAttr " + maxAttr);
		if (!isStop) {
			var tempAttrNum = attrNum.slice();
			tempAttrNum.push(thObj[maxAttr]);
			for (var i in classArr[maxAttr]) {
				var tempAttrName = attrName.slice();
				tempAttrName.push(classArr[maxAttr][i]);
				recur(tempAttrName, tempAttrNum, node.id);
			}
		}
	}

	function setNodePos(idx) {
		var sonSet = nodeRecord[idx].sonId;
		var floor = nodeRecord[idx].floor;
		if (sonSet) {
			for (var i = 0; i < sonSet.length; i++) {
				(nodeRecord.length > sonSet[i]) && setNodePos(sonSet[i]);
			}
		}
		if (sonSet.length) {
			nodeRecord[idx].posNum = (nodeRecord[sonSet[0]].posNum + nodeRecord[sonSet[sonSet.length - 1]].posNum) / 2;
			everyFloorPos[floor] = nodeRecord[idx].posNum;
		} else {
			nodeRecord[idx].posNum = ++everyFloorPos[floor];
		}
	}

	function displayResult() {
		var algorithmDisplay = document.getElementById("algorithmDisplay");
		var midPos = 400;
		var midPosNum = nodeRecord[0].posNum;
		var rowDis = 180;
		var colDis = 200;
		var currentIdx = 0;
		setTimeout(displayHandler, 1000);
		function displayHandler(){
			var tempNode = nodeRecord[currentIdx];
			var tempPosNum = tempNode.posNum;
			var floor = tempNode.floor;
			var parentAttr = tempNode.parentAttr;
			var attrName = tempNode.attrName;
			var parentId = tempNode.parentId;
			// 展示方框内容
			var displaySpan = document.createElement("span");
			var left = midPos + (tempPosNum - midPosNum) * colDis;
			var top = rowDis * floor + 80;
			tempNode.left = left;
			tempNode.top = top;
			$(displaySpan).attr("class", "displaySpan");
			$(displaySpan).css("left", left);
			$(displaySpan).css("top", top);
			$(displaySpan).text(attrName);
			$(algorithmDisplay).append(displaySpan);
			// 展示方框上的属性
			var tipSpan = document.createElement("span");
			$(tipSpan).attr("class", "tipSpan");
			$(tipSpan).css("left", left + 25);
			$(tipSpan).css("top", top - 30);
			$(tipSpan).text(parentAttr);
			$(algorithmDisplay).append(tipSpan);
			// 画线
			if (currentIdx != 0) {
				var canvas = document.getElementById("canvasLine");
				var parentLeft = nodeRecord[parentId].left;
				var parentTop = nodeRecord[parentId].top;
				var c = canvas.getContext("2d");
				c.beginPath();
				c.moveTo(parentLeft + 75, parentTop + 60);
				c.lineTo(left + 75, top);
				c.strokeStyle = "#39A4DC";
				c.lineWidth = 2;
				c.fill();
				c.stroke();
				c.closePath();
			}
			currentIdx++;
			if(currentIdx < nodeRecord.length){
				setTimeout(displayHandler, 1000);
			}
		}
	}
	
	$('#inputFile').change(function(){
		str=$(this).val();
		if(str != ""){
		var arr = str.split("\\");
		str = arr[arr.length - 1];
		$("#fileName").val(str);
		}
	});
});

function alertFunc() {
	alert("上传文件有误");
	$("#alert_box").show();
    $("#alert_errorMsg").html("恭喜你获胜！");
}

