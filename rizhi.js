var tablename="Data"
Bmob.initialize('e8704f0d7e639187', 'asdasd')
//var url="https://api2.bmob.cn/1/classes/"+ tablename
var url="./cd.xml"
//var titlearray=['createdAt','date','neirong','objectId','updatedAt']
titlearray=['createdAt','date','neirong','objectId']
var pageArr=[5,7,14,20];
var numPerPage=5,pageId=1;
var res1,filterRes,tid,filterRes1;
var update=false,objectId;
var pgobjectId,pgCount,pgName="bmobPageCount";
var pid=0,cid=0,page,goodct=0,badct=0,pidb=0,resc,mfloorarr;
var pageName=findPageName();




function requestAllDataFromBmob(){
	
	const query = Bmob.Query(tablename);
	
     query.find().then(res => {
    //console.log(res)
	//console.log(res[0]["objectId"])
	console.log(res.length)	
	res1=res;
	//console.log(res1)
})

}

function sortByDateUp(a,b){

   var aa=new Date(a['date'].replace(/-/g, "/"));
   var bb=new Date(b['date'].replace(/-/g, "/")); 
   
   document.getElementById("setUp").style.fontSize="1.3em";
   document.getElementById("setDn").style.fontSize="1em";
    document.getElementById("setUp").style.color="#28a745";
    document.getElementById("setDn").style.color="";    
   	return Number(aa.getTime())-Number(bb.getTime());

   }
   
function sortByDateDn(a,b){

   var aa=new Date(a['date'].replace(/-/g, "/"));
   var bb=new Date(b['date'].replace(/-/g, "/")); 
   
    document.getElementById("setUp").style.fontSize="1em";
    document.getElementById("setDn").style.fontSize="1.3em"; 
    document.getElementById("setUp").style.color="";
    document.getElementById("setDn").style.color="#28a745";    
   
   	return Number(bb.getTime())-Number(aa.getTime());
   
   }

function getChildIndex(){
	var ii=0;
 for (x in arguments[1])
 {
	if (arguments[1][x].nodeName==arguments[0])
	{return x;}
}}

function filterDateNone(value, index) {
 if(value['date']==undefined||value['date']=="")
 return false;
 else
 return true;		
}

function filterDateNone1(value, index) {
if(value['date']==undefined||value['date']=="")
return true;
else
return false;	

}

function creatTable(){
	
     clearInterval(tid);
	 
	var pageNum=Math.ceil(filterRes.length/numPerPage)
	
    var ret = document.getElementById("yenumid");  
    
    if(pageId>pageNum)pageId=pageNum;
		
    for(i=0;i<4;i++)
	{
	document.getElementById("pn"+pageArr[i]).style.fontWeight="normal";
	}	
	document.getElementById("pn"+numPerPage).style.fontWeight="bold";	
	
	var len=ret.childNodes.length-1;
	
	for(i=len;i>2;i--)

    ret.removeChild(ret.childNodes[i]);




	for(var i=2;i<=pageNum;i++)
	{
		//var span=document.createElement("span")
	var span=ret.childNodes[1].cloneNode();
		span.innerHTML=i+"&nbsp;&nbsp;";
		span.id="pi"+i;
		ret.appendChild(span); 
	}

	
	
	if (pageNum<2)
	{
		
		document.getElementById("pi1").style.fontWeight="bold";	
		
	}	
    else
	{
	
		for(i=1;i<=pageNum;i++)
		{
		document.getElementById("pi"+i).style.fontWeight="normal";
		}
		document.getElementById("pi"+pageId).style.fontWeight="bold";		
	}
	
	
	 	
    var con = document.getElementById("rizhi"); 

	var q=getChildIndex('TBODY',con.children);

    con.removeChild(con.children[q]);
	
	var tbody = con.createTBody(); 
 
	var ii=(pageId-1)*numPerPage;
	var tbl= filterRes.length-ii;
    if (tbl>=numPerPage)
	{tbLength=numPerPage;}
	else
	{tbLength=tbl;}	

	for (var i = 0; i < tbLength; i++) { 
			var tr = document.createElement("tr"); 
			for (var j = 0; j < titlearray.length; j++) { 
				
				if(j==0)
				{
					td = document.createElement("th"); 
					td.innerHTML = i+1;
					tr.appendChild(td); 
				}
				else if(j==3)
				{
					td = document.createElement("td");
					td.innerHTML = "&nbsp;";
				    tr.appendChild(td); 					
					
				}
				else
				{
					td = document.createElement("td");
					td.innerHTML = filterRes[ii+i][titlearray[j]];}
				    tr.appendChild(td); 
			} 
			tbody.appendChild(tr); 
		} 
		



}

