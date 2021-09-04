Rails.application.routes.draw do


  root 'homes#top'

  devise_for :players, :controllers => {
  :registrations => 'players/registrations',
  :sessions => 'players/sessions',
  :passwords => 'players/passwords'
  }
  
  resources :players, only: [:show, :edit, :update]
  resources :games, only: [:index] do
    
    # タイムアタックモード
    get '/syllabaries' => 'games#syllabaries' # 50音モード
    get '/greats_men' => 'games#greats_men' # 偉人の名言モード
    get '/standards' => 'games#standards' # スタンダードモード
    
    # フェードアウトモード
    get '/fade_outs' => 'games#fade_outs' # FOモード
    
    # クリエイトモード
    get '/creates' => 'games#creates' # クリエイトモード
  end  

  resources :theme_groups, only: [:index, :new, :edit, :update, :destroy]
  resources :theme_words, only: [:index, :new, :edit, :update, :destroy]
end
# お問い合わせ機能あとから付ける