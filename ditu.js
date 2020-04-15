var sourceStr,adds,add,filterAdds,displaylable;
var xuequs,jiedaos;
var marker1 = {content:"地址:北京市海淀区五棵松路20号<br>电话:88591809<br>类型:民办园<br><a href='#'>link</a></span>",
title:"<span style='color:red;border:0px;'>北京市海淀区英才美丽园幼儿园<span>",
imageOffset: {width:-46,height:-46},
position:{lat:39.94502,lng:116.285033}};
var markers = [
];
//将CSV格式文件转换为object格式数据
var i=0;
function csvParse(){	
	//console.log(sourceStr)
	$.csv.toArrays(sourceStr,function(err,data){
	//console.log(data);
	//console.log(err);
	adds=data;
	data2table();	
	i=1;
	data2maker();


	//数据转换完成，开始往地图上渲染。
	//bdGEO();
	//return data+err+data.length;
	//$('#div2 > h2').html(x)
	//return x;
});
};
 
function data2table(){ 
xuequs=[];
jiedaos=[];
var jiedaosp;

//console.log(xuequs,xuequs.length)
//console.log(jiedaos,jiedaos.length)
//jiedaos=[];
//console.log(jiedaos,jiedaos.length,'flash')


var objPathName=sessionStorage.getItem("path")

if(objPathName=="小学信息"){
//alert(objPathName)
	for(var i=1;i<adds.length;i++){
	if(xuequs.indexOf(adds[i][0])<0){xuequs.push(adds[i][0])}
	jiedaosp=adds[i][2].split(' ')
	for(var j=0;j<jiedaosp.length;j++){
	if(jiedaos.indexOf(jiedaosp[j])<0){jiedaos.push(jiedaosp[j])}	
	}
	}
	
	var sel=document.getElementById('sel1');
	for(var i=0;i<xuequs.length+1;i++){
	var option1 = document.createElement("option");
	option1.innerHTML=(i>0)?xuequs[i-1]:"所有";
	sel.appendChild(option1);
	}
	
	var sel=document.getElementById('sel2');
	for(var i=0;i<jiedaos.length+1;i++){
	var option1 = document.createElement("option");
	option1.innerHTML=(i>0)?jiedaos[i-1]:"所有";
	sel.appendChild(option1);
	}
	
	
}else if(objPathName=="初中信息"){
//alert(objPathName)
	
}
	var tb1=document.getElementById('tb');
	//创建第一个tr标签存储第一行的数据
	var tr_head = document.createElement("tr");
	tb1.appendChild(tr_head);

	//使用for循环将表头数据tr_head加到第一个tr中去,第一行中有四个数据
	for (var i = 0; i < adds[0].length+1; i++) {
		//创建td存储数据
		var th = document.createElement("th");
		//设置th的属性
		th.setAttribute("class", "text-center");
		//将数据加进th
		th.innerHTML = (i>0)?adds[0][i-1]:"序号";
		//将th加入到tr中去
		tr_head.appendChild(th);
	}

for(var i=1;i < adds.length;i++){	
	var x=document.getElementById('tb').insertRow();
		var cell=x.insertCell();
		cell.innerHTML=i;		
	for(var j=0;j < adds[i].length;j++){
		var cell=x.insertCell();
		cell.innerHTML=adds[i][j];
	}
}

  } 
  
function data2maker(){
	  
	var contentstyle="<span style='color:blue;'>"
	var titlestyle="<span style='color:red;border:0px;'>"
	var mk1 = {};
	mk1.content=contentstyle+"地址:"+adds[i][2]+"<br>电话:"+adds[i][3]+"<br>类型:"+adds[i][0]+"<br><a href='#'>link</a></span>";
	mk1.title=titlestyle+i+":"+adds[i][1]+"<span>";
	mk1.imageOffset={width:-46,height:-46};
	//开始百度里查找位置
	var waitsig1=true;
	myGeo.getPoint(adds[i][2], function(point){
		if (point) {
	//document.getElementById("neirong").innerHTML +=  index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
			mk1.position=point;
			//console.log(point);

			console.log(i+"&nbsp"+mk1.title);
			console.log(adds[i][2]);
			markers.push(mk1);
			addMapOverlay1(i);
			i++;			
			waitsig1=false;
			
		}
		else{
		alert("您选择地址<br>"+adds[i][2]+"<br>没有解析到结果!");
		waitsig1=false;
			i++; 
		}
	}, "北京市");
    //while(waitsig1){};

	//console.log(mk1);
 
	if(i < adds.length-1){
	setTimeout(window.data2maker,400);
	} 
	else {
	alert("加载完成了，请查看！！！");	
	}	
  }
  