function resizechange(){
if (window.innerWidth<1000)
{
	//console.log(window.innerWidth)
	//document.getElementById('main').style.width="100%";
	//document.getElementById('rightpage').style.width="100%";	
	document.getElementById('liuyaninput').style.width="95%";
	document.getElementById('liuyandisp').style.width="95%";	
	document.getElementById('liuyaninput').style.marginLeft="2%";
	document.getElementById('liuyandisp').style.marginLeft="2%";
    for(var i=0;i<document.getElementsByClassName('liuyan').length;i++)
		{
		document.getElementsByClassName('liuyan')[i].style.width="100%";		
		}
}
else{

	//console.log(window.innerWidth)
	//document.getElementById('main').style.width="45%";
	//document.getElementById('rightpage').style.width="53%";	
	document.getElementById('liuyaninput').style.width="80%";
	document.getElementById('liuyandisp').style.width="80%";
	document.getElementById('liuyaninput').style.marginLeft="10%";
	document.getElementById('liuyandisp').style.marginLeft="10%";
    for(var i=0;i<document.getElementsByClassName('liuyan').length;i++)
		{
		document.getElementsByClassName('liuyan')[i].style.width="100%";		
		}
}
	
}

function inputclick(obj){
  
  var c=0;
  
  //requestAllDataFromBmob();
 if(obj!='selectmonth'){
 selectdate();
 }
  
  resizechange();
 
document.getElementById('btn').style.display="none";
document.getElementById('btn1').style.display="none";	
res1=undefined;

  tid=setInterval(function(){
		  
	  c=c+1;	
	
	if(res1!=undefined){

       filterRes = res1.filter(filterDateNone);	
	   
	   filterRes1 = res1.filter(filterDateNone1);	
	   
	   filterRes.sort(sortByDateUp);
	   
	   
	   //查询页面访问次数的也得需要重新修改下
/* 	   for(var i=0;i<filterRes1.length;i++)
	   {
		

		   if(pgName==filterRes1[i]['neirong']){
			   pgobjectId=filterRes1[i]['objectId'];
			   pgCount=filterRes1[i]['pageReadCount'];
			   updatePageCount(pgobjectId,pgCount);
		   }
		   
	   } */ 
	   //修改后的页面统计代码
	   const query = Bmob.Query(tablename);
	query.equalTo("neirong","==",pgName);
	query.find().then(res => {
    //console.log(res)
    pgobjectId=res[0]['objectId'];
    pgCount=res[0]['pageReadCount'];
	updatePageCount(pgobjectId,pgCount);
	});

	   

	   creatTable();
 	   liuyandisplay();         
	}  
	
	if(c>10){
		
	alert("与Bmob服务器云通讯有问题，请检查")
  	document.getElementById("alter").innerHTML="数据连接服务器有问题!!";
	document.getElementById("alter").style.background="yellow"; 	
	clearInterval(tid);
	}
	
	  
  },100)
  



}	

function validateForm() {
	//普通验证通过后提交表单动作后才会做这个验证，不然不出现。 
    var x = document.forms["addnewneirong"]["date"].value; 
    var y = document.forms["addnewneirong"]["neirong"].value;
    var aa=new Date(x.replace(/-/g, "/"));
    var bb=new Date();   
  
	if(x==""){
		document.getElementById("alter").innerHTML="日期未选择!!";
		document.getElementById("alter").style.background="red"; 
		return false; 
	  } 
	else if (aa.getTime() > bb.getTime()) {
		document.getElementById("alter").innerHTML="不能提前写日报啊!!";
		document.getElementById("alter").style.background="red";
		return false;
      }
  
  else if (y == "") {
    document.getElementById("alter").innerHTML="工作内容为空!!";
	document.getElementById("alter").style.background="red";
    return false;
  }

  else{
	  
	 const query = Bmob.Query('Data')
	//query.set("date",document.getElementById("date").value)
	query.set("date",document.forms["addnewneirong"]["date"].value);
	query.set("neirong",document.forms["addnewneirong"]["neirong"].value);
	query.set("worktime",document.forms["addnewneirong"]["worktime"].value);
	query.set("workdone",document.forms["addnewneirong"]["workdone"].value);
	query.set("worktype",document.forms["addnewneirong"]["worktype"].value);
	query.save().then(res => {
	console.log(res)

	document.getElementById("alter").innerHTML="添加完成";
	document.getElementById("alter").style.background="green"; 
	
	//alert("addscess")
	setTimeout(inputclick,2000);
	
	}).catch(err => {
  console.log(err)
  	document.getElementById("alter").innerHTML="数据连接服务器有问题!!";
	document.getElementById("alter").style.background="yellow"; 
	})
 	  
  }
}

