function getNH(color)
{
	function colorOf(i,j)
	{
		if(!GameData.board[i])return undefined;//カードが存在しない
		if(!GameData.board[i][j])return undefined;//カードが存在しない
		return GameData.board[i][j][4];
	}
	function isEmpty(i,j){return colorOf(i,j)===null}
	
	
	var tmp=[];
	
	for(var i=0;i<13;i++)//tmpにboolの2次元配列格納(長いので注意)
	{
		tmp[i]=[];//配列
		for(var j=0;j<13;j++)
		{
			if(colorOf(i,j))//まずそこにカードがあったら
			{
				tmp[i][j]=false;//NHじゃないよね
			}
			else if(colorOf(i,j-1)==color||colorOf(i,j+1)==color||colorOf(i-1,j)==color||colorOf(i+1,j)==color)//隣に自分のカードがある 
			{
				tmp[i][j]=1;//NH
			}
			else if(
			(colorOf(i,j-2)==color&&isEmpty(i,j-1) )||
			(colorOf(i,j+2)==color&&isEmpty(i,j+1) )||
			(colorOf(i-2,j)==color&&isEmpty(i-1,j) )||
			(colorOf(i+2,j)==color&&isEmpty(i+1,j) )  )//2つ隣に自分のカードがあって1つ隣が空
			{
				tmp[i][j]=2;//NH
			}
			else if(
			colorOf(i-1,j-1)==color&&(isEmpty(i,j-1)||isEmpty(i-1,j)) ||
			colorOf(i+1,j-1)==color&&(isEmpty(i,j-1)||isEmpty(i+1,j)) ||
			colorOf(i-1,j+1)==color&&(isEmpty(i,j+1)||isEmpty(i-1,j)) ||
			colorOf(i+1,j+1)==color&&(isEmpty(i,j+1)||isEmpty(i+1,j)) )//斜めにあって間のうち少なくとも一つが空
			{
				tmp[i][j]=3;//NH
			}
			else if(
			colorOf(i-1,j-2)==color&&isEmpty(i-1,j-1)&&(isEmpty(i,j-1)||isEmpty(i-1,j)) ||
			colorOf(i-1,j-2)==color&&isEmpty(i,j-2)&&isEmpty(i,j-1) ||
			
			colorOf(i+1,j-2)==color&&isEmpty(i+1,j-1)&&(isEmpty(i,j-1)||isEmpty(i+1,j)) ||
			colorOf(i+1,j-2)==color&&isEmpty(i,j-2)&&isEmpty(i,j-1) ||
			
			colorOf(i-1,j+2)==color&&isEmpty(i-1,j+1)&&(isEmpty(i,j+1)||isEmpty(i-1,j)) ||
			colorOf(i-1,j+2)==color&&isEmpty(i,j+2)&&isEmpty(i,j+1) ||
			
			colorOf(i+1,j+2)==color&&isEmpty(i+1,j+1)&&(isEmpty(i,j+1)||isEmpty(i+1,j)) ||
			colorOf(i+1,j+2)==color&&isEmpty(i,j+2)&&isEmpty(i,j+1) ||
			
			
			colorOf(i-2,j-1)==color&&isEmpty(i-1,j-1)&&(isEmpty(i,j-1)||isEmpty(i-1,j)) ||
			colorOf(i-2,j-1)==color&&isEmpty(i-2,j)&&isEmpty(i-1,j) ||
			
			colorOf(i-2,j+1)==color&&isEmpty(i-1,j+1)&&(isEmpty(i,j+1)||isEmpty(i-1,j)) ||
			colorOf(i-2,j+1)==color&&isEmpty(i-2,j)&&isEmpty(i-1,j) ||
			
			colorOf(i+2,j-1)==color&&isEmpty(i+1,j-1)&&(isEmpty(i,j-1)||isEmpty(i+1,j)) ||
			colorOf(i+2,j-1)==color&&isEmpty(i+2,j)&&isEmpty(i+1,j) ||
			
			colorOf(i+2,j+1)==color&&isEmpty(i+1,j+1)&&(isEmpty(i,j+1)||isEmpty(i+1,j)) ||
			colorOf(i+2,j+1)==color&&isEmpty(i+2,j)&&isEmpty(i+1,j) 
			)
			{
				tmp[i][j]=4;//NH
			}
			else
			{
				tmp[i][j]=false;//NHじゃない
			}
		}
	}
	return tmp;
}