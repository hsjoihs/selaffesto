/*JUMPPLAY*/
function _jumpplay(color,LCID)
{
	C_C.judge=function(a,b){return a==b||isHand(color,a)&&isHand(color,b)}//ロック
	document.getElementById(color+"skip").style.visibility="hidden";
	
	GameData[color].NH=getNH(color);//NH判定(共通)
	
	for(var i=0;i<13;i++){	for(var j=0;j<13;j++){
	if(GameData[color].NH[i][j])document.getElementById(i+"y"+j+"__fore").innerHTML='<img src="img/NH.png" height="'+C_C.height+'" width="'+C_C.width+'" />';
	}}//NHを表示する(共通)
	
	giveMessage(lang.jumpplay);/**DIFFERS**/
	
	//NHにカードを1枚プレース『させる』(DIFFERS)
	C_C.judgeFirst=function(a)/**DIFFERS**/
	{
		if(a!=LCID)return false;//ユーザーに選ばせるなんてなんと不親切な(CORRECT HERE LATER)
		else return true;
	}
	C_C.judge=function(a,b)/**DIFFERS**/
	{
		if(a!=LCID)return false;//LCでない
		else if(!isBoard(b))return false;//盤への移動じゃない
		else if(getNums(a)[0]==0){return false;}//LCが空ならダメ(まあありえないけどね)
		else
		{
			if(GameData[color].NH&&GameData[color].NH[b.split("y")[0]][b.split("y")[1]])//NHなら(そしてnullクリアされてないなら)
			{
				GameData.board[b.split("y")[0]][b.split("y")[1]]=getNums(a);//プレースしたことをboardに記載して整合性を保つ
				GameData.board[a.split("y")[0]][a.split("y")[1]]=[0,0,0,0,null];//元の位置のが消えたことをboardに記載して整合性を保つ

				for(var i=0;i<13;i++){	for(var j=0;j<13;j++){
				document.getElementById(i+"y"+j+"__fore").innerHTML=C_C.noFocus;//消す
				}}//NHを消す
				GameData[color].NH=null;//ヌルクリア
				
				document.getElementById(a+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す(ないけど)
				var tmp=document.getElementById(a+"__main").innerHTML;//交換用
				document.getElementById(a+"__main").innerHTML=document.getElementById(b+"__main").innerHTML;//前のに新たなHTML移行
				document.getElementById(b+"__main").innerHTML=tmp;//新たなのに前のHTML移行
				document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
				C_C.isItemSelected=false;//持ってない
				C_C.selectedId="";
				/*共通処理*/
								
				_judgePlacement(color,b.split("y")[0]-0,b.split("y")[1]-0);//判定に持ち込む
				return 1;
			}
			else return false;
		}
	}
}