function clearstatus(){

  document.getElementById("alter").innerHTML="";

}

function datechange(obj){
	
//新增直接查询数据库看日报是否存在,
//放弃了之前通过全部读取数据库然后再检索的方式
const query = Bmob.Query(tablename);
query.equalTo("date","==",obj.value);
query.find().then(res => {
    console.log(res)
	datechange1(res)
});

}
function datechange1(obj){
    update=false;

      if(obj.length>0)
		{
			objectId=obj[0]['objectId'];
        document.forms["addnewneirong"]["neirong"].value=obj[0]['neirong'];
		
			var ret=confirm("\n当前日报已存在!!!\n\n请确认是否修改当天日报?"); 
			
			if(ret){
			    var ret=prompt("请输入修改暗号"); 
			
				if(ret=="qinyuup")
				{	
					update=true;
					document.getElementById('btn').style.display="none";
					document.getElementById('btn1').style.display="inline";
					document.getElementById('btn1').disabled="";				
				}
				else{
					
					update=false;
					document.getElementById('btn').style.display="none";
					document.getElementById('btn1').style.display="inline";	
					document.getElementById('btn1').disabled="disabled";								 
				}
			
			}
			else{
			update=false;
			document.getElementById('btn').style.display="none";
            document.getElementById('btn1').style.display="inline";	
			document.getElementById('btn1').disabled="disabled";			
			}	
            return;			
		}

	
	var ret=confirm("\n请问是要上传新的日报吗?"); 
	
	if(ret){
	 var ret=prompt("请输入添加暗号"); 	
     if(ret=="qinyuad")  
     {
	document.forms["addnewneirong"]["neirong"].value='';	 
	document.getElementById('btn').style.display="inline";
    document.getElementById('btn1').style.display="none";	
	document.getElementById('btn1').disabled="disabled";		 
      return;	 
	 }
	
	}
	
	document.getElementById('btn').style.display="none";
    document.getElementById('btn1').style.display="none";	
	document.getElementById('btn1').disabled="";		
	
}

function updateForm(){
	
	//find a row data
	/*
	const query = Bmob.Query(tablename);
	query.get(objectid).then(res => {
	console.log(res)
	console.log(res["createdAt"])
	//console.log(objectid)
	}).catch(err => {
	console.log(err)

	})*/
	
	//update a row data


	const query = Bmob.Query(tablename);
	 query.set('id', objectId) //需要修改的objectId
	 query.set('neirong',document.forms["addnewneirong"]["neirong"].value )
	 query.save().then(res => {
	document.getElementById("alter").innerHTML="更新完成!";
	document.getElementById("alter").style.background="green"; 		 
	 //console.log(res)
	setTimeout(inputclick,2000);	 
	 }).catch(err => {
		 
	 console.log(err)
  	document.getElementById("alter").innerHTML="数据连接服务器有问题!!";
	document.getElementById("alter").style.background="yellow"; 
	
	 })
	
}

function changepage(obj){
	
	if(obj.id.indexOf("pn")>-1){
		
	numPerPage=parseInt(obj.id.replace("pn",""))
    creatTable();	
	}
	if(obj.id.indexOf("pi")>-1){
		
	pageId=parseInt(obj.id.replace("pi",""))
    creatTable();		
	}
	
	if(obj.id.indexOf("set")>-1){
		
	 if (obj.id.indexOf("Dn")>-1){ 
	 filterRes.sort(sortByDateDn);
	 }
	 else {
	 filterRes.sort(sortByDateUp);}	
	
	creatTable();
	
	}	

}

