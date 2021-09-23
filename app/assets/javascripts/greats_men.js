
$(function() {
  // オブジェクトを変数に代入
  let yomi = ('#yomi');
  let mondai = ('#mondai');
  let finishPanel = ('#finish-panel');
  let countSelect = ('#count-select');
  let correctMessage = ('#correct-message');
  let mistakeMessage = ('#mistake-message');

  let timeMessage = ('#time-message');
  let startMessage = ('#start-message');

  // 問題用の変数の初期化
  let str_index = 1;
  let max_length = 5; //　最初の問題

  // 問題数
  let question_number = 1;
  let question_limit = 5;
  let done_questions = {};

  // カウントする変数を３つ宣言
  let typing_cnt = 0; //タイプした合計
  let correct_cnt = 0; //正解タイプ数
  let mistake_cnt = 0; //間違えたタイプ数

  let start_game = false;
  let start_time = 0;

  // 問題
  let MONDAI_LIST = [
    {yomi:'夢はでっかく根は深く', text:'yumehadekkakunehahukaku'}, {yomi:'心に欲なき時は義理を行う', text:'kokoroniyokunakitokihagiriwookonau'},
    {yomi:'夢なき者に成功なし', text:'yumenakimononiseikouhanasi'}, {yomi:'敵は多ければ多いほど面白い', text:'tekihaookerebaooihodoomosiroi'},
    {yomi:'絶対は絶対にない', text:'zettaihazettaininai'}, {yomi:'困難の中に、機会がある', text:'konnnannnonakani,kikaigaaru'},
    {yomi:'昨日を捨てよ', text:'kinouwosuteyo'}, {yomi:'仕事はチームスポーツなんだ', text:'sigotohati-musupo-tunannda'},
    {yomi:'人生とは今日一日のことである', text:'jinseitohakyouitinitinokotodearu'}, {yomi:'最も重要なことから始めよ', text:'mottomojuuyounakotokarahajimeyo'},
    {yomi:'長所は必ず、短所を伴う', text:'tyousyohakanarazu,tansyowotomonau'}, {yomi:'忘れられることは、許されること', text:'wasurerarerukotoha,yurusarerukoto'},
    {yomi:'すべては練習のなかにある', text:'subeteharensyuunonakaniaru'}, {yomi:'汗で溺れた者はいない', text:'asedeoboretamonohainai'},
    {yomi:'愚か者であれ', text:'orokamonodeare'}, {yomi:'雲の向こうは、いつも青空', text:'kumonomukouha,itumoaozora'},
    {yomi:'物語はここから始まるのだ', text:'monogatarihakokokarahajimarunoda'}, {yomi:'悲しみと喜びはつながっている', text:'kanasimitoyorokobihatunagatteiru'},
    {yomi:'人は成功に向かってつまずく', text:'hitohaseikounimukattetumazuku'}, {yomi:'情報は知識にあらず', text:'jouhou'},
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
    let random_number = Math.floor(Math.random()*19);
    while (done_questions[random_number]!== undefined) {
      random_number = Math.floor(Math.random()*19);
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
    question_limit = 5;
    done_question = {};
    typing_cnt = 0;
    correct_cnt = 0;
    mistake_cnt = 0;
    start_game = false;
    start_time = 0;

    $countSelect.val('5');

    changeQuestionWord(getQuestionNumber());
    $finishPanel.addClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $startMessage.show();
    $countSelect.show();
  }



  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $correctMessage.text('正解数/タイプ数：' +correct_cnt+'/' +typing_cnt+' ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数/タイプ数：'+mistake_cnt+'/'+typing_cnt+' ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    let end_time = performance.now();
    let typing_time = ( (end_time - start_time) / 1000).toFixed(2);
    $timeMessage.text('かかった時間：'+typing_time+'秒');
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


// JavaScriptの文字列は引用符で囲む必要があります。

// let str = "Hello";
// let str2 = 'Single quotes are ok too';
// let phrase = `can embed ${str}`;