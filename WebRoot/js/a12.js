$(function() {
	var totalCount = 0;
	var border, width, height;
	var antWidth = 20,
		antHeight = 20;
	var topRoad;
	var downRoad;
	var midRoadArr = [];
	var midRoadObstacleArr = [];
	var roadNum = [];
	var appearAntArr = [];
	var disappearAntArr = [];
	var antInforObj = {};
	var roadInforObj = {};
	var dirCol = [0, 1, -1, 0];
	var dirRow = [-1, 0, 0, 1];
	setMapData();
	var spanSet = $("#head1");
	setSpan();
	setAnt();
	$("#button").bind("mousedown", function() {
		$("#button").unbind("mousedown");
		setTimeout(everyStepHandler, 500);
	});
	$("#clearButton").bind("mousedown", function(){
		location.reload();
	});
	function setMapData() {
		topRoad = Math.floor(Math.random() * 10);
		downRoad = Math.floor(Math.random() * 10);
		var midRoadNum = Math.ceil(Math.random() * 2) + 1;
		for (var i = 0; i < midRoadNum; i++) {
			while (1) {
				var tempNum = Math.floor(Math.random() * 10);
				if (midRoadObstacleArr.indexOf(tempNum) == -1) {
					midRoadObstacleArr.push(tempNum);
					midRoadArr.push(tempNum);
					if (tempNum > 1 && midRoadObstacleArr.indexOf(tempNum - 1) == -1) {
						midRoadObstacleArr.push(tempNum - 1);
					}
					if (tempNum < 9 && midRoadObstacleArr.indexOf(tempNum + 1) == -1) {
						midRoadObstacleArr.push(tempNum + 1);
					}
					break;
				}
			}
		}
	}

	function setSpan() {
		for (var i = 0; i < 7; i++) {
			for (var j = 0; j < 10; j++) {
				var isRoad = true;
				var newSpan = document.createElement("span");
				$(newSpan).attr("class", "generalSpan");
				$(newSpan).attr("id", "span" + (i * 10 + j))
				if (i == 0) {
					if (j != topRoad) {
						isRoad = false;
						$(newSpan).attr("class", "hiddenSpan");
					} else {
						$(newSpan).text("¶´Ñ¨");
					}
				}
				if (i == 2 || i == 3 || i == 4) {
					if (midRoadArr.indexOf(j) == -1) {
						$(newSpan).attr("class", "obstacleSpan");
						isRoad = false;
					}
				}
				if (i == 6) {
					if (j != downRoad) {
						$(newSpan).attr("class", "hiddenSpan");
						isRoad = false;
					}else{
						$(newSpan).text("Ê³Îï");
					}
				}
				border = parseInt($("#head1 span").css("border"));
				width = parseInt($("#head1 span").css("width"));
				height = parseInt($("#head1 span").css("height"));
				$(newSpan).css({
					left: j * (border + width),
					top: i * (border + height)
				});
				// $(newSpan).css("zIndex", i * 9 + j);
				$(spanSet).append(newSpan);
				if (isRoad) {
					roadInforObj[i * 10 + j] = 0;
					roadNum.push(i * 10 + j);
				}
			}
		}
	}

	function setAnt() {
		var topSpan = $("#span" + topRoad);
		var topSpanLeft = parseInt(topSpan.css("left"));
		var tempLeft, tempTop;
		for (var i = 0; i < 200; i++) {
			disappearAntArr.push(i);
			tempLeft = Math.random() * 40 + topSpanLeft;
			tempTop = Math.random() * 38;
			var antImg = document.createElement("img");
			antImg.src = "images/ant.png";
			$(antImg).attr("class", "ant");
			$(antImg).css("left", tempLeft);
			$(antImg).css("top", tempTop);
			$(antImg).attr("id", "ant" + i);
			spanSet.append(antImg);
			antInforObj[i] = {};
			antInforObj[i]["passArr"] = [];
			antInforObj[i]["passTimeObj"] = {};
			for (var j = 0; j < roadNum.length; j++) {
				antInforObj[i]["passTimeObj"][roadNum[j]] = 0;
			}
			antInforObj[i]["notPassArr"] = roadNum.slice();
			antInforObj[i]["pos"] = 0;
			antInforObj[i]["status"] = "down";
			antInforObj[i]["dir"] = 0;
		}
	}

	function everyStepHandler() {
		console.log("topRoad " + topRoad);
		for (var i = 0; i < roadInforObj.length; i++) {
			if (roadInforObj[i] > 0) {
				roadInforObj[i] -= 2;
			}
		}
		for (var i = 0; i < appearAntArr.length; i++) {
			var tempDirArr = [];
			var tempNum = appearAntArr[i];
			var tempAntInfor = antInforObj[tempNum];
			var tempAntObj = $("#ant" + tempNum);
			var nextPos = -1;
			var maxPheromone = -100;
			var maxPassTime = 0;
			var curPos = tempAntInfor.pos;
			var curRow = Math.floor(curPos / 10);
			var curCol = curPos % 10;
			var nextCol = -1;
			var canPassNum = -1;
			for (var j = 0; j < roadInforObj.length; j++) {
				if (roadInforObj[j] > 2) {
					roadInforObj[j] -= 2;
				} else {
					roadInforObj[j] = 0;
				}
			}
			while (tempDirArr.length != 3) {
				var __num = Math.floor(Math.random() * 3);
				if (tempDirArr.indexOf(__num) == -1) {
					tempDirArr.push(__num);
				}
			}
			if (tempAntInfor["status"] == "down") {
				for (var j = 0; j < 3; j++) {
					tempDirArr[j]++;
				}
			}
			for (var j = 0; j < 3; j++) {
				var newRow = curRow + dirRow[tempDirArr[j]];
				var newCol = curCol + dirCol[tempDirArr[j]];
				var newPos = newRow * 10 + newCol;
				if (newCol >= 0 && newCol <= 9 && newRow >= 0 && newRow <= 6) {
					if (roadNum.indexOf(newPos) != -1) {
						if (newPos == downRoad + 60 && tempAntInfor["status"] == "down") {
							nextPos = newPos;
							maxPheromone = roadInforObj[newPos];
							nextCol = newCol;
							for (var k in tempAntInfor["passTimeObj"]) {
								if (tempAntInfor["passTimeObj"][k] != 0) {
									roadInforObj[k] += (10 / tempAntInfor["passTimeObj"][k]);
								}
							}
							break;
						} else if (newPos == topRoad && tempAntInfor["status"] == "up") {
							nextPos = newPos;
							maxPheromone = roadInforObj[newPos];
							nextCol = newCol;
							break;
						}
						canPassNum = newPos;
						if (tempAntInfor["passArr"].indexOf(newPos) == -1) {
							if (roadInforObj[newPos] > maxPheromone && Math.random() > 0.03) {
								maxPheromone = roadInforObj[newPos];
								nextPos = newPos;
								nextCol = newCol;
							}
						} else {
							if (nextPos == -1 && Math.random() > 0.03) {
								nextPos = newPos;
								maxPassTime = tempAntInfor["passTimeObj"][nextPos];
								nextCol = newCol;
							} else if (maxPheromone == roadInforObj[newPos] && tempAntInfor["passTimeObj"][newPos] < maxPassTime && Math.random() > 0.03) {
								nextPos = newPos;
								maxPassTime = tempAntInfor["passTimeObj"][nextPos];
								nextCol = newCol;
							}
						}
					}
				}
			}
			if (nextPos == -1) {
				nextPos = canPassNum;
			}
			tempAntInfor["passTimeObj"][nextPos]++;
			if (nextPos == topRoad) {
				if (tempAntInfor["status"] == "up") {
					for (var j = 0; j < roadNum.length; j++) {
						tempAntInfor["passTimeObj"][roadNum[j]] = 0;
					}
					tempAntInfor["notPassArr"] = roadNum.slice();
					tempAntInfor["passArr"] = [];
					tempAntInfor["status"] = "down";
				}
			} else if (nextPos == downRoad + 60) {
				if (tempAntInfor["status"] == "down") {
					for (var j = 0; j < roadNum.length; j++) {
						tempAntInfor["passTimeObj"][roadNum[j]] = 0;
					}
					tempAntInfor["notPassArr"] = roadNum.slice();
					tempAntInfor["passArr"] = [];
					roadInforObj[nextPos] += 20;
					tempAntInfor["status"] = "up";
				}
			}
			tempAntInfor.pos = nextPos;
			var tempPos = tempAntInfor["notPassArr"].indexOf(nextPos);
			if (tempPos != -1) {
				tempAntInfor["notPassArr"].splice(tempPos, tempPos + 1);
			}
			tempPos = tempAntInfor["passArr"].indexOf(nextPos);
			if (tempPos == -1) {
				tempAntInfor["passArr"].push(nextPos);
			}
			if (nextCol < curCol) {
				tempAntObj.css({
					'filter': 'fliph',
					'-moz-transform': 'matrix(-1, 0, 0, 1, 0, 0)',
					'-webkit-transform': 'matrix(-1, 0, 0, 1, 0, 0)'
				});
			} else if (nextCol > curCol) {
				tempAntObj.css({
					'filter': 'fliph',
					'-moz-transform': 'matrix(1, 0, 0, 1, 0, 0)',
					'-webkit-transform': 'matrix(1, 0, 0, 1, 0, 0)'
				});
			}
			var tempSpan = $("#span" + nextPos);
			if (nextPos === 0 && topRoad === 0) {
				var tempLeft = Math.random() * 40;
				var tempTop = Math.random() * 40;
			} else {
				var tempLeft = parseInt(tempSpan.css("left")) + Math.random() * 40;
				var tempTop = parseInt(tempSpan.css("top")) + Math.random() * 40;
			}

			tempAntObj.animate({
				left: tempLeft,
				top: tempTop
			}, 500);
		}

		var appearNum = (disappearAntArr.length >= 10) ? 10 : disappearAntArr.length;
		for (var i = 0; i < appearNum; i++) {
			var tempNum = disappearAntArr.splice(0, 1)[0];
			appearAntArr.push(tempNum);
			var tempAnt = $("#ant" + tempNum);
			tempAnt.show();
			var tempAntInfor = antInforObj[tempNum];
			tempAntInfor["pos"] = topRoad;
			var tempIndex = tempAntInfor["notPassArr"].indexOf(topRoad);
			tempAntInfor["notPassArr"].splice(tempIndex, tempIndex + 1);
			tempAntInfor["passArr"].push(topRoad);
			roadInforObj[topRoad] += 10;
		}
		totalCount++;
		setTimeout(everyStepHandler, 500);
	}
});