function xmlhttprequestsample(){
	


if (window.XMLHttpRequest)
  {// code for IE7, Firefox, Opera, etc.
  xmlhttp=new XMLHttpRequest();
  }
else if (window.ActiveXObject)
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
if (xmlhttp!=null)
  {
  xmlhttp.onreadystatechange=state_Change;
  xmlhttp.open("GET",url,true);
  xmlhttp.setRequestHeader("Content-Type","application/xml;charset=utf-8")
  xmlhttp.send(null);
  
  }
else
  {
  alert("Your browser does not support XMLHTTP.");
  }
} 

function state_Change(){
	console.log(xmlhttp)
	
if (xmlhttp.readyState==4)
  {// 4 = "loaded"
  if (xmlhttp.status==200)
    {// 200 = "OK"

    document.getElementById('A1').innerHTML=xmlhttp.status;
    document.getElementById('A2').innerHTML=xmlhttp.statusText;
    document.getElementById('A3').innerHTML=xmlhttp.responseText;
  var parser=new DOMParser();
  var xmlDoc=parser.parseFromString(xmlhttp.responseText,"text/xml");	

	var x=xmlDoc.getElementsByTagName("CD");
	
		console.log(x);  
	        var con = document.getElementById("tbcontainer"); 
            var table = document.createElement("table"); 
			table.id="newtable";
			table.class="table1";
            var thead = table.createTHead(); 
            var tbody = table.createTBody(); 
            var tr = document.createElement("tr"); 
            for (var i = 0; i < 6; i++) { 
                th = document.createElement("th"); 
                th.innerHTML = x[0].children[i].tagName; 
                tr.appendChild(th); 
            } 
            thead.appendChild(tr); 
            for (var i = 0; i < x.length; i++) { 
                var tr = document.createElement("tr"); 
                for (var j = 0; j < 6; j++) { 
                    td = document.createElement("td"); 
                    td.innerHTML = x[i].children[j].innerHTML; 
                    tr.appendChild(td); 
                } 
                tbody.appendChild(tr); 
            } 
            con.appendChild(table); 
			
	 var con2 = document.getElementsByTagName("table"); 
       console.log(con2)
	   
	var con1 = document.getElementById("newtable"); 
       console.log(con1)
     con1.border="5px solid red";	   

	var x=document.getElementById('newtable').createCaption()
        x.innerHTML="My table caption" 
    }
	
  else
    {
    alert("Problem retrieving XML data:" + xmlhttp.statusText);
    }
  }
}

function btnclick(){

const query = Bmob.Query(tablename);

query.find().then(res => {
    console.log(res)
	console.log(res[0]["objectId"])
	console.log(res.length)	


		var con = document.getElementById("tbcontainer"); 
		var table = document.createElement("table"); 
		table.id="newtable";
		table.class="table1";
		var thead = table.createTHead(); 
		var tbody = table.createTBody(); 
		var tr = document.createElement("tr"); 
		for (var i = 0; i < titlearray.length; i++) { 
			th = document.createElement("th"); 
			th.innerHTML = titlearray[i]; 
			tr.appendChild(th); 
		} 
		thead.appendChild(tr); 
		for (var i = 0; i < res.length; i++) { 
			var tr = document.createElement("tr"); 
			for (var j = 0; j < titlearray.length; j++) { 
				td = document.createElement("td"); 
				td.innerHTML = res[i][titlearray[j]]; 
				tr.appendChild(td); 
			} 
			tbody.appendChild(tr); 
		} 
		con.appendChild(table); 
		
 var con2 = document.getElementsByTagName("table"); 
   console.log(con2)
   
var con1 = document.getElementById("newtable"); 
   console.log(con1)
 con1.border="5px solid red";	   

var x=document.getElementById('newtable').createCaption()
	x.innerHTML="My table caption" 



})	
}	

function updatePageCount(objectId,pagecount){
	
	const query = Bmob.Query(tablename);
	 query.set('id', objectId) //需要修改的objectId
	 query.set('pageReadCount',pagecount+1)
	 query.save().then(res => {
	var ncount=pagecount+1
	var y='00000000000000000000000000000'+ncount; 
	
	document.getElementById("readcount").innerHTML=y.substr(y.length-6);


	 }).catch(err => {
		 
	 console.log(err)
	
	 })	
	
	
	
	
};

