/**
 * Created by Administrator on 2016/3/13.
 */
var Transcripts = Transcripts || {};
var basePath = 'http://localhost:8080/AIWEB16';
var choseid = -1;
var choseName = "";




$(function(){
    Transcripts.bindBaseEven();    
	choseid = 	$.cookie('choseid');
	choseName = $.cookie('choseName');
	$("#algchoise").html(choseName);
})


Transcripts.bindBaseEven = function () {
	
	var changlite = 2.0
	var changeWidth = 0;
	var changeHeight =0;
	for(var i = 0; i < 12;i++){
		$("#"+i+ " img").mouseover(function(){
			var width = $(this).attr("width");
			var height = $(this).css("height");
			changeWidth = width*1.0 + changlite;
			changeHeight = height*1.0 + changlite;
			$(this).attr("width",changeWidth);
			$(this).attr("height",changeHeight);
			});
		$("#"+i+ " img").mouseout(function(){
				var width = $(this).attr("width");
				var height = $(this).css("height");
				changeWidth = width*1.0 -changlite;
				changeHeight = height*1.0 - changlite;

				$(this).attr("width",changeWidth);
				$(this).attr("height",changeHeight);
			});
		$("#"+i).click(function(){
			if($(this).hasClass("pmtag")){	
			}else{
				
				if(choseid != -1){
					$("#"+choseid + " img").attr("width", changeWidth - changlite);
					$("#"+choseid + " img").attr("height", changeHeight - changlite);
					$("#"+choseid).removeClass("pmtag");
				}				
				changeWidth = changeWidth*1.0+changlite;
				changeHeight = changeHeight*1.0+changlite;
				
				choseid = $(this).attr("id");	
			
				$.cookie('choseid',choseid);
			
				$("#"+choseid + " img").attr("width", changeWidth + changlite);
				$("#"+choseid + " img").attr("height", changeHeight + changlite);
				choseName =  $(this).attr("name");	
				
				$.cookie('choseName',choseName);
				
				$("#algchoise").html(choseName);
				$(this).addClass("pmtag");
			}
			});
	}
	$("#run").click(function(){
		if(!choseid){			
			alert("请选择后代!");
			
		}else{
			
		//	window.location.href=window.location.href;
			

			
			$(document).scrollTop(486);
			
			Transcripts.runAlg();
		}	
	});	
}



