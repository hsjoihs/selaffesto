function _judgePlacement(color,x,y)//プレース判定
{
	function isMissMatch(a,b){if(a*b==0){return false;}if(a%b==0){return false;}if(b%a==0){return false;}return true ;}	
	function     isMatch(a,b){if(a*b==0){return false;}if(a%b==0){return true ;}if(b%a==0){return true ;}return false;}
	/**********game↓*************/
	C_C.judge=function(a,b){return a==b||isHand(color,a)&&isHand(color,b)}//ロック
	
	var missnum=0;//NSの判定をしてミスマッチの数をローカル変数に格納する
	var missAt=-1;
	var juxtacard=[GameData.board[x-1][y],GameData.board[x][y-1],GameData.board[x+1][y],GameData.board[x][y+1]]//上、左、下、右の参照
	var juxtaXY=[
		[x-1,y],/*上*/
		[x,y-1],/*左*/
		[x+1,y],/*下*/
		[x,y+1]	/*右*/]
	/*数学と比べてxとyが逆な気がするが気にしてはいけない*/
	function chkMissMatch(a,b,n){if(isMissMatch(a,b)){missnum++;missAt=n}}
	chkMissMatch(GameData.board[x][y][3],GameData.board[x][y+1][1],3); //GameData.board[x][y][3](自分の右)とGameData.board[x][y+1][1](右の左)
	chkMissMatch(GameData.board[x][y][1],GameData.board[x][y-1][3],1); //GameData.board[x][y][1](自分の左)とGameData.board[x][y-1][3](左の右)
	chkMissMatch(GameData.board[x][y][0],GameData.board[x-1][y][2],0); //GameData.board[x][y][0](自分の上)とGameData.board[x-1][y][2](上の下)
	chkMissMatch(GameData.board[x][y][2],GameData.board[x+1][y][0],2); //GameData.board[x][y][2](自分の下)とGameData.board[x+1][y][0](下の上)
	//console.log(GameData.board[x][y][0]);
	//console.log(GameData.board[x-1][y][2]);
	
	function WF(a)
	{
		if(a>=14)return 7 ;if(a>=9)return 6;if(a>=7)return 4;if(a==6)return 3;if(a==5)return 2.4;if(a==4)return 2;
		if(a==3)return 1.5;if(a==2)return 1;else return 0;
	}
	function FW(card){return WF(card[0])+WF(card[1])+WF(card[2])+WF(card[3])-0;}//NaN検出用
	function pointUp()
	{
		var tmpmch=[false,false,false,false];
		if(isMatch(GameData.board[x][y][3],GameData.board[x][y+1][1])){tmpmch[3]=[GameData.board[x][y][3],GameData.board[x][y+1][1]];}
		if(isMatch(GameData.board[x][y][1],GameData.board[x][y-1][3])){tmpmch[1]=[GameData.board[x][y][1],GameData.board[x][y-1][3]];}
		if(isMatch(GameData.board[x][y][0],GameData.board[x-1][y][2])){tmpmch[0]=[GameData.board[x][y][0],GameData.board[x-1][y][2]];}
		if(isMatch(GameData.board[x][y][2],GameData.board[x+1][y][0])){tmpmch[2]=[GameData.board[x][y][2],GameData.board[x+1][y][0]];}
		var tmp=0;
		var ans=0;
		for(var i=0;i<4;i++)
		{
			if(tmpmch[i])
			{
				ans+=WF(Math.min(tmpmch[i][0],tmpmch[i][1]));
				tmp++;
			}
		}
		return ans*tmp;
	}
	if(missnum==0)//マッチの場合→プットとみなす
	{
		giveMessage(lang.put);
		GameData[color].point+=pointUp();
		document.getElementById(color+"pt").innerHTML=GameData[color].point;//P↑する
		
		document.getElementById(color+"end").style.visibility="visible";//コールスタックが長くなるのを防ぐためターンエンドボタンで渡す
		return;
	}
	else if(missnum==1&&(FW(juxtacard[missAt])<FW(GameData.board[x][y])))//1枚のLCを取り除いた時そのカードがマッチである場合→ジャンププットとみなす
	{
		var LC=juxtacard[missAt];//隣り合うカード
		var LCcol=LC[4];
		if(LCcol==color)//LCが自分のカードの場合
		{
			GameData[color].point+=pointUp();
			document.getElementById(color+"pt").innerHTML=GameData[color].point;//P↑する
			
			//juxtaXY[missAt][0]==LCのx座標,juxtaXY[missAt][1]==LCのy座標
			_jumpplay(color,juxtaXY[missAt][0]+"y"+juxtaXY[missAt][1]);//手札ではなくLCでもう一度プレイ『させる』
		}
		else//LCが自分のカードじゃない場合
		{
			if(GameData[LCcol].handnum<HANDMAX-1)//所有者(LCcol)のハンドが10枚以下の場合
			{
				giveMessage(lang.jumpput);
				giveMessage(lang[LCcol].cardblown);//飛ばした
				GameData[color].point+=pointUp();
				document.getElementById(color+"pt").innerHTML=GameData[color].point;//P↑する
				
				
				//ハンドのうちの1枚のFWの4倍を自分のポイントに加える(この際いっそ自動化しましょうかね)
				var tmmpp=0;
				for(var i=0;i<5;i++){	for(var j=0;j<3;j++){
					tmmpp=Math.max(tmmpp,FW(getNums(i+color+j))); //白のカードの最大のFW
				}}
				GameData[color].point+=tmmpp*4;
				document.getElementById(color+"pt").innerHTML=GameData[color].point;
				
				//所有者のハンドにLCを与える(自動)
				/*
				  juxtaXY[missAt][0]==LCのx座標
				  juxtaXY[missAt][1]==LCのy座標
				*/
				for(var i=0;i<5;i++){	for(var j=0;j<3;j++){
					if(getNums(i+LCcol+j)[0]!=0)continue;//空じゃない手札は考えない
					else
					{
						/*		i+LCcol+j,    juxtaXY[missAt][0]+"y"+juxtaXY[missAt][1]を入替えて*/
						var alp=i+LCcol+j,bet=juxtaXY[missAt][0]+"y"+juxtaXY[missAt][1];
						
						var TEmp=document.getElementById(alp+"__main").innerHTML;//交換用
						document.getElementById(alp+"__main").innerHTML=document.getElementById(bet+"__main").innerHTML;//前のに新たなHTML移行
						document.getElementById(bet+"__main").innerHTML=TEmp;//新たなのに前のHTML移行
						
						GameData.board[juxtaXY[missAt][0]][juxtaXY[missAt][1]]=[0,0,0,0,null];//盤を空とする
					}
				}}
				
				//所有者がドロー(自動)
				if(GameData[LCcol].decknum<1)//所有者の山札がないとき(でもさっきカードを与えたばかりなのにファイナルアクションが発動することはない)
				{
					;//何もしない
				}
				else 
				{
					loop_end:
					for(var i=0;i<5;i++){	for(var j=0;j<3;j++){
						if(getNums(i+LCcol+j)[0]!=0)continue;//空じゃない手札は考えない
						
						document.getElementById(i+LCcol+j+"__main").innerHTML=document.getElementById(LCcol+"mt1"+"__main").innerHTML;//山札のを移行
						
						if(GameData[LCcol].decknum==1)//所有者のカードが1枚の時
						{
							makeCard56Wrapped(LCcol+"mt1"+"__main",0,0,0,0,"n");//もう引けない＝空
							GameData[color].decknum--;//山札減らす
						}
						else//所有者のカードが2枚以上の時
						{
							makeCard56Wrapped(LCcol+"mt1"+"__main",getNum(),getNum(),getNum(),getNum(),LCcol.charAt(0));//山札補充
							GameData[color].decknum--;//山札減らす
						}
						break loop_end;//二重ループ脱出
					}}
				}
				
				GameData[LCcol].handnum+=2;//2増やす
				document.getElementById(color+"end").style.visibility="visible";//ターンエンド
				return;
			}
			else //所有者のハンドが11枚以上の場合
			{
				giveMessage(lang.failput);//表示上フェールプット
				document.getElementById(color+"end").style.visibility="visible";//ターンエンド
				return;//(LCは取り除かれない。実質上のフェールプット)
			}
		}
	}
	else//それ以外(フェールプット)
	{
		giveMessage(lang.failput);
		document.getElementById(color+"end").style.visibility="visible";//ターンエンド
		return;
	}
}