function huifu(obj,e){
//console.log(e)
	e.stopPropagation();//阻止事件冒泡

//console.log(obj.id);
 	pidb=obj.id;
var par1=obj.parentNode;
var liuyaninput1=document.getElementById("liuyaninput");

//console.log(liuyaninput1.childNodes[3].childNodes);

	var node="";
	var fragment = document.createDocumentFragment();
	
	var n=document.createElement("input")
            n.type ="text";
            n.id=pidb+"n";
			n.style.display="block";
			n.placeholder="who @ who";
	fragment.appendChild(n);	

	var tx=document.createElement("textarea")
	tx.name="txtName";
	tx.id=pidb+"t";
	tx.rows=3;
	tx.cols=50;
	tx.style.display="block";
	tx.placeholder="pleas reply";
	fragment.appendChild(tx);
    var b=document.createElement("input");
            b.type ="button";
            b.value = "回复";
			b.id=pidb+"b";
			b.className='btn-outline-primary'
            b.onclick=addhuifu; 
	fragment.appendChild(b);

	var div1=document.createElement("div")
	div1.className="huifu1";
	div1.onclick=function (event){
	//console.log(event)
	event.stopPropagation();
	//alert("qwe")
	}
	div1.appendChild(fragment)
	par1.appendChild(div1);
//	console.log(par1)
	document.getElementById(obj.id).style.display="none";

}

function addhuifu(obj){
	
	console.log(resc)
	
	pid=Number(pidb.replace("huifu",''));
	cid=0;
	
	var rmb=document.getElementById(pidb+"b")
	var rmt=document.getElementById(pidb+"t")
	var rmn=document.getElementById(pidb+"n")	
	
	for(i=0;i<resc.length;i++)
   {
	
      if(resc[i]['pid']==pid&&resc[i]['cid']>cid)
	  {
		cid=resc[i]['cid']
	  }		  

   }

    if	(rmt.value==""||rmt.value==undefined)
    {
			
		document.getElementById("alter").innerHTML="兄弟得有点内容啊,谢谢！";
		document.getElementById("alter").style.background="red"; 	
		rmb.style.background="red";
	}
    else
	{
	pid=pid;
    cid=cid+1;
	goodct=0;
    badct=0;	
    page='bmob';	
	 const query = Bmob.Query('comment')
	// //query.set("date",document.getElementById("date").value)
	query.set("pid",pid);
	query.set("cid",cid);
	query.set("page",pageName);
	query.set("goodct",goodct);
	query.set("badct",badct);	
	query.set("nicheng",rmn.value);
	// query.set("youxiang",document.getElementById("youxiang").value);
	// query.set("other",document.getElementById("other").value);
	query.set("liuyanneirong",rmt.value);
	query.save().then(res => {
	console.log(res)
		
	}).catch(err => {
    console.log(err)
  	document.getElementById("alter").innerHTML="数据连接服务器有问题!!";
	document.getElementById("alter").style.background="yellow"; 
  	rmb.style.background="yellow"; 
	})
	
	}


	document.getElementById(pidb).style.display="";

	rmb.parentNode.removeChild(rmb);
	rmt.parentNode.removeChild(rmt);	
	rmn.parentNode.removeChild(rmn);
     
	setTimeout(function(){
		liuyandisplay();
	},3000); 


	
}

