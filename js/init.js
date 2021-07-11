function makeCard56(up,left,down,right,color)//color:w or b //use makeCard56Wrapped instead
{
	if(color=="white")color="w";
	if(color=="black")color="b";
	function makeNum(num,color)//never even mind about this function
	{
		var tmp={
		2:[0,-14],	7:[-14,-14],	12:[-28,-14],	20:[-42,-14],
		3:[0,-28],	8:[-14,-28],	14:[-28,-28],	21:[-42,-28],
		4:[0,-42],	9:[-14,-42],	15:[-28,-42],	22:[-42,-42],
		5:[0,-56], 10:[-14,-56],	16:[-28,-56],	24:[-42,-56],
		6:[0,-70], 11:[-14,-70],	18:[-28,-70],	25:[-42,-70]
		};
		return( '<div class="num"><img src="img/all.png" style="margin:'+
		(color=="b"?tmp[num][0]-56:tmp[num][0])+'px '+
		tmp[num][1]+'px 0px '+(tmp[num][1]+14)+'px;"/></div>');
	}
	if(color=="n")return '<img src="img/clear.png" height="56" width="56">';//background
	return(
	'<div title="card" class="'+color+'card56">'+
		'<div class="secup56"   >'+makeNum(up   ,color)+'</div>'+
		'<div class="secleft56" >'+makeNum(left ,color)+'</div>'+
		'<div class="secdown56" >'+makeNum(down ,color)+'</div>'+
		'<div class="secright56">'+makeNum(right,color)+'</div>'+
		'<div style="display:none">QWERTY'+[up,left,down,right,{"w":"white","b":"black"}[color]]+'UIOP</div>'+
	'</div>');
}

function getNums(id)//idからカードを抽出
{
	var dom=document.getElementById(id+'__main');
	var tmp;
	if(dom&&(dom.innerHTML.indexOf("QWERTY")+1))
	{
		
		tmp=dom.innerHTML.split("QWERTY")[1].split("UIOP")[0];
		//console.log(["getNums1",tmp])
		tmp=tmp.split(",");
		//console.log(["getnums",tmp])
		tmp[0]-=0;
		tmp[1]-=0;
		tmp[2]-=0;
		tmp[3]-=0;
		return tmp;
	}
	else return [0,0,0,0,null]
}

var lang=langlist.ja_JP;

function makeToolTip(u,l,d,r)
{
	var WF=function(a)
	{
		if(a>=14)return 7  ;if(a>=9)return 6;if(a>=7)return 4;if(a==6)return 3;if(a==5)return 2.4;if(a==4)return 2;
		if(a==3) return 1.5;if(a==2)return 1;else return 0;
	}
	return WF(u)+WF(l)+WF(d)+WF(r);//0はfalsyなので0の時tooltipは表示されない。意図したものじゃないけど自分GJｗｗｗ。前に「重さ：」とか付けるときは条件分岐忘れずに
}

/**-----------------------
makeCellを一体型としてラップする
-----------------------**/
function makeCellWrapped(outer,inner,u,l,d,r,param,img)//makeCellをwrap
{
	document.getElementById(outer).innerHTML=C_C.makeCell(inner,makeCard56(u,l,d,r,param),img,makeToolTip(u,l,d,r));//空セル作成
}

/**---------------------
makeCard56をラップする
---------------------**/
function makeCard56Wrapped(id,u,l,d,r,param)
{
	document.getElementById(id).innerHTML=makeCard56(u,l,d,r,param)+"<span>"+makeToolTip(u,l,d,r)+"</span>";
}

function getNum(){return[2,3,4,5,6,7,8,9,10,11,12,14,15,16,18,20,21,22,24,25][Math.floor(Math.random()*20)]}
function getColor(){return["b","w","n"][Math.floor(Math.random()*3)]}
function initogen()
{
	document.c.b.value=lang.startGame;
}
function init()
{
	document.getElementById("gameboard").innerHTML=boardHTML();
	C_C.init('img/clear.png','img/focus.png','img/bg.png');
	for(var i=0;i<13;i++){	for(var j=0;j<13;j++){
			makeCellWrapped(i+"x"+j,i+"y"+j,0,0,0,0,"n",'img/void1.png');//空セル作成
		}}
	
	
	for(var i=0;i<5;i++){	for(var j=0;j<3;j++){
			makeCellWrapped(i+"w"+j,i+"white"+j,0,0,0,0,"n",'img/void2.png');//空セル作成
			makeCellWrapped(i+"b"+j,i+"black"+j,0,0,0,0,"n",'img/void2.png');//空セル作成
	}}
	document.a.c.value=lang.rotClock;
	document.a.d.value=lang.rotCClock;
	document.getElementById("rot").style.visibility="visible";
	gamestart();
}

function makeTable(I,J,sep)
{
	var tmp="<table cellpadding=0 cellspacing=0 >";
	for(var i=0;i<I;i++){tmp+="<tr>";for(var j=0;j<J;j++){tmp+="<td id='"+i+sep+j+"'></td>";}tmp+="</tr>";}
	return(tmp+"</table>");
}

function boardHTML()
{
	return(
	'<table border=1 width=1024 cellpadding=0 cellspacing=0>'+
	'<tr>'+
	'<td>'+
	'	<p class="sign">'+lang.white.mount+'</p>'+
	'	<div style="position:relative;left:56px" id="whmt"></div>'+
	'	<p class="sign">'+lang.white.hand+'</p>'+
	makeTable(5,3,"w")+'<br><br>'+
	'	<p class="sign">'+lang.white.point+'</p>'+
	'	<p class="sign" id="whitept">0</p>'+
	'	<div style="visibility:hidden" id="whiteskip">'+
	'	<input type="button" value="'+lang.skipDraw+'" onclick="_play('+"'white'"+')" />'+
	'	</div>'+
	'	<div style="visibility:hidden" id="whiteend">'+
	'	<input type="button" value="'+lang.turnEnd+'" onclick="_actionogen('+"'black','white'"+')" />'+
	'	</div>'+
	'</td>'+
	'<td>'+makeTable(13,13,"x")+'</td>'+
	'<td><p class="sign">'+lang.black.mount+'</p>'+
	'	<div style="position:relative;left:56px" id="blmt"></div>'+
	'	<p class="sign">'+lang.black.hand+'</p>'+
	makeTable(5,3,"b")+'<br><br>'+
	'	<p class="sign">'+lang.black.point+'</p>'+
	'	<p class="sign" id="blackpt">0</p>'+
	'	<div style="visibility:hidden" id="blackskip">'+
	'	<input type="button" value="'+lang.skipDraw+'" onclick="_play('+"'black'"+')" />'+
	'	</div>'+
	'	<div style="visibility:hidden" id="blackend">'+
	'	<input type="button" value="'+lang.turnEnd+'" onclick="_actionogen('+"'white','black'"+')" />'+
	'	</div>'+
	'</td>'+
	'</table>'
	)	
}
