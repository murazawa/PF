class ThemeWordsController < ApplicationController
  def index
    @word = ThemeWord.new
    @theme_word = ThemeWord.all

  end

  def edit
  end

  def update
  end

  def create
    @word = ThemeWord.new(theme_word_params)
    # binding.pry
    @word.save!
    redirect_back(fallback_location: root_path)

  end

  def destroy
    @words = ThemeWord.find(params[:id])
    @words.destroy
    redirect_back(fallback_location: root_path)
  end

  private
  def theme_word_params
    params.require(:theme_word).permit(:read_word, :type_word)
  end
end