function liuyandisplay(){
	
	obj=document.getElementById("liuyandisp");
	


const query = Bmob.Query("comment");
const query1 = query.equalTo("page", '==',pageName);
//const query1 = query.equalTo("page", '==','bmob');
//const query2 = query.equalTo("isLike", '<', 150);

//query.or(query1, query2);
query.find().then(res => {
  // 返回 isLike > 150 or isLike < 5 的值
  //console.log(res);
  resc=res;
  mfloorarr=resc.filter(function(value, index){
	return value['cid']==0;
  })
  
  if(arguments.length!=0){
   
	if(arguments[0].id.indexOf("setPid")>-1){
		
	 if (arguments[0].id.indexOf("Dn")>-1){ 
	 mfloorarr.sort(sortByPidDn);
	 }
	 else {
	 mfloorarr.sort(sortByPidUp);}	

	
	}
  }

     for(var i=obj.childNodes.length-1;i>4;i--)
		{
		console.log(obj.childNodes.length)
        obj.removeChild(obj.childNodes[i]);
		}  

  
  //console.log(pageName)

var cin=3; 
 
if (mfloorarr.length==0)
{
	
	
    obj.childNodes[cin].childNodes[1].innerHTML="";
	obj.childNodes[cin].childNodes[3].innerHTML="";
	obj.childNodes[cin].childNodes[5].innerHTML=""
 	obj.childNodes[cin].childNodes[7].innerHTML="无人盖楼，沙发可占";
	obj.childNodes[cin].childNodes[9].style.display="none";  

}
else
{   
   var i=0;
  
   //console.log(obj.childNodes[cin].childNodes);
    obj.childNodes[cin].childNodes[1].innerHTML='<i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;'+mfloorarr[i]['nicheng'];
	obj.childNodes[cin].childNodes[3].innerHTML='<i class="fa fa-building" aria-hidden="true"></i>&nbsp;'+i+1+"楼";
	obj.childNodes[cin].childNodes[5].innerHTML='<i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+mfloorarr[i]['createdAt'];
 	obj.childNodes[cin].childNodes[7].innerHTML=mfloorarr[i]['liuyanneirong'];
	obj.childNodes[cin].childNodes[9].id="huifu"+mfloorarr[i]['pid'];
	obj.childNodes[cin].childNodes[9].style.display="";  	
	
	var node="";
	var fragment = document.createDocumentFragment();

	var childfloorarr=resc.filter(function(value, index){
	return value['pid']==mfloorarr[i]['pid'];})
	
	if (childfloorarr.length>1)
	{
		for(var j=1;j<childfloorarr.length;j++)
		{
		var node=obj.childNodes[cin].cloneNode(true);
		node.childNodes[1].innerHTML=childfloorarr[j]['nicheng'];
		node.childNodes[3].innerHTML=i+1+"-"+j+"层";
		node.childNodes[5].innerHTML=childfloorarr[j]['createdAt'];
		node.childNodes[7].innerHTML=childfloorarr[j]['liuyanneirong'];
		node.removeChild(node.childNodes[9]);  
		node.style.marginLeft="5%";
		node.style.width="92%";
		fragment.appendChild(node);	
		}
	}
	var len=mfloorarr.length;

	for (i=1;i<len;i++){
		
	 var node=obj.childNodes[cin].cloneNode(true);
	node.childNodes[1].innerHTML='<i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;'+mfloorarr[i]['nicheng'];
	node.childNodes[3].innerHTML='<i class="fa fa-building" aria-hidden="true"></i>&nbsp;'+(i+1)+"楼";
	node.childNodes[5].innerHTML='<i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;'+mfloorarr[i]['createdAt'];
 	node.childNodes[7].innerHTML=mfloorarr[i]['liuyanneirong'];
	node.childNodes[9].id="huifu"+mfloorarr[i]['pid'];  
	  fragment.appendChild(node);
	  
	var childfloorarr=resc.filter(function(value, index){
	return value['pid']==mfloorarr[i]['pid'];})  
	
	if (childfloorarr.length>1){
		
		for(var j=1;j<childfloorarr.length;j++)
		{
			var node=obj.childNodes[cin].cloneNode(true);
		node.childNodes[1].innerHTML=childfloorarr[j]['nicheng'];
		node.childNodes[3].innerHTML=i+1+"-"+j+"层";
		node.childNodes[5].innerHTML=childfloorarr[j]['createdAt'];
		node.childNodes[7].innerHTML=childfloorarr[j]['liuyanneirong'];
		node.removeChild(node.childNodes[9]);  
		node.style.marginLeft="5%";
		node.style.width="92%";
		fragment.appendChild(node);	
		} 
	}
	  
	  
	}
	
	obj.appendChild(fragment);		
	
}	

   
});

	
}

