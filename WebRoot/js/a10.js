$(function() {
	var radius = 40;
	setSpan();

	$('#container').highcharts({
		title: {
			text: ''
		},
		chart: {
			  style : {
                  fontFamily:"微软雅黑",    
                },
			type: 'line',
			zoomType: 'x',
			panning: true,
			panKey: 'shift'
		},
		xAxis: {
			title: {
			    fontFamily:"微软雅黑",
				text: "迭代次数"
			}
		},
		 credits:{
             enabled:false // 禁用版权信息
        },
		yAxis: {
			title: {
				fontFamily:"微软雅黑",
				text: "总距离"
			}
		},
		series: [{
			 name: '距离',     
			data: [2000]
		}]
	});

	function setSpan() {
		for (var i = 0; i < 6; i++) {
			var span = document.createElement("span");
			$(span).attr("class", "circleSpan");
			var left = parseInt(Math.random() * 320);
			var top = parseInt(Math.random() * 320);
			$(span).css({
				left: left,
				top: top
			});
			$("#head1").append(span);
		}
	}

	$(".circleSpan").bind("mousedown", circleSpanHandler);

	function circleSpanHandler(event) {
		var parentNode = this.parentNode;
		var origPosition = $(parentNode).offset();
		var left = $(this).css("left");
		var top = $(this).css("top");
		var deltaX = event.pageX - parseInt(left) - origPosition.left;
		var deltaY = event.pageY - parseInt(top) - origPosition.top;
		event.stopPropagation();
		$(this).bind("mousemove", function(event) {
			var newLeft = event.pageX - origPosition.left - deltaX;
			var newTop = event.pageY - origPosition.top - deltaY;
			if (newLeft < 0) {
				newLeft = 0;
			} else if (newLeft > 320) {
				newLeft = 320;
			}
			if (newTop < 0) {
				newTop = 0;
			} else if (newTop > 320) {
				newTop = 320;
			}
			$(this).css({
				left: newLeft,
				top: newTop
			});

			event.stopPropagation();
		});

		$(this).bind("mouseleave mouseup mouseout", function(event) {
			$(this).unbind("mousemove mouseup mouseout mouseleave");
			event.stopPropagation();
		});
	}

	$("#button").bind("mousedown", buttonHandler);

	function buttonHandler(event) {
		$("#button").unbind("mousedown");
		$("#clearButton").unbind("mousedown");
		$("#canvasLine").css("zIndex", 100);
		var span = document.createElement("span");
		$(span).attr("id", "target");
		var left = parseInt(Math.random() * 370);
		var top = parseInt(Math.random() * 370);
		$(span).css({
			left: left,
			top: top
		});
		$("#head1").append(span);
		var targetCenterX = left + 15;
		var targetCenterY = top + 15;
		var circleCenterX;
		var circleCenterY;
		var INF = 3360;
		var eps = 1;
		var delta = 0.98;
		var T = 20;
		var dx = [0, 1, 0, -1];
		var dy = [-1, 0, 1, 0];
		var newTargetCenterX, newTargetCenterY;
		var count = 0;
		Search();

		function Search() {
			var t = T;
			var ans = INF;
			SearchFunc1();

			function SearchFunc1() {
				if (t > eps) {
					var flag = 1;
					SearchFunc2();
				} else {
					$("#clearButton").bind("mousedown", clearButtonHandler);
				}

				function SearchFunc2() {
					if (flag) {
						flag = 0;
						var i = 0;
						SearchFunc3();

						function SearchFunc3() {
							if (i < 4) //上下左右四个方向  
							{
								newTargetCenterX = targetCenterX + dx[i] * t;
								newTargetCenterY = targetCenterY + dy[i] * t;
								i++;
								if (newTargetCenterX < 15 || newTargetCenterX > 385 || newTargetCenterY < 15 || newTargetCenterY > 385) {
									SearchFunc3();
								}
								var tp = getTotalDistance();
								if (ans > tp) {
									ans = tp;
									if (count < 10 || count % 5 == 0) {
										var chart = $('#container').highcharts();
										chart.series[0].addPoint(ans);
									}
									count++;
									targetCenterX = newTargetCenterX;
									targetCenterY = newTargetCenterY;
									drawCanvasLine();
									flag = 1;
									setTimeout(SearchFunc3, 200);
								} else {
									SearchFunc3();
								}
							} else {
								SearchFunc2();
							}
						}
					} else {
						t *= delta;
						SearchFunc1();
					}
				}
			}
			return ans;
		}

		function getTotalDistance() {
			var circleSet = $(".circleSpan");
			totalDistance = 0;
			for (var i = 0; i < circleSet.length; i++) {
				circleCenterX = parseInt($(circleSet[i]).css("left")) + radius;
				circleCenterY = parseInt($(circleSet[i]).css("top")) + radius;
				totalDistance += culDistance(newTargetCenterX, newTargetCenterY, circleCenterX, circleCenterY);
			}
			return totalDistance;
		}

		function drawCanvasLine() {
			$("#target").css({
				left: targetCenterX - 15,
				top: targetCenterY - 15
			});
			var oldCanvas = document.getElementById("canvasLine");
			if (oldCanvas) {
				var c = oldCanvas.getContext("2d");
				c.clearRect(0, 0, 400, 400);
			}
			var circleSet = $(".circleSpan");
			var canvas, c;
			for (var i = 0; i < circleSet.length; i++) {
				circleCenterX = parseInt($(circleSet[i]).css("left")) + radius;
				circleCenterY = parseInt($(circleSet[i]).css("top")) + radius;
				canvas = document.getElementById("canvasLine");
				var c = canvas.getContext("2d");
				c.beginPath();
				c.moveTo(targetCenterX, targetCenterY);
				c.lineTo(circleCenterX, circleCenterY);
				c.strokeStyle = "#808080";
				c.lineWidth = 2;
				c.stroke();
				c.closePath();
				c.beginPath();
				c.arc(circleCenterX, circleCenterY, 5, 0, Math.PI * 2, false);
				c.fillStyle = "#4169E1";
				c.fill();
				c.closePath();
			}
			canvas = document.getElementById("canvasLine");
			c = canvas.getContext("2d");
			c.beginPath();
			c.fillStyle = "#6495ED";
			c.arc(targetCenterX, targetCenterY, 5, 0, Math.PI * 2, false);
			c.fill();
			c.closePath();
		}

		function culDistance(x1, y1, x2, y2) {
			return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		}
	}

	function clearButtonHandler() {
		var oldCanvas = document.getElementById("canvasLine");
		if (oldCanvas) {
			var c = oldCanvas.getContext("2d");
			c.clearRect(0, 0, 400, 400);
		}
		$(oldCanvas).css("zIndex", 0);
		$("#target").remove();
		$("#button").bind("mousedown", buttonHandler);
		$('#container').highcharts().destroy();
		$('#container').highcharts({
			title: {
				text: ''
			},
			chart: {
				  style : {
	                  fontFamily:"微软雅黑",    
	                },
				type: 'line',
				zoomType: 'x',
				panning: true,
				panKey: 'shift'
			},
			xAxis: {
				title: {
					text: "迭代次数"
				}
			},
			yAxis: {
				title: {
					text: "总距离"
				}
			},
			 credits:{
	                enabled:false // 禁用版权信息
	           },
			series: [{
				data: [2000]
			}]
		});
	}

});