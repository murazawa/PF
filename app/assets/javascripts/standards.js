
$(function() {
  // オブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  const $correctMessage = $('#correct-message');
  const $mistakeMessage = $('#mistake-message');

  const $timeMessage = $('#time-message');
  const $startMessage = $('#start-message');

  // 問題用の変数の初期化
  let char_index = 1;
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
  const MONDAI_LIST = [
    {yomi:'アーモンド', text:'a-mondo'}, {yomi:'赤とんぼ', text:'akatonbo'},
    {yomi:'天の川', text:'amanogawa'}, {yomi:'アンケート', text:'anke-to'},
    {yomi:'腕時計', text:'udedokei'}, {yomi:'浮き袋', text:'ukibukuro'},
    {yomi:'映画館', text:'eigakann'}, {yomi:'おこづかい', text:'okozukai'},
    {yomi:'怪獣', text:'kaijuu'}, {yomi:'カルシウム', text:'karusiumu'},
    {yomi:'休憩', text:'kyuukei'}, {yomi:'教育', text:'kyouiku'},
    {yomi:'掲示板', text:'keijibann'}, {yomi:'ケチャップ', text:'ketyappu'},
    {yomi:'昆虫', text:'kontyuu'}, {yomi:'コガネムシ', text:'koganemusi'},
    {yomi:'さくらんぼ', text:'sakuranbo'}, {yomi:'サバイバル', text:'sabaibaru'},
    {yomi:'自動車', text:'jidousya'}, {yomi:'宿題', text:'syukudai'},
    {yomi:'ソーセージ', text:'so-se-ji'}, {yomi:'損傷', text:'sonsyou'},
    {yomi:'竹とんぼ', text:'taketonbo'}, {yomi:'着席', text:'tyakuseki'},
    {yomi:'トロピカル', text:'toropikaru'}, {yomi:'流れ星', text:'nagarebosi'},
    {yomi:'人形', text:'ningyou'}, {yomi:'ヌンチャク', text:'nuntyaku'},
    {yomi:'燃料', text:'nenryou'}, {yomi:'のぼり坂', text:'noborizaka'},
    {yomi:'ファミコン', text:'famikonn'}, {yomi:'文鳥', text:'buntyou'},
    {yomi:'ひな祭り', text:'hinamaturi'}, {yomi:'ハリネズミ', text:'harinezumi'},
    {yomi:'包丁', text:'houtyou'}, {yomi:'マヨネーズ', text:'mayone-zu'},
    {yomi:'未成年', text:'miseinenn'}, {yomi:'虫めがね', text:'musimegane'},
    {yomi:'明太子', text:'mentaiko'}, {yomi:'モルモット', text:'morumotto'},
    {yomi:'ヤンクック', text:'yankukku'}, {yomi:'ヨーグルト', text:'yo-guruto'},
    {yomi:'ランニング', text:'rannningu'}, {yomi:'立候補', text:'rikkouho'},
    {yomi:'ワイシャツ', text:'waisyatu'}, {yomi:'露天風呂', text:'rotenburo'},

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
  $(document).on('keypress', function(e){
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

    const $target = $('#char-'+char_index);
    const char = $target.text();
    if (e.key === char) { //入力文字と現在の位置の文字が一緒だったら
      // alert('正解!');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
      correct_cnt++; //正解したとき②
      } else {
      mistake_cnt++; //間違えたとき③
      }

    if (max_length < char_index) {
      question_number++;
      if (question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1; //初期化
    }

  });


  function getQuestionNumber(){
    let random_number = Math.floor(Math.random()*45);
    while (done_questions[random_number]!== undefined) {
      random_number = Math.floor(Math.random()*45);
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
    char_index = 1;
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
    $correctMessage.text('正解数：' +correct_cnt+'/' +typing_cnt+' ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数：'+mistake_cnt+'/'+typing_cnt+' ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    const end_time = performance.now();
    const typing_time = ( (end_time - start_time) / 1000).toFixed(2);
    $timeMessage.text('かかった時間：'+typing_time+'秒');
}


  function changeQuestionWord(index) {
    const word = MONDAI_LIST[index]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++) {
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[index]['yomi']);
  }

});
