class ThemeWordsController < ApplicationController
  def index
    @word = ThemeWord.new
    @theme_word = ThemeWord.all
    @groups = Group.where(:id => params[:theme_group_id]).first
    # @words = ThemeWord.find(params[:id])
    # @word = ThemeWord.where(:id => params[:theme_group_id]).first
  end

  def edit
    # @word = ThemeWord.find(params[:id])
    @groups = Group.where(:id => params[:theme_group_id]).first

    # @read_word = ThemeWord.find(params[:id])
    # @type_word = ThemeWord.find(params[:id])
  end

  def update
    # @read_word = ThemeWord.find(params[:id])
    # @type_word = ThemeWord.find(params[:id])
    # @word = ThemeWord.find(params[:theme_group_id])
    @groups = Group.where(:id => params[:theme_group_id]).first
    @word = ThemeWord.find(params[:id])

    if @word.update(theme_words_params)
    # if @groups.update(theme_word_params)
      redirect_to theme_group_theme_words_path
    else
      render "edit"
    end
  end

  def create
    @word = ThemeWord.new(theme_word_params)
    @word.player_id = current_player.id
    @word.group_id = params[:theme_group_id]
    # binding.pry
    @word.save!
    redirect_back(fallback_location: root_path)

  end

  def destroy
    @theme_word = ThemeWord.find(params[:id])
    @theme_word.destroy
    redirect_back(fallback_location: root_path)
  end

  private
  def theme_word_params
    p '-------------'
    p params
    p '-------------'
    params.require(:theme_word).permit(:read_word, :type_word, :id)
  end

  def theme_words_params
    p '-------------'
    p params
    p '-------------'
    params.permit(:read_word, :type_word, :id)
  end
end
