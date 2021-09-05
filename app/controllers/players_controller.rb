class PlayersController < ApplicationController
  before_action :authenticate_player!
  def show
    @player = Player.find(params[:id])
  end

  def edit
    @player = Player.find(params[:id])
  end

  def update
    @player = Player.find(params[:id])
    if @player.update(player_params)
      redirect_to player_path
    else
      render "edit"
    end
  end
  private
  def player_params
    params.require(:player).permit(:player_name, :email)

  end
end