function addMapOverlay1(index){
	var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
	var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
	  imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
	})});
	var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
	var opts = {
	  width: 200,
	  title: markers[index].title,
	  enableMessage: false,
	  // searchTypes   :[
				// BMAPLIB_TAB_SEARCH,   //周边检索
				// BMAPLIB_TAB_TO_HERE,  //到这里去
				// BMAPLIB_TAB_FROM_HERE //从这里出发
			// ]
	};
	var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
	var infoWindow1 = new BMap.InfoWindow(markers[index].title,opts);
	if (displaylable){
	marker.setLabel(label);
	}
	else{
	marker.addEventListener("mouseover", function(){          
		map.openInfoWindow(infoWindow1,point); //开启信息窗口
	});	
	marker.addEventListener("mouseout", function(){          
	map.closeInfoWindow(infoWindow1,point); //关闭信息窗口
	});	
	}
	addClickHandler(marker,infoWindow);
	map.addOverlay(marker);
	
	
	
}
  
  
$(document).ready(function(){
  $("#btn1").click(function(){
	 vm.details("普惠幼儿园")
    $.get("./puhui.csv",function(responseTxt,statusTxt,xhr){
      if(statusTxt=="success")
        //alert("外部内容加载成功!");
		sourceStr=responseTxt;
		console.log(sourceStr);
		csvParse();
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
    displaylable=true;
	});
	//$.get("./qq.csv",function(data,status){
	//alert("数据: " + data + "\n状态: " + status);});
 // bdGEO();
  });
    //修改切换学区选项的程序
	$('#sel1').change(function(){
	  //alert($('#sel1').val())
	  filterAdds=[]
	  var currentSel=$('#sel1').val();
	  if(currentSel=='所有')
		{
		for(var i=1;i<adds.length;i++){
	    filterAdds.push(adds[i])	
		}  
		}
	  else{
      for(var i=1;i<adds.length;i++){
		if(adds[i][0].indexOf(currentSel)>=0){
		filterAdds.push(adds[i])
		}
		}
		}
	  
	  //console.log(filterAdds);
	var tb1=document.getElementById('tb');
	for(var i=tb1.childNodes.length;i>6;i--){	
	tb1.removeChild(tb1.childNodes[i-1]);  
	}
	for(var i=0;i < filterAdds.length;i++){	
	var x=document.getElementById('tb').insertRow();
		var cell=x.insertCell();
		cell.innerHTML=i+1;		
	for(var j=0;j < filterAdds[i].length;j++){
		var cell=x.insertCell();
		cell.innerHTML=filterAdds[i][j];
	}
	}
	
	$('#sel2').val("所有")
	
	
	});
	
	$('#sel2').change(function(){
	  //alert($('#sel2').val())
	  filterAdds=[]
	  var currentSel=$('#sel2').val();
	  
	  if(currentSel=='所有')
		{
		for(var i=1;i<adds.length;i++){
	    filterAdds.push(adds[i])	
		}  
		}
	  else{
      for(var i=1;i<adds.length;i++){
	    if(adds[i][2].indexOf(currentSel)>=0){
		filterAdds.push(adds[i])
		}
		}
		}
	  //console.log(filterAdds);
	var tb1=document.getElementById('tb');
	for(var i=tb1.childNodes.length;i>6;i--){	
	tb1.removeChild(tb1.childNodes[i-1]);  
	}
	for(var i=0;i < filterAdds.length;i++){	
	var x=document.getElementById('tb').insertRow();
		var cell=x.insertCell();
		cell.innerHTML=i+1;		
	for(var j=0;j < filterAdds[i].length;j++){
		var cell=x.insertCell();
		cell.innerHTML=filterAdds[i][j];
	}
	}
	
	$('#sel1').val("所有")
	
	});
	
});

$(function(){
	
  $("#btn2").click(function(){
	 vm.details("评级幼儿园")
    $.get("./pingji.csv",function(responseTxt,statusTxt,xhr){
      if(statusTxt=="success")
        //alert("外部内容加载成功!");
		sourceStr=responseTxt;
		console.log(sourceStr);
		csvParse();
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
    });
	//$.get("./qq.csv",function(data,status){
	//alert("数据: " + data + "\n状态: " + status);});
 // bdGEO();
     displaylable=true;
  });
  
  $("#btn3").click(function(){
    $.get("./haidian.csv",function(responseTxt,statusTxt,xhr){
      if(statusTxt=="success")
        //alert("外部内容加载成功!");
		sourceStr=responseTxt;
		console.log(sourceStr);
		csvParse();
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
    });
	//$.get("./qq.csv",function(data,status){
	//alert("数据: " + data + "\n状态: " + status);});
 // bdGEO();
     displaylable=false;
  });	
   
  $('#btnxiaoxue').click(function(){
	
	alert('地图展示效果不太好，还是自己直接用百度地图搜索下吧')	
	  
  }); 

});





var index = 0;
var myGeo = new BMap.Geocoder();
function bdGEO(){
	if (index < adds.length) {
		   add = adds[index];
		geocodeSearch(add[2]);
		index++;
	}
}
function geocodeSearch(add){
	if(index < adds.length){
		setTimeout(window.bdGEO,400);
	} 
	myGeo.getPoint(add, function(point){
		if (point) {
	//document.getElementById("neirong").innerHTML +=  index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
			var address = new BMap.Point(point.lng, point.lat);
			addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}));
		}
	}, "北京市");
}
// 编写自定义函数,创建标注
function addMarker(point,label){
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setLabel(label);
}