class ThemeGroupsController < ApplicationController
  before_action :authenticate_player!
  def index
    @group_names = Group.all
    @group = Group.new
    # @word = ThemeWord.where(:id => params[:theme_group_id]).first
    # @word = ThemeWord.new

  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    @group = Group.new(group_params)
    @group.player_id = current_player.id
    # binding.pry
    @group.save!
      redirect_to theme_groups_path

  end


  def update
    @group = Group.find(params[:id])
    @group.update(group_params)
    redirect_to theme_groups_path
  end

  def destroy
    @group_names = Group.find(params[:id])
    @group_names.destroy
    redirect_back(fallback_location: root_path)
  end
  private
  def group_params
    params.require(:group).permit(:group_name)

  end

end

