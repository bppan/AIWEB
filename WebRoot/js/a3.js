$(function() {
	var spanSet1 = $("#head1 span");
	setSpan(spanSet1);

	var spanSet2 = $("#head2 span");
	setSpan(spanSet2);

	var delayTime = 1000;
	var animateTime = 800;

	function setSpan(spanSet) {
		for (var i = 0; i < spanSet.length; i++) {
			var border = parseInt($(spanSet[i]).css("border"));
			var width = parseInt($(spanSet[i]).css("width"));
			var height = parseInt($(spanSet[i]).css("height"));
			var row = Math.floor(i / 3);
			var col = i % 3;
			$(spanSet[i]).css({
				left: col * (border + width),
				top: row * (border + height)
			});
		}

	}

	$("#subSpeed").bind("mousedown", function(event) {
		if(delayTime + 2000 <= 10000){
			delayTime += 2000;
		}
		if(animateTime + 320 <= 2400){
			animateTime += 320;
		}
	});

	$("#addSpeed").bind("mousedown", function(event) {
		if(delayTime - 2000 > 0){
			delayTime -= 2000;
		}
		if(animateTime - 800 > 0){
			animateTime -= 320;
		}
	});

	$("span").bind("mousedown", function(event) {
		var parentNode = this.parentNode;
		var parentWidth = $(parentNode).css("width");
		var parentHeight = $(parentNode).css("height");
		var parentId = parentNode.id;
		var origPosition = $(parentNode).offset();
		var width = $(this).css("width");
		var height = $(this).css("height");
		var left = $(this).css("left");
		var top = $(this).css("top");
		var deltaX = event.clientX - parseInt(left) - origPosition.left;
		var deltaY = event.clientY - parseInt(top) - origPosition.top;
		$(this).bind("mousemove", function(event) {
			$(this).css({
				left: event.clientX - origPosition.left - deltaX,
				top: event.clientY - origPosition.top - deltaY
			});
			event.stopPropagation();
		});

		$(this).bind("mouseleave mouseup mouseout", function(event) {
			if (event.clientX > origPosition.left + parseInt(parentWidth) || event.clientX < origPosition.left || event.clientY > origPosition.top + parseInt(parentHeight) || event.clientY < origPosition.top) {
				$(this).css({
					left: left,
					top: top
				});
			} else {
				var col = Math.floor((event.clientX - origPosition.left) / (parseInt(parentWidth) / 3));
				var row = Math.floor((event.clientY - origPosition.top) / (parseInt(parentHeight) / 3));
				var no = row * 3 + col;
				var spanSet;
				if (this.parentNode.id === "head1") {
					spanSet = $("#head1 span");
				} else {
					spanSet = $("#head2 span");
				}
				var index = spanSet.index($(this));
				if (no === index) {
					$(this).css({
						left: left,
						top: top
					});
				} else {
					var replaceSpan = spanSet[no];
					$(replaceSpan).css({
						left: left,
						top: top
					});
					var border = parseInt($(spanSet[index]).css("border"));
					var width = parseInt($(spanSet[index]).css("width"));
					var height = parseInt($(spanSet[index]).css("height"));
					$(this).css({
						left: col * (border + width),
						top: row * (border + height)
					});
					if (no > index) {
						$(spanSet[no]).insertBefore($(spanSet[index]));
						if (this.parentNode.id === "head1") {
							spanSet = $("#head1 span");
						} else {
							spanSet = $("#head2 span");
						}
						$(spanSet[index + 1]).insertAfter($(spanSet[no]));
					} else {
						$(spanSet[index]).insertBefore($(spanSet[no]));
						if (this.parentNode.id === "head1") {
							spanSet = $("#head1 span");
						} else {
							spanSet = $("#head2 span");
						}
						$(spanSet[no + 1]).insertAfter($(spanSet[index]));
					}
				}

			}
			$(this).unbind("mousemove mouseup mouseout mouseleave");
		})
	});

	$("#button").bind("mousedown", buttonMouseDown);

	function buttonMouseDown(event) {
		$("#addSpeed").css("display", "inline");
		$("#subSpeed").css("display", "inline");
		$(this).unbind("mousedown");
		setTimeout(function() {
			$(document).scrollTop(670);
		}, 3000);
		var oldSpan = $(".head3");
		oldSpan && oldSpan.remove();
		$("#algorithmDisplayWrap").unbind("mousedown mousemove mouseout mouseleave mouseup");
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, oldCanvas.width, oldCanvas.height);
		}
		var startSpanSet = $("#head1 span");
		var endSpanSet = $("#head2 span");
		var startNum = [];
		var endNum = [];
		for (var i = 0; i < 9; i++) {
			startNum.push($(startSpanSet[i]).text());
			endNum.push($(endSpanSet[i]).text());
		}
		var strRecord = [];
		var numRecord = [];
		var startObj = {};
		startObj.floors = 0;
		startObj.num = startNum.slice();
		startObj.parentId = -1;
		startObj.sonSet = [];
		startObj.dir = -1;
		startObj.parentEmpty = -1;
		numRecord.push(startObj);
		var startStr = createStr(startObj.num);
		var endStr = createStr(endNum);
		strRecord.push(startStr)
		var findResult = false;
		var dirCol = [0, 1, 0, -1];
		var dirRow = [-1, 0, 1, 0];
		if (startStr !== endStr)
			cul(startObj);
		else {
			findResult = true;
		}
		var targetNumArr = [];
		var currentMax = 1;
		culPos(0);
		displayNum();

		function cul(tempObj) {
			if (findResult)
				return;
			if (tempObj.floors === 5) {
				return;
			}
			var emptyPos = tempObj.num.indexOf(" ");
			var emptyRow = parseInt(emptyPos / 3);
			var emptyCol = emptyPos % 3;
			for (var i = 0; i < 4; i++) {
				var newRow = emptyRow + dirRow[i];
				var newCol = emptyCol + dirCol[i];
				if (newRow >= 0 && newRow <= 2 && newCol >= 0 && newCol <= 2) {
					var newPos = newRow * 3 + newCol;
					var __tempObj = {};
					__tempObj.floors = tempObj.floors + 1;
					__tempObj.num = tempObj.num.slice();
					__tempStr = createStr(tempObj.num);
					__tempObj.parentId = strRecord.indexOf(__tempStr);
					__tempObj.num[emptyPos] = __tempObj.num[newPos];
					__tempObj.num[newPos] = " ";
					__tempObj.sonSet = [];
					__tempObj.posNum = 0;
					__tempObj.dir = i;
					__tempObj.parentEmpty = emptyPos;
					var __str = createStr(__tempObj.num);
					if (strRecord.indexOf(__str) === -1) {
						numRecord[__tempObj.parentId].sonSet.push(numRecord.length);
						numRecord.push(__tempObj);
						strRecord.push(__str);
						if (__str === endStr) {
							findResult = true;
							return;
						}
						cul(__tempObj);
						if (findResult) {
							return;
						}
					}
				}
			}
		}

		function createStr(arr) {
			var str = "";
			for (var i = 0; i < arr.length; i++) {
				str += arr[i];
			}
			return str;
		}

		function culPos(idx) {
			var sonSet = numRecord[idx].sonSet;
			if (sonSet) {
				for (var i = 0; i < sonSet.length; i++) {
					(numRecord.length > sonSet[i]) && culPos(sonSet[i]);
				}
			}
			if (sonSet.length) {
				numRecord[idx].posNum = (numRecord[sonSet[0]].posNum + numRecord[sonSet[sonSet.length - 1]].posNum) / 2;
			} else {
				numRecord[idx].posNum = currentMax++;
			}
		}

		function displayNum() {
			var row = 0;
			var col = 0;
			var count = 0;
			var startX = 100;
			var startY = 50;
			var increasePx = 115;
			var minLeft = 475 - (startX + increasePx * numRecord[0].posNum);
			var maxLeft = minLeft;
			if (findResult) {
				getTargetNum();
			}

			setTimeout(displaySingleSpan, 4000)

			function displaySingleSpan() {
				var left = startX + increasePx * numRecord[count].posNum;
				var top = startY + increasePx * numRecord[count].floors;
				var parentEmpty = numRecord[count].parentEmpty;
				var sonEmpty = numRecord[count].num.indexOf(" ");
				var dir = numRecord[count].dir;
				var tipSpan = document.createElement("span");
				$(tipSpan).attr("class","tipSpan");
				$(tipSpan).text(count + 1);
				$(tipSpan).css("left",left + 35);
				$(tipSpan).css("top",top + 95);
				$("#algorithmDisplay").append(tipSpan);
				if ((parentEmpty >= 0) && (sonEmpty >= 0)) {
					numRecord[count].num[sonEmpty] = numRecord[count].num[parentEmpty];
					numRecord[count].num[parentEmpty] = " ";
				}
				if (numRecord[count].parentId >= 0) {
					var newSpan = $(".head3")[numRecord[count].parentId];
					var parentLeft = parseInt($(newSpan).css("left")) + 46;
					var parentTop = parseInt($(newSpan).css("top")) + 92;
					var sonLeft = left + 46;
					var sonTop = top;

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
				var posLeft = 475 - (startX + increasePx * numRecord[count].posNum);
				if (posLeft < minLeft) {
					minLeft = posLeft;
				}
				if (posLeft > maxLeft) {
					maxLeft = posLeft;
				}
				$("#algorithmDisplay").css("left", posLeft);
				var newElement = document.createElement("div");
				$(newElement).attr("class", "head3");
				$(newElement).css({
					left: left,
					top: top
				});
				$("#algorithmDisplay").append(newElement);
				for (var i = 0; i < 9; i++) {
					var newSpan = document.createElement("span");
					$(newSpan).attr("class", "spanSet");

					if (targetNumArr.indexOf(count) !== -1) {
						$(newSpan).attr("id", "target");
					}
					$(newSpan).text(numRecord[count].num[i]);
					$(newSpan).css({
						"left": (i % 3) * 30,
						"top": parseInt(i / 3) * 30
					});
					if (count != 0) {
						if (i === parentEmpty) {
							$(newSpan).css("zIndex", sonEmpty * 10);
							$(newSpan).animate({
								left: parseInt($(newSpan).css("left")) + 30 * dirCol[dir],
								top: parseInt($(newSpan).css("top")) + 30 * dirRow[dir]
							}, animateTime);
						} else if (i === sonEmpty) {
							$(newSpan).css("zIndex", parentEmpty * 10);
							$(newSpan).animate({
								left: parseInt($(newSpan).css("left")) - 30 * dirCol[dir],
								top: parseInt($(newSpan).css("top")) - 30 * dirRow[dir]
							}, animateTime);
						} else {
							$(newSpan).css("zIndex", i * 10);
						}
					}
					$(newElement).append(newSpan);
				}

				count++;
				if (count < numRecord.length) {
					setTimeout(displaySingleSpan, delayTime);
				} else {
					var targetCount = 0;
					if (targetNumArr.length){
						setTimeout(fadeInOutTargetSpan, 1000);
					}
					else {
						setTimeout(function() {
							$("#algorithmDisplay").css("left", 475 - (startX + increasePx * numRecord[0].posNum));
							$("#algorithmDisplayWrap").bind("mousedown", displayDrag);
							$("#button").bind("mousedown", buttonMouseDown);
						}, 1000);
					}
				}

				function fadeInOutTargetSpan() {
					$("#algorithmDisplay").css("left", 475 - (startX + increasePx * numRecord[targetNumArr[targetCount]].posNum));
					var newSpan = $(".head3")[targetNumArr[targetCount]];
					$(newSpan).fadeOut("slow").fadeIn("slow");
					targetCount++;
					if (targetCount < targetNumArr.length){
						setTimeout(fadeInOutTargetSpan, 1000);
					}
					else {
						setTimeout(function() {
							$("#algorithmDisplay").css("left", 475 - (startX + increasePx * numRecord[0].posNum))
							$("#algorithmDisplayWrap").bind("mousedown", displayDrag);
							$("#button").bind("mousedown", buttonMouseDown);
						}, 1000);
					}
				}

				function displayDrag(event) {
					event.stopPropagation();
					var oldX = event.pageX;
					$(this).bind("mousemove", function(event) {
						event.stopPropagation();
						var deltaX = event.pageX - oldX;
						oldX = event.pageX;
						var left = $("#algorithmDisplay").css("left");
						var newLeft = parseInt(left) + deltaX;
						if (newLeft > maxLeft) {
							newLeft = maxLeft;
						}
						if (newLeft < minLeft) {
							newLeft = minLeft;
						}
						$("#algorithmDisplay").css("left", newLeft);
					});

					$(this).bind("mouseout mouseleave mouseup", function(event) {
						$(this).unbind("mousemove mouseleave mouseup mouseout");
					});
				}
			}

		}


		function getTargetNum() {
			targetNumArr = [];
			var lastNum = numRecord.length - 1;
			var tempNum = lastNum;
			do {
				targetNumArr.push(tempNum);
				tempNum = numRecord[tempNum].parentId;
			} while (tempNum !== -1)
			targetNumArr.reverse();
		}
	}

})