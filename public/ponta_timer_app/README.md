◇作品名

ペンギンポモドーロタイマー　

◇詳細資料

https://pontaro.net/227/

◇内容

ポモドーロタイマーの作り方
今回は特にJavaScriptの処理の解説をします。

タイマーのデフォルト値設定

function time(value) {
  for (let i = 0; i < 60; i++) {
    let option = `<option value="${i}">${i}</option>`;
    if (i == 25) {
      if (value == "study") {
        option = `<option value="${i}" selected>${i}</option>`;
      }
    } else if (i == 5) {
      if (value == "rest") {
        option = `<option value="${i}" selected>${i}</option>`;
      }
    }
    document.getElementById(`${value}`).insertAdjacentHTML("beforeend", option);
  }
}
time("study");
time("rest");
まず最初にポモドーロタイマーのデフォルト値にするために学習時間25分と休憩時間5分をoptionタグでselectedにします。


カウントダウン先の日時の取得

function setLastMinutes(max) {
  millenium = new Date();
  millenium.setMinutes(millenium.getMinutes() + max);
}
関数と引数が分からない方はこちら


JavaScriptの関数と引数(中学生でもわかるプログラミング講座)
関数の基礎はこちらから前回関数の基礎について紹介してきました。今回はより深く関数を知るために引数について学習していきましょう。実践はこちら引数とは関数を呼び出すとき関数に値を受け渡す...

pontaro.net
2022.09.25
次にデフォルト値だけでなくセレクトボックスでユーザーが選択した時間でインターバルが起こるようにします。例えば50分 / 10分など。

このsetLastMinutesという関数はmilleniumという変数に現在の日付を取得してきた後、maxという引数(セレクトボックスで選択した分)の値を加算します。これでタイマーが終わる時間を取得することができます。例えばデフォルトの25分でタイマーを始めたら25分後の日付がmilleniumに格納されます。

カウントダウンの表示

function display() {
  let today = new Date();
  let hour;

  if (!millenium) {
    setLastMinutes(Number(study.value));
  }
  if (millenium < today) {
    count++;
    if (count % 2 !== 0) {
      setLastMinutes(Number(rest.value));
      document.f.languages.value = "休憩中";
    } else {
      setLastMinutes(Number(study.value));
    }
  }

  //以下省略
}
最後に関数displayについてみていきましょう。

まずif文でmilleniumが定義されていなかったら(タイマーを起動させたら)、先ほどのsetLastMinutesという関数をセレクトボックスの値を代入して実行します。

また、todayという変数に現在の日付を格納して現在の日時がmilleniumの日時を過ぎたらまたsetLastMinutes関数を実行してタイマーを続行し、countを１つずつ上げていきます。そこでcountが奇数だったら休憩時間のカウントダウンをして偶数だったら勉強時間のカウントダウンをします。


function display() {
  // 省略

  let milliSec = (millenium - today);
  time2 = Math.floor(milliSec / (60 * 1000));
  time3 = Math.floor(milliSec / 1000) % 60;

  times2 = ("00" + time2).slice(-2);
  times3 = ("00" + time3).slice(-2);

  document.f.days.value = times2 + ":" + times3;

  tid = setTimeout("display()", 1000);

  // 省略
}
仕上げにカウントダウンしている様子をサイト上に表示していきましょう。まず、milliSecという変数にカウントダウンする秒数を格納します。

続いてtime2にmilliSecを分換算するために割ることの60000(60 * 1000)をします。それをMath.floorで切り捨ててカウントダウンする分数を表示します。

同様にtime3にmilliSecを秒換算すために割ることの1000します。それをMath.floorで切り捨ててカウントダウンする秒数を表示します。

ラストtime2とtime3を2桁表示させて値をformに代入すれば完成です！！！

そしてこの処理をカウントダウンは1秒ごとにやる必要があるのでsetTimeoutで1000ミリ秒つまり1秒ごとにdisplay関数を実行します。

以上です。
