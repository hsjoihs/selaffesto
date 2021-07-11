function _gameEnd(color)
{
	giveMessage(lang[color].nocard);
	GameData[color].point*=0.8;//0.8倍
	document.getElementById(color+"pt").innerHTML=GameData[color].point;
	var tmp=0;
	var mx;
	if(GameData.white.point>GameData.black.point)/**WRITE HERE(ソートを用いて人数依存を消すのが望ましい)**/
	{
		giveMessage(lang.white.win);
	}
	else if(GameData.black.point>GameData.white.point)
	{
		giveMessage(lang.black.win);
	}
	else
	{
		giveMessage(lang.tie);
	}
}