Transcripts.runAlg = function(){
	

	
	var node11 = {};
	node11.name = "H1,51";
	node11.id = 11;
	node11.listchild = [];	
	
	var node10 = {};
	node10.name = "G1,27";
	node10.id = 10;
	node10.listchild = [];
	
	var node9 = {};
	node9.name = "F1,32";
	node9.id = 9;
	node9.listchild = [];
	
	var node8 = {};
	node8.name = "E2,92";
	node8.id = 8;
	node8.listchild = [node11];
	
	var node7 = {};
	node7.name = "E1,57";
	node7.id = 7;
	node7.listchild = [node10];
	
	var node6 = {};
	node6.name = "D1,77";
	node6.id = 6;
	node6.listchild = [];
	
	var node5 = {};
	node5.name = "C2,87";
	node5.id = 5;
	node5.listchild = [];
	
	var node4 = {};
	node4.name = "C1,96";
	node4.id = 4;
	node4.listchild = [node9];
	
	var node3 = {};
	node3.name = "B3,52";
	node3.id = 3;
	node3.listchild = [node7,node8];
	
	var node2 = {};
	node2.name = "B2,65";
	node2.id = 2;
	node2.listchild =[node6];
	
	var node1 = {};
	node1.name = "B1,77";
	node1.id = 1;
	node1.listchild = [node5,node4];
	
	var node0 = {};
	node0.name = "A,47";
	node0.id = 0;
	node0.listchild = [node1,node3,node2];

	var alg = alg||{};	
	var resetborder = "1px solid #121212";
	alg.start = $("#20");
	
	alg.init = $("#21");
	alg.isOPenNull = $("#22");
	alg.isOPenNullFail = $("#23");
	alg.openFirstMoveClose = $("#24");
	alg.isTarget = $("#25");
	alg.tagetSuccess = $("#26");
	alg.moveOpen = $("#27");
	alg.alterPointer = $("#28");
	alg.resetOpen = $("#29");
	alg.openTable = $("#open");
	alg.closeTable = $("#close");
	alg.isfound = false;
	
	$("#open").empty();
	$("#close").empty();
	alg.tagetSuccess.css("border",resetborder);
	var openList =[];
	var closeList=[];
	var n = 0;

	var tree = node0;
	
	/*
	setTimeout(function(){
		alg.start.css("border",resetborder);
		alg.init.css("border","2px solid #39A4DC");		
		alg.openTable.append("<span id = 'p0' name = '" + tree.id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px;'>"+tree.name+"</span>");
		alg.closeTable.empty();
		
	},2000); 
	tree.listchild.length;
	//开始初始化
	setTimeout(function(){
		alg.init.css("border",resetborder);
		alg.isOPenNull.css("border","2px solid #39A4DC");
	},4000); 
	
	setTimeout(function(){
		alg.isOPenNull.css("border",resetborder);
		alg.openFirstMoveClose.css("border","2px solid #39A4DC");
		var first = $("#open span:first");
		$("#open span:first").remove();
		alg.closeTable.append(first);
	},6000); 
	//算法实现
	setTimeout(function(){
		alg.openFirstMoveClose.css("border",resetborder);
		alg.isTarget.css("border","2px solid #39A4DC");
		var first = $("#close span:first");
		if(tree.id == choseid){
			alg.isfound = true;
			setTimeout(function(){
				alg.isTarget.css("border",resetborder);
				alg.tagetSuccess.css("border","2px solid #39A4DC");
				$("#close span:first").css("border","2px solid #39A4DC");
			},2000); 
		}
		$("#close span:first").remove();
		for(var i = 0; i < tree.listchild.length; i++){
			alg.openTable.append("<span id = 'p0' name = '" + tree.listchild[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px;'>"+tree.listchild[i].name+"</span>");
		}
		//alg.closeTable.append(first);
	},8000); 
*/

	alg.start.css("border","2px solid #39A4DC");

	setTimeout(function(){		
		alg.start.css("border",resetborder);
		alg.init.css("border","2px solid #39A4DC");		
		alg.openTable.append("<span id = 'p-1' name = '" + tree.id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center; '>"+tree.name+"</span>");
		
		alg.closeTable.empty();
		
		setTimeout(function(){		
			alg.init.css("border",resetborder);
			alg.isOPenNull.css("border","2px solid #39A4DC");
			if($("#open span").length == 0){
				alg.isfound = true;
				alg.isOPenNull.css("border",resetborder);
				alg.isOPenNullFail.css("border","2px solid #39A4DC");
				//停止循环
			}
			else{
				setTimeout(function(){		
					alg.isOPenNull.css("border",resetborder);
					alg.openFirstMoveClose.css("border","2px solid #39A4DC");	
					var first = $("#open span:first");	
					$("#open span:first").remove();
					alg.closeTable.append(first);
					closeList[n] = tree;	
					n++;
					setTimeout(function(){
						alg.openFirstMoveClose.css("border",resetborder);
						alg.isTarget.css("border","2px solid #39A4DC");
						if(tree.id ==choseid ){
							alg.isfound = true;
							setTimeout(function(){
								alg.isTarget.css("border",resetborder);
								alg.tagetSuccess.css("border","2px solid #39A4DC");
								$("#close span:first").css("border","2px solid #39A4DC");
							},2000); 
							//停止循环
						}
						else{		
							setTimeout(function(){
								//$("#close span:first").remove();
								alg.isTarget.css("border",resetborder);
								alg.moveOpen.css("border","2px solid #39A4DC");
								for(var i = 0; i < tree.listchild.length; i++){
									alg.openTable.append("<span id = 'p-1' name = '" + tree.listchild[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+tree.listchild[i].name+"</span>");
								}
								
								setTimeout(function(){
									alg.moveOpen.css("border",resetborder);
									alg.alterPointer.css("border","2px solid #39A4DC");
									
									setTimeout(function(){
										alg.alterPointer.css("border",resetborder);
										alg.resetOpen.css("border","2px solid #39A4DC");										
										alg.openTable.empty();
										var temp = tree.listchild[0];
								
										for(var i = 1;  i < tree.listchild.length;i++){											
											if(tree.listchild[i - 1].id >  tree.listchild[i].id){
												var tempnode = tree.listchild[i - 1];
												tree.listchild[i - 1] = tree.listchild[i];
												tree.listchild[i] = tempnode;												
											}
										}
										for(var i = 0; i < tree.listchild.length; i++){
											alg.openTable.append("<span id = 'p-1' name = '" + tree.listchild[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+tree.listchild[i].name+"</span>");
											openList[i] = tree.listchild[i];
										}
										
									},2000); 
									
								},2000); 
								
							},2000); 							
						}
						
					},2000); 
				},2000); 	
			}
		},2000); 	
	},2000); 

	
	/*
	setTimeout(function(){		
		while(true){
			alg.init.css("border",resetborder);
			alg.isOPenNull.css("border","2px solid #39A4DC");		
			
			if($("#open span").length == 0){
				setTimeout(function(){		
					alg.isOPenNull.css("border",resetborder);
					alg.isOPenNullFail.css("border","2px solid #39A4DC");		
					break;
				},2000); 

			}
			break;
		}
	},4000); 
	*/

	var stop = setInterval(function(){		

		if(alg.isfound){
			clearInterval(stop);
		}
		else{
			alg.resetOpen.css("border",resetborder);
			alg.isOPenNull.css("border","2px solid #39A4DC");
			setTimeout(function(){
				if($("#open span").length == 0){
					alg.isfound = true;
					alg.isOPenNull.css("border",resetborder);
					alg.isOPenNullFail.css("border","2px solid #39A4DC");
					clearInterval(stop);
				}
				else{	
					tree = openList[0];
					setTimeout(function(){		
						alg.isOPenNull.css("border",resetborder);
						alg.openFirstMoveClose.css("border","2px solid #39A4DC");	
						
						var temp = [];						
						for(var i = 1; i < openList.length;i++){
							temp[i-1] = openList[i];
						}
						alg.openTable.empty();
						for(var i = 0; i < temp.length;i++){
							alg.openTable.append("<span id = 'p-1' name = '" + temp[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+temp[i].name+"</span>");
						}
					//alg.closeTable.empty();
						alg.closeTable.append("<span id = 'p" +openList[0].id+"' name = '" + openList[0].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+openList[0].name+"</span>");
						closeList[n] = openList[0];
						n++;
						openList = temp;
					  				    
						setTimeout(function(){
							alg.openFirstMoveClose.css("border",resetborder);
							alg.isTarget.css("border","2px solid #39A4DC");
							if(tree.id ==choseid ){
								alg.isfound = true;
								setTimeout(function(){
									alg.isTarget.css("border",resetborder);
									alg.tagetSuccess.css("border","2px solid #39A4DC");
									$("#p"+tree.id).css("border","2px solid #39A4DC");
									//$("#close span:first").css("border","2px solid #39A4DC");
								},2000); 
								clearInterval(stop);
							}
							else{		
								setTimeout(function(){
								//	$("#close span:first").remove();
								//	closeList = [];
									alg.isTarget.css("border",resetborder);
									alg.moveOpen.css("border","2px solid #39A4DC");
									var openlistlength = openList.length;
									for(var i = 0; i < tree.listchild.length; i++,openlistlength++){
										alg.openTable.append("<span id = 'p-1' name = '" + tree.listchild[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+tree.listchild[i].name+"</span>");
										openList[openlistlength] =  tree.listchild[i];										
									}
									
									setTimeout(function(){
										alg.moveOpen.css("border",resetborder);
										alg.alterPointer.css("border","2px solid #39A4DC");
										
										setTimeout(function(){
											alg.alterPointer.css("border",resetborder);
											alg.resetOpen.css("border","2px solid #39A4DC");										
										
											
											//
											for(var i = 1;  i < openList.length;i++){											
												if(openList[i - 1].id >  openList[i].id){
													var tempnode = openList[i - 1];
													openList[i - 1] = openList[i];
													openList[i] = tempnode;												
												}
											}								
											alg.openTable.empty();
											for(var i = 0; i < openList.length; i++){
												alg.openTable.append("<span id = 'p-1' name = '" + openList[i].id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px; line-height:48px; text-align:center;'>"+openList[i].name+"</span>");
											}
											
										},2000); 
										
									},2000); 
									
								},2000); 							
							}
							
						},2000); 
					},2000); 	
				}
			},2000); 
			

			
		}
			
		
	},2000*8);
	

	/*
	if(!alg.isfound){
		setTimeout(function(){		
			alg.isOPenNull.css("border",resetborder);
			alg.openFirstMoveClose.css("border","2px solid #39A4DC");	
			var first = $("#open span:first");		
			$("#open span:first").remove();
			alg.closeTable.append(first);
			setTimeout(function(){
				alg.openFirstMoveClose.css("border",resetborder);
				alg.isTarget.css("border","2px solid #39A4DC");
				if(first.id ==choseid ){
					alg.isfound = true;
					setTimeout(function(){
						alg.isTarget.css("border",resetborder);
						alg.tagetSuccess.css("border","2px solid #39A4DC");
						$("#close span:first").css("border","2px solid #39A4DC");
					},2000); 
					//停止循环
				}
				
			},2000); 
		},6000); 	
	}
	
	*/
	/*
	var isfirst = false;
	var stop = setInterval(function(){
		if(!isfirst){
			alg.start.css("border","2px solid #39A4DC");
			setTimeout(function(){		
				alg.start.css("border",resetborder);
				alg.init.css("border","2px solid #39A4DC");		
				alg.openTable.append("<span id = 'p0' name = '" + tree.id +"' style = 'height:48px;width:35px;border: 1px solid #121212;display: inline-block;border-radius:1px;'>"+tree.name+"</span>");
				alg.closeTable.empty();
			},2000); 
			isfirst = true;
		}
		setTimeout(function(){		
			alg.init.css("border",resetborder);
			alg.isOPenNull.css("border","2px solid #39A4DC");	
		},2000); 
		//alert("pp");
		if($("#open span").length == 0){
			alg.isfound = true;
			clearInterval(stop);
			setTimeout(function(){		
				alg.isOPenNull.css("border",resetborder);
				alg.isOPenNullFail.css("border","2px solid #39A4DC");									
			},2000); 
		}
		if(!alg.isfound){
			setTimeout(function(){		
				alg.isOPenNull.css("border",resetborder);
				alg.openFirstMoveClose.css("border","2px solid #39A4DC");	
				var first = $("#open span:first");		
				$("#open span:first").remove();
				alg.closeTable.append(first);
				if(first.id ==choseid ){
					alg.isfound = true;
				}
			},2000); 	
			
		}
		if(alg.isfound){
			setTimeout(function(){
				alg.isTarget.css("border",resetborder);
				alg.tagetSuccess.css("border","2px solid #39A4DC");
				$("#close span:first").css("border","2px solid #39A4DC");
			},2000); 
		}
		else{
			
		}
			
	},2000*8);
	*/
	
	/*
	setTimeout(function(){		
		while(true){
			alg.init.css("border",resetborder);	
			alg.isOPenNull.css("border",resetborder);
			if($("#open span").length == 0){
				setTimeout(function(){		
					alg.isOPenNull.css("border",resetborder);
					alg.isOPenNullFail.css("border","2px solid #39A4DC");		
					break;
				},2000); 				
			}else{
				setTimeout(function(){		
					alg.isOPenNull.css("border",resetborder);
					alg.openFirstMoveClose.css("border","2px solid #39A4DC");		
					var first = $("#open span:first");					
					$("#open span:first").remove();
					alg.closeTable.append(first);
					if(first.id == choseid){
						alg.isfound = true;
						setTimeout(function(){
							alg.isTarget.css("border",resetborder);
							alg.tagetSuccess.css("border","2px solid #39A4DC");
							$("#close span:first").css("border","2px solid #39A4DC");
						},2000); 
					}
				},2000); 						
			}
		}
		
	},4000); 
	*/
}


