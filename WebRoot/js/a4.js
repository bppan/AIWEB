$(function(){
	var spanSet1 = $("#head1 span");
	setSpan(spanSet1);

	var spanSet2 = $("#head2 span");
	setSpan(spanSet2);
	
	


	function setSpan(spanSet){
		for(var i = 0; i < spanSet.length; i++){
			var border = parseInt($(spanSet[i]).css("border"));
			var width = parseInt($(spanSet[i]).css("width"));
			var height = parseInt($(spanSet[i]).css("height"));
			var row = Math.floor(i / 3);
			var col = i % 3;
			$(spanSet[i]).css({left: col * (border + width), top: row * (border + height)});
		}
		
	}
	
	
	$("span").bind("mousedown", function(event){
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
		$(this).bind("mousemove", function(event){
			$(this).css({left: event.clientX - origPosition.left - deltaX, top: event.clientY - origPosition.top - deltaY});
			event.stopPropagation();
		});
	
		$(this).bind("mouseleave mouseup mouseover", function(event){
			if(event.clientX > origPosition.left + parseInt(parentWidth) || event.clientX < origPosition.left || event.clientY > origPosition.top + parseInt(parentHeight) || event.clientY < origPosition.top){
				$(this).css({left: left, top: top});
			}else{
				var col = Math.floor((event.clientX - origPosition.left) / (parseInt(parentWidth) / 3));
				var row = Math.floor((event.clientY - origPosition.top) / (parseInt(parentHeight) / 3));
				var no = row * 3 + col;
				var spanSet;
				if(this.parentNode.id === "head1"){
					spanSet = $("#head1 span");
				}else{
					spanSet = $("#head2 span");
				}	
				var index = spanSet.index($(this));
				if(no === index){
					$(this).css({left: left, top: top});
				}else{
					var replaceSpan = spanSet[no];
					$(replaceSpan).css({left: left, top: top});
					var border = parseInt($(spanSet[index]).css("border"));
					var width = parseInt($(spanSet[index]).css("width"));
					var height = parseInt($(spanSet[index]).css("height"));
					$(this).css({left: col * (border + width), top: row * (border + height)});
					if(no > index){	
						$(spanSet[no]).insertBefore($(spanSet[index]));
						if(this.parentNode.id === "head1"){
							spanSet = $("#head1 span");
						}else{
							spanSet = $("#head2 span");
						}
						$(spanSet[index + 1]).insertAfter($(spanSet[no]));
					}else{
						$(spanSet[index]).insertBefore($(spanSet[no]));
						if(this.parentNode.id === "head1"){
							spanSet = $("#head1 span");
						}else{
							spanSet = $("#head2 span");
						}
						$(spanSet[no + 1]).insertAfter($(spanSet[index]));
					}
				}
			
			}
			$(this).unbind("mousemove mouseup mouseover mouseleave");
		})
	});
	
	$("#button").bind("mousedown", function(event){
		var oldSpan = $(".head3");
		oldSpan && oldSpan.remove();
		var startSpanSet = $("#head1 span");
		var endSpanSet = $("#head2 span");
		var startNum = [];
		var endNum = [];
		for(var i = 0;i < 9;i++){
			startNum.push($(startSpanSet[i]).text());
			endNum.push($(endSpanSet[i]).text());
		}
		var strRecord = [];
		var numRecord = [];
		var queue = [];
		var startObj = {};
		startObj.floors = 0;
		startObj.num = startNum.slice();
		startObj.parentId = -1;
		queue.push(startObj);
		numRecord.push(startObj);
		var startStr = createStr(startObj.num);
		var endStr = createStr(endNum);
		strRecord.push(startStr)
		var findResult = false;
		if(startStr !== endStr)
			cul();
		else{
			findResult = true;
		}
		var targetNumArr = [];
		displayNum();
	
		function cul(){
			var dirCol = [0, 1, 0, -1];
			var dirRow = [-1, 0, 1, 0];
			while(queue.length != 0){
				if(findResult)
					break;
				var tempObj = queue.splice(0, 1)[0];
				if(tempObj.floors === 6){
					break;
				}
				var emptyPos = tempObj.num.indexOf(" ");
				var emptyRow = parseInt(emptyPos / 3);
				var emptyCol = emptyPos % 3;
				for(var i = 0;i < 4;i++){
					var newRow = emptyRow + dirRow[i];
					var newCol = emptyCol + dirCol[i];
					if(newRow >= 0 && newRow <= 2 && newCol >= 0 && newCol <= 2){
						var newPos = newRow * 3 + newCol;
						var __tempObj = {};
						__tempObj.floors = tempObj.floors + 1;
						__tempObj.num = tempObj.num.slice();
						__tempStr = createStr(tempObj.num);
						__tempObj.parentId = strRecord.indexOf(__tempStr);
						__tempObj.num[emptyPos] = __tempObj.num[newPos];
						__tempObj.num[newPos] = " ";
						var __str = createStr(__tempObj.num);
						if(strRecord.indexOf(__str) === -1){
							queue.push(__tempObj);
							numRecord.push(__tempObj);
							strRecord.push(__str);
							if(__str === endStr){
								findResult = true;
								break;
							}	
						}	
					}
				}
			}
		}
	
		function createStr(arr){
			var str = "";
			for(var i = 0; i < arr.length; i++){
				str += arr[i];
			}
			return str;
		}
	
		function displayNum(){
			var row = 0;
			var col = 0;
			var count = 0;
			var startX = 100;
			var startY = 100;
			var increasePx = parseInt($("#head1").css("width")) + 50;
			if(findResult){
				getTargetNum();
			}
			setTimeout(displaySingleSpan,4000)
	
			function displaySingleSpan(){
				if(row != numRecord[count].floors){
					row++;
					col = 0;
				}
				var newElement = document.createElement("div");
				$(newElement).attr("class", "head3");
				$(newElement).css({left: startX + increasePx * col, top: startY + increasePx * row});
					var spanSet = $("#head1 span");
				for(var i = 0;i < 9;i++){
					var newSpan = $(spanSet[i]).clone();
					if(targetNumArr.indexOf(count) !== -1)
						newSpan.attr("id", "target");
					newSpan.text(numRecord[count].num[i]); 
					$(newElement).append(newSpan);
				}
				$(newElement).css("display", "none");
				$("#algorithmDisplay").append(newElement);
				// $(newElement).slideDown(4000);
				$(newElement).animate({
					width: "show",
					borderLeft: "show",
					borderRight: "show",
					paddingLeft: "show",
					paddingRight: "show",
				},{
					duration: 1000
				});
				col++;
				count++;
				if(count < numRecord.length){
					setTimeout(displaySingleSpan, 200);
				}
			}
	
		}
	
		
		function getTargetNum(){
			targetNumArr = [];
			var lastNum = numRecord.length - 1;
			var tempNum =lastNum;
			do{
				targetNumArr.push(tempNum);
				tempNum = numRecord[tempNum].parentId;
			}while(tempNum !== -1)
			targetNumArr.reverse();
		}
	});

})