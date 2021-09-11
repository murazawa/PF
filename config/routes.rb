Rails.application.routes.draw do



  root 'homes#top'

  devise_for :players, :controllers => {
  :registrations => 'players/registrations',
  :sessions => 'players/sessions',
  :passwords => 'players/passwords'
  }

  resources :players, only: [:show, :edit, :update]
  resources :games, only: [:index]

  # タイムアタックモード
  get 'games/syllabaries' # 50音モード
  get 'games/greats_men' # 偉人の名言モード
  get 'games/standards' # スタンダードモード

  # フェードアウトモード
  get 'games/fade_outs' # FOモード

  # クリエイトモード
  get 'games/creates' # クリエイトモード



  resources :theme_groups, only: [:index, :edit, :update, :create, :destroy] do
    resources :theme_words, only: [:index, :show, :edit, :update, :create, :destroy]

  end

  get 'inquiry' => 'inquiry#index'
  post 'inquiry/confirm' => 'inquiry#confirm' #確認用
  post 'inquiry/thanks' => 'inquiry#thanks' #完了画面
end
# お問い合わせ機能あとから付ける
# ・index→問合せ画面（初期表示画面）
# ・confirm→問合せ確認画面
# ・thanks→問合せ完了通知画面