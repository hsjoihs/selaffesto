var GameData=
{
	white:
	{
		handnum:null,//手札の枚数
		NH:null,//NHを管理する変数
		point:0,
		decknum:null
	},
	black:{handnum:null,NH:null,point:0,decknum:null},
	board:(function(){
		var tmp=[];
		for(var i=-1;i<14;i++)//オーバーフロー対処
		{
			tmp[i]=[];
			for(var j=-1;j<14;j++)//オーバーフロー対処
			{
				tmp[i][j]=[0,0,0,0,null];//上、左、下、右、色
			}
		}
		return tmp;
	})()//盤面を管理する変数作ったけどC&Cで動いたやつを逐一追わねばならぬのだな
};//the only global variable; resetting this will reset the game(hopefully)
//I chose Gamedata.white.handnum


var HANDMAX=12;//手数最大
var DECKMAX=60;//デッキ枚数

function gamestart()
{

	var first=[[getNum(),getNum(),getNum(),getNum(),"black"],[getNum(),getNum(),getNum(),getNum(),"white"]];
	makeCellWrapped( "0x6", "0y6",first[0][0],first[0][1],first[0][2],first[0][3],"b",'img/void1.png');//最初に置くやつ
	makeCellWrapped("12x6","12y6",first[1][0],first[1][1],first[1][2],first[1][3],"w",'img/void1.png');
		
	GameData.board [0][6]=first[0];
	GameData.board[12][6]=first[1];
	
	for(var i=0;i<2;i++){	for(var j=0;j<3;j++){
			makeCellWrapped(i+"w"+j,i+"white"+j,getNum(),getNum(),getNum(),getNum(),"w",'img/void2.png');//手札
			makeCellWrapped(i+"b"+j,i+"black"+j,getNum(),getNum(),getNum(),getNum(),"b",'img/void2.png');//手札
		}}
	makeCellWrapped("whmt","whitemt1",getNum(),getNum(),getNum(),getNum(),"w",'img/void2.png');//山札
	makeCellWrapped("blmt","blackmt1",getNum(),getNum(),getNum(),getNum(),"b",'img/void2.png');//山札
	GameData.white.handnum=6;//手札の枚数
	GameData.white.decknum=DECKMAX-7;//山札の枚数
	GameData.black.handnum=6;//手札の枚数
	GameData.black.decknum=DECKMAX-7;//山札の枚数
}

function giveMessage(a){if(a)alert(a);}/*** WRITE HERE LATER***/
function isHand(color,a)
{
	var flag=false;
	for(var i=0;i<5;i++){	for(var j=0;j<3;j++){ if(a==i+color+j){flag=true;break;} }}
	return flag;
}

function isBoard(a)
{
	var flag=false;
	for(var i=0;i<13;i++){	for(var j=0;j<13;j++){ if(a==i+"y"+j){flag=true;break;} }}
	return flag;
}
function _actionogen(color,counter)
{
	document.getElementById(counter+"end").style.visibility="hidden";
	_action(color);
}
function _action(color)//各プレイヤーのアクション(colorは"white"と"black")
{
	giveMessage(lang[color].yourturn);//君の番だよ！
	
	if(GameData[color].handnum<HANDMAX)
	{
		giveMessage(lang.draw);//ドロー
		
		//任意でドロー『させる』
		//C_C.judgeを弄ってドローを許可させる方針
		C_C.judgeFirst=function(a)
		{
			return true;
		}

		C_C.judge=function(a,b)
		{
			//山札から手札（空）、または自分自身のみを許容する
			//手札から手札は常に許容しようかな
			if(a==b)return true;
			else if(a!=color+"mt1")//山札でない
			{
				if(isHand(color,a)&&isHand(color,b))return true;
				else return false;
			}
			else//山札
			{
				//手札のidはi+color+j
				
				if(!isHand(color,b))return false;//bが手札でない
				if(getNums(b)[0]==0)//その手札が空なら
				{
					
					if(GameData[color].decknum<1)//残り0枚(但し手札は残っている)
					{
						return false;//引けません
					}
					
					document.getElementById(b+"__main").innerHTML=document.getElementById(a+"__main").innerHTML;//新たなのに前のHTML移行
					if(GameData[color].decknum==1)//残り1枚
					{
						makeCard56Wrapped(a+"__main",0,0,0,0,"n");//空
						GameData[color].decknum--;//山札減らす
					}
					else
					{
						makeCard56Wrapped(a+"__main",getNum(),getNum(),getNum(),getNum(),color.charAt(0));//空
						GameData[color].decknum--;//山札減らす
					}
					document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
					C_C.isItemSelected=false;//持ってない
					C_C.selectedId="";
					GameData[color].handnum++;//手札増やす
					
					_play(color);
					return 1;
				}
				else{ return false;}//手札に既にカードが入ってる
			}
		}
		/*C_C.judge finished*/
		document.getElementById(color+"skip").style.visibility="visible";//ドローをスキップするボタン
	}
	else
	{
		_play(color);
	}
}

/***_play,_judgePlacementをファイル分割***/