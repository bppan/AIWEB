$(function() {
	var border = 1;
	var width = 34;
	var height = 34;
	var totalCount = 0;
	var basicScore = [];
	var currentChessPos = [];
	var dirCol = [0, 1, 0, -1];
	var dirRow = [-1, 0, 1, 0];
	var playerType = -1;
	var gameOver = false;
	setSpan();
	basicScoreHandler();

    $("#alert_close").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });
    $("#alert_button").click(function () {
        $("#alert_errorMsg").html("");
        $("#alert_box").hide();
    });   
    
	function setSpan() {
		for (var i = 0; i < 225; i++) {
			var newSpan = document.createElement("span");
			$(newSpan).attr("class", "everySpan");
			$(newSpan).text("");
			$(newSpan).attr("idx", i);
			$(newSpan).attr("type", 0);
			$(newSpan).css("opacity", "0");
			$("#head1").append(newSpan);
			var row = Math.floor(i / 15);
			var col = i % 15;
			$(newSpan).css({
				left: col * (border + width),
				top: 20 + row * (border + height)
			});
		}
	}

	function basicScoreHandler() {
		for (var i = 0; i < 15; i++) {
			basicScore[i] = new Array();
			currentChessPos[i] = new Array();
			for (var j = 0; j < 15; j++) {
				basicScore[i][j] = 0;
				currentChessPos[i][j] = 0;
			}
		}
		var dirX = [1, 0, -1, 0];
		var dirY = [0, 1, 0, -1];
		for (var i = 0; i <= 7; i++) {
			var length = (7 - i) * 2;
			var score = i;
			var startX = i;
			var startY = i;
			var nextX = startX,
				nextY = startY;
			for (var j = 0; j < 4; j++) {
				for (var k = 0; k < length; k++) {
					nextX = nextX + dirX[j];
					nextY = nextY + dirY[j];
					basicScore[nextX][nextY] = score;
				}
			}
		}
		basicScore[7][7] = 7;
	}

	$(".everySpan").hover(
		function() {
			$(this).css("opacity", 0.5);
		}, function() {
			$(this).css("opacity", 0);
		});

	$(".everySpan").bind("mousedown", everySpanMouseDownHandler);

	function everySpanMouseDownHandler() {
		var id = $(this).attr("idx");
		var row = parseInt(id / 15);
		var col = id % 15;
		if (playerType == 1 && currentChessPos[row][col] == 0) {
			drawChess(0, row, col);
			currentChessPos[row][col] = 2;
			gameOver = judgeOneStep([], 2);
			if (gameOver) {
				$("#alert_box").show();
		        $("#alert_errorMsg").html("恭喜你获胜！");		        
				$(".everySpan").unbind("mousedown");
				$("#restart").bind("mousedown", restartMouseDownHandler);
			} else {
				setTimeout(aiStepHandler, 500);
			}
		}
	}

	function drawChess(type, row, col) {
		var left = (width + border) * col;
		var top = 20 + (width + border) * row;
		var canvas = document.getElementById("canvasLine");
		var c = canvas.getContext("2d");
		var x = left + border + width / 2;
		var y = top + border + width / 2;
		var r = 12;
		c.beginPath();
		if (type == 1) {
			c.strokeStyle = "black";
			c.fillStyle = "black";
		} else {
			c.strokeStyle = "white";
			c.fillStyle = "white";
		}
		totalCount++;
		c.arc(x, y, r, 0, Math.PI * 2);
		c.fill();
		c.stroke();
		c.closePath();
		playerType = type;
	}

	function restartMouseDownHandler(){
		totalCount = 0;
		for(var i = 0;i < 15;i++){
			for(var j = 0;j < 15;j++){
				currentChessPos[i][j] = 0;
			}
		}
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, oldCanvas.width, oldCanvas.height);
		}
		$("#aiFirst").bind("mousedown", aiFirstHandler);
		$("#personFirst").bind("mousedown", personFirstHandler);
		$(".everySpan").bind("mousedown", everySpanMouseDownHandler);
		$("#restart").unbind("mousedown");
	}

	$("#aiFirst").bind("mousedown", aiFirstHandler);

	function aiFirstHandler() {
		$("#aiFirst").unbind("mousedown");
		playerType = 0;
		setTimeout(aiStepHandler, 500);
	}

	$("#personFirst").bind("mousedown", personFirstHandler);

	function personFirstHandler() {
		$("#personFirst").unbind("mousedown");
		playerType = 1;
	}
	//AI每一步的操作

	function aiStepHandler() {
		nodeRecord = [];
		var maxFloor = 3;
		var floorChess = [
			[],
			[],
			[]
		],
			floorParentId = [0, 0, -1],
			floorRes = [-1000000, 1000000],
			resultTarget = -1;
		var tempScore = 0;
		var tempOpe = [];
		var idCount = 1;
		var maxTotalNum = -1000000;
		var node = {};
		node.floor = 0;
		node.operate = [];
		node.symType = judgeSym([]);
		node.id = 0;
		node.parent = -1;
		node.totalNum = 0;
		node.sonArr = [];
		var isAlpha = false;
		var isBeta = false;
		nodeRecord.push(node);
		nextStep(node);
		var newRow = parseInt(resultTarget / 15);
		var newCol = parseInt(resultTarget % 15);
		currentChessPos[newRow][newCol] = 1;
		drawChess(1, newRow, newCol);
		gameOver = judgeOneStep([], 1);
		if (gameOver) {
			$("#alert_box").show();
	        $("#alert_errorMsg").html("电脑获胜！");		
			$(".everySpan").unbind("mousedown");
			$("#restart").bind("mousedown", restartMouseDownHandler);
		}

		function nextStep(node) {
			var floor = node.floor + 1;
			var parent = node.id;
			if (parent != floorParentId[node.floor]) {
				floorParentId[node.floor] = node.id;
				floorChess[floor] = [];
				floorRes[1] = 1000000;
			}
			var parentSymType = node.symType;
			var tempOperate = node.operate.slice();
			var tempCount = 0;
			var tempLong = 0;
			var dirChangeCount = 1;
			var currentLong = -1;
			var currentdir = -1;
			var currentRow = 7;
			var currentCol = 7;
			//环形检测
			while (tempCount < 225) {
				for (var i = currentLong; i < tempLong; i++) {
					if (tempCount == 225) {
						break;
					}
					////////////////检测操作
					var isBlank = true; //判断当前位置是否为空
					for (var j = 0; j < tempOperate.length; j++) {
						if (tempOperate[j].row == currentRow && tempOperate[j].col == currentCol) {
							isBlank = false;
							break;
						}
					}
					if (currentChessPos[currentRow][currentCol] != 0) {
						isBlank = false;
					}
					if (isBlank) {
						//判断是否因对称而不能放棋子
						var __result = symmetricHandler(floor, parentSymType, currentRow, currentCol, tempOperate);
						if (__result) {
							//新节点操作
							var newNode = {};
							newNode.floor = floor;
							newNode.parent = parent;
							newNode.sonArr = [];
							newNode.operate = tempOperate.slice();
							//记录新一步的位置
							newNode.operate.push({
								row: currentRow,
								col: currentCol,
								type: newNode.floor
							});
							newNode.id = idCount;
							idCount++;
							if (newNode.floor < 2) {
								var isStop = judgeOneStep(newNode.operate, 1);
								newNode.totalNum = 0;
								node.sonArr.push(newNode.id);
								nodeRecord.push(newNode);
								if (isStop) {
									resultTarget = currentRow * 15 + currentCol;
									return;
								}
								newNode.symType = judgeSym(newNode.operate);
								nextStep(newNode);
								console.log("res " + tempScore);
								console.log("row " + tempOpe[0].row + " col " + tempOpe[0].col);
								console.log("row " + tempOpe[1].row + " col " + tempOpe[1].col);
								isAlpha = false;
								if (floorRes[1] > floorRes[0]) {
									floorRes[0] = floorRes[1];
									resultTarget = currentRow * 15 + currentCol;
									if (newNode.totalNum > maxTotalNum) {
										maxTotalNum = newNode.totalNum;
									}
								} else if (floorRes[1] === floorRes[0] && newNode.totalNum > maxTotalNum) {
									maxTotalNum = newNode.totalNum;
									resultTarget = currentRow * 15 + currentCol;
								}
							} else {
								if (!isAlpha) {
									var res = culScore(newNode.operate);
									newNode.score = res;
									node.totalNum += res;
									if (res < floorRes[1]) {
										tempScore = res;
										tempOpe = [];
										tempOpe.push({
											"row": newNode.operate[0].row,
											"col": newNode.operate[0].col
										});
										tempOpe.push({
											"row": newNode.operate[1].row,
											"col": newNode.operate[1].col
										});
										/*console.log("res " + res);
										console.log(newNode.operate[0].row + " " + "col " + newNode.operate[0].col);
										console.log(newNode.operate[1].row + " " + "col " + newNode.operate[1].col);*/
										tempRes = res;
										floorRes[1] = res;
										if (floorRes[1] < floorRes[0]) {
											// break;
											isAlpha = true;
										}
									}
								} else {
									newNode.isAlpha = true;
								}
								node.sonArr.push(newNode.id);
								nodeRecord.push(newNode);
							}
						}
					}
					////////////////
					currentLong++;
					if (currentLong === tempLong && dirChangeCount === 1) {
						tempLong++;
						dirChangeCount = 0;
						currentdir = (currentdir + 1) % 4;
						currentLong = 0;
					} else if (currentLong === tempLong && dirChangeCount === 0) {
						dirChangeCount++;
						currentdir = (currentdir + 1) % 4;
						currentLong = 0;
					}
					currentRow = currentRow + dirRow[currentdir];
					currentCol = currentCol + dirCol[currentdir];
					tempCount++;
				}
			}
		}

		//对称操作

		function symmetricHandler(floor, symType, row, col, tempOperate) {

			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				if (symType == 0) {
					floorChess[floor].push(target);
				} else if (symType == 1) {
					xSymHandler(floor, row, col);
				} else if (symType == 2) {
					ySymHandler(floor, row, col);
				} else if (symType == 3) {
					fFSymHandler(floor, row, col);
				} else if (symType == 4) {
					oTFSymHandler(floor, row, col);
				} else if (symType == 5) {
					xySymHandler(floor, row, col);
				} else if (symType == 6) {
					foFSymHandler(floor, row, col);
				} else if (symType == 8) {
					midSymHandler(floor, row, col);
				}
				return true;
			}
			return false;
		}

		function xSymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = (14 - row) * 15 + col;
			if (floorChess[floor].indexOf(target1) === -1) {
				floorChess[floor].push(target1);
			}
			return target1;
		}

		function ySymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = row * 15 + (14 - col);
			if (floorChess[floor].indexOf(target1) === -1) {
				floorChess[floor].push(target1);
			}
			return target1;
		}

		function fFSymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = (14 - col) * 15 + (14 - row);
			if (floorChess[floor].indexOf(target1) === -1) {
				floorChess[floor].push(target1);
			}
			return target1;
		}

		function oTFSymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = col * 15 + row;
			if (floorChess[floor].indexOf(target1) === -1) {
				floorChess[floor].push(target1);
			}
			return target1;
		}

		function xySymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = ySymHandler(floor, row, col);
			var newRow = parseInt(target1 / 15);
			var newCol = target1 % 15;
			xSymHandler(floor, row, col);
			xSymHandler(floor, newRow, newCol);
			return target1;
		}

		function foFSymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = fFSymHandler(floor, row, col);
			var newRow = parseInt(target1 / 15);
			var newCol = target1 % 15;
			oTFSymHandler(floor, row, col);
			oTFSymHandler(floor, newRow, newCol);
			return target1;
		}

		function midSymHandler(floor, row, col) {
			var target = row * 15 + col;
			if (floorChess[floor].indexOf(target) === -1) {
				floorChess[floor].push(target);
			}
			var target1 = xySymHandler(floor, row, col);
			foFSymHandler(floor, row, col);
			var newRow = parseInt(target1 / 15);
			var newCol = target1 % 15;
			foFSymHandler(floor, newRow, newCol);
		}
	}

	//判断对称类型

	function judgeSym(operate) {
		var tempChessPos = [];
		for (var i = 0; i < currentChessPos.length; i++) {
			tempChessPos[i] = currentChessPos[i].slice();
		}
		for (var i = 0; i < operate.length; i++) {
			tempChessPos[operate[i].row][operate[i].col] = operate[i].type;
		}
		var xSym = 1,
			ySym = 1,
			fFSym = 1,
			oTFSym = 1,
			symType = 0,
			isFinal = true;
		//x轴对称
		for (var i = 0; i < 7; i++) {
			isFinal = false;
			for (var j = 0; j < 15; j++) {
				if (tempChessPos[i][j] != tempChessPos[14 - i][j]) {
					xSym = 0;
					isFinal = true;
					break;
				}
			}
			if (isFinal) {
				break;
			}
		}
		if (xSym) {
			symType = 1;
		}
		//y轴对称
		for (var i = 0; i < 15; i++) {
			isFinal = false;
			for (var j = 0; j < 7; j++) {
				if (tempChessPos[i][j] != tempChessPos[i][14 - j]) {
					ySym = 0;
					isFinal = true;
					break;
				}
			}
			if (isFinal) {
				break;
			}
		}
		if (ySym) {
			symType = 2;
		}
		//xy轴对称
		if (xSym && ySym) {
			symType = 5;
		}
		//右斜对称
		for (var i = 0; i < 14; i++) {
			isFinal = false;
			for (var j = 0; j < i + 1; j++) {
				if (tempChessPos[i - j][j] != tempChessPos[14 - j][j + 14 - i]) {
					fFSym = 0;
					isFinal = true;
					break;
				}
			}
			if (isFinal) {
				break;
			}
		}
		if (fFSym) {
			symType = 3;
		}
		//左斜对称
		for (var i = 0; i < 14; i++) {
			isFinal = false;
			for (var j = 0; j < i + 1; j++) {
				if (tempChessPos[j][14 - i + j] != tempChessPos[j + 14 - i][j]) {
					oTFSym = 0;
					isFinal = true;
					break;
				}
			}
			if (isFinal) {
				break;
			}
		}
		if (oTFSym) {
			symType = 4;
		}
		//左右斜对称
		if (fFSym && oTFSym) {
			symType = 6;
		}

		//中心对称
		if (xSym && ySym && fFSym && oTFSym) {
			symType = 8;
		}
		return symType;
	}

	//判断走一步是否可取胜

	function judgeOneStep(operate, type) {
		var tempChessPos = [];
		for (var i = 0; i < currentChessPos.length; i++) {
			tempChessPos[i] = currentChessPos[i].slice();
		}
		for (var i = 0; i < operate.length; i++) {
			tempChessPos[operate[i].row][operate[i].col] = operate[i].type;
		}
		var isFinal = true;
		//x轴方向
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 11; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[i][j + k] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}

		//y轴方向
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 11; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[j + k][i] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}

		//左斜方向
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11 - i; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[j + k][j + k + i] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}

		for (var i = 1; i < 11; i++) {
			for (var j = 0; j < 11 - i; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[j + k + i][j + k] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}

		//右斜方向
		for (var i = 4; i < 15; i++) {
			for (var j = 0; j < i - 4 + 1; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[i - j - k][j + k] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}

		for (var i = 13; i > 3; i--) {
			for (var j = 0; j < i - 4 + 1; j++) {
				isFinal = true;
				for (var k = 0; k < 5; k++) {
					if (tempChessPos[14 - i + j + k][14 - j - k] != type) {
						isFinal = false;
						break;
					}
				}
				if (isFinal) {
					return true;
				}
			}
		}
		return false;
	}

	//计算当前局面的分数

	function culScore(operate) {
		var score = 0;
		var tempChessPos = [];
		for (var i = 0; i < currentChessPos.length; i++) {
			tempChessPos[i] = currentChessPos[i].slice();
		}
		for (var i = 0; i < operate.length; i++) {
			tempChessPos[operate[i].row][operate[i].col] = operate[i].type;
		}
		/*tempChessPos = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]*/
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				if (tempChessPos[i][j] == 1) {
					score += basicScore[i][j];
				} else if (tempChessPos[i][j] === 2) {
					score -= basicScore[i][j];
				}
			}
		}

		//x轴方向
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 10; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[i][j + k]);
				}
				if (j == 9) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}


		//y轴方向
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 10; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[j + k][i]);
				}
				if (j == 9) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}

		//左斜方向
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10 - i; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[j + k][j + k + i]);
				}
				if (j == 9 - i) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}

		for (var i = 1; i < 10; i++) {
			for (var j = 0; j < 10 - i; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[j + k + i][j + k]);
				}
				if (j == 9 - i) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}

		//右斜方向
		for (var i = 5; i < 15; i++) {
			for (var j = 0; j < i - 5 + 1; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[i - j - k][j + k]);
				}
				if (j == i - 5) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}


		for (var i = 13; i > 4; i--) {
			for (var j = 0; j < i - 5 + 1; j++) {
				var tempArr = [];
				for (var k = 0; k < 6; k++) {
					tempArr.push(tempChessPos[14 - i + j + k][14 - j - k]);
				}
				if (j == i - 5) {
					score += culSixChessScore(tempArr, true);
				} else {
					score += culSixChessScore(tempArr, false);
				}
			}
		}
		return score;
	}

	//计算每6个棋子所得分数

	function culSixChessScore(arr, last) {
		var score = 0;
		var maxNeighborNum = 0;
		var currentNeighborNum = 0;
		var currentType = -1;
		var blackNum = 0;
		var whiteNum = 0;
		var blankNum = 0;
		//确定黑白和空的数量，以及最大相邻子数
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === 1) {
				blackNum++;
			} else if (arr[i] === 2) {
				whiteNum++;
			} else {
				blankNum++;
			}

			if (arr[i] === currentType) {
				currentNeighborNum++;
			}
			if (arr[i] != currentType || i === arr.length - 1) {
				if (currentNeighborNum > maxNeighborNum) {
					maxNeighborNum = currentNeighborNum;
				}
				if (arr[i] != 0) {
					currentNeighborNum = 1;
					currentType = arr[i];
				} else {
					currentNeighborNum = 0;
					currentType = -1;
				}
			}
		}
		//00000
		if (maxNeighborNum === 5) {
			var loopNum;
			if (last) {
				loopNum = 2;
			} else {
				loopNum = 2;
			}
			for (var i = 0; i < loopNum; i++) {
				var __whiteNum = 0;
				var __blackNum = 0;
				for (j = i; j < i + 5; j++) {
					if (arr[j] == 2) {
						__whiteNum++;
					} else if (arr[j] == 1) {
						__blackNum++;
					}
				}
				if (__blackNum === 5) {
					score += 50000;
				} else if (__whiteNum === 5) {
					score -= 50000;
				}
			}
		}
		//+0000+
		else if (maxNeighborNum === 4 && blankNum === 2 && arr[0] === 0 && arr[5] === 0) {
			if (blackNum == 4) {
				score += 4320;
			} else if (whiteNum == 4) {
				score -= 4320;
			}
		}
		//+0000 0+000 00+00 000+0 0000+
		else if ((blackNum >= 4 || whiteNum >= 4) && maxNeighborNum != 5) {
			var loopNum;
			if (last) {
				loopNum = 2;
			} else {
				loopNum = 1;
			}
			for (var i = 0; i < loopNum; i++) {
				var __blankNum = 0;
				var __whiteNum = 0;
				var __blackNum = 0;
				for (j = i; j < i + 5; j++) {
					if (arr[j] == 0) {
						__blankNum++;
					} else if (arr[j] == 1) {
						__blackNum++;
					} else {
						__whiteNum++;
					}
				}
				if (__blackNum === 4 && __blankNum === 1) {
					score += 4320;
				} else if (__whiteNum === 4 && __blankNum === 1) {
					score -= 4320;
				}
			}
		}
		//+000++ +00+0+ +0+00+ ++000+
		else if (blankNum === 3 && arr[0] === 0 && arr[5] === 0) {
			if (blackNum === 3) {
				score += 720;
			} else if (whiteNum === 3) {
				score -= 720;
			}
		}
		//++00++ ++0+0+ +0+0++
		else if (blankNum === 4) {
			if (blackNum === 2 && ((arr[1] === 1 && arr[3] === 1) || (arr[2] === 1 && arr[3] === 1) || (arr[2] === 1 && arr[4] === 1))) {
				score += 120;
			} else if (whiteNum === 2 && ((arr[1] === 2 && arr[3] === 2) || (arr[2] === 2 && arr[3] === 2) || (arr[2] === 2 && arr[4] === 2))) {
				score -= 120;
			}
		}
		//+++0++ ++0+++
		else if (blankNum === 5) {
			if (blackNum === 1 && (arr[2] === 1 || arr[3] === 1)) {
				score += 20;
			} else if (whiteNum === 1 && (arr[2] === 2 || arr[3] === 2)) {
				score -= 20;
			}
		}
		return score;
	}

});