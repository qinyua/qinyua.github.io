
//演示一下闭包的用法，闭包兼顾了全局变量和局部变量的优点。闭包的缺点就是占用内存大，要及时释放资源。
/*
function outer(){
　　　　var i=1;
　　//2. 外层函数返回内层函数对象到外部
       console.log(i);
	//console.log(arguments);//可以获取到访问函数的参数是一个数组的形式
	//console.log(arguments.length);//可以获取到访问函数的参数的数量

	function inter(){
		i=i+1;
　　　　console.log(i);
		return i;
	}
	
	return inter();

	
return function(){
	i=i+1;
	console.log(i);
return i;
	
}

　　}*/

var add = (function () {
  var counter = 0;
  console.log(counter+"执行吗")
  return function () {
	  counter += 1; 
	  console.log(counter+"执行返回了吗？？")
	  return counter;
	  }
}
)();



 function changecolor(key1,obj){
 
 
  console.log(key1);
  //console.log(obj);
  creatcanvas(key1)
  
  switch(key1.key){
  case "0" :
	{
    changename('yellow',key1.key);
var q=add();
console.log(q);
	
	break;
	}
  case "1":
	{
	changename('red',key1.key);
	break;
	}
	case "2":
  	{
	changename('blue',key1.key);
	break;
	}
	case "3":
	{
	changename('aqua',key1.key);
	break;
	}
	case "4":
  	{
	changename('purple',key1.key);
	//element2.backgroundColor="purple";
	break;
	}	
	case "5":
	{
		changename('green',key1.key);
	//element2.backgroundColor="green";
	break;
	}
	case "6":
  	{
		changename('silver',key1.key);
	//element2.backgroundColor="silver";
	break;
	}
	case "7":
	{
	changename('olive',key1.key);
	//element2.backgroundColor="olive";
	break;
	}
	case "8":
  	{
		changename('navy',key1.key);
		break;
	}
	case "9":
  	{
		changename('maroon',key1.key);
		break;
	}
	case "+":
  	{
		//myMove1();
		rockBig();
		break;
	}	
	case "-":
  	{
		//myMove1();
		rockSmall();
		break;
	}
    case "Enter":
  	{
		//myMove1();
		fire();
		break;
	}		
	
	
	case "n":
  	{
		myMoveOut1();
		break;
	}		
	default:
  	{
	changename('yellow',key1.key+"嘿嘿请输入数字呀！！！");
	break;
	}
 
  }

}

function changename(cur,num){
  var element1,element2;
  console.log(cur+typeof(cur));
 
  element1 = document.getElementById("curcolor");
  
  element2 = document.getElementById("container1");	
  
  element2.style.background= cur;
  
  //element2.background-Color= cur; 
   
  if (isNaN(num))
	  
  element1.innerHTML=num+"&nbsp&nbsp";
  else
  element1.innerHTML=num+"&nbsp&nbsp"+cur;  
  
 }
 
 function yanbianyidong(obj1) {
	 
          obj = document.getElementById(obj1);   
		   strx=obj.style.left
           stry=obj.style.top
           x=Number(strx.replace("px",""))
           y=Number(stry.replace("px",""))
  
	
    if (dx=="left"){
      //clearInterval(id);
	  y--; 
      obj.style.top = y + "px"; 
      obj.style.left = x + "px"; 
	  if(y<=0) {dx="top";}
    } 
    else if (dx=="right"){
      //clearInterval(id);
	  y++; 
      obj.style.top = y + "px"; 
      obj.style.left = x + "px"; 
	  if(y>=350) {dx="bottom";}
	
    } 
	else if (dx=="bottom"){
      //clearInterval(id);
	  x--; 
      obj.style.top = y + "px"; 
      obj.style.left = x + "px"; 
	  if(x<=0) {dx="left";}
	
    } 
	else{
      //clearInterval(id);
	  //console.log(dx+""+x+y +"else") 
	  x++; 
      obj.style.top = y + "px"; 
      obj.style.left =x + "px"; 
	  if(x>=350) {dx="right";}
   console.log(obj.style.left+" "+dx+"x="+x+"y="+y+"else")  
    } 
	
	  
	console.log(obj.style.left+" "+dx+"x="+x+"y="+y+"end")   
 }
 	
