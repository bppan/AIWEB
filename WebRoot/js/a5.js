$(function() {
	var openSet = [];
	var openIdSet = [];
	var closeSet = [];
	var closeIdSet = [];
	var spanSet = $("#head1");
	setSpan(spanSet);
	var startPos = 20;
	var endPos = 24;
	var obstaclePos = [13, 22, 31];
	var endRow = 2;
	var endCol = 6;
	var delayTime = 4000;

	function setSpan(spanSet) {
		var border, width, height;
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 9; j++) {
				var newSpan = document.createElement("span");
				$(newSpan).attr("class", "generalSpan");
				border = parseInt($("#head1 span").css("border"));
				width = parseInt($("#head1 span").css("width"));
				height = parseInt($("#head1 span").css("height"));
				$(newSpan).css({
					left: j * (border + width),
					top: i * (border + height)
				});
				$(newSpan).css("zIndex", i * 9 + j);
				$(spanSet).append(newSpan);
				var txtSpan1 = document.createElement("span");
				$(txtSpan1).attr("class", "txtSpan1");
				$(txtSpan1).css({
					left: j * 91 + 5,
					top: i * 91 + 5
				})
				$(spanSet).append(txtSpan1);
				var txtSpan2 = document.createElement("span");
				$(txtSpan2).attr("class", "txtSpan2");
				$(txtSpan2).css({
					left: j * 91 + 5,
					top: i * 91 + 70
				})
				$(spanSet).append(txtSpan2);
				var txtSpan3 = document.createElement("span");
				$(txtSpan3).attr("class", "txtSpan3");
				$(txtSpan3).css({
					left: j * 91 + 56,
					top: i * 91 + 70
				})
				$(spanSet).append(txtSpan3);
			}
		}
		var startSpan = document.createElement("span");
		$(startSpan).attr("id", "startSpan");
		$(startSpan).css({
			left: 2 * (border + width) + 2,
			top: 2 * (border + height) + 2
		});
		$(startSpan).css("zIndex", 200);
		$(spanSet).append(startSpan);
		var endSpan = document.createElement("span");
		$(endSpan).attr("id", "endSpan");
		$(endSpan).css({
			left: 6 * (border + width) + 2,
			top: 2 * (border + height) + 2
		});
		$(endSpan).css("zIndex", 200);
		$(spanSet).append(endSpan);
		var obstacleSpan = document.createElement("span");
		$(obstacleSpan).attr("id", "obstacleSpan");
		$(obstacleSpan).css({
			left: 4 * (border + width) + 2,
			top: 1 * (border + height) + 2
		});
		$(obstacleSpan).css("zIndex", 200);
		$(spanSet).append(obstacleSpan);
	}

	$("#subSpeed").bind("mousedown", function(event) {
		if (delayTime + 2000 <= 10000) {
			delayTime += 2000;
		}
	});

	$("#addSpeed").bind("mousedown", function(event) {
		if (delayTime - 2000 > 0) {
			delayTime -= 2000;
		}
	});

	$("#startSpan").attr("tabIndex", 1);
	$("#endSpan").attr("tabIndex", 1);
	$("#obstacleSpan").attr("tabIndex", 1);
	$("#startSpan").bind("focus", focusHandler);
	$("#endSpan").bind("focus", focusHandler);
	$("#obstacleSpan").bind("focus", focusHandler);
	$("#startSpan").bind("blur", blurHandler);
	$("#endSpan").bind("blur", blurHandler);
	$("#obstacleSpan").bind("blur", blurHandler);

	var goCode = [87, 38, 68, 39, 83, 40, 65, 37];
	var goRow = [-1, -1, 0, 0, 1, 1, 0, 0];
	var goCol = [0, 0, 1, 1, 0, 0, -1, -1];
	var posChange = [-9, -9, 1, 1, 9, 9, -1, -1];

	function focusHandler() {
		var __this = this;
		$(this).css("borderColor", "#39A4DC");
		var width = parseInt($(this).css("width"));
		var height = parseInt($(this).css("height"));
		var border = parseInt($(this).css("border"));
		var rowNum = Math.ceil((height + 2 * border) / 91);
		var colNum = Math.ceil((width + 2 * border) / 91);
		var left, top, newLeft, newTop;
		var newStartPos, newEndPos, newObstaclePos = [],
			isChangPos;
		$(document).bind("keydown", function(event) {
			event.preventDefault();
			left = parseInt($(__this).css("left"));
			top = parseInt($(__this).css("top"));
			var codeIndex = goCode.indexOf(event.keyCode);
			if (codeIndex >= 0) {
				newTop = top + 91 * goRow[codeIndex];
				newLeft = left + 91 * goCol[codeIndex];
				if (newTop >= 0 && (newTop + rowNum * 91) <= (6 * 91 + 2) && newLeft >= 0 && (newLeft + colNum * 91) <= (9 * 91 + 2)) {
					isChangPos = true;
					if ($(__this).attr("id") === "startSpan") {
						newStartPos = startPos + posChange[codeIndex];
						if (newStartPos === endPos || obstaclePos.indexOf(newStartPos) >= 0) {
							isChangPos = false;
						} else {
							startPos = newStartPos;
						}
					} else if ($(__this).attr("id") === "endSpan") {
						newEndPos = endPos + posChange[codeIndex];
						if (newEndPos === startPos || obstaclePos.indexOf(newEndPos) >= 0) {
							isChangPos = false;
						} else {
							endPos = newEndPos;
							endRow = Math.floor(endPos / 9);
							endCol = endPos % 9;
						}
					} else if ($(__this).attr("id") === "obstacleSpan") {
						for (var i = 0; i < obstaclePos.length; i++) {
							newObstaclePos[i] = obstaclePos[i] + posChange[codeIndex];
						}
						if (newObstaclePos.indexOf(startPos) >= 0 || newObstaclePos.indexOf(endPos) >= 0) {
							isChangPos = false;
						} else {
							for (var i = 0; i < obstaclePos.length; i++) {
								obstaclePos[i] = newObstaclePos[i];
							}
						}
					}
					if (isChangPos) {
						$(__this).css({
							left: newLeft,
							top: newTop
						})
					}
				}
			}
		});
	}

	function blurHandler() {
		$(this).css("borderColor", "#ddf");
		$(document).unbind("keydown");
	}

	$("#button").bind("mousedown", buttonHandler);

	function buttonHandler() {
		$("#addSpeed").css("display", "inline");
		$("#subSpeed").css("display", "inline");
		$("#button").unbind("mousedown");
		$("#canvasLine").css("zIndex", 250);
		$(".txtSpan1").css("zIndex", 250);
		$(".txtSpan2").css("zIndex", 250);
		$(".txtSpan3").css("zIndex", 250);
		openSet.splice(0, openSet.length);
		openIdSet.splice(0, openIdSet.length);
		closeSet.splice(0, closeSet.length);
		closeIdSet.splice(0, closeIdSet.length);
		spanSet = $(".generalSpan");
		var startNode = {};
		startNode.pos = startPos;
		startNode.g = 0;
		startNode.h = culDis(startPos, endPos);
		startNode.f = startNode.h;
		startNode.dir = -1;
		openSet.push(startNode);
		openIdSet.push(startPos);
		var rowNum = 9;
		var colNum = 6;
		var verticalDis = 10;
		var diagonalDis = 14;
		var dirRow = [-1, -1, 0, 1, 1, 1, 0, -1];
		var dirCol = [0, 1, 1, 1, 0, -1, -1, -1];
		var canvasRow = [30, 20, 0, -20, -30, -20, 0, 20];
		var canvasCol = [0, -20, -30, -20, 0, 20, 30, 20];
		var resultPath = [];
		var resultNum = 0;
		setTimeout(stepOper, 1700);

		function stepOper() {
			if (openSet.length !== 0) {
				var curNode = openSet.splice(0, 1)[0];
				closeSet.push(curNode);
				var curPos = curNode.pos;
				var openIdSetPos = openIdSet.indexOf(curPos);
				openIdSet.splice(openIdSetPos, 1);
				closeIdSet.push(curPos);
				$($(".txtSpan1")[curPos]).css("color", "#000");
				$($(".txtSpan2")[curPos]).css("color", "#000");
				$($(".txtSpan3")[curPos]).css("color", "#000");
				$(spanSet[curPos]).css("zIndex", 150);
				$(spanSet[curPos]).css("borderColor", "#000");
				$(spanSet[curPos]).fadeOut("slow").fadeIn("slow");
				if (curNode.pos === endPos) {
					var pathPos = endPos;
					resultPath.push(endPos);
					do {
						var __tempNode;
						for (var i = 0; i < closeSet.length; i++) {
							if (closeSet[i].pos === pathPos) {
								__tempNode = closeSet[i];
								// break;
							}
						}
						if (!__tempNode) {
							// break;
						}
						var __tempRow = Math.floor(pathPos / 9);
						var __tempCol = pathPos % 9;
						var __newRow = __tempRow - dirRow[__tempNode.dir]
						var __newCol = __tempCol - dirCol[__tempNode.dir];
						pathPos = __newRow * 9 + __newCol;
						resultPath.push(pathPos);
					} while (pathPos !== startPos);
					setTimeout(displayResult, 500);
					// break;
				} else {
					setTimeout(stepOper, delayTime);
				}
				var curRow = Math.floor(curPos / rowNum);
				var curCol = curPos % rowNum;
				var newRow, newCol, newPos;
				for (var i = 0; i < 8; i++) {
					newRow = curRow + dirRow[i];
					newCol = curCol + dirCol[i];
					if (newRow < 0 || newRow >= 6 || newCol >= 9 || newCol < 0) {
						continue;
					}
					newPos = newRow * 9 + newCol;
					if (openIdSet.indexOf(newPos) !== -1) {
						var openNode;
						for (var j = 0; j < openSet.length; j++) {
							if (openSet[j].pos === newPos) {
								openNode = openSet[j];
								break;
							}
						}
						if (openNode) {
							var newG
							if (i % 2 === 1) {
								newG = curNode.g + 14;
							} else {
								newG = curNode.g + 10;
							}
							if (newG < openNode.g) {
								openNode.g = newG;
								openNode.f = openNode.g + openNode.h;
								openNode.dir = i;
								var oldCanvas = document.getElementById("canvasLine");
								if (oldCanvas) {
									var c = oldCanvas.getContext("2d");
									c.clearRect(newCol * 91, newRow * 91, 91, 91);
								}
								var canvas = document.getElementById("canvasLine");
								var c = canvas.getContext("2d");
								var x = 91 * newCol + 46;
								var y = 91 * newRow + 46;
								var r = 5;
								c.beginPath();
								c.strokeStyle = "white";
								c.fillStyle = "white";
								c.arc(x, y, r, 0, Math.PI * 2);
								c.fill();
								c.stroke();
								c.closePath();
								c.beginPath();
								c.strokeStyle = "white";
								c.fillStyle = "white";
								c.moveTo(x, y);
								c.lineTo(x + canvasCol[i], y + canvasRow[i]);
								c.stroke();
								$($(".txtSpan1")[newPos]).text(openNode.f);
								$($(".txtSpan2")[newPos]).text(openNode.g);
								$($(".txtSpan3")[newPos]).text(openNode.h);
								var left = parseInt($(spanSet[newPos]).css("left"));
								$(spanSet[newPos]).css("zIndex", 120);
								$(spanSet[newPos]).animate({
									left: left - 10
								}, 100).animate({
									left: left + 10
								}, 200).animate({
									left: left
								}, 100);
							}
						}
					} else if (closeIdSet.indexOf(newPos) === -1) {
						if (obstaclePos.indexOf(newPos) !== -1) {
							continue;
						} else {
							if (i % 2 === 1) {
								var __tempRow1 = curRow + dirRow[i - 1];
								var __tempCol1 = curCol + dirCol[i - 1];
								var __tempPos1 = __tempRow1 * 9 + __tempCol1;

								var __tempRow2 = curRow + dirRow[(i + 1) % 8];
								var __tempCol2 = curCol + dirCol[(i + 1) % 8];
								var __tempPos2 = __tempRow2 * 9 + __tempCol2;
								if (obstaclePos.indexOf(__tempPos1) !== -1 || obstaclePos.indexOf(__tempPos2) !== -1) {
									continue;
								}
							}
							var newNode = {};
							newNode.pos = newPos;
							if (i % 2 === 1) {
								newNode.g = curNode.g + diagonalDis;
							} else {
								newNode.g = curNode.g + verticalDis;
							}
							newNode.dir = i;
							newNode.h = (Math.abs(newRow - endRow) + Math.abs(newCol - endCol)) * 10;
							newNode.f = newNode.g + newNode.h;
							$(spanSet[newPos]).css("zIndex", 100);
							$(spanSet[newPos]).css("borderColor", "#1F7CAF");
							$($(".txtSpan1")[newPos]).text(newNode.f);
							$($(".txtSpan2")[newPos]).text(newNode.g);
							$($(".txtSpan3")[newPos]).text(newNode.h);
							/*$($(".txtSpan1")[newPos]).css("color", "#1F7CAF");
							$($(".txtSpan2")[newPos]).css("color", "#1F7CAF");
							$($(".txtSpan3")[newPos]).css("color", "#1F7CAF");*/
							var canvas = document.getElementById("canvasLine");
							var c = canvas.getContext("2d");
							var x = 91 * newCol + 46;
							var y = 91 * newRow + 46;
							var r = 5;
							c.beginPath();
							c.strokeStyle = "white";
							c.fillStyle = "white";
							c.arc(x, y, r, 0, Math.PI * 2);
							c.fill();
							c.stroke();
							c.closePath();
							c.beginPath();
							c.strokeStyle = "white";
							c.fillStyle = "white";
							c.moveTo(x, y);
							c.lineTo(x + canvasCol[i], y + canvasRow[i]);
							c.stroke();
							openSet.push(newNode);
							openIdSet.push(newPos);
						}
					}
				}
				openSet.sort(function(a, b) {
					return a.f - b.f;
				});
			}
		}

		function culDis(startPos, endPos) {
			var __tempRowStart = Math.floor(startPos / 9);
			var __tempColStart = startPos % 9;
			var __tempRowEnd = Math.floor(endPos / 9);
			var __tempColEnd = endPos % 9;
			var dis = (Math.abs(__tempRowStart - __tempRowEnd) + Math.abs(__tempColStart - __tempColEnd)) * 10;
			return dis;
		}

		function displayResult() {
			var pos = resultPath[resultNum];
			$(spanSet[pos]).css("borderColor", "#FF0000");
			$(spanSet[pos]).fadeOut("slow").fadeIn("slow");
			$($(".txtSpan1")[pos]).css("color", "#FF0000");
			$($(".txtSpan2")[pos]).css("color", "#FF0000");
			$($(".txtSpan3")[pos]).css("color", "#FF0000");
			resultNum++;
			if (resultNum < resultPath.length) {
				setTimeout(displayResult, 1000);
			} else {
				$("#clearButton").bind("mousedown", clearButtonHandler);
			}
		}
	}

	function clearButtonHandler() {
		$("#addSpeed").css("display", "none");
		$("#subSpeed").css("display", "none");
		$("#clearButton").unbind("mousedown");
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, 830, 560);
			$(oldCanvas).css("zIndex", 50);
		}
		startPos = 20;
		endPos = 24;
		obstaclePos = [13, 22, 31];
		endRow = 2;
		endCol = 6;
		var txtSpan1Set = $(".txtSpan1");
		var txtSpan2Set = $(".txtSpan2");
		var txtSpan3Set = $(".txtSpan3");
		var spanSet = $(".generalSpan");
		for (var i = 0; i < txtSpan1Set.length; i++) {
			$(txtSpan1Set[i]).css("color", "white");
			$(txtSpan1Set[i]).text("");
			$(txtSpan2Set[i]).css("color", "white");
			$(txtSpan2Set[i]).text("");
			$(txtSpan3Set[i]).css("color", "white");
			$(txtSpan3Set[i]).text("");
			$(spanSet[i]).css("borderColor", "white");
			$(spanSet[i]).css("zIndex", i);
		}
		var border = parseInt($("#head1 span").css("border"));
		var width = parseInt($("#head1 span").css("width"));
		var height = parseInt($("#head1 span").css("height"));
		$("#startSpan").css({
			left: 2 * (border + width) + 2,
			top: 2 * (border + height) + 2
		});
		$("#startSpan").css("zIndex", 200);
		$("#endSpan").css({
			left: 6 * (border + width) + 2,
			top: 2 * (border + height) + 2
		});
		$("#endSpan").css("zIndex", 200);
		$("#obstacleSpan").css({
			left: 4 * (border + width) + 2,
			top: 1 * (border + height) + 2
		});
		$("#obstacleSpan").css("zIndex", 200);
		$("#button").bind("mousedown", buttonHandler);
	}
});