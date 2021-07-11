# selaffesto
2013年11月から2014年1月にかけて実装した、マス目と約数で遊ぶ頭脳対戦ゲーム

## ルール
カードゲームの名前 : selaffesto,セラッフェスト
 1. セルとは、中が白く枠が黒い正方形である。
 2. ボードとは、13x13にセルを並べたものである。
 3. カードとは、大きさがセルよりひと回り小さく、片面の対角線上に線が引いてある正方形である。
 4. セクションとは、対角線によって分けられたカードのそれぞれの部分である。
 5. プレイヤーとは、カードの所有者である。
 6. ヘッドとは、カードのなかでセクションが存在する面である。
 7. プレースするとは、ヘッドを上向きにしてカードがないセルの中にカードを乗せることである。(カードを置く)
 8. SNとは、セクションにおいて斜辺を下とした時に正位置で書かれている2-12,14-16,18,20-22,24,25のことである。
 9. ウェイトとは、一つのセクションと関係のある自然数である。
10. NHとは、ボード上の自分のカードから縦2セル、横2セル以内の、自分が所有しないカードの上を通らない3セル分以内の移動によって到達できるセルの集合の要素のどれか一つである。
11. NCとは、あるカードに対しその上下左右にあるカードの集合の要素である。
12. NSとは、あるカードに対するNCにおいて、他カード間で隣り合う2つのセクションの集合、の集合の要素である。
13. マッチであるとは、あるカードに対し全てのNSにおいてその2つの要素のうち一つがもう一方の約数である事である。
14. プットとは、NHにカードを1枚プレースし、且つそのカードがマッチであることである。
15. WFとは、SNが14以上の時ウェイトを7とし、SNが9以上12以下の時ウェイトを6とし、SNが7か8の時ウェイトを4とし、SNが6の時ウェイトを3とし、SNが5の時ウェイトを2.4とし、SNが4の時ウェイトを2とし、SNが3の時ウェイトを1.5とし、SNが2の時ウェイトを1とする関数である。
16. FWとは、あるカードに対してそのカードの4つのSNのWFの返り値の和である。
17. LCとは、あるカードに対するNCにおいて、そのカードのFWよりもFWが小さいカードである。
18. ジャンププットとは、NHにカードを1枚プレースし、且つそのカードがマッチでなく、且つ1枚のLCを取り除いた時そのカードがマッチであることである。
19. フェールプットとは、NHにカードを1枚プレースし、且つプットでなく、且つジャンププットでないことである。
20. デッキとは、60枚のカードをヘッドを下にして重ねたものである。
21. マウントとは、60枚以下の任意の枚数のカードを重ねたものである。
22. ハンドとは、全てのプレイヤーがそれぞれ所有する、要素数が12以下の、マウントとの積集合が空集合となるカードの集合である。
23. ファーストアクションとは、デッキの上から7枚のカードをハンドに移し、その内1枚を、ボードの中心から直線に7セル離れたところにプレースすることである。
24. ゲームスタートとは、宣言された時にボードの横に各プレイヤーがそれぞれ所有するデッキが置かれるものである。
25. ドローとは、ハンドの要素数が12未満の時、マウントからカードを1枚ハンドに移すことである。
26. ポイントとは、各プレイヤーがそれぞれ保有する数値で、ゲームスタート時には0である。
27. P↑とは、新たに生まれた全てのNSにおいて、それぞれのSNのうち大きくない方のWFの総和を求め、それに新たに生まれたNSの個数を掛けた値をあるプレイヤーのポイントに加えることである。
28. プレイとは、プット後にP↑するか、フェールプットするか、ジャンププットするかのどれかである。ジャンププットで、LCが自分のカードでなく、かつ所有者のハンドの要素数が10以下であれば、P↑後にハンドのうちの1枚のFWの4倍を自分のポイントに加えた後、所有者のハンドにLCを与え、所有者がドローし、終了する。LCが自分のカードでなく、かつ所有者のハンドの要素数が11以上であれば、終了する。自分のカードであれば、P↑後にそのカードでもう一度プレイを行える。
29. ファイナルアクションとは、どのプレイヤーも所有しない、あるプレイヤーのハンドとマウントに属するカードの枚数が0になった時、そのプレイヤーのポイントを0.8倍し、切り捨てる、ことである。
30. アクションとは、ファーストアクションか、プレイか、ドロー後にプレイすることか、ファイナルアクションかのどれかである。
31. P1とは、ゲームスタート、または他のプレイヤーのアクションが終了しており、その後に別のアクションが存在しない時のみ自分の所有するアクションを行えるプレイヤーである。
32. P2とは、P1のアクションが終了しており、その後に別のアクションが存在しない時のみ自分の所有するアクションを行えるプレイヤーである。


以上 