function myMove() {
 
 try {
   
   elem = document.getElementById("animate");   
  //var pos = 0;
   elem.style.background="blue"
   
   idd="animate";
   
   var stry=elem.style.top
   
   var strx=elem.style.left
   
    posx=Number(strx.replace("px",""))
    posy=Number(stry.replace("px",""))
   console.log("x="+strx+" "+"y="+stry+" "+elem)

   document.getElementById("demo1").value="x="+strx+"&nbsp"+"y="+stry
   
    //  id1 = window.setInterval(function(){yanbianyidong(idd)}, 10);
  //frame();
  //id1 = window.setInterval(yanbianyidong(idd), 10); //这样是无法调用的
  id1 = window.setInterval("yanbianyidong(idd)", 10); //这样是也是可以调用的，但是这样调用 
    id1 = window.setInterval(yanbianyidong, 10); //这样不加参数是可以这样调用的
   document.getElementById("demo1").value="x="+strx+"y="+posy
  
}

catch(err){

   alert(err)

}


}	

function myMoveOut(obj){

   elem = document.getElementById("animate");   
  //var pos = 0;
   elem.style.background="green"

    console.log(id1)
	
clearInterval(id1);

document.getElementById("demo1").value=elem.style.left+" "+elem.style.top
//window.alert("asdasd");// 这样也是可以执行的
 //var ret=window.prompt("请输入名字：”asdasd”")
 //var ret=confirm("请输入名字：”asdasd”");//会返回true or false 	
// document.getElementById("demo1").value=ret
}
 
function myMove1() {
	
  try {
  
   elem = document.getElementById("mycanvas1");   
   console.log(elem);
  //var pos = 0;
   //elem.style.background="blue"
   idd="mycanvas1";
   
   document.getElementById("demo1").value="x="+x+"&nbsp"+"y="+y
   //这个setInterval函数真的是太有意思了啊，无法直接传参数的。
   id = window.setInterval(function(){
	       yanbianyidong(idd,x,y)
			}, 10);
  //frame();
  console.log("zhelizhixingma")
 
 
  function frame() {
    if (!dr) {
      //clearInterval(id);
	  pos--; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
	  if(pos<=0) dr=true
	  
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
	  if (pos>=350)dr=false;
    }
	
	  document.getElementById("demo1").value=pos
  }
 
}

catch(err){

   alert(err)

}

}
	
function myMoveOut1(){
   elem = document.getElementById("mycanvas1");   
  //var pos = 0;
  // elem.style.background="green"
   
clearInterval(id);

document.getElementById("demo1").value=elem.style.top
//window.alert("asdasd");// 这样也是可以执行的
 //var ret=window.prompt("请输入名字：”asdasd”")
 //var ret=confirm("请输入名字：”asdasd”");//会返回true or false 	
 //document.getElementById("demo1").value=ret
}
	
function creatcanvas(key){

var c = document.getElementById("mycanvas1");
console.log(c);
var cxt= c.getContext('2d'); 
//cxt.fillStyle="#FF0000"; 
//cxt.fillRect(0,0,150,75);

// Clip a rectangular area

// cxt.arc(50,50,50,1.5*Math.PI,Math.PI);
// cxt.stroke();
// cxt.clip();


img=new Image()  
img.src="favicon.ico"   
cxt.drawImage(img,0,0);

switch(key.key){
  case "0" :{
	 drawStar(cxt,8,20,20,20,0,'1px','solid','yellow'); 
	 break;
  }
  case "1" :{
	 drawTriangel(cxt,40,40,20,0,0,'1px','solid','red');
	 break;
  }
  case "2" :{
	 drawcircle(cxt,20,20,20,Math.PI, '1px' , 'solid','green');
	 break;
  }
  case "3" :{
	 drawcircle(cxt,20,20,20,0, '1px' , 'solid','aqua');
	 break;
  }
  case "4" :{
	drawrect(cxt,40,40,0,0, '1px' , 'solid','blue');
	break;
  }
  case "5" :{
	drawrect(cxt,40,20,0,0,0,'1px', 'solid','purple');
	break;
  }
    case "6" :{
	drawlingxing(cxt,40,40,0,0,0,'1px', 'solid','green');
	break;
  }
     case "7" :{
	drawHeart(cxt,40,40,0,0,0,'1px', 'solid','red');
	break;
  }

}


}

