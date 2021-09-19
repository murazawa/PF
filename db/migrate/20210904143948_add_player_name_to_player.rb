class AddPlayerNameToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :player_name, :string
  end
end
