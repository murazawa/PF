class AddImageIdToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :image_id, :string
  end
end
