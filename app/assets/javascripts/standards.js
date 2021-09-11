
$(function() {
  // オブジェクトを変数に代入
  const $kana = $('#kana');
  const $theme = $('#theme');
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
  const THEME = [
    {kana:'アーモンド', text:'a-mondo'}, {kana:'赤とんぼ', text:'akatonbo'},
    {kana:'天の川', text:'amanogawa'}, {kana:'アンケート', text:'anke-to'},
    {kana:'腕時計', text:'udedokei'}, {kana:'浮き袋', text:'ukibukuro'},
    {kana:'映画館', text:'eigakann'}, {kana:'おこづかい', text:'okozukai'},
    {kana:'怪獣', text:'kaijuu'}, {kana:'カルシウム', text:'karusiumu'},
    {kana:'休憩', text:'kyuukei'}, {kana:'教育', text:'kyouiku'},
    {kana:'掲示板', text:'keijibann'}, {kana:'ケチャップ', text:'ketyappu'},
    {kana:'昆虫', text:'kontyuu'}, {kana:'コガネムシ', text:'koganemusi'},
    {kana:'さくらんぼ', text:'sakuranbo'}, {kana:'サバイバル', text:'sabaibaru'},
    {kana:'自動車', text:'jidousya'}, {kana:'宿題', text:'syukudai'},
    {kana:'ソーセージ', text:'so-se-ji'}, {kana:'損傷', text:'sonsyou'},
    {kana:'竹とんぼ', text:'taketonbo'}, {kana:'着席', text:'tyakuseki'},
    {kana:'トロピカル', text:'toropikaru'}, {kana:'流れ星', text:'nagarebosi'},
    {kana:'人形', text:'ningyou'}, {kana:'ヌンチャク', text:'nuntyaku'},
    {kana:'燃料', text:'nenryou'}, {kana:'のぼり坂', text:'noborizaka'},
    {kana:'ファミコン', text:'famikonn'}, {kana:'文鳥', text:'buntyou'},
    {kana:'ひな祭り', text:'hinamaturi'}, {kana:'ハリネズミ', text:'harinezumi'},
    {kana:'包丁', text:'houtyou'}, {kana:'マヨネーズ', text:'mayone-zu'},
    {kana:'未成年', text:'miseinenn'}, {kana:'虫めがね', text:'musimegane'},
    {kana:'明太子', text:'mentaiko'}, {kana:'モルモット', text:'morumotto'},
    {kana:'ヤンクック', text:'yankukku'}, {kana:'ヨーグルト', text:'yo-guruto'},
    {kana:'ランニング', text:'rannningu'}, {kana:'立候補', text:'rikkouho'},
    {kana:'ワイシャツ', text:'waisyatu'}, {kana:'露天風呂', text:'rotenburo'},

  ];
  // 最初は問題を隠すhide()
  $kana.hide();
  $theme.hide();
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
    $kana.show();
    $theme.show();
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
    $kana.hide();
    $theme.hide();
    $startMessage.show();
    $countSelect.show();
  }



  function finish() {
    $finishPanel.removeClass('hidden');
    $kana.hide();
    $theme.hide();
    $correctMessage.text('正解数：' +correct_cnt+'/' +typing_cnt+' ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数：'+mistake_cnt+'/'+typing_cnt+' ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    const end_time = performance.now();
    const typing_time = ( (end_time - start_time) / 1000).toFixed(2);
    $timeMessage.text('かかった時間：'+typing_time+'秒');
}


  function changeQuestionWord(index) {
    const word = THEME[index]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++) {
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $theme.html(newHtml);
    $kana.text(THEME[index]['kana']);
  }

});
