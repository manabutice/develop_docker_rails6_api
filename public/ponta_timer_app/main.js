let millenium;
let count = 0;
let study = document.getElementById("study");
let rest = document.getElementById("rest");

//タイマーのデフォルト値設定
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

//カウントダウン先の日時の取得
function setLastMinutes(max) {
  millenium = new Date();
  millenium.setMinutes(millenium.getMinutes() + max);
}

//カウントダウンの表示
function display() {
  let today = new Date();
  let hour;

  if (!millenium) {
    //勉強
    setLastMinutes(Number(study.value));
  }
  if (millenium < today) {
    count++;
    if (count % 2 !== 0) {
    //休憩
      setLastMinutes(Number(rest.value));
     document.f.languages.value = "休憩中";
    } else {
     //勉強
      setLastMinutes(Number(study.value));
    }
  }

  let milliSec = millenium - today;
 //分
  time2 = Math.floor(milliSec / (60 * 1000));
 //秒
  time3 = Math.floor(milliSec / 1000) % 60;

  times2 = ("00" + time2).slice(-2);
  times3 = ("00" + time3).slice(-2);

  document.f.days.value = times2 + ":" + times3;

  const language = document.querySelector("#language");
  document.f.languages.value = language.value;

  const timeRecord = document.querySelector(".timerRecord");

  document.e.style.display = "none";
  timeRecord.style.display = "block";
  document.f.days.style.display = "block";
  document.f.languages.style.display = "block";

 //1秒ごとに処理を実行
  tid = setTimeout("display()", 1000);
}
