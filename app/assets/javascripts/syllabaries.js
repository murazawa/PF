
$(function() {
  // オブジェクトを変数に代入
  let $yomi = $('#yomi');
  let $mondai = $('#mondai');
  let $finishPanel = $('#finish-panel');
  let $countSelect = $('#count-select');
  let $correctMessage = $('#correct-message');
  let $mistakeMessage = $('#mistake-message');

  let $timeMessage = $('#time-message');
  let $startMessage = $('#start-message');

  // 問題用の変数の初期化
  let str_index = 1;
  let max_length = 5; //　最初の問題

  // 問題数
  let question_number = 1;
  let question_limit = 9;
  let done_questions = {};

  // カウントする変数を３つ宣言
  let typing_cnt = 0; //タイプした合計
  let correct_cnt = 0; //正解タイプ数
  let mistake_cnt = 0; //間違えたタイプ数

  let start_game = false;
  let start_time = 0;
  console.log($yomi)

  // 問題
  let MONDAI_LIST = [
    {yomi:'あいうえお', text:'aiueo'},
    {yomi:'かきくけこ', text:'kakikukeko'},
    {yomi:'さしすせそ', text:'sasisuseso'},
    {yomi:'たちつてと', text:'tatituteto'},
    {yomi:'なにぬねの', text:'naninuneno'},
    {yomi:'はひふへほ', text:'hahihuheho'},
    {yomi:'まみむめも', text:'mamimumemo'},
    {yomi:'やゆよ', text:'yayuyo'},
    {yomi:'らりるれろ', text:'rarirurero'},
    {yomi:'わをん', text:'wawonn'},
  ];

  // 最初は問題を隠すhide()
  $yomi.hide();
  $mondai.hide();
  changeQuestionWord(getQuestionNumber());　//最初の問題の設定

  $countSelect.on('change', function(e) {
  question_limit = Number($countSelect.val());
  done_questions = {}; // ここ大事
  changeQuestionWord(getQuestionNumber());
  });


  // #start-buttonで　init();関数の呼び出し
  $('#start-button').on('click', function(e){
    init();
  });


// ゲームを開始したら、最初のメッセージとSelectは隠し、問題を表示
// キーをタイプした時にそれぞれの数を増加 → 1, 2, 3
  $(document).off().on('keypress', function(e){
    if (!start_game && e.keyCode === 32) { //  スペースでスタート
    $startMessage.hide();
    $countSelect.hide();
    $yomi.show();
    $mondai.show();
    start_game = true;
    start_time = performance.now();
    return;
  } else if (!start_game) {
    return;
  }


    typing_cnt++; // ①

    let $target = $('#str-'+str_index);
    let str = $target.text();
    // console.log("str")
    // console.log(str)
    // console.log("e.key")
    // console.log(e.key)

    if (e.key === str) { //入力文字と現在の位置の文字が一緒だったら
      // alert('正解!');
      $target.removeClass('default');
      $target.addClass('correct');
      str_index++;
      correct_cnt++; //正解したとき②
      } else {
      mistake_cnt++; //間違えたとき③
      }

    if (max_length < str_index) {
      question_number++;
      if (question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      str_index = 1; //初期化
    }

  });


  function getQuestionNumber(){
    let random_number = Math.floor(Math.random()*9);
    while (done_questions[random_number]!== undefined) {
      random_number = Math.floor(Math.random()*9);
    }
    done_questions[random_number] = random_number
    return random_number;
  }


  // init()関数を実装
// ①各変数の初期s化をする
// ②問題数を３に戻す
// ③最初の問題の表示する
// ④終了メッセージを非表示に、問題エリアを表示する
  function init(){
    str_index = 1;
    question_number = 1;
    question_limit = 9;
    done_question = {};
    typing_cnt = 0;
    correct_cnt = 0;
    mistake_cnt = 0;
    start_game = false;
    start_time = 0;

    $countSelect.val('9');

    changeQuestionWord(getQuestionNumber());
    $finishPanel.addClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $startMessage.show();
    $countSelect.show();
  }



  function finish() {
  var gamescore = localStorage.getItem('score');
  localStorage.clear();

    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $correctMessage.text('正解数/タイプ数：' +correct_cnt+'/' +typing_cnt+' ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数/タイプ数：'+mistake_cnt+'/'+typing_cnt+' ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    let end_time = performance.now();
    let typing_time = ( (end_time - start_time) / 1000).toFixed(2);
    $timeMessage.text('かかった時間：'+typing_time+'秒');

  // $.ajax({
  //   url: '/games/syllabaries',
  //   type: 'GET',
  //   dataType: 'html',
  //   async: true,
  //   data: {
  //     score: gamescore,
  //   },
  // });

}


  function changeQuestionWord(index) {
    let word = MONDAI_LIST[index]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++) {
      newHtml += '<p id="str-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[index]['yomi']);
  }

});


// let done_questions = {}; ループしないやつ