function drawStar( cxt , r , R , x , y , rot , borderWidth , borderStyle , fillStyle){
        cxt.beginPath();
		
        for( var i = 0 ; i < 5 ; i ++){
            cxt.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + x ,- Math.sin((18+72*i - rot )/180*Math.PI) * R + y);
            cxt.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + x ,- Math.sin((54+72*i - rot )/180*Math.PI) * r + y);
        }
        cxt.closePath();

        cxt.lineWidth = borderWidth;
        cxt.strokeStyle = borderStyle;
        cxt.fillStyle = fillStyle;

        cxt.fill();
        cxt.stroke();
    }

function drawTriangel(cxt,w,h,x,y,ang, borderWidth , borderStyle , fillStyle){

cxt.beginPath();
cxt.moveTo(x,y);
cxt.lineTo(x+w/2,y+h);
cxt.lineTo(x-w/2,y+h);
cxt.lineTo(x,y);
cxt.closePath();

cxt.lineWidth = borderWidth;
cxt.strokeStyle = borderStyle;
cxt.fillStyle = fillStyle;

cxt.stroke();
cxt.fill();
	
}

function drawcircle(cxt,r,x,y,ang, borderWidth,borderStyle,fillStyle){

cxt.beginPath();
cxt.arc(x,y,r,ang,2*Math.PI)
cxt.closePath();

cxt.lineWidth = borderWidth;
cxt.strokeStyle = borderStyle;
cxt.fillStyle = fillStyle;

cxt.stroke();
cxt.fill();
	
}

function drawrect(cxt,w,h,x,y,ang,borderWidth,borderStyle,fillStyle){


cxt.lineWidth = borderWidth;
cxt.strokeStyle = borderStyle;
cxt.fillStyle = fillStyle;



cxt.rect(x,y,w,h);

cxt.stroke();

cxt.fill();

}

function drawlingxing(cxt,w,h,x,y,ang,borderWidth,borderStyle,fillStyle){

	cxt.translate(w/2,h/2);

	cxt.beginPath();
	cxt.moveTo(x+0,y+h/2);
	cxt.lineTo(x+w/2,y+0);
	cxt.lineTo(x+0,y-h/2);
	cxt.lineTo(x-w/2,y+0);
	cxt.lineTo(x+0,y+h/2);
	cxt.closePath();

	cxt.lineWidth = borderWidth;
	cxt.strokeStyle = borderStyle;
	cxt.fillStyle = fillStyle;

	cxt.stroke();
	cxt.fill();
	
	cxt.translate(-w/2,-h/2);	
}

function drawHeart(cxt,w,h,x,y,ang,borderWidth,borderStyle,fillStyle){

cxt.lineWidth = borderWidth;
cxt.strokeStyle = borderStyle;
cxt.fillStyle = fillStyle;



cxt.beginPath();
cxt.moveTo(20,15);
cxt.quadraticCurveTo(-10,0,20,40);
cxt.moveTo(20,15);
cxt.quadraticCurveTo(50,0,20,40);
cxt.stroke();
cxt.fill();

}

function fire(){

 var r=document.getElementById("rocket");	
    
    var i=0;
	
	document.getElementById("rocksound").play();
	
	var id=setInterval(function(){
	 	 
	  r.style.top=(1180-i*10)+"px";	

	  i++; 
	 
	},200)
	
	setTimeout(function(){
		
		clearInterval(id);
		r.style.top="1180px";
		document.getElementById("rocksound").pause();
		
	},20000)
}


function rockBig(){
 var r=document.getElementById("svg_1");
 var rs=document.getElementById("svg_1");	
	var w=r.getAttribute('width');
	var h=r.getAttribute('height');
    r.setAttribute('width',Number(w)+50);
    r.setAttribute('height',Number(h)+50);
	var w=r.getAttribute('width');
	var h=r.getAttribute('height');	

}

function rockSmall(){
 var r=document.getElementById("svg_1");
 var rs=document.getElementById("svg_1");	
	var w=r.getAttribute('width');
	var h=r.getAttribute('height');
	if(w>50&&h>50){
    r.setAttribute('width',Number(w)-50);
    r.setAttribute('height',Number(h)-50);
	}
	var w=r.getAttribute('width');
	var h=r.getAttribute('height');	

}