function tijiaoliuyan(obj){


	var liuyanneirong=document.getElementById("liuyanneirong").value;	
    
	pid=0;
	
	for(i=0;i<mfloorarr.length;i++)
   {
	
      if(mfloorarr[i]['pid']>pid)
	  {
		  pid=mfloorarr[i]['pid'];
	  }		  

   }

    if	(liuyanneirong==""||liuyanneirong==undefined)
    {
			
		document.getElementById("alter1").innerHTML="兄弟得有点内容啊,谢谢！";
		document.getElementById("alter1").style.background="red"; 	
		obj.style.background="red";
	}
    else
	{
	pid=pid+1;
    cid=0;
	goodct=0;
    badct=0;	
    page=pageName;	
	 const query = Bmob.Query('comment')
	// //query.set("date",document.getElementById("date").value)
	query.set("pid",pid);
	query.set("cid",cid);
	query.set("page",page);
	query.set("goodct",goodct);
	query.set("badct",badct);	
	query.set("nicheng",document.getElementById("nicheng").value);
	query.set("youxiang",document.getElementById("youxiang").value);
	query.set("other",document.getElementById("other").value);
	query.set("liuyanneirong",document.getElementById("liuyanneirong").value);
	query.save().then(res => {
	console.log(res)

	obj.style.background="green"; 
	document.getElementById("alter1").innerHTML="留言OK";
    document.getElementById("alter1").style.background="green";
	//obj.style.disabled="disabled";
		
	}).catch(err => {
    console.log(err)
  	document.getElementById("alter1").innerHTML="数据连接服务器有问题!!";
	document.getElementById("alter1").style.background="yellow"; 
  	obj.style.background="yellow"; 
	})
	
	}
	
	setTimeout(function(){
		obj.style.color="gray";
  	document.getElementById("alter1").innerHTML="";
	document.getElementById("alter1").style.background="none"; 
	document.getElementById("liuyanneirong").value="";	
	document.getElementById('liulanbtn').disabled='disabled';
	document.getElementById('liulanbtn').title="留言内容请大于5个字";
	document.getElementById("nicheng").value="";
	document.getElementById("youxiang").value="";
	document.getElementById("other").value="";
		liuyandisplay();
		
	},3000)

}

function sortByPidUp(a,b){
 
   document.getElementById("setPidUp").style.fontWeight="900";
   document.getElementById("setPidDn").style.fontWeight="normal";
    document.getElementById("setPidUp").style.Color="aqua";
    document.getElementById("setPidDn").style.Color="";    
   	return Number(a['pid'])-Number(b['pid']);
   }
   
function sortByPidDn(a,b){
   
    document.getElementById("setPidUp").style.fontWeight="normal";
    document.getElementById("setPidDn").style.fontWeight="900"; 
    document.getElementById("setPidUp").style.Color="";
    document.getElementById("setPidDn").style.Color="aqua";    
   
   	return Number(b['pid'])-Number(a['pid']);
   
   }

function findPageName(){

var strUrl=window.location.href;
var arrUrl=strUrl.split("/");
var strPage=arrUrl[arrUrl.length-1];
if(strPage.indexOf("?")>-1){
    var pageName=strPage.split("?");
    strPage=pageName[0];
}
return strPage;
}

function selectdate(obj){

const query = Bmob.Query(tablename);
var d=new Date();

if(obj!=undefined){
var nowYearMonth=obj.value
}
else{
var monthAdd0=(d.getMonth().length>1)?d.getMonth():'0'+(d.getMonth()+1)	
var nowYearMonth=d.getFullYear()+'-'+monthAdd0;
document.getElementById('selectmonth').value=nowYearMonth;
}

var dateStart=nowYearMonth+'-01';
var dateEnd=nowYearMonth+'-31';
var resNone=[{'date':'2018-01-01','neirong':'aaaaaaaa'}]

query.equalTo("date",">=",dateStart);
query.equalTo("date","<=",dateEnd);
query.find().then(res => {
  //  console.log(res)
	if(res.length!=0)
	{	res1=res;}
	else{

		resNone[0].date=nowYearMonth
			
			if(nowYearMonth.split('-')[0]>d.getFullYear())
			{	
			resNone[0].neirong='大哥，这个年份太超前了，提前穿越可不行啊！'				
			}
			else if(nowYearMonth.split('-')[0]==d.getFullYear() && nowYearMonth.split('-')[1]>d.getMonth())			
			{
			resNone[0].neirong='大哥，这个月份太超前了，改成'+(d.getMonth()+1 )+ "月之前试试吧!"							
			}
			else{
			resNone[0].neirong='这个月貌似一条记录都没有写啊！到底干啥了'
			}
			
		res1=resNone;
		}

});	

if(obj!=undefined){
inputclick('selectmonth')
}

}



	


