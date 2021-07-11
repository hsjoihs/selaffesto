var C_C=
{
	isItemSelected:false,//アイテム選択時true
	selectedId:"",//選択されているIDを保持
	height:56,//フォーカスのサイズ
	width:56,
	initialized:false,
	judge:function(a,b){return a==b;},
	judgeFirst:function(a){return false;},
	forbid:function(){alert(lang.C_Cforbidden);},
	forbidFirst:function(){alert(lang.C_CforbiddenFirst);}
};

C_C.init=function(nofocus,focus,defaultBack)//C_Cの初期化
{
	C_C.isItemSelected=false;
	C_C.selectedInnerHTML="";
	C_C.selectedId="";//選択されているIDを保持
	if(nofocus&&focus&&defaultBack)//引数入り
	{
		C_C.noFocus='<img src="'+nofocus+'" height="'+C_C.height+'" width="'+C_C.width+'" />';
		C_C.focus  ='<img src="'+focus+'" height="'+C_C.height+'" width="'+C_C.width+'" />';
		C_C.defaultBack=defaultBack;
		C_C.initialized=true;
	}
	else if(C_C.initialized)return false;
	else throw new Error("Initialization without enough arguments");
};

C_C.makeCell=function(id,HTML,back,tooltip)/**WRITE HERE ABOUT TOOLTIP**/ //使うときはこちらではなくinit.jsにあるmakeCellWrappedを使え
{
	if(!C_C.initialized)throw new Error("C&C not initialized");
	if(!back)back=defaultBack;
	tooltip=tooltip?("<span>"+tooltip+"</span>"):"";
	return  '<div class="cell" id="'+id+'" onclick="C_C.action(this.id)">'+
			'<a href="#" class="tooltip">'+
			'<div id="'+id+'__fore" class="fore">'+C_C.noFocus+'</div>'+
			'<div id="'+id+'__main" class="main">'+HTML+
				tooltip+/*spanタグはここだけなので外のaで取得したhoverがここまで伝播する*/
			'</div>'+
			'<div id="'+id+'__back" class="back"><img src="'+back+'"    height="'+C_C.height+'" width="'+C_C.width+'" /></div>'+
			'</a>'+/*tooltip*/
			'</div>';
};
C_C.action=function(id)//セルのクリック時に呼ばれる
{
	if(C_C.isItemSelected)//持っているなら交換
	{
		var judge=C_C.judge(C_C.selectedId,id);
		if(judge===true)//交換許可が降りた(C_C.judge()がtrueを返す)時
		{
			document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
			var tmp=document.getElementById(C_C.selectedId+"__main").innerHTML;//交換用
			document.getElementById(C_C.selectedId+"__main").innerHTML=document.getElementById(id+"__main").innerHTML;//前のに新たなHTML移行
			document.getElementById(id+"__main").innerHTML=tmp;//新たなのに前のHTML移行
			C_C.isItemSelected=false;//持ってない
			C_C.selectedId="";
		}
		else if(judge)//交換許可が降りたが交換処理をマニュアルでやるとき(C_C.judge()がtrueでなくTRUTHYを返す)時
		{
			/*document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
			C_C.isItemSelected=false;//持ってない
			C_C.selectedId="";*/
		}
		else
		{
			C_C.forbid();
			document.getElementById(C_C.selectedId+"__fore").innerHTML=C_C.noFocus;//前のフォーカス消す
			C_C.isItemSelected=false;//持ってない
			C_C.selectedId="";
		}//禁止
	}
	else //選択
	{
		if(!C_C.judgeFirst(id))
		{
			C_C.forbidFirst();
			return false;
		}
		document.getElementById(id+"__fore").innerHTML=C_C.focus;//フォーカス入れる
		C_C.isItemSelected=true;
		C_C.selectedId=id;
	}
};
