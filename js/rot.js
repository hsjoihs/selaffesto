function _rot(dir)
{
	if(C_C.isItemSelected)//選択してるなら
	{
		var ID=C_C.selectedId;//省略
		
		var origCard=getNums(ID);
		var newCard=[];
		if(dir>0)
		{
			newCard=[origCard[1],origCard[2],origCard[3],origCard[0],origCard[4]];
			/**
			　上　　　　左
			左　右→　下　上
			　下　　　　右
			**/
		}
		else
		{
			newCard=[origCard[3],origCard[0],origCard[1],origCard[2],origCard[4]];
		}
		if(isBoard(ID))//盤なら
		{
			GameData.board[ID.split("y")[0]][ID.split("y")[1]]=newCard;
		}
		makeCard56Wrapped(ID+"__main",newCard[0],newCard[1],newCard[2],newCard[3],newCard[4]);
	}
}