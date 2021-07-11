function _play(color)
{
	C_C.judge=function(a,b){return a==b||isHand(color,a)&&isHand(color,b)}//ロック
	document.getElementById(color+"skip").style.visibility="hidden";
	
	/*NH判定(辛そう[小並感])
	できたけど
	あれ、でもプレース『させて』からNH判定してもいいかもね
	↑
	何を言っているんだこいつは、NHの範囲をまず表示してあげにゃあかんだろ
	*/
	
	GameData[color].NH=getNH(color);//NH格納
		
	for(var i=0;i<13;i++){	for(var j=0;j<13;j++){
	if(GameData[color].NH[i][j])document.getElementById(i+"y"+j+"__fore").innerHTML='<img src="img/NH.png" height="'+C_C.height+'" width="'+C_C.width+'" />';
	}}//NHを表示する
	
	giveMessage(lang.play);
	//NHにカードを1枚プレース『させる』(ここで例のC_C.judgeが役立つのじゃー)
	C_C.judgeFirst=function(a)
	{
		if(!isHand(color,a))return false;
		else return true;
	}
	C_C.judge=function(a,b)
	{
		if(a==b)return true;
		else if(!isHand(color,a))return false;//手札でない
		else if(isHand(color,b))return true;//手札間移動
		else if(!isBoard(b))return false;//盤への移動じゃない
		else if(getNums(a)[0]==0){return false;}//手札が空ならダメ
		else
		{
			if(GameData[color].NH&&GameData[color].NH[b.split("y")[0]][b.split("y")[1]])//NHなら(そしてnullクリアされてないなら)
			{
				GameData.board[b.split("y")[0]][b.split("y")[1]]=getNums(a);//プレースしたことをboardに記載して整合性を保つ
				
				for(var i=0;i<13;i++){	for(var j=0;j<13;j++){
				document.getElementById(i+"y"+j+"__fore").innerHTML=C_C.noFocus;//消す
				}}//NHを消す
				GameData[color].NH=null;//ヌルクリア
				
				document.getElementById(a+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
				var tmp=document.getElementById(a+"__main").innerHTML;//交換用
				document.getElementById(a+"__main").innerHTML=document.getElementById(b+"__main").innerHTML;//前のに新たなHTML移行
				document.getElementById(b+"__main").innerHTML=tmp;//新たなのに前のHTML移行
				document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
				C_C.isItemSelected=false;//持ってない
				C_C.selectedId="";
				/*共通処理*/
				
				GameData[color].handnum--;//手札減らす
				if(GameData[color].decknum+GameData[color].handnum<1)//カードが枯渇する
				{
					_gameEnd(color);//試合終了
				}
				
				_judgePlacement(color,b.split("y")[0]-0,b.split("y")[1]-0);//判定に持ち込む
				return 1;
			}
			else return false;
		}
	}
}