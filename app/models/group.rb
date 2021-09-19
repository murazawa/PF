class Group < ApplicationRecord

  has_many :theme_words
  # belongs_to :create
  belongs_to :player
# optional質問する
end

