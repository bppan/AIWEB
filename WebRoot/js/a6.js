$(function() {
	setSpan();

	function setSpan() {
		var border = 3;
		var width = 110;
		var height = 110;
		for (var i = 0; i < 9; i++) {
			var newSpan = document.createElement("span");
			$(newSpan).attr("class", "everySpan");
			$(newSpan).text("");
			$(newSpan).attr("idx", i);
			$("#head1").append(newSpan);
			var row = Math.floor(i / 3);
			var col = i % 3;
			$(newSpan).css({
				left: col * (border + width),
				top: row * (border + height)
			});
		}
		var tipSpan = document.createElement("span");
		$(tipSpan).attr("id", "tipSpan");
		$(tipSpan).css({
			left: 0,
			top: 3 * (border + height)
		});
		$("#head1").append(tipSpan);
	}

	$("#runButton").bind("mousedown", runButtonHandler);
	$(".everySpan").bind("mousedown", everySpanHandler);
	var nodeRecord = [];
	var curPos = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	var everySpanSet = $(".everySpan");

	function runButtonHandler() {
		$("#runButton").unbind("mousedown");
		var selectArr = $("#selectForm").children();
		var no = 1;
		for (var i = 0; i < selectArr.length; i++) {
			if (selectArr[i].selected) {
				no = i;
				break;
			}
		}
		var tipSpan = $("#tipSpan");
		if (no === 1) {
			tipSpan.text("轮到电脑了");
			setTimeout(npcHandler, 500);
		} else {
			tipSpan.text("轮到您了");
		}
		tipSpan.attr("selectNum", no);
	}

	function clearButtonHandler() {
		$("#clearButton").unbind("mousedown");
		$("#runButton").bind("mousedown", runButtonHandler);
		nodeRecord = [];
		curPos = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		everySpanSet = $(".everySpan");
		for (var i = 0; i < everySpanSet.length; i++) {
			$(everySpanSet[i]).text("");
		}
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, oldCanvas.width, oldCanvas.height);
		}
		$(".displayDotEverySpan").remove();
		$(".displayEverySpan").remove();
		$(".displayHead").remove();
		$(".displayTipSpan").remove();
		$(".displayTipSpan1").remove();
		$("#head2").css("left", 0);
		$("#tipSpan").text("");

	}

	function everySpanHandler() {
		everySpanSet = $(".everySpan");
		selectNum = $("#tipSpan").attr("selectNum");
		if (selectNum == 0 && $(this).text() === "") {
			$(this).text("+");
			curPos[$(this).attr("idx")] = 2;
			$("#tipSpan").attr("selectNum", 1);
			var isStop = checkResult(curPos, 2);
			if (isStop == 2) {
				$("#tipSpan").text("您获胜啦！");
				$("#clearButton").bind("mousedown", clearButtonHandler);
			} else if (isStop == -1) {
				$("#tipSpan").text("平局！");
				$("#clearButton").bind("mousedown", clearButtonHandler);
			} else {
				$("#tipSpan").text("轮到电脑了");
				setTimeout(npcHandler, 200);
			}
		}
	}

	function npcHandler() {
		everySpanSet = $(".everySpan");
		var __tempText = curPos.slice();
		var target = stepHandler(__tempText);
	}

	function checkResult(tempText, type) {
		var num = [0, 4, 8];
		for (var i = 0; i < 3; i++) {
			var row = Math.floor(num[i] / 3);
			var col = num[i] % 3;
			if (tempText[3 * (row - i) + col] == type && tempText[3 * (row - i + 1) + col] == type && tempText[3 * (row - i + 2) + col] == type) {
				return type;
			}
			if (tempText[3 * row + col - i] == type && tempText[3 * row + col - i + 1] == type && tempText[3 * row + col - i + 2] == type) {
				return type;
			}
		}
		if (tempText[0] == type && tempText[4] == type && tempText[8] == type) {
			return type;
		}
		if (tempText[2] == type && tempText[4] == type && tempText[6] == type) {
			return type;
		}
		for (var i = 0; i < 9; i++) {
			if (tempText[i] === 0) {
				return 0;
			}
		}
		return -1;
	}

	function stepHandler(tempText) {
		nodeRecord = [];
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, oldCanvas.width, oldCanvas.height);
		}
		$(".displayDotEverySpan").remove();
		$(".displayEverySpan").remove();
		$(".displayHead").remove();
		$(".displayTipSpan").remove();
		$(".displayTipSpan1").remove();
		$("#head2").css("left", 0);
		var stepText = tempText.slice();
		var displayIdArr = [];
		var floorText = [
			[],
			[],
			[]
		],
			floorParentId = [0, 0, -1],
			floorRes = [-1000000, 1000000],
			resultTarget = -1;
		var idCount = 1;
		var maxTotalNum = -1000000;
		var node = {};
		node.floor = 0;
		node.stepText = stepText;
		node.symType = judgeSym(node.stepText);
		node.id = 0;
		node.parent = -1;
		node.totalNum = 0;
		node.sonArr = [];
		var isAlpha = false;
		nodeRecord.push(node);
		nextStep(node);
		var maxPos = 0;
		culPos(nodeRecord[0]);
		displaySpan();

		function nextStep(node) {
			var floor = node.floor + 1;
			var parent = node.id;
			if (parent != floorParentId[node.floor]) {
				floorParentId[node.floor] = node.id;
				floorText[floor] = [];
				floorRes[1] = 1000000;
			}
			var parentSymType = node.symType;
			var tempText = node.stepText.slice();
			for (var i = 0; i < 9; i++) {
				if (tempText[i] === 0) {
					var newNode = {};
					newNode.floor = floor;
					newNode.parent = parent;
					newNode.sonArr = [];
					newNode.stepText = tempText.slice();
					var result = markHandler(newNode.floor, parentSymType, i);
					if (result) {
						newNode.id = idCount;
						idCount++;
						newNode.stepText[i] = newNode.floor;
						if (newNode.floor < 2) {
							var isStop = judgeFinal(newNode.stepText);
							newNode.totalNum = 0;
							node.sonArr.push(newNode.id);
							nodeRecord.push(newNode);
							if (isStop) {
								resultTarget = i;
								node.targetSon = newNode.id;
								break;
							}
							newNode.symType = judgeSym(newNode.stepText);
							nextStep(newNode);
							isAlpha = false;
							if (floorRes[1] > floorRes[0]) {
								floorRes[0] = floorRes[1];
								resultTarget = i;
								if (newNode.totalNum > maxTotalNum) {
									maxTotalNum = newNode.totalNum;
								}
							} else if (floorRes[1] === floorRes[0] && newNode.totalNum > maxTotalNum) {
								maxTotalNum = newNode.totalNum;
								resultTarget = i;
							}
						} else {
							if (!isAlpha) {
								var res = culBetter(newNode.stepText.slice());
								newNode.score = res;
								node.totalNum += res;
							} else {
								newNode.isAlpha = true;
							}
							node.sonArr.push(newNode.id);
							nodeRecord.push(newNode);
							if (res < floorRes[1]) {
								floorRes[1] = res;
								if (floorRes[1] < floorRes[0]) {
									// break;
									isAlpha = true;
								}
							}
						}
					}
				}
			}

			function markHandler(floor, type, target) {
				if (floorText[floor].indexOf(target) === -1) {
					if (type == 1) {
						if (target == 0 || target == 6) {
							floorText[floor].push(0);
							floorText[floor].push(6);
						} else if (target == 1 || target == 7) {
							floorText[floor].push(1);
							floorText[floor].push(7);
						} else if (target == 2 || target == 8) {
							floorText[floor].push(2);
							floorText[floor].push(8);
						}
					} else if (type == 2) {
						if (target == 0 || target == 2) {
							floorText[floor].push(0);
							floorText[floor].push(2);
						} else if (target == 3 || target == 5) {
							floorText[floor].push(3);
							floorText[floor].push(5);
						} else if (target == 6 || target == 8) {
							floorText[floor].push(6);
							floorText[floor].push(8);
						}
					} else if (type == 3) {
						if (target == 0 || target == 8) {
							floorText[floor].push(0);
							floorText[floor].push(8);
						} else if (target == 1 || target == 5) {
							floorText[floor].push(1);
							floorText[floor].push(5);
						} else if (target == 3 || target == 7) {
							floorText[floor].push(3);
							floorText[floor].push(7);
						}
					} else if (type == 4) {
						if (target == 2 || target == 6) {
							floorText[floor].push(2);
							floorText[floor].push(6);
						} else if (target == 1 || target == 3) {
							floorText[floor].push(1);
							floorText[floor].push(3);
						} else if (target == 5 || target == 7) {
							floorText[floor].push(5);
							floorText[floor].push(7);
						}
					} else if (type == 5) {
						if (target == 0 || target == 2 || target == 6 || target == 8) {
							floorText[floor].push(0);
							floorText[floor].push(2);
							floorText[floor].push(6);
							floorText[floor].push(8);
						} else if (target == 1 || target == 3 || target == 5 || target == 7) {
							floorText[floor].push(1);
							floorText[floor].push(3);
							floorText[floor].push(5);
							floorText[floor].push(7);
						}
					}
					return true;
				}
				return false;
			}

			function culBetter(tempText) {
				var num = [0, 4, 8];
				var res = 0;
				for (var i = 0; i < 3; i++) {
					var row = Math.floor(num[i] / 3);
					var col = num[i] % 3;
					if ((tempText[3 * (row - i) + col] + tempText[3 * (row - i + 1) + col] + tempText[3 * (row - i + 2) + col] == 6) && ((tempText[3 * (row - i) + col] - 1) * (tempText[3 * (row - i + 1) + col] - 1) * (tempText[3 * (row - i + 2) + col] - 1) == 1)) {
						res += -1000;
					}
					if ((tempText[3 * row + col - i] + tempText[3 * row + col - i + 1] + tempText[3 * row + col - i + 2] == 6) && ((tempText[3 * row + col - i] - 1) * (tempText[3 * row + col - i + 1] - 1) * (tempText[3 * row + col - i + 2] - 1) == 1)) {
						res += -1000;
					}
					if ((tempText[3 * (row - i) + col] + tempText[3 * (row - i + 1) + col] + tempText[3 * (row - i + 2) + col] == 4) && ((tempText[3 * (row - i) + col] - 1) * (tempText[3 * (row - i + 1) + col] - 1) * (tempText[3 * (row - i + 2) + col] - 1) == -1)) {
						res += -100;
					}
					if ((tempText[3 * row + col - i] + tempText[3 * row + col - i + 1] + tempText[3 * row + col - i + 2] == 4) && ((tempText[3 * row + col - i] - 1) * (tempText[3 * row + col - i + 1] - 1) * (tempText[3 * row + col - i + 2] - 1) == -1)) {
						res += -100;
					}
					if ((tempText[3 * (row - i) + col] + tempText[3 * (row - i + 1) + col] + tempText[3 * (row - i + 2) + col] == 2) && ((tempText[3 * (row - i) + col] - 1) * (tempText[3 * (row - i + 1) + col] - 1) * (tempText[3 * (row - i + 2) + col] - 1) == 0)) {
						res += 100;
					}
					if ((tempText[3 * row + col - i] + tempText[3 * row + col - i + 1] + tempText[3 * row + col - i + 2] == 2) && ((tempText[3 * row + col - i] - 1) * (tempText[3 * row + col - i + 1] - 1) * (tempText[3 * row + col - i + 2] - 1) == 0)) {
						res += 100;
					}
					if ((tempText[3 * (row - i) + col] + tempText[3 * (row - i + 1) + col] + tempText[3 * (row - i + 2) + col] == 2) && ((tempText[3 * (row - i) + col] - 1) * (tempText[3 * (row - i + 1) + col] - 1) * (tempText[3 * (row - i + 2) + col] - 1) == 1)) {
						res += -10;
					}
					if ((tempText[3 * row + col - i] + tempText[3 * row + col - i + 1] + tempText[3 * row + col - i + 2] == 2) && ((tempText[3 * row + col - i] - 1) * (tempText[3 * row + col - i + 1] - 1) * (tempText[3 * row + col - i + 2] - 1) == 1)) {
						res += -10;
					}
					if ((tempText[3 * (row - i) + col] + tempText[3 * (row - i + 1) + col] + tempText[3 * (row - i + 2) + col] == 1) && ((tempText[3 * (row - i) + col] - 1) * (tempText[3 * (row - i + 1) + col] - 1) * (tempText[3 * (row - i + 2) + col] - 1) == 0)) {
						res += 10;
					}
					if ((tempText[3 * row + col - i] + tempText[3 * row + col - i + 1] + tempText[3 * row + col - i + 2] == 1) && ((tempText[3 * row + col - i] - 1) * (tempText[3 * row + col - i + 1] - 1) * (tempText[3 * row + col - i + 2] - 1) == 0)) {
						res += 10;
					}
				}

				if ((tempText[0] + tempText[4] + tempText[8] == 6) && ((tempText[0] - 1) * (tempText[4] - 1) * (tempText[8] - 1) == 1)) {
					res += -1000;
				}
				if ((tempText[2] + tempText[4] + tempText[6] == 6) && ((tempText[2] - 1) * (tempText[4] - 1) * (tempText[6] - 1) == 1)) {
					res += -1000;
				}
				if ((tempText[0] + tempText[4] + tempText[8] == 4) && ((tempText[0] - 1) * (tempText[4] - 1) * (tempText[8] - 1) == -1)) {
					res += -100;
				}
				if ((tempText[2] + tempText[4] + tempText[6] == 4) && ((tempText[2] - 1) * (tempText[4] - 1) * (tempText[6] - 1) == -1)) {
					res += -100;
				}
				if ((tempText[0] + tempText[4] + tempText[8] == 2) && ((tempText[0] - 1) * (tempText[4] - 1) * (tempText[8] - 1) == 0)) {
					res += 100;
				}
				if ((tempText[2] + tempText[4] + tempText[6] == 2) && ((tempText[2] - 1) * (tempText[4] - 1) * (tempText[6] - 1) == 0)) {
					res += 100;
				}
				if ((tempText[0] + tempText[4] + tempText[8] == 2) && ((tempText[0] - 1) * (tempText[4] - 1) * (tempText[8] - 1) == 1)) {
					res += -10;
				}
				if ((tempText[2] + tempText[4] + tempText[6] == 2) && ((tempText[2] - 1) * (tempText[4] - 1) * (tempText[6] - 1) == 1)) {
					res += -10;
				}
				if ((tempText[0] + tempText[4] + tempText[8] == 1) && ((tempText[0] - 1) * (tempText[4] - 1) * (tempText[8] - 1) == 0)) {
					res += 10;
				}
				if ((tempText[2] + tempText[4] + tempText[6] == 1) && ((tempText[2] - 1) * (tempText[4] - 1) * (tempText[6] - 1) == 0)) {
					res += 10;
				}
				return res;
			}
		}

		function judgeSym(stepText) {
			var tempText = stepText;
			var xSym = 0,
				ySym = 0,
				fFSym = 0,
				oTFSym = 0,
				midSym = 0,
				symType = 0;
			if (tempText[0] === tempText[6] && tempText[1] === tempText[7] && tempText[2] === tempText[3]) {
				xSym = 1;
				symType = 1;
			}
			if (tempText[0] === tempText[2] && tempText[3] === tempText[5] && tempText[6] === tempText[8]) {
				ySym = 1;
				symType = 2;
			}
			if (xSym && ySym) {
				symType = 5;
				return symType;
			}
			if (tempText[0] === tempText[8] && tempText[1] === tempText[5] && tempText[3] === tempText[7]) {
				fFSym = 1;
				symType = 3;
			}
			if (tempText[1] === tempText[3] && tempText[2] === tempText[6] && tempText[5] === tempText[7]) {
				oTFSym = 1;
				symType = 4;
			}
			if (fFSym && oTFSym) {
				symType = 5;
			}
			return symType;
		}

		function judgeFinal(tempText) {
			if ((tempText[0] == 1 && tempText[1] == 1 && tempText[2] == 1) || (tempText[3] == 1 && tempText[4] == 1 && tempText[5] == 1) || (tempText[6] == 1 && tempText[7] == 1 && tempText[8] == 1) || (tempText[6] == 1 && tempText[7] == 1 && tempText[8] == 1) || (tempText[0] == 1 && tempText[3] == 1 && tempText[6] == 1) || (tempText[1] == 1 && tempText[4] == 1 && tempText[7] == 1) || (tempText[2] == 1 && tempText[5] == 1 && tempText[8] == 1) || (tempText[0] == 1 && tempText[4] == 1 && tempText[8] == 1) || (tempText[2] == 1 && tempText[4] == 1 && tempText[6] == 1)) {
				return true;
			} else {
				var tempIsStop = true;
				for (var i = 0; i < 9; i++) {
					if (tempText[i] == 0) {
						tempIsStop = false;
						break;
					}
				}
				return tempIsStop;
			}
		}

		function culPos(node) {
			if (node.sonArr.length != 0) {
				for (var i = 0; i < node.sonArr.length; i++) {
					culPos(nodeRecord[node.sonArr[i]]);
				}
				displayIdArr.push(node.id);
				node.x = (nodeRecord[node.sonArr[0]].x + nodeRecord[node.sonArr[node.sonArr.length - 1]].x) / 2;
				node.y = node.floor * 140;
			} else {
				displayIdArr.push(node.id);
				node.y = node.floor * 140;
				node.x = maxPos;
				maxPos += 150;
			}
		}

		function displaySpan() {
			var displayCount = 0;
			var minLeft = 100000;
			var maxLeft = -100000;
			var minLeftId = -1;
			var border = 1;
			var width = 30;
			var height = 30;
			setDisplaySpan();

			function setDisplaySpan() {
				while (displayCount < nodeRecord.length) {
					var newPosLeft = 350 - nodeRecord[displayCount].x - width * 1.5 - border;
					if (newPosLeft > maxLeft) {
						maxLeft = newPosLeft;
					}
					if (newPosLeft < minLeft) {
						minLeft = newPosLeft;
						minLeftId = displayCount;
					}
					$("#head2").css("left", newPosLeft);
					var displayHead = document.createElement("div");
					$(displayHead).attr("class", "displayHead");
					$(displayHead).css({
						"left": nodeRecord[displayCount].x,
						"top": nodeRecord[displayCount].y + 20
					});
					$("#head2").append(displayHead);
					/*var displayTipSpan = document.createElement("span");
					$(displayTipSpan).attr("class", "displayTipSpan");
					$("#head2").append(displayTipSpan);
					$(displayTipSpan).css({
						"left": nodeRecord[displayCount].x,
						"top": nodeRecord[displayCount].y
					})
					if (nodeRecord[displayCount].floor == 1 && nodeRecord[displayCount].hasOwnProperty("totalNum")) {
						$(displayTipSpan).text("总计分: " + String(nodeRecord[displayCount].totalNum));
					} else if (nodeRecord[displayCount].floor == 2 && nodeRecord[displayCount].hasOwnProperty("score")) {
						$(displayTipSpan).text("计分: " + String(nodeRecord[displayCount].score));
					} else if (nodeRecord[displayCount].floor == 2 && nodeRecord[displayCount].hasOwnProperty("isAlpha")) {
						$(displayTipSpan).css("color", "#FF0000");
						$(displayTipSpan).text("X alpha");
					}*/
					if (nodeRecord[displayCount].parent >= 0) {
						var parentSpan = $(".displayHead")[nodeRecord[displayCount].parent];
						var parentLeft = parseInt($(parentSpan).css("left")) + width * 1.5 + border;
						var parentTop = parseInt($(parentSpan).css("top")) + (height + border) * 3;
						var sonLeft = nodeRecord[displayCount].x + width * 1.5 + border;
						var sonTop = nodeRecord[displayCount].y + 20;
						var canvas = document.getElementById("canvasLine");
						var c = canvas.getContext("2d");
						c.beginPath();
						c.moveTo(parentLeft, parentTop);
						c.lineTo(sonLeft, sonTop);
						c.strokeStyle = "#39A4DC";
						c.lineWidth = 2;
						c.fill();
						c.stroke();
						c.closePath();
					}
					for (var i = 0; i < 9; i++) {
						var newSpan = document.createElement("span");
						$(newSpan).attr("class", "displayEverySpan");

						if (nodeRecord[displayCount].stepText[i] == 2) {
							$(newSpan).text("+");
						} else if (nodeRecord[displayCount].stepText[i] == 1) {
							$(newSpan).text("-");
						}
						$(displayHead).append(newSpan);
						var row = Math.floor(i / 3);
						var col = i % 3;
						$(newSpan).css({
							left: col * (border + width),
							top: row * (border + height)
						});
					}
					displayCount++;
				}
				if (displayCount == nodeRecord.length) {
					var displaySpanSet = $(".displayHead");
					var idCount = 0;
					var floor2Id = -1,
						floor1Id = -1,
						floor2Num = 100000,
						floor1Num = -100000;
					algorithmProcess();

					function algorithmProcess() {
						var tempNode = nodeRecord[displayIdArr[idCount]];
						var tempSpan = displaySpanSet[displayIdArr[idCount]];
						var left = 350 - (tempNode.x + width * 1.5 + border);
						$("#head2").css("left", left);
						$(tempSpan).fadeOut("fast").fadeIn("fast");
						var displayTipSpan = document.createElement("span");
						$(displayTipSpan).attr("class", "displayTipSpan");
						$("#head2").append(displayTipSpan);
						$(displayTipSpan).css({
							"left": tempNode.x,
							"top": tempNode.y
						})
						if (tempNode.floor == 0) {
							if (floor1Id != -1) {
								tempNode.minSon = floor1Id;
								$(displayTipSpan).attr("class", "displayTipSpan1");
								$(displayTipSpan).css({
									"left": tempNode.x + 3 * (border + width) + 5,
									"top": tempNode.y + 1.5 * width + border + 13
								})
								$(displayTipSpan).text(floor1Num);
							}
						} else if (tempNode.floor == 1 && tempNode.hasOwnProperty("totalNum")) {
							if (floor2Id != -1) {
								tempNode.minSon = floor2Id;
								if (floor2Num > floor1Num) {
									floor1Num = floor2Num;
									floor1Id = tempNode.id;
								}
								var displayTipSpan1 = document.createElement("span");
								$(displayTipSpan1).attr("class", "displayTipSpan1");
								$("#head2").append(displayTipSpan1);
								$(displayTipSpan1).css({
									"left": tempNode.x + 3 * (border + width) + 5,
									"top": tempNode.y + 1.5 * width + border + 13
								})
								$(displayTipSpan1).text(floor2Num);
								floor2Id = -1;
								floor2Num = 100000;
							}
							$(displayTipSpan).css({
								"left": tempNode.x,
								"top": tempNode.y
							})
							if (!nodeRecord[0].hasOwnProperty("targetSon") || nodeRecord[0].targetSon != displayIdArr[idCount])
								$(displayTipSpan).text("子节点总分: " + String(tempNode.totalNum));
						} else if (tempNode.floor == 2 && tempNode.hasOwnProperty("score")) {
							if (tempNode.score < floor2Num) {
								floor2Num = tempNode.score;
								floor2Id = tempNode.id;
							}
							$(displayTipSpan).text(String(tempNode.score));
						} else if (tempNode.floor == 2 && tempNode.hasOwnProperty("isAlpha")) {
							var tempEverySpanSet = $(tempSpan).children(".displayEverySpan");
							for (var i = 0; i < tempEverySpanSet.length; i++) {
								$(tempEverySpanSet[i]).attr("class", "displayDotEverySpan");
								$(tempEverySpanSet[i]).text("");
							}
							$(displayTipSpan).css("color", "#FF0000");
							$(displayTipSpan).text("X alpha");
						}
						idCount++;
						if (idCount < displayIdArr.length) {
							setTimeout(algorithmProcess, 500);
						} else {
							displayResult(0);
						}
					}

					function displayResult(floor) {
						if (floor === 0) {
							$(displaySpanSet[0]).css("borderColor", "#FF0000");
							if (nodeRecord[0].hasOwnProperty("targetSon")) {
								setTimeout(function() {
									var tempId = nodeRecord[0].targetSon;
									var posLeft = 350 - nodeRecord[tempId].x - width * 1.5 - border;
									$(displaySpanSet[tempId]).css("borderColor", "#FF0000");
									$(displaySpanSet[tempId]).fadeOut("fast").fadeIn("fast");
									$("#head2").css("left", posLeft);
									setTimeout(finallyOper, 700);
								}, 700);
							} else {
								setTimeout(function() {
									displayResult(1);
								}, 700);
							}
							var posLeft = 350 - nodeRecord[0].x - width * 1.5 - border;
							$("#head2").css("left", posLeft);
						} else if (floor === 1) {
							var tempId = nodeRecord[0].minSon;
							var posLeft = 350 - nodeRecord[tempId].x - width * 1.5 - border;
							$(displaySpanSet[tempId]).css("borderColor", "#FF0000");
							$(displaySpanSet[tempId]).fadeOut("fast").fadeIn("fast");
							setTimeout(function() {
								displayResult(2);
							}, 700);
							$("#head2").css("left", posLeft);
						} else if (floor === 2) {
							var tempId = nodeRecord[nodeRecord[0].minSon].minSon;
							var posLeft = 350 - nodeRecord[tempId].x - width * 1.5 - border;
							$(displaySpanSet[tempId]).css("borderColor", "#FF0000");
							$(displaySpanSet[tempId]).fadeOut("fast").fadeIn("fast");
							$("#head2").css("left", posLeft);
							setTimeout(finallyOper, 700);
						}
					}

					function finallyOper() {
						var posLeft = 350 - nodeRecord[0].x - width * 1.5 - border;
						$("#head2").css("left", posLeft);
						$(everySpanSet[resultTarget]).text("-");
						curPos[resultTarget] = 1;
						var isStop = checkResult(curPos, 1);
						if (isStop == 1) {
							$("#tipSpan").text("电脑获胜啦！");
							$("#clearButton").bind("mousedown", clearButtonHandler);
						} else if (isStop == -1) {
							$("#tipSpan").text("平局！");
							$("#clearButton").bind("mousedown", clearButtonHandler);
						} else {
							$("#tipSpan").text("轮到您了");
							$("#tipSpan").attr("selectNum", 0);
						}
						$("#algorithmShow").bind("mousedown", displayDrag);

						function displayDrag(event) {
							event.stopPropagation();
							var oldX = event.pageX;
							$(this).bind("mousemove", function(event) {
								event.stopPropagation();
								var deltaX = event.pageX - oldX;
								oldX = event.pageX;
								var left = $("#head2").css("left");
								var newLeft = parseInt(left) + deltaX;
								var maxLeftPos = 350 - nodeRecord[displayIdArr[0]].x - width * 1.5 - border;
								var minLeftPos = 350 - nodeRecord[nodeRecord.length - 1].x - width * 1.5 - border;
								console.log("maxLeft " + maxLeft + " minLeft " + minLeftPos);
								if (newLeft > maxLeftPos) {
									newLeft = maxLeftPos;
								}
								if (newLeft < minLeftPos) {
									newLeft = minLeftPos;
								}
								$("#head2").css("left", newLeft);
							});

							$(this).bind("mouseout mouseleave mouseup", function(event) {
								$(this).unbind("mousemove mouseleave mouseup mouseout");
							});
						}
					}
				}
			}
		}
